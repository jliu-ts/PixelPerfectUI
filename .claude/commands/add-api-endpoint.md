# Add API Endpoint

Add a new API endpoint following our patterns.

## Instructions

The endpoint is: $ARGUMENTS

## Steps

1. **Schema** (`shared/schema.ts`)
   - Add Drizzle table definition
   - Create Zod validation schema
   - Export types

2. **Storage** (`server/storage.ts`)
   - Add interface methods
   - Implement in MemStorage (for now)

3. **Routes** (`server/routes.ts`)
   - Add route handlers
   - Use storage methods
   - Return proper status codes

4. **Frontend** (`lib/api/hooks.ts`)
   - Add query keys
   - Create custom hook if needed

## Example

```typescript
// shared/schema.ts
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: varchar("user_id").references(() => users.id),
});

export const insertItemSchema = createInsertSchema(items);
export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;

// server/storage.ts
interface IStorage {
  getItems(userId: string): Promise<Item[]>;
  createItem(item: InsertItem): Promise<Item>;
}

// server/routes.ts
app.get("/api/items", async (req, res) => {
  const items = await storage.getItems(req.user.id);
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const item = await storage.createItem(req.body);
  res.status(201).json(item);
});

// lib/api/hooks.ts
export const queryKeys = {
  items: {
    all: () => ["items"],
    detail: (id: number) => ["items", id],
  },
};
```
