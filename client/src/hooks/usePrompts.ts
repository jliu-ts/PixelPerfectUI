import { useState, useEffect } from 'react';
import { MOCK_PROMPTS } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

// Singleton state to maintain persistence across component unmounts/remounts in mockup mode
let globalPrompts = [...MOCK_PROMPTS];
let listeners: (() => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(l => l());
};

export interface Prompt {
  id: number;
  title: string;
  prompt: string;
  category: string;
  platform: string;
  tags: string[];
  lastUsed: string;
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(globalPrompts);
  const { toast } = useToast();

  useEffect(() => {
    const listener = () => setPrompts([...globalPrompts]);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const addPrompt = (prompt: Omit<Prompt, 'id' | 'lastUsed'>) => {
    const newPrompt = {
      ...prompt,
      id: Math.max(...globalPrompts.map(p => p.id), 0) + 1,
      lastUsed: "Just now"
    };
    globalPrompts = [newPrompt, ...globalPrompts];
    notifyListeners();
    toast({ title: "Prompt created", description: "New prompt added to library." });
  };

  const updatePrompt = (updatedPrompt: Prompt) => {
    globalPrompts = globalPrompts.map(p => p.id === updatedPrompt.id ? updatedPrompt : p);
    notifyListeners();
    toast({ title: "Prompt updated", description: "Changes saved successfully." });
  };

  const deletePrompt = (id: number) => {
    globalPrompts = globalPrompts.filter(p => p.id !== id);
    notifyListeners();
    toast({ title: "Prompt deleted", description: "The prompt has been removed from your library." });
  };

  const getPromptsByCategory = () => {
    return prompts.reduce((acc, prompt) => {
      const existingCategory = acc.find(c => c.category === prompt.category);
      if (existingCategory) {
        existingCategory.items.push(prompt);
      } else {
        acc.push({ category: prompt.category, items: [prompt] });
      }
      return acc;
    }, [] as { category: string, items: Prompt[] }[]);
  };

  return {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    getPromptsByCategory
  };
}
