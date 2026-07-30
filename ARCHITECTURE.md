# Architecture Overview - Trending Society

## System Overview

Trending Society is "The Operating System for the AI Creator Economy." This document provides a technical overview for developers and AI agents.

**Current state: the shipped app is client-only.** Every screen reads from `client/src/lib/data/`. `server/` builds and serves the static client and nothing else — `server/routes.ts` registers no API routes. The backend rows below are installed scaffolding, not running infrastructure; sections marked *planned* describe the intended shape, not what exists.

## Tech Stack

| Layer | Technology | Purpose | Status |
|-------|------------|---------|--------|
| **Frontend** | React 19 + TypeScript | UI components and state | Shipped |
| **Routing** | Wouter | Lightweight client-side routing | Shipped |
| **Styling** | TailwindCSS 4 | Utility-first CSS | Shipped |
| **Components** | Radix UI + Shadcn | Accessible UI primitives | Shipped |
| **State** | Custom Hooks | Local and page state | Shipped |
| **Async state** | React Query | Server state | Wired, no endpoints yet |
| **Backend** | Express.js | Serves static client | No API routes |
| **Database** | PostgreSQL (Neon) | Persistent storage | Planned, not connected |
| **ORM** | Drizzle | Type-safe database queries | `users` schema only |
| **Validation** | Zod | Runtime type checking | Planned |

---

## Directory Structure

```
/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── common/     # Reusable (SearchInput, FilterTabs)
│   │   │   ├── layout/     # Layout (Sidebar, BottomTabs)
│   │   │   └── ui/         # Shadcn primitives
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api/        # API client + React Query hooks
│   │   │   ├── constants/  # Static config, URLs, labels
│   │   │   ├── data/       # Mock data by feature
│   │   │   └── utils.ts    # Utilities
│   │   ├── pages/          # Route components
│   │   └── main.tsx        # App entry
│   └── index.html
├── server/                 # Express backend
│   ├── app.ts              # Express setup, middleware
│   ├── routes.ts           # API route definitions
│   └── storage.ts          # Data access layer
├── shared/                 # Shared code
│   └── schema.ts           # Database schema + Zod types
├── CONVENTIONS.md          # Coding patterns (READ THIS)
├── ARCHITECTURE.md         # This file
└── .cursorrules            # AI agent instructions
```

---

## Data Flow (planned)

Today a page imports fixtures from `lib/data/` directly. The client half of the diagram below exists; nothing past `API Client` is wired.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│  API Client │────▶│   Express   │
│  Component  │     │  (apiClient)│     │   Server    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Custom    │     │ React Query │     │   Storage   │
│    Hook     │     │   Cache     │     │   Layer     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  PostgreSQL │
                                        │   (Neon)    │
                                        └─────────────┘
```

---

## Key Modules

### Frontend

#### API Client (`client/src/lib/api/client.ts`)

Centralized HTTP client with:
- Automatic JSON serialization
- Error handling with `ApiError` class
- Timeout support
- Session cookie handling

```typescript
import { apiClient } from "@/lib/api";

// Usage
const prompts = await apiClient.get<Prompt[]>("/prompts");
await apiClient.post("/prompts", { title, prompt });
```

#### React Query Hooks (`client/src/lib/api/hooks.ts`)

Pre-built hooks for common patterns:

```typescript
import { useApiQuery, useApiMutation, queryKeys } from "@/lib/api";

// Read
const { data } = useApiQuery<Prompt[]>("/prompts", queryKeys.prompts.all());

// Create/Update/Delete
const mutation = useApiMutation("/prompts", [queryKeys.prompts.all()]);
```

#### Custom Hooks (`client/src/hooks/`)

| Hook | Purpose |
|------|---------|
| `useCreationStudio` | Creation Studio page state (11 values consolidated) |
| `useFilter` | List filtering with search + categories |
| `useSearch` | Simple text search |
| `useModal` | Modal open/close state |
| `usePrompts` | Prompt CRUD operations |

#### Common Components (`client/src/components/common/`)

| Component | Purpose |
|-----------|---------|
| `PageHeader` | Consistent page headers with back button |
| `SearchInput` | Styled search input with clear button |
| `FilterTabs` | Category filter tabs (pills/underline/buttons) |
| `EmptyState` | No results messaging |

### Backend

#### Routes (`server/routes.ts`)

API endpoints prefixed with `/api`:

```typescript
// Example structure
app.get("/api/prompts", ...)
app.post("/api/prompts", ...)
app.put("/api/prompts/:id", ...)
app.delete("/api/prompts/:id", ...)
```

#### Storage (`server/storage.ts`)

Data access layer with interface abstraction:

```typescript
interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Add more methods as needed
}
```

Currently uses `MemStorage` (in-memory). Will migrate to `PostgresStorage`.

#### Schema (`shared/schema.ts`)

Drizzle ORM + Zod schemas:

```typescript
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
```

---

## Feature Modules

### Current Features (UI Complete, Backend Pending)

| Feature | Pages | Status |
|---------|-------|--------|
| **Home Feed** | HomeFeed.tsx | Mock data |
| **Creation Studio** | CreationStudio.tsx | Mock data |
| **Prompt Library** | PromptLibrary.tsx | Local state |
| **Profile** | Profile.tsx | Mock data |
| **Marketplace** | AssetMarketplace.tsx | Mock data |
| **Sponsorships** | Sponsorships.tsx | Mock data |

### Implementing a New Feature

1. **Data**: Add to `lib/data/[feature].ts`
2. **Types**: Export interface with data
3. **API**: Add endpoint in `server/routes.ts`
4. **Storage**: Add methods to `IStorage` interface
5. **Hook**: Create `use[Feature].ts` if complex state
6. **Page**: Create page component using hooks + common components

---

## State Management Strategy

### Local UI State
Use `useState` for simple component state, or custom hooks for complex state:

```typescript
// Simple
const [isOpen, setIsOpen] = useState(false);

// Complex - use custom hook
const studio = useCreationStudio();
```

### Server State
Always use React Query via our hooks:

```typescript
const { data, isLoading, error } = useApiQuery<Prompt[]>(
  "/prompts",
  queryKeys.prompts.all()
);
```

### Form State
Use React Hook Form (when needed):

```typescript
const form = useForm<CreatePromptInput>({
  resolver: zodResolver(createPromptSchema),
});
```

---

## API Design

### Request/Response Pattern

```typescript
// Request
POST /api/prompts
Content-Type: application/json
{
  "title": "My Prompt",
  "prompt": "Create a...",
  "category": "Product"
}

// Response
201 Created
{
  "id": 1,
  "title": "My Prompt",
  "prompt": "Create a...",
  "category": "Product",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Error Response

```typescript
{
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```

---

## Adding Backend Features

### Step-by-Step

1. **Schema** (`shared/schema.ts`):
```typescript
export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  userId: varchar("user_id").references(() => users.id),
});
```

2. **Storage** (`server/storage.ts`):
```typescript
interface IStorage {
  getPrompts(userId: string): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
}
```

3. **Routes** (`server/routes.ts`):
```typescript
app.get("/api/prompts", async (req, res) => {
  const prompts = await storage.getPrompts(req.user.id);
  res.json(prompts);
});
```

4. **Frontend** (update hook):
```typescript
// hooks/usePrompts.ts
export function usePrompts() {
  return useApiQuery<Prompt[]>("/prompts", queryKeys.prompts.all());
}
```

---

## Performance Considerations

- **Code Splitting**: Vite handles automatic chunking
- **Query Caching**: React Query caches API responses
- **Image Optimization**: Use centralized URL constants for CDN migration
- **Bundle Size**: Prefer lightweight libraries (Wouter over React Router)

---

## Security Notes (planned)

No authentication or authorization exists yet. `express-session` and `passport` are installed but not configured, and there is no login flow, session store, or protected route. Intended shape:

- Session-based authentication via `express-session`
- CSRF protection
- Input validation with Zod on both client and server
- Password hashing with bcrypt

---

## Development Workflow

```bash
# Start development server (frontend + backend)
npm run dev

# Frontend only
npm run dev:client

# Type checking
npm run check

# Database migrations
npm run db:push
```

---

## Environment Variables

The app currently reads none. `PORT` is optional and defaults to 5000. The variables below apply once the backend exists.

```env
DATABASE_URL=postgresql://...    # Neon PostgreSQL connection
SESSION_SECRET=...               # Express session secret
```

---

*See CONVENTIONS.md for coding patterns and best practices.*
