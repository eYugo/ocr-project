import { Response } from 'express';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Users as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { User } from '../users/users.decorator';
import { InvoicesService } from '../invoices/invoices.service';
import { PdfService } from './pdf.service';

@Controller('pdf')
@UseGuards(JwtAuthGuard)
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly invoicesService: InvoicesService,
  ) {}

  @Get('invoice')
  async generateInvoicePdf(
    @Query('id') id: string,
    @Res() res: Response,
    @User() user: PrismaUser,
  ) {
    const parsedId = Number(id);

    // Get Invoice
    const invoice = await this.invoicesService.getInvoiceAndUrlById(
      parsedId,
      user.id,
    );

    // Generate PDF
    const pdfBuffer = await this.pdfService.generateInvoicePdf(invoice);

    // Send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${id}.pdf`,
    );
    res.send(pdfBuffer);
  }
}
