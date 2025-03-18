Here's a README.md for your monorepo:


# Fraction - Baseball Stats Monorepo

A monorepo containing a full-stack application for baseball statistics management and analysis.

## Project Structure


fraction/
├── packages/
│   ├── backend/        # Node.js backend service
│   ├── frontend/       # React frontend application
│   └── shared/         # Shared types and utilities


## Packages

### Backend (`packages/backend`)
- Node.js backend service
- SQLite database for baseball statistics
- AI services integration
- Database management and queries

### Frontend (`packages/frontend`)
- React application using React Router v7
- Vite for build tooling
- Netlify deployment configuration
- Custom server implementation

### Shared (`packages/shared`)
- Common TypeScript models
- Shared utilities
- Data transformation helpers

## Getting Started

1. **Install Dependencies**
```bash
# Root directory
bun install
```

2. **Start Backend Server**
```bash
cd packages/backend
bun run dev
```

3. **Start Frontend Development Server**
```bash
cd packages/frontend
bun run dev
```

## Development

The project uses:
- TypeScript for type safety
- Biome for code formatting and linting
- Bun as the package manager and runtime
- React Router for frontend routing
- SQLite for data storage

## Project Configuration

### Backend
- Database configuration in `packages/backend/src/database.ts`
- AI services in `packages/backend/src/services/ai.ts`
- Main server entry point in `packages/backend/src/index.ts`

### Frontend
- Route configuration in `packages/frontend/app/routes.ts`
- Vite configuration in `packages/frontend/vite.config.ts`
- React Router config in `packages/frontend/react-router.config.ts`

### Shared
- Player model definitions in `packages/shared/models/Player.ts`
- Data transformation utilities in `packages/shared/utils/TransformPlayer.ts`

## Scripts

```json
{
  "dev": "Start development servers",
  "build": "Build all packages",
  "lint": "Run Biome linting",
  "format": "Run Biome formatting",
  "test": "Run tests"
}
```

## Deployment

The frontend is configured for Netlify deployment with:
- Build configuration in `packages/frontend/netlify.toml`
- Build preparation script in `packages/frontend/netlify/prepare.js`
