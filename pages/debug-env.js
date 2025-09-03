// pages/debug-env.js (remove after debugging)
export default function DebugEnv() {
  return (
    <div>
      <h1>Environment Variables Debug</h1>
      <pre>
        {JSON.stringify({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'EXISTS' : 'MISSING',
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          // Don't log sensitive values in production
        }, null, 2)}
      </pre>
    </div>
  );
}
