import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import client from "../config/s3Config";
import fs from 'fs';
import path from "path";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import prisma from "./prisma";

export const uploadFile =  async (filename: string) => {
  const streamFile = fs.createReadStream(path.join(__dirname, `../static/${filename}`));
  const command = new PutObjectCommand({
    Body: streamFile,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: filename
  });
  const response = await client.send(command);
  return response;
};


export const getFileUrl = async (filename: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: filename
  });

  const result = await getSignedUrl(client, command, { expiresIn: 60 });
  console.log(result)
  return result;
}


