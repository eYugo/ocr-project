// textract.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {
  organizeExpenseResponse,
  extractQueryResults,
} from '../utils/textractUtils';

@Injectable()
export class TextractService {
  private textract: AWS.Textract;

  constructor() {
    this.textract = new AWS.Textract({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  // Analyze an invoice
  async analyzeInvoice(fileKey: string): Promise<any> {
    const params: AWS.Textract.AnalyzeExpenseRequest = {
      Document: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Name: fileKey,
        },
      },
    };

    const response = await this.textract.analyzeExpense(params).promise();
    return organizeExpenseResponse(response);
  }

  // Query an invoice
  async queryInvoice(fileKey: string, query: AWS.Textract.Query): Promise<any> {
    const params: AWS.Textract.AnalyzeDocumentRequest = {
      Document: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Name: fileKey,
        },
      },
      FeatureTypes: ['QUERIES'],
      QueriesConfig: {
        Queries: [query],
      },
    };

    const response = await this.textract.analyzeDocument(params).promise();
    return extractQueryResults(response);
  }
}
