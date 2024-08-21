import { Module } from '@nestjs/common';
import { InvoicesService } from '../invoices/invoices.service';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { InvoicesRepository } from 'src/invoices/repository/invoices.repository';
import { LineItemsRepository } from 'src/line-items/repository/line-items.repository';
import { S3Service } from 'src/s3/s3.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PdfController],
  providers: [
    PrismaService,
    PdfService,
    InvoicesService,
    S3Service,
    InvoicesRepository,
    LineItemsRepository,
  ],
})
export class PdfModule {}
