import { initializeApp, credential as _credential } from "firebase-admin";


const firebaseKeys = process.env.FIREBASE_KEYS;

if (!firebaseKeys) {
  throw new Error('FIREBASE_KEYS environment variable is not set.');
}

let parsedFirebaseKeys;

try {
  parsedFirebaseKeys = JSON.parse(firebaseKeys);
} catch (error) {
  console.error('Error parsing FIREBASE_KEYS:', error);
  throw new Error('Invalid JSON format for FIREBASE_KEYS environment variable.');
}
var serviceAccount = require(parsedFirebaseKeys);


try {
  
  initializeApp({
  credential: _credential.cert(serviceAccount)
});

}catch(err){
  console.error('Error parsing FIREBASE_KEYS:', err);
  throw new Error('Invalid JSON format for FIREBASE_KEYS environment variable.');

}