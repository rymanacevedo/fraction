import { Database } from "better-sqlite3";

const db = new Database("../database/baseball.db");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    team TEXT NOT NULL,
    position TEXT NOT NULL,
    hitsPerSeason INTEGER,
    rank INTEGER,
    description TEXT
  )
`);

export const getPlayers = () => {
  return db.prepare("SELECT * FROM players").all();
};

export const getPlayerById = (id: number) => {
  return db.prepare("SELECT * FROM players WHERE id = ?").get(id);
};

export const updatePlayer = (
  id: number,
  name: string,
  team: string,
  position: string,
  hitsPerSeason: number,
  rank: number
) => {
  return db
    .prepare(
      "UPDATE players SET name = ?, team = ?, position = ?, hitsPerSeason = ?, rank = ? WHERE id = ?"
    )
    .run(name, team, position, hitsPerSeason, rank, id);
};

export const updatePlayerDescription = (id: number, description: string) => {
  return db
    .prepare("UPDATE players SET description = ? WHERE id = ?")
    .run(description, id);
};

export const insertPlayer = (
  name: string,
  team: string,
  position: string,
  hitsPerSeason: number,
  rank: number
) => {
  return db
    .prepare(
      "INSERT INTO players (name, team, position, hitsPerSeason, rank) VALUES (?, ?, ?, ?, ?)"
    )
    .run(name, team, position, hitsPerSeason, rank);
};

export default db;
