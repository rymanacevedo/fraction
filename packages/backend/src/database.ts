
import { join } from "path";
import { Player } from "../../shared/models/Player";
import { Database } from "sqlite3";

// Initialize the database
const dbPath = join(__dirname, "../database/baseball.db");
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    team TEXT,
    position TEXT,
    hitsPerSeason INTEGER,
    rank INTEGER,
    games INTEGER,
    atBat INTEGER,
    runs INTEGER,
    hits INTEGER,
    doubles INTEGER,
    triples INTEGER,
    homeRuns INTEGER,
    rbi INTEGER,
    walks INTEGER,
    strikeouts INTEGER,
    stolenBases INTEGER,
    caughtStealing INTEGER,
    battingAvg REAL,
    onBasePercentage REAL,
    sluggingPercentage REAL,
    ops REAL,
    description TEXT
  )
`);

export const getPlayers = (): Player[] => {
  return db.prepare("SELECT * FROM players").all();
};

export const getPlayerByName = (name: string): Player => {
  return db.prepare("SELECT * FROM players WHERE name = ?").get(name);
};

export const getPlayerById = (id: number): Player => {
  return db.prepare("SELECT * FROM players WHERE id = ?").get(id);
};

export const createPlayer = (player: Player) => {
  const stmt = db.prepare(`
    INSERT INTO players (
      name, team, position, hitsPerSeason, rank, games, atBat, runs, hits,
      doubles, triples, homeRuns, rbi, walks, strikeouts, stolenBases,
      caughtStealing, battingAvg, onBasePercentage, sluggingPercentage, ops
    ) VALUES (
      @name, @team, @position, @hitsPerSeason, @rank, @games, @atBat, @runs, @hits,
      @doubles, @triples, @homeRuns, @rbi, @walks, @strikeouts, @stolenBases,
      @caughtStealing, @battingAvg, @onBasePercentage, @sluggingPercentage, @ops
    )
  `);

  const result = stmt.run(player);
  return result.lastInsertRowid;
};

export const updatePlayer = (id: number, player: Player) => {
  const stmt = db.prepare(`
    UPDATE players SET 
      name = @name, 
      position = @position, 
      hitsPerSeason = @hitsPerSeason, 
      rank = @rank,
      games = @games,
      atBat = @atBat,
      runs = @runs,
      hits = @hits,
      doubles = @doubles,
      triples = @triples,
      homeRuns = @homeRuns,
      rbi = @rbi,
      walks = @walks,
      strikeouts = @strikeouts,
      stolenBases = @stolenBases,
      caughtStealing = @caughtStealing,
      battingAvg = @battingAvg,
      onBasePercentage = @onBasePercentage,
      sluggingPercentage = @sluggingPercentage,
      ops = @ops
    WHERE id = ?
  `);

  return stmt.run({ ...player, id }, id);
};

export const updatePlayerDescription = (id: number, description: string) => {
  return db
    .prepare("UPDATE players SET description = ? WHERE id = ?")
    .run(description, id);
};

export const deletePlayer = (id: number) => {
  return db.prepare("DELETE FROM players WHERE id = ?").run(id);
};

export default db;
