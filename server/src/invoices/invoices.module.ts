import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { TextractService } from '../textract/textract.service';
import { LineItemsRepository } from '../line-items/repository/line-items.repository';
import { InvoicesRepository } from './repository/invoices.repository';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  controllers: [InvoicesController],
  providers: [
    PrismaService,
    InvoicesService,
    InvoicesRepository,
    S3Service,
    TextractService,
    LineItemsRepository,
  ],
})
export class InvoicesModule {}
