import { Database } from 'sqlite3';
import { Request, Response } from 'express';

// SQLite database for analytics (invisible to users)
const db = new Database('analytics.db');

// Promisified database methods
const dbRun = (sql: string, params: any[] = []): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const dbAll = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize analytics tables
export async function initializeAnalytics() {
  try {
    await dbRun(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id TEXT PRIMARY KEY,
        start_ts INTEGER,
        end_ts INTEGER,
        entry_page TEXT,
        exit_page TEXT
      )
    `);
    
    await dbRun(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        page_path TEXT,
        event_type TEXT,
        element_id TEXT,
        ts INTEGER
      )
    `);
    
    console.log('Analytics database initialized');
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
}

// Analytics endpoints (invisible backend)
export async function startSession(req: Request, res: Response) {
  try {
    const { session_id, entry_page } = req.body;
    const start_ts = Date.now();
    
    await dbRun(
      'INSERT OR REPLACE INTO sessions (session_id, start_ts, entry_page) VALUES (?, ?, ?)',
      [session_id, start_ts, entry_page]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Session start error:', error);
    res.status(500).json({ error: 'Failed to start session' });
  }
}

export async function endSession(req: Request, res: Response) {
  try {
    const { session_id, exit_page } = req.body;
    const end_ts = Date.now();
    
    await dbRun(
      'UPDATE sessions SET end_ts = ?, exit_page = ? WHERE session_id = ?',
      [end_ts, exit_page, session_id]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Session end error:', error);
    res.status(500).json({ error: 'Failed to end session' });
  }
}

export async function logEvent(req: Request, res: Response) {
  try {
    const { session_id, page_path, event_type, element_id } = req.body;
    const ts = Date.now();
    
    await dbRun(
      'INSERT INTO events (session_id, page_path, event_type, element_id, ts) VALUES (?, ?, ?, ?, ?)',
      [session_id, page_path, event_type, element_id, ts]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Event logging error:', error);
    res.status(500).json({ error: 'Failed to log event' });
  }
}

// Analytics dashboard (admin only)
export async function getAnalyticsDashboard(req: Request, res: Response) {
  try {
    const sessions = await dbAll(`
      SELECT 
        COUNT(*) as total_sessions,
        AVG(end_ts - start_ts) as avg_dwell_time,
        COUNT(CASE WHEN end_ts IS NOT NULL THEN 1 END) as completed_sessions
      FROM sessions 
      WHERE start_ts > ?
    `, [Date.now() - 7 * 24 * 60 * 60 * 1000]); // Last 7 days
    
    const topClicks = await dbAll(`
      SELECT 
        element_id,
        COUNT(*) as click_count
      FROM events 
      WHERE event_type = 'click' AND ts > ?
      GROUP BY element_id 
      ORDER BY click_count DESC 
      LIMIT 10
    `, [Date.now() - 7 * 24 * 60 * 60 * 1000]);
    
    const topPages = await dbAll(`
      SELECT 
        entry_page,
        COUNT(*) as visits
      FROM sessions 
      WHERE start_ts > ?
      GROUP BY entry_page 
      ORDER BY visits DESC 
      LIMIT 10
    `, [Date.now() - 7 * 24 * 60 * 60 * 1000]);
    
    res.json({
      summary: sessions[0] || { total_sessions: 0, avg_dwell_time: 0, completed_sessions: 0 },
      topClicks,
      topPages
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
}

// Weekly database maintenance
export async function vacuumDatabase() {
  try {
    await dbRun('VACUUM');
    console.log('Database vacuumed successfully');
  } catch (error) {
    console.error('Vacuum failed:', error);
  }
}