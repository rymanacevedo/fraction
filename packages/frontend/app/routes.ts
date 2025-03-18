import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("dashboard", "routes/dashboard.tsx", [
    route("player/:id", "routes/player.tsx"),
    route("player/:id/edit", "routes/player-edit.tsx"),
  ]),
] satisfies RouteConfig;
