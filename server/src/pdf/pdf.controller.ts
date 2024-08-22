import { Response } from 'express';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Users as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from '../authentication/auth.guard';
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

  // Generate a PDF invoice
  @Get('invoice')
  async generateInvoicePdf(
    @Query('id') id: string,
    @Res() res: Response,
    @User() user: PrismaUser,
  ) {
    const parsedId = Number(id);

    // get Invoice
    const invoice = await this.invoicesService.getInvoiceAndUrlById(
      parsedId,
      user.id,
    );

    // generate PDF
    const pdfBuffer = await this.pdfService.generateInvoicePdf(invoice);

    // send the PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${id}.pdf`,
    );
    res.send(pdfBuffer);
  }
}
