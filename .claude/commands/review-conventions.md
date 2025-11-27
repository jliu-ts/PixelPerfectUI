# Review Conventions

Check that recent changes follow our coding conventions.

## Instructions

Read `CONVENTIONS.md` and review the recent changes for:

1. **Imports**
   - ✅ Uses `@/lib/data` for data imports
   - ✅ Uses `@/lib/constants` for config/labels
   - ✅ Uses `@/lib/api` for API operations
   - ❌ Does NOT use deprecated `@/lib/mockData`

2. **State Management**
   - ✅ Uses custom hooks for complex state (3+ values)
   - ✅ Uses React Query for server state
   - ❌ No state sprawl (multiple useState in a row)

3. **Components**
   - ✅ Uses common components (PageHeader, SearchInput, etc.)
   - ✅ Uses `cn()` for conditional classes
   - ❌ No inline data definitions

4. **Data Layer**
   - ✅ Data exported from `lib/data/` modules
   - ✅ Types exported alongside data
   - ❌ No hardcoded arrays in components

5. **File Organization**
   - ✅ Components in proper directories
   - ✅ Hooks exported from index
   - ✅ Pages under 300 lines

Report any violations found.
