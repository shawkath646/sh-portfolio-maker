import admin from "firebase-admin";

let firebaseConfig = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,

};

firebaseConfig.private_key = firebaseConfig.private_key && firebaseConfig.private_key.replace(/\\n/g, '\n')

const app = admin.apps.length ? admin.app() : admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
    storageBucket: 'sh-portfolio-97faf.appspot.com'
});

const db = admin.firestore(app);
const bucket = admin.storage(app).bucket();
const fieldValue = admin.firestore.FieldValue;

export { db, bucket, fieldValue };
  