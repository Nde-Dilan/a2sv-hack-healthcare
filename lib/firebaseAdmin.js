import { initializeApp, credential as _credential } from "firebase-admin";

var admin = require("firebase-admin");

const firebaseKeys = process.env.FIREBASE_KEYS;

if (!firebaseKeys) {
  throw new Error("FIREBASE_KEYS environment variable is not set.");
}

let parsedFirebaseKeys;

// try {
//   parsedFirebaseKeys = JSON.parse(firebaseKeys);
// } catch (error) {
//   console.error("Error parsing FIREBASE_KEYS:", error);
//   throw new Error(
//     "Invalid JSON format for FIREBASE_KEYS environment variable."
//   );
// }
var serviceAccount = require("./test.json");

try {
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  
} catch (err) {
  console.error("Error parsing FIREBASE_KEYS: bbb", err);
  throw new Error(
    "Invalid JSON format for FIREBASE_KEYS environment variable."
  );
}

const firebaseStorage = admin.storage();
export { firebaseStorage };
