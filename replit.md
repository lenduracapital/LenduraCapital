# Running on Replit

1. **Import:** Fork or import this repo into Replit.  
2. **Secrets:** Under "Secrets" add:
   - `DATABASE_URL` = `postgres://<DB_USER>:<DB_PASS>@db:5432/<DB_NAME>`
   - `JWT_SECRET` = `<GENERATED_HEX_STRING>`
   - `PORT` = `5000`
3. **Run Command:**  
   ```bash
   npm install && npm run db:push && npm run dev
   ```
4. **Preview:** Click "Run" and open the side-pane URL (port 5000).  
5. **Troubleshooting:**  
   - Missing `.env`: copy `.env.example` to `.env` and fill in secrets  
   - Postgres uninitialized: run `npm run db:push`
   - Webview "refused to connect": Try refreshing browser/webview or hard reload (Ctrl+F5)

## Recent Changes (June 23, 2025)
- Fixed React hook call errors by removing "use client" directives from UI components
- Simplified App.tsx to resolve routing/lazy loading crashes
- Added static file serving for video and logo assets
- Server confirmed working correctly on port 5000 with proper HTTP responses
- Logo restored to original file: /image_1750273835191.webp
- Video serving with correct MP4 headers from public directory