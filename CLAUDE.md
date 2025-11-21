# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CertMatch is a Korean certification platform connecting businesses with certification experts. It consists of a NestJS backend API, a Next.js web frontend (currently missing), and a React Native mobile app.

## Architecture

### Monorepo Structure
- **Backend**: `Server/` - NestJS API server with Prisma ORM and PostgreSQL
- **Mobile**: `mobile_front/` - React Native app built with Expo
- **Web**: `frontend/web/` - Next.js web application (currently missing/not implemented)
- **Root**: Workspace configuration for managing all applications

### Backend (Server/)
- **Framework**: NestJS 10.x with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with local strategy
- **Validation**: Zod schemas and class-validator
- **Documentation**: Swagger/OpenAPI at `/api/docs`
- **Port**: 3001 (with automatic port conflict detection)

#### Backend Module Structure
```
Server/src/
├── common/           # Shared utilities, DTOs, pipes, guards
├── modules/          # Feature modules
│   ├── auth/         # Authentication (JWT, local strategy)
│   ├── users/        # User management
│   ├── experts/      # Expert profiles
│   └── companies/    # Company profiles
├── prisma/           # Database configuration
└── main.ts           # Application entry point
```

### Mobile App (mobile_front/)
- **Framework**: React Native with Expo CLI
- **Navigation**: React Navigation (bottom tabs, native stack)
- **Storage**: AsyncStorage for token persistence
- **State**: Redux Toolkit for complex state management (auth, matching, chat, profile)
- **Platform**: iOS, Android, and Web support
- **UI Framework**: Tailwind CSS (nativewind) + styled-components
- **API Integration**: Axios with interceptors for JWT token management
- **Real-time Features**: WebSocket/Firebase Realtime DB for chat (MVP: polling), Expo Push Notifications
- **Testing**: Jest + React Native Testing Library (≥80% coverage for utils/hooks)
- **Build & Deploy**: EAS Build for iOS/Android, GitHub Actions CI/CD
- **Monitoring**: Sentry + Firebase Crashlytics

#### Development Scope (V2 Documentation)
Based on `doc/V2/` requirements:
- **Target Users**: Companies (CTOs, security managers), certification consultants, education institutions, aspiring auditors
- **Core Features**: User registration/login, certification matching (ISMS, ISMS-P, ISO 27001), consultant profiles, real-time chat, government funding integration, review system
- **Technical Goals**: ≤1.5s screen loading, ≤0.5% crash rate, offline support for basic features
- **Screen Count**: ~130 screens across 13 modules (see `doc/V2/8.menulist.txt`)
- **Launch Timeline**: MVP in 3 months, Phase 1 (core features) → Phase 2 (advanced features like WebSocket, SaaS integration)

## Development Commands

### Root Level (Main Directory)
```bash
# Install all dependencies for all applications
npm run install:all

# Start all applications concurrently
npm run dev

# Start individual applications
npm run dev:backend    # Starts backend on port 3001
npm run dev:web        # Starts web frontend (not implemented)
npm run dev:mobile     # Starts mobile with Expo tunnel

# Build all applications
npm run build

# Test all applications
npm run test

# Lint all applications
npm run lint
```

### Backend (Server/)
```bash
cd Server

# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugging
npm run start:prod     # Start production build

# Building
npm run build          # Build TypeScript to dist/

# Database Operations
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:migrate     # Run database migrations
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database with test data

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Run tests with coverage

# Code Quality
npm run lint           # ESLint check and fix
npm run format         # Prettier formatting
```

### Mobile (mobile_front/)
```bash
cd mobile_front

# Development
npm start              # Start Expo development server with tunnel
npm run android        # Start on Android emulator
npm run ios            # Start on iOS simulator
npm run web            # Start in web browser

# Note: All commands use --tunnel flag for better device connectivity
```

## Key Configuration Files

### Backend Environment (.env)
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT token signing secret
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

### Backend Database Setup
1. Copy `.env.example` to `.env` and configure
2. Run `npm run db:generate` to generate Prisma client
3. Run `npm run db:migrate` to apply migrations
4. Optionally run `npm run db:seed` for test data

## API Endpoints

### Base URL: `http://localhost:3001/api/v1`

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh

### Users
- `GET /users` - List users
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Experts
- `POST /experts` - Create expert profile
- `GET /experts` - List experts
- `GET /experts/search` - Search experts
- `GET /experts/:id` - Get expert details
- `PATCH /experts/:id` - Update expert profile

### Companies
- `POST /companies` - Create company profile
- `GET /companies` - List companies
- `GET /companies/search` - Search companies
- `GET /companies/:id` - Get company details
- `PATCH /companies/:id` - Update company profile

## Documentation

- **API Documentation**: http://localhost:3001/api/docs (Swagger)
- **Database Admin**: Run `npm run db:studio` from Server/ directory
- **Business Requirements**: See `doc/` directory for Korean business documents

## Development Workflow

1. **Starting Development**: Run `npm run install:all` then `npm run dev` from root
2. **Backend Changes**: Server auto-restarts with `npm run start:dev`
3. **Mobile Changes**: Expo provides hot reload
4. **Database Changes**: Modify Prisma schema, then run `npm run db:push` or `npm run db:migrate`
5. **Testing**: Run appropriate test commands from each service directory
6. **Code Quality**: Use `npm run lint` and `npm run format` before commits

## Important Notes

- Backend includes CORS configuration for Expo development URLs
- Server checks for port availability before starting
- Mobile app currently uses mock data - integrate with backend API
- Web frontend is not yet implemented
- Project uses Korean language in documentation and UI
- Database uses Prisma with PostgreSQL
- All services are configured for development with hot reload