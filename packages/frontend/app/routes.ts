import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/dashboard.tsx", [
    route("player/:id", "routes/player.tsx", { id: "playerId" }, [
      route("edit", "routes/player-edit.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
