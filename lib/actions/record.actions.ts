"use server";

import { ID, InputFile, Permission, Query, Role } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  RECORD_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { firebaseStorage } from "../firebaseAdmin";
import { randomUUID } from "crypto";
// REGISTER RECORD

// Define the type for the record parameters
type RegisterRecordParams = {
  name: string;
  userId: string;
  birthDate: Date;
  primaryPhysician: string;
  recordDocument?: FormData;
  notes?: string;
};
export const registerRecord = async ({
    recordDocument,
    userId,
    ...record
  }: RegisterRecordParams) => {
    try {
      let filePath: string, fileUrl;
      if (recordDocument) {
        const fileName = recordDocument.get("fileName") as string;
        const fileBlob = recordDocument.get("blobFile") as Blob;
  
        // Create a folder structure: userId/records/fileName
        const timestamp = new Date().getTime();
        const fileName2 = `${randomUUID()}_${timestamp}_${fileName}`;
        filePath = `users/${userId}/records/${fileName2}`;
  
        const bucket = firebaseStorage.bucket();
        const file = bucket.file(filePath);
  
        const stream = file.createWriteStream({
          metadata: {
            contentType: fileBlob.type,
          },
        });
   
          stream.on('error', (err: { message: any; }) => {
            console.error("Error uploading file:", err);
             
          });
  
          stream.on('finish', async () => {
            console.log("File uploaded successfully!");
            await file.makePublic();
            fileUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  
            try {
              // Create new record document
              const newRecord = await databases.createDocument(
                DATABASE_ID!,
                RECORD_COLLECTION_ID!,
                randomUUID(),
                {
                  userId,
                  recordDocumentId: fileName2,
                  recordDocumentPath: filePath,
                  recordDocumentUrl: fileUrl,
                  ...record,
                }
              );
  
              return parseStringify(newRecord);
            } catch (dbError) {
              console.error("Error creating database record:", dbError);
            
            }
          });
  
          const fileBuffer = await fileBlob.arrayBuffer();
          stream.end(Buffer.from(fileBuffer));
        
      } else {
        // If no document is uploaded, just create the database record
        const newRecord = await databases.createDocument(
          DATABASE_ID!,
          RECORD_COLLECTION_ID!,
          randomUUID(),
          {
            userId,
            ...record,
          }
        );
  
        return parseStringify(newRecord);
      }
    } catch (error) {
      console.error("An error occurred while creating a new record:", error);
      throw error;
    }
  };


