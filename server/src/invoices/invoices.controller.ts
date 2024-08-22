import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Users as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from '../authentication/auth.guard';
import { S3Service } from '../s3/s3.service';
import { TextractService } from '../textract/textract.service';
import { User } from '../users/users.decorator';
import { InvoicesService } from './invoices.service';
import { UpdateInvoiceDTO } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly s3Service: S3Service,
    private readonly textractService: TextractService,
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getInvoices(@User() user: PrismaUser) {
    return await this.invoicesService.getInvoices(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createInvoice(
    @UploadedFile() file: Express.Multer.File,
    @User() user: PrismaUser,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    // Upload file to S3
    let fileKey: string;
    try {
      fileKey = await this.s3Service.uploadFile(file);
    } catch (error) {
      throw new BadRequestException(
        'Error uploading file to S3: ' + error.message,
      );
    }

    // Analyze the uploaded file
    let analysisResult: any;
    try {
      analysisResult = await this.textractService.analyzeInvoice(fileKey);
      console.log('Analyzed file:', analysisResult);
    } catch (error) {
      console.error('Error analyzing file:', error);
      throw new BadRequestException('Error analyzing file: ' + error.message);
    }

    return await this.invoicesService.createInvoice({
      fileName: file.originalname,
      fileKey: fileKey,
      userId: user.id,
      ...analysisResult,
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteInvoice(@Query('id') id: string, @User() user: PrismaUser) {
    const parsedId = Number(id);
    return this.invoicesService.deleteInvoice(parsedId, user.id);
  }

  @Get('analyze')
  async analyzeInvoice(@Query('invoice') invoice: string) {
    if (!invoice) {
      throw new BadRequestException('Invoice parameter is required');
    }

    try {
      const result = await this.textractService.analyzeInvoice(invoice);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('image-url')
  async getImage(@Query('fileKey') fileKey: string) {
    if (!fileKey) {
      throw new BadRequestException('fileKey parameter is required');
    }

    try {
      const url = await this.s3Service.getPreSignedUrl(fileKey);
      return { url };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get query result for an invoice
  @Post('query')
  @UseGuards(JwtAuthGuard)
  async queryInvoice(
    @Query('id') id: string,
    @Body('') query: AWS.Textract.Query,
    @User() user: PrismaUser,
  ) {
    if (!id) {
      throw new BadRequestException('Id parameter is required');
    }
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    const parsedId = Number(id);
    const invoice = await this.invoicesService.getInvoiceById(
      parsedId,
      user.id,
    );
    try {
      const result = await this.textractService.queryInvoice(
        invoice.fileKey,
        query,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get invoice by ID for a user
  @Get()
  @UseGuards(JwtAuthGuard)
  async getInvoice(@Query('id') id: string, @User() user: PrismaUser) {
    if (!id) {
      throw new BadRequestException('Id parameter is required');
    }
    const parsedId = Number(id);
    return await this.invoicesService.getInvoiceAndUrlById(parsedId, user.id);
  }

  // Update an invoice and its item lines
  @Put()
  @UseGuards(JwtAuthGuard)
  async updateInvoice(
    @Body() data: UpdateInvoiceDTO,
    @User() user: PrismaUser,
  ) {
    const { id, userId, fileName, fileKey, imageUrl, ...updateData } = data;
    if (user.id !== BigInt(userId)) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    return await this.invoicesService.updateInvoice(id, updateData);
  }
}
