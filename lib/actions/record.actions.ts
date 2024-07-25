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
    // Upload file if provided
    let filePath, fileId, bucket;
    if (recordDocument) {
      const fileName = recordDocument.get("fileName") as string;
      const fileBlob = recordDocument.get("blobFile") as Blob;

      // Create a folder structure: userId/records/fileName
      filePath = `${userId}/records/${fileName}`;

      const inputFile = InputFile.fromBlob(fileBlob, fileName);
        let bucketExist = await storage.getBucket(BUCKET_ID!);
       bucket = await storage.createBucket(
        ID.unique(),
        `user-${userId}-bucket`,
        [Permission.read(Role.any()), Permission.delete(Role.user(userId))],
        // [`user:${userId}`]
    );

      const file = await storage.createFile(
        bucket.$id!,
        ID.unique(),
        inputFile,
        [Permission.read(Role.any()), Permission.delete(Role.user(userId))] // Add permissions for the user
      );

      fileId = file.$id;
    }

    // Create new record document
    const newRecord = await databases.createDocument(
      DATABASE_ID!,
      RECORD_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        recordDocumentId: fileId ?? null,
        recordDocumentPath: filePath ?? null,
        recordDocumentUrl: filePath
          ? `${ENDPOINT}/storage/buckets/${bucket?.$id!}/files/${filePath}/view?project=${PROJECT_ID}`
          : null,
        ...record,
      }
    );

    return parseStringify(newRecord);
  } catch (error) {
    console.error("An error occurred while creating a new record:", error);
    throw error; // Re-throw the error to handle it in the calling function


  }
};




export async function getUserBucketId(userId: string): Promise<string> {
  try {
    

    // Fetch the user document
    const user = await databases.getDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      userId
    );
    console.log('user', user);
    // Check if the bucketId exists in the user document
    
    
    // if (user.bucketId) {
    //   return user.bucketId;
    // } else {
    //   throw new Error('Bucket ID not found for user');
    // }
  } catch (error) {
    console.error('Error fetching user bucket ID:', error);
    throw error;
  }
}

getUserBucketId("123456");