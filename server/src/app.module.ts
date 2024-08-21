import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [InvoicesModule, UsersModule, AuthModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
