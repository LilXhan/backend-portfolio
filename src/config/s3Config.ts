import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY!,
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY!,
  },
});

export default client;