import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { Report } from '../types';

const dbPath = path.resolve(process.cwd(), 'jansanket.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS community_verifications (
    id TEXT PRIMARY KEY,
    reportId TEXT NOT NULL,
    userId TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    UNIQUE(reportId, userId)
  );

  CREATE INDEX IF NOT EXISTS idx_reports_created ON reports(createdAt);
  CREATE INDEX IF NOT EXISTS idx_verifications_report ON community_verifications(reportId);
`);

export const database = {
  seedReportsIfEmpty(seedReports: Report[]) {
    const row = db.prepare('SELECT COUNT(*) as count FROM reports').get() as { count: number };
    if (row.count === 0) {
      const insert = db.prepare('INSERT INTO reports (id, data, createdAt, updatedAt) VALUES (?, ?, ?, ?)');
      for (const report of seedReports) {
        insert.run(report.id, JSON.stringify(report), report.createdAt, report.updatedAt);
      }
    }
  },

  resetReports(seedReports: Report[]) {
    db.exec('DELETE FROM reports');
    db.exec('DELETE FROM community_verifications');
    const insert = db.prepare('INSERT INTO reports (id, data, createdAt, updatedAt) VALUES (?, ?, ?, ?)');
    for (const report of seedReports) {
      insert.run(report.id, JSON.stringify(report), report.createdAt, report.updatedAt);
    }
  },

  getAllReports(): Report[] {
    const rows = db.prepare('SELECT data FROM reports ORDER BY createdAt DESC').all() as { data: string }[];
    return rows.map((r) => JSON.parse(r.data) as Report);
  },

  getReportById(id: string): Report | null {
    const row = db.prepare('SELECT data FROM reports WHERE id = ?').get(id) as { data: string } | undefined;
    if (!row) return null;
    return JSON.parse(row.data) as Report;
  },

  saveReport(report: Report) {
    const insert = db.prepare('INSERT OR REPLACE INTO reports (id, data, createdAt, updatedAt) VALUES (?, ?, ?, ?)');
    insert.run(report.id, JSON.stringify(report), report.createdAt, report.updatedAt);
  },

  updateReport(report: Report) {
    const update = db.prepare('UPDATE reports SET data = ?, updatedAt = ? WHERE id = ?');
    update.run(JSON.stringify(report), report.updatedAt, report.id);
  },

  // Community verification tracking (Feature 4)
  addCommunityVerification(reportId: string, userId: string): { success: boolean; alreadyVerified: boolean; count: number } {
    try {
      const id = `cv-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const stmt = db.prepare('INSERT INTO community_verifications (id, reportId, userId, createdAt) VALUES (?, ?, ?, ?)');
      stmt.run(id, reportId, userId, new Date().toISOString());

      // Get count
      const countRow = db.prepare('SELECT COUNT(*) as count FROM community_verifications WHERE reportId = ?').get(reportId) as { count: number };
      
      // Update report community count in SQLite
      const report = this.getReportById(reportId);
      if (report) {
        report.communityConfirmationsCount = countRow.count;
        // Bump priority score slightly for crowd verification (up to +15 pts)
        report.priorityFactors.communityImpact = Math.min(100, (report.priorityFactors.communityImpact || 70) + 5);
        report.priorityScore = Math.min(100, report.priorityScore + 3);
        this.updateReport(report);
      }

      return { success: true, alreadyVerified: false, count: countRow.count };
    } catch (err: any) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        const countRow = db.prepare('SELECT COUNT(*) as count FROM community_verifications WHERE reportId = ?').get(reportId) as { count: number };
        return { success: false, alreadyVerified: true, count: countRow.count };
      }
      throw err;
    }
  },

  hasUserVerified(reportId: string, userId: string): boolean {
    const row = db.prepare('SELECT 1 FROM community_verifications WHERE reportId = ? AND userId = ?').get(reportId, userId);
    return Boolean(row);
  },

  getCommunityVerificationsCount(reportId: string): number {
    const row = db.prepare('SELECT COUNT(*) as count FROM community_verifications WHERE reportId = ?').get(reportId) as { count: number };
    return row.count;
  },
};
