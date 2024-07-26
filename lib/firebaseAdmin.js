// import { initializeApp, credential as _credential, storage } from "firebase-admin";

var admin = require("firebase-admin");


const firebaseKeys  = JSON.parse(process.env.FIREBASE_KEYS);


if (!firebaseKeys) {
  throw new Error("FIREBASE_KEYS environment variable is not set.");
}
 

try {
  
   // Check if the default app is already initialized
   if (!admin.apps.length) {
    // Initialize the app if not already initialized
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKeys),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }
  
} catch (err) {
  console.error("Error parsing FIREBASE_KEYS: bbb", err);
  throw new Error(
    "Invalid JSON format for FIREBASE_KEYS environment variable."
  );
}

const firebaseStorage =  admin.storage();
export { firebaseStorage };
