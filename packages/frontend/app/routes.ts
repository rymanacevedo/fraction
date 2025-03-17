import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("dashboard", "routes/dashboard.tsx", [
    route("player/:playerName", "routes/player.tsx"),
    // route("player/:playerName/edit", "routes/player-edit.tsx"),
  ]),
] satisfies RouteConfig;
