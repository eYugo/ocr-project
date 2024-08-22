// s3.service.ts
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  // Upload a file to S3
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();
    return fileKey;
  }

  // Get a pre-signed URL for a file in S3
  async getPreSignedUrl(fileKey: string): Promise<string> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Expires: 60 * 60, // URL expires in 1 hour
    };

    return await this.s3.getSignedUrl('getObject', params);
  }

  // Delete a file from S3
  async deleteFile(fileKey: string): Promise<AWS.S3.DeleteObjectOutput> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };

    return await this.s3.deleteObject(params).promise();
  }
}
