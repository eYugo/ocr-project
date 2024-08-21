// update-invoice.dto.ts
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateLineItemDTO {
  @IsNumber()
  id: number;
  @IsString()
  description: string;
  @IsString()
  quantity: number;
  @IsString()
  unitPrice: number;
  @IsString()
  totalPrice: number;
}

export class UpdateInvoiceDTO {
  @IsNumber()
  id: number;
  @IsString()
  fileName: string;
  @IsString()
  fileKey: string;
  @IsNumber()
  userId: number;
  @IsString()
  note: string;
  @IsString()
  vendorName: string;
  @IsString()
  vendorAddress: string;
  @IsString()
  vendorPhone: string;
  @IsString()
  vendorURL: string;
  @IsString()
  receiverName: string;
  @IsString()
  receiverAddress: string;
  @IsString()
  receiverPhone: string;
  @IsString()
  invoiceDae?: Date;
  @IsString()
  invoiceFileID: string;
  @IsString()
  dueDae?: Date;
  @IsString()
  poNumber: string;
  @IsString()
  totalAmount: string;
  @IsString()
  subtotal: string;
  @IsString()
  tax: string;
  @IsString()
  imageUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLineItemDTO)
  lineItems: UpdateLineItemDTO[];
}
