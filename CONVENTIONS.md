# Coding Conventions - Trending Society

This document defines the coding patterns and conventions for this codebase. **All AI agents and developers must follow these patterns** for consistency.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Data Layer](#data-layer)
3. [API Layer](#api-layer)
4. [Hooks](#hooks)
5. [Components](#components)
6. [Pages](#pages)
7. [Styling](#styling)
8. [TypeScript](#typescript)
9. [State Management](#state-management)
10. [Error Handling](#error-handling)

---

## Project Structure

```
client/src/
├── components/
│   ├── common/          # Reusable UI components (SearchInput, FilterTabs, etc.)
│   ├── layout/          # Layout components (Sidebar, BottomTabs)
│   ├── ui/              # Shadcn UI primitives (Button, Card, Dialog, etc.)
│   └── [Feature].tsx    # Feature-specific components
├── hooks/
│   ├── index.ts         # Centralized hook exports
│   ├── use[Feature].ts  # Feature-specific hooks
│   └── useFilter.ts     # Reusable utility hooks
├── lib/
│   ├── api/             # API client and React Query hooks
│   ├── constants/       # Static values (URLs, config, labels)
│   ├── data/            # Mock data organized by feature
│   └── utils.ts         # Utility functions
├── pages/               # Page components (one per route)
└── main.tsx             # App entry point

server/
├── routes.ts            # API route definitions
├── storage.ts           # Data access layer
└── app.ts               # Express setup
```

---

## Data Layer

### DO: Import from organized modules

```typescript
// ✅ CORRECT: Import from centralized data layer
import { CREATION_STYLES, AVATARS } from "@/lib/data";
import { PROMPT_PLATFORMS } from "@/lib/constants";
```

### DON'T: Import from deprecated mockData.ts

```typescript
// ❌ WRONG: mockData.ts is deprecated
import { CREATION_STYLES } from "@/lib/mockData";
```

### DON'T: Define inline data in components

```typescript
// ❌ WRONG: Hardcoded data in component
const PLATFORMS = [
  { value: "Instagram", label: "Instagram" },
  { value: "TikTok", label: "TikTok" },
];

// ✅ CORRECT: Import from constants
import { PROMPT_PLATFORMS } from "@/lib/constants";
```

### Data File Naming

| Type | Location | Example |
|------|----------|---------|
| Static lists | `lib/data/[feature].ts` | `lib/data/prompts.ts` |
| Configuration | `lib/constants/config.ts` | `BREAKPOINTS`, `API_CONFIG` |
| URLs | `lib/constants/urls.ts` | `STYLE_IMAGES`, `getAvatarUrl()` |
| Labels | `lib/constants/labels.ts` | `PLATFORMS`, `STATUS` |

---

## API Layer

### Making API Calls

Always use the API client, never raw `fetch`:

```typescript
// ✅ CORRECT: Use API client
import { apiClient } from "@/lib/api";

const prompts = await apiClient.get<Prompt[]>("/prompts");
await apiClient.post("/prompts", { title, prompt });
```

### React Query Hooks

Use the provided hook factories:

```typescript
// ✅ CORRECT: Use query hooks
import { useApiQuery, useApiMutation, queryKeys } from "@/lib/api";

// GET request
const { data, isLoading } = useApiQuery<Prompt[]>(
  "/prompts",
  queryKeys.prompts.all()
);

// POST request with cache invalidation
const mutation = useApiMutation<Prompt, CreatePromptInput>(
  "/prompts",
  [queryKeys.prompts.all()]
);
```

### Query Keys

Always use the `queryKeys` factory for consistent cache management:

```typescript
// ✅ CORRECT: Use query key factory
queryKeys.prompts.all()           // ["prompts"]
queryKeys.prompts.detail(1)       // ["prompts", "detail", 1]
queryKeys.feed.comments(postId)   // ["feed", "comments", postId]
```

---

## Hooks

### Custom Hook Pattern

Complex page state should be consolidated into a single hook:

```typescript
// ✅ CORRECT: Single hook for page state
function CreationStudio() {
  const studio = useCreationStudio();

  return (
    <div>
      <input value={studio.prompt} onChange={e => studio.setPrompt(e.target.value)} />
      <select value={studio.activeTab} onChange={e => studio.setActiveTab(e.target.value)}>
        ...
      </select>
    </div>
  );
}
```

### DON'T: Multiple useState calls

```typescript
// ❌ WRONG: State sprawl
function CreationStudio() {
  const [activeTab, setActiveTab] = useState("image");
  const [selectedStyle, setSelectedStyle] = useState("Cinematic");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  // ... 5 more useState calls
}
```

### Available Utility Hooks

| Hook | Purpose | Example |
|------|---------|---------|
| `useFilter` | List filtering with search + categories | `useFilter({ items, searchFields: ["title"] })` |
| `useSearch` | Simple search filtering | `useSearch(items, ["title", "description"])` |
| `useModal` | Modal open/close state | `const modal = useModal()` |
| `useModalWithData` | Modal with associated data | `const editModal = useModalWithData<Prompt>()` |

---

## Components

### Common Components

Always use common components for consistency:

```typescript
// ✅ CORRECT: Use common components
import { SearchInput, FilterTabs, EmptyState, PageHeader } from "@/components/common";

<PageHeader title="Prompts" showBack />
<SearchInput value={query} onChange={setQuery} />
<FilterTabs tabs={categories} activeTab={selected} onChange={setSelected} />
{!hasResults && <EmptyState variant="search" title="No results" />}
```

### Component File Naming

- PascalCase for component files: `SearchInput.tsx`
- One component per file
- Export from index: `components/common/index.ts`

### Props Interface Pattern

```typescript
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  // ...
}
```

---

## Pages

### Page Structure

```typescript
export default function FeaturePage() {
  // 1. Hooks (state, router, queries)
  const [, setLocation] = useLocation();
  const { data, isLoading } = useApiQuery(...);
  const filter = useFilter({ items: data });

  // 2. Handlers
  const handleSubmit = () => { ... };

  // 3. Render
  return (
    <Layout>
      <PageHeader title="Feature" />
      <main>
        {/* Content */}
      </main>
    </Layout>
  );
}
```

### Page Guidelines

- Keep pages under 300 lines
- Extract complex state to custom hooks
- Use common components for headers, filters, empty states
- Import data from `@/lib/data`, not inline definitions

---

## Styling

### Tailwind Classes

Use the `cn()` utility for conditional classes:

```typescript
import { cn } from "@/lib/utils";

<button className={cn(
  "px-4 py-2 rounded-lg transition-colors",
  isActive ? "bg-accent text-black" : "bg-white/5 text-gray-400"
)}>
```

### Design Tokens

- Background: `bg-background`, `bg-[#1E1E1E]`
- Borders: `border-white/5`, `border-white/10`
- Text: `text-foreground`, `text-muted-foreground`
- Accent: `bg-accent`, `text-accent`

### Responsive Breakpoints

```typescript
import { BREAKPOINTS } from "@/lib/constants";

// Mobile: < 768px
// Tablet: 768px - 1024px
// Desktop: > 1024px
```

---

## TypeScript

### Type Exports

Export types alongside data:

```typescript
// lib/data/prompts.ts
export interface Prompt {
  id: number;
  title: string;
  prompt: string;
  category: string;
}

export const MOCK_PROMPTS: Prompt[] = [...];
```

### Import Types

```typescript
// ✅ CORRECT: Import type from data layer
import type { Prompt } from "@/lib/data";

// Or from hooks if hook-specific
import type { Prompt } from "@/hooks";
```

---

## State Management

### Local State

Use hooks for component state:

```typescript
const filter = useFilter({ items, searchFields: ["title"] });
const modal = useModal();
```

### Server State

Use React Query via our hooks:

```typescript
const { data } = useApiQuery<Prompt[]>("/prompts", ["prompts"]);
const mutation = useApiMutation<Prompt, Input>("/prompts", [["prompts"]]);
```

### Global State

Currently using hook singletons (e.g., `usePrompts`). For new features, prefer React Query for server state.

---

## Error Handling

### API Errors

```typescript
import { ApiError } from "@/lib/api";

try {
  await apiClient.post("/prompts", data);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      // Handle unauthorized
    }
    toast({ title: "Error", description: error.message });
  }
}
```

### Form Validation

Use Zod schemas (when connecting to backend):

```typescript
import { z } from "zod";

const promptSchema = z.object({
  title: z.string().min(1).max(100),
  prompt: z.string().min(1).max(4000),
});
```

---

## Quick Reference

### Import Paths

```typescript
import { ... } from "@/lib/data";       // Data/mock data
import { ... } from "@/lib/constants";  // Config, URLs, labels
import { ... } from "@/lib/api";        // API client, hooks, keys
import { ... } from "@/hooks";          // All custom hooks
import { ... } from "@/components/common"; // Reusable components
import { ... } from "@/components/ui";  // Shadcn primitives
```

### New Feature Checklist

1. [ ] Create data file in `lib/data/[feature].ts`
2. [ ] Export from `lib/data/index.ts`
3. [ ] Create custom hook if page has 3+ state values
4. [ ] Use common components (PageHeader, SearchInput, etc.)
5. [ ] Add query keys to `lib/api/hooks.ts` if using API
6. [ ] Keep page under 300 lines

---

*Last updated: 2024*
