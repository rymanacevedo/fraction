import { Database } from "bun:sqlite";
import { join } from "path";
import { DBPlayer } from "../../shared/models/Player";

// Initialize the database with Bun's SQLite
const dbPath = join(__dirname, "../database/baseball.db");
const db = new Database(dbPath);

// Create the players table
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playerName TEXT NOT NULL,
    rank INTEGER,
    position TEXT,
    games INTEGER,
    atBat INTEGER,
    runs INTEGER,
    hits INTEGER,
    doubles INTEGER,
    thirdBaseman INTEGER,
    homeRun INTEGER,
    rbi INTEGER,
    aWalk INTEGER,
    strikeouts INTEGER,
    stolenBases INTEGER,
    caughtStealing INTEGER,
    avg REAL,
    onBasePercentage REAL,
    sluggingPercentage REAL,
    onBasePlusSlugging REAL
  )
`);

export const getPlayers = (): DBPlayer[] => {
  return db.query("SELECT * FROM players").all() as DBPlayer[];
};

export const getPlayerByName = (playerName: string): DBPlayer | null => {
  return db
    .query("SELECT * FROM players WHERE playerName = $playerName")
    .get({ $playerName: playerName }) as DBPlayer | null;
};

export const getPlayerById = (id: number): DBPlayer | null => {
  return db
    .query("SELECT * FROM players WHERE id = $id")
    .get({ $id: id }) as DBPlayer | null;
};

export const createPlayer = (player: DBPlayer) => {
  const stmt = db.prepare(`
    INSERT INTO players (
      playerName,
      rank,
      position,
      games,
      atBat,
      runs,
      hits,
      doubles,
      thirdBaseman,
      homeRun,
      rbi,
      aWalk,
      strikeouts,
      stolenBases,
      caughtStealing,
      avg,
      onBasePercentage,
      sluggingPercentage,
      onBasePlusSlugging
    ) VALUES (
      $playerName,
      $rank,
      $position,
      $games,
      $atBat,
      $runs,
      $hits,
      $doubles,
      $thirdBaseman,
      $homeRun,
      $rbi,
      $aWalk,
      $strikeouts,
      $stolenBases,
      $caughtStealing,
      $avg,
      $onBasePercentage,
      $sluggingPercentage,
      $onBasePlusSlugging
    )
  `);

  return stmt.run({
    $playerName: player.playerName,
    $rank: player.rank,
    $position: player.position,
    $games: player.games,
    $atBat: player.atBat,
    $runs: player.runs,
    $hits: player.hits,
    $doubles: player.doubles,
    $thirdBaseman: player.thirdBaseman,
    $homeRun: player.homeRun,
    $rbi: player.rbi,
    $aWalk: player.aWalk,
    $strikeouts: player.strikeouts,
    $stolenBases: player.stolenBases,
    $caughtStealing: player.caughtStealing,
    $avg: player.avg,
    $onBasePercentage: player.onBasePercentage,
    $sluggingPercentage: player.sluggingPercentage,
    $onBasePlusSlugging: player.onBasePlusSlugging,
  });
};

export const updatePlayer = (id: number, player: DBPlayer) => {
  const stmt = db.prepare(`
    UPDATE players SET 
      playerName = $playerName,
      rank = $rank,
      position = $position,
      games = $games,
      atBat = $atBat,
      runs = $runs,
      hits = $hits,
      doubles = $doubles,
      thirdBaseman = $thirdBaseman,
      homeRun = $homeRun,
      rbi = $rbi,
      aWalk = $aWalk,
      strikeouts = $strikeouts,
      stolenBases = $stolenBases,
      caughtStealing = $caughtStealing,
      avg = $avg,
      onBasePercentage = $onBasePercentage,
      sluggingPercentage = $sluggingPercentage,
      onBasePlusSlugging = $onBasePlusSlugging
    WHERE id = $id
  `);

  return stmt.run({
    $id: id,
    $playerName: player.playerName,
    $rank: player.rank,
    $position: player.position,
    $games: player.games,
    $atBat: player.atBat,
    $runs: player.runs,
    $hits: player.hits,
    $doubles: player.doubles,
    $thirdBaseman: player.thirdBaseman,
    $homeRun: player.homeRun,
    $rbi: player.rbi,
    $aWalk: player.aWalk,
    $strikeouts: player.strikeouts,
    $stolenBases: player.stolenBases,
    $caughtStealing: player.caughtStealing,
    $avg: player.avg,
    $onBasePercentage: player.onBasePercentage,
    $sluggingPercentage: player.sluggingPercentage,
    $onBasePlusSlugging: player.onBasePlusSlugging,
  });
};

export const deletePlayer = (id: number) => {
  return db.prepare("DELETE FROM players WHERE id = $id").run({ $id: id });
};

export default db;
