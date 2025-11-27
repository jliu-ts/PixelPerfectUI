# Add New Feature

Add a new feature to the application following our conventions.

## Instructions

Before starting, read `CONVENTIONS.md` and `ARCHITECTURE.md`.

The feature name is: $ARGUMENTS

## Checklist

1. **Data Layer** (`lib/data/[feature].ts`)
   - Create type interface
   - Create mock data array
   - Export from `lib/data/index.ts`

2. **Hook** (if needed) (`hooks/use[Feature].ts`)
   - Create custom hook if page has 3+ state values
   - Export from `hooks/index.ts`

3. **API** (if backend needed)
   - Add query keys to `lib/api/hooks.ts`
   - Add storage methods to `server/storage.ts`
   - Add routes to `server/routes.ts`

4. **Page** (`pages/[Feature].tsx`)
   - Use `PageHeader` component
   - Use `SearchInput`, `FilterTabs`, `EmptyState` where applicable
   - Import data from `@/lib/data`
   - Keep under 300 lines

5. **Route** (add to `client/src/main.tsx`)
   - Add route entry

## Example Structure

```typescript
// lib/data/feature.ts
export interface Feature {
  id: number;
  name: string;
}

export const FEATURES: Feature[] = [];

// pages/Feature.tsx
import { PageHeader, SearchInput } from "@/components/common";
import { useFilter } from "@/hooks";
import { FEATURES } from "@/lib/data";

export default function FeaturePage() {
  const filter = useFilter({ items: FEATURES, searchFields: ["name"] });

  return (
    <Layout>
      <PageHeader title="Feature" showBack />
      ...
    </Layout>
  );
}
```
