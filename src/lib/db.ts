import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.DATABASE_URL?.replace("file:", "") || path.join(process.cwd(), "data", "topk-agent-os.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initSchema();
  }
  return db;
}

function initSchema() {
  if (!db) return;

  // Agents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      department TEXT NOT NULL,
      reports_to TEXT,
      initials TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'idle',
      experience TEXT NOT NULL DEFAULT 'new',
      start_date TEXT NOT NULL,
      job_description TEXT,
      current_task TEXT,
      kpi_summary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      priority TEXT NOT NULL DEFAULT 'medium',
      assigned_by TEXT,
      due_date TEXT,
      completed_at TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    )
  `);

  // Achievements / Activity log
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    )
  `);

  // Chat messages
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id)
    )
  `);

  // API health status
  db.exec(`
    CREATE TABLE IF NOT EXISTS api_health (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_name TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'unknown',
      last_checked TEXT,
      error_message TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function seedAgents(agentData: Array<{
  id: string;
  name: string;
  title: string;
  department: string;
  reports_to: string | null;
  initials: string;
  status: string;
  experience: string;
  start_date: string;
  job_description: string;
  current_task: string | null;
  kpi_summary: string;
}>) {
  const database = getDb();
  const insert = database.prepare(`
    INSERT OR REPLACE INTO agents 
    (id, name, title, department, reports_to, initials, status, experience, start_date, job_description, current_task, kpi_summary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = database.transaction((items) => {
    for (const item of items) {
      insert.run(
        item.id,
        item.name,
        item.title,
        item.department,
        item.reports_to,
        item.initials,
        item.status,
        item.experience,
        item.start_date,
        item.job_description,
        item.current_task,
        item.kpi_summary
      );
    }
  });

  insertMany(agentData);
}

export function getAgentStatusFromDb(agentId: string) {
  const db = getDb();
  return db.prepare("SELECT * FROM agents WHERE id = ?").get(agentId);
}

export function getAllAgentsFromDb() {
  const db = getDb();
  return db.prepare("SELECT * FROM agents ORDER BY department, name").all();
}

export function logAchievement(agentId: string, title: string, description?: string, category?: string) {
  const db = getDb();
  db.prepare(
    "INSERT INTO achievements (agent_id, title, description, category) VALUES (?, ?, ?, ?)"
  ).run(agentId, title, description || null, category || null);
}

export function getRecentAchievements(limit: number = 50) {
  const db = getDb();
  return db
    .prepare(
      `SELECT a.*, ag.name as agent_name, ag.initials, ag.department 
       FROM achievements a 
       JOIN agents ag ON a.agent_id = ag.id 
       ORDER BY a.created_at DESC 
       LIMIT ?`
    )
    .all(limit);
}

export function updateAgentStatus(agentId: string, status: string, currentTask?: string) {
  const db = getDb();
  db.prepare(
    "UPDATE agents SET status = ?, current_task = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).run(status, currentTask || null, agentId);
}

export function updateApiHealth(apiName: string, status: string, errorMessage?: string) {
  const db = getDb();
  db.prepare(
    "INSERT OR REPLACE INTO api_health (api_name, status, last_checked, error_message) VALUES (?, ?, datetime('now'), ?)"
  ).run(apiName, status, errorMessage || null);
}

export function getApiHealth() {
  const db = getDb();
  return db.prepare("SELECT * FROM api_health ORDER BY api_name").all();
}
