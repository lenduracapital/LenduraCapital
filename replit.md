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