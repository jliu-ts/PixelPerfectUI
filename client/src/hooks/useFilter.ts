import { useState, useMemo, useCallback } from "react";

interface FilterConfig<T> {
  items: T[];
  searchFields?: (keyof T)[];
  initialCategory?: string;
  categoryField?: keyof T;
}

interface UseFilterReturn<T> {
  // State
  searchQuery: string;
  selectedCategory: string;
  filteredItems: T[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetFilters: () => void;

  // Helpers
  hasResults: boolean;
  resultCount: number;
}

/**
 * Reusable filter hook for lists with search and category filtering
 *
 * @example
 * const { filteredItems, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useFilter({
 *   items: prompts,
 *   searchFields: ["title", "prompt"],
 *   categoryField: "category",
 *   initialCategory: "All"
 * });
 */
export function useFilter<T extends Record<string, unknown>>({
  items,
  searchFields = [],
  initialCategory = "All",
  categoryField,
}: FilterConfig<T>): UseFilterReturn<T> {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        !categoryField ||
        item[categoryField] === selectedCategory;

      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          if (Array.isArray(value)) {
            return value.some(
              (v) =>
                typeof v === "string" &&
                v.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          return false;
        });

      return matchesCategory && matchesSearch;
    });
  }, [items, searchQuery, selectedCategory, searchFields, categoryField]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  return {
    searchQuery,
    selectedCategory,
    filteredItems,
    setSearchQuery,
    setSelectedCategory,
    resetFilters,
    hasResults: filteredItems.length > 0,
    resultCount: filteredItems.length,
  };
}

/**
 * Simple search-only filter (no categories)
 */
export function useSearch<T extends Record<string, unknown>>(
  items: T[],
  searchFields: (keyof T)[]
) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  }, [items, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
  };
}
