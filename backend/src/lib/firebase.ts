import * as admin from 'firebase-admin';

// Check if app is already initialized to avoid duplicate initialization errors
if (!admin.apps.length) {
  // Try to use service account if provided, otherwise fallback to application default credentials
  // Ensure that GOOGLE_APPLICATION_CREDENTIALS environment variable is set
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (_error) {}
}

export const auth = admin.auth();
export default admin;
