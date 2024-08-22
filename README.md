# Project Setup and Running Instructions

## Prerequisites
1. **Node.js**: Ensure you have Node.js installed.
2. **PostgreSQL**: Ensure you have PostgreSQL installed and running.
3. **AWS CLI**: Ensure you have the AWS CLI installed and configured with your credentials.

## AWS Configuration
1. **AWS S3 Bucket**:
   - Create an S3 bucket in the `us-east-2` region.
   - Ensure the bucket has the necessary permissions for reading and writing.

2. **AWS Textract**:
   - Ensure AWS Textract is enabled in your AWS account.

## Client Project (Next.js with TypeScript)

### Setting Up the Client
1. **Navigate to the client directory**:
   ```sh
   cd path-to-nextjs-project/client
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create a `.env.local` file: Ensure the `.env.local` file contains:**:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run the server:**:
   ```sh
   npm run dev
   ```

## Server Project (NestJS with TypeScript)

### Setting Up the Server

1. **Navigate to the server directory**:
   ```sh
   cd path-to-nextjs-project/server
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Create a `.env` file: Ensure the `.env` file contains:**:
   ```sh
    DATABASE_URL="your-postgres-database-url"
    AWS_ACCESS_KEY_ID="your-aws-access-key-id"
    AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
    AWS_REGION="us-east-2"
    AWS_S3_BUCKET_NAME="your-aws-s3-bucket-name"
    JWT_SECRET='secretKey'
    JWT_EXPIRES_IN='2h'
    ORIGIN_URL='http://localhost:3000'
   ```
4. **Generate Prisma client:**:
   ```sh
   npx prisma generate
   ```

5. **Run database migrations:**:
   ```sh
   npx prisma migrate deploy
   ```
6. **Run the server:**:
   ```sh
   npm run dev
   ```
