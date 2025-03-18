import { Player } from "../models/Player";

// we use this function to transform the api response into a database structure
export function transformPlayer(player: Player, rank: number) {
  return {
    playerName: player["Player name"],
    position: player.position,
    rank, // we add the rank to the database
    games: player.Games,
    atBat: player["At-bat"],
    runs: player.Runs,
    hits: player.Hits,
    doubles: player["Double (2B)"],
    thirdBaseman: player["third baseman"],
    homeRun: player["home run"],
    rbi: player["run batted in"],
    aWalk: player["a walk"],
    strikeouts: player.Strikeouts,
    stolenBases: player["stolen base"],
    caughtStealing: player["Caught stealing"],
    avg: player.AVG,
    onBasePercentage: player["On-base Percentage"],
    sluggingPercentage: player["Slugging Percentage"],
    onBasePlusSlugging: player["On-base Plus Slugging"],
  };
}
