import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve public directory (compiled bundles, assets)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Secure endpoint exposing Firebase client configuration from environment variables
// Does not expose secret server keys; only client-safe Web App config
app.get('/api/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'datorika-hub.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'datorika-hub',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'datorika-hub.firebasestorage.app',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || ''
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
