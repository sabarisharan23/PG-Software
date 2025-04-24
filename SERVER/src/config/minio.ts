import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "localhost",
  port: 9002,
  useSSL: false,
  accessKey: "minio",
  secretKey: "minio123",
});
