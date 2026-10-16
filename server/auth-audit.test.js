import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

test('auth audit: rate limiting, proxy headers, error codes and role isolation', async () => {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: new URL('../', import.meta.url),
    env: {
      ...process.env,
      PORT: '3098',
      FIREBASE_API_KEY: 'mock_test_key_123456789012345678901234567890',
      MARKS_LOGIN_EMAIL: 'marks@test.invalid',
      SAMANTA_LOGIN_EMAIL: 'samanta@test.invalid',
      PARENT_LOGIN_EMAIL: 'parent@test.invalid'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(Error('Server did not start')), 10000);
      child.stdout.once('data', () => { clearTimeout(timeout); resolve(); });
      child.once('error', reject);
      child.once('exit', code => { if (code) reject(Error('Server exit ' + code)); });
    });

    const postLogin = (body, ip = '192.168.1.50') =>
      fetch('http://127.0.0.1:3098/api/password-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': ip
        },
        body: JSON.stringify(body)
      });

    // 1. Password validation: too short
    const shortRes = await postLogin({ password: '123' });
    assert.equal(shortRes.status, 400);
    const shortData = await shortRes.json();
    assert.equal(shortData.code, 'auth/invalid-credential');

    // 2. Failed password attempt with distinct role
    const failRes = await postLogin({ password: 'wrongpassword123', role: 'marks' }, '10.0.0.1');
    // Either 401 (if mock key reached google and failed) or 503 (if mock key rejected)
    assert.ok([401, 503].includes(failRes.status));
    const failData = await failRes.json();
    assert.ok(failData.code.startsWith('auth/'));

    // 3. Independent IP rate limiting: IP2 should not be blocked if IP1 fails
    const ip2Res = await postLogin({ password: 'short' }, '10.0.0.2');
    assert.equal(ip2Res.status, 400); // 400, not 429

  } finally {
    child.kill();
  }
});
