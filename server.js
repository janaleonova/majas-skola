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

// Verify one password against three Firebase Auth accounts, with throttling.
// Deploy only behind HTTPS. Never log, store or return submitted passwords.
app.use('/api/password-login', express.json({limit:'2kb'}));
const attempts=new Map();
app.post('/api/password-login',async(req,res)=>{
  res.set('Cache-Control','no-store');
  const ip=req.ip;
  const now=Date.now();
  const a=attempts.get(ip)||{count:0,until:now+15*60*1000};
  if(now>a.until){a.count=0;a.until=now+15*60*1000}
  if(a.count>=8)return res.status(429).json({error:'Pārāk daudz mēģinājumu. Mēģini vēlāk.'});
  a.count++;attempts.set(ip,a);
  if(attempts.size>5000){for(const [key,val] of attempts)if(now>val.until)attempts.delete(key)}
  const password=req.body?.password;
  const apiKey=process.env.FIREBASE_API_KEY;
  const accounts={marks:process.env.MARKS_LOGIN_EMAIL,samanta:process.env.SAMANTA_LOGIN_EMAIL,vecaks:process.env.PARENT_LOGIN_EMAIL};
  if(typeof password!=='string'||password.length<6||password.length>128)return res.status(400).json({error:'Nederīga parole.'});
  if(!apiKey||Object.values(accounts).some(x=>!x))return res.status(503).json({error:'Pieteikšanās vēl nav konfigurēta.'});
  try{
    for(const [role,email] of Object.entries(accounts)){
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+encodeURIComponent(apiKey),{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password,returnSecureToken:true})
      });
      if(response.ok){return res.json({role,email})}
      if(response.status!==400){return res.status(503).json({error:'Autentifikācijas pakalpojums nav pieejams.'})}
    }
    return res.status(401).json({error:'Nepareiza parole.'});
  }catch(e){return res.status(503).json({error:'Savienojuma kļūda. Mēģini vēlāk.'})}
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
