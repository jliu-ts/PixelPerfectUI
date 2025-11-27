import { useState, useEffect, useCallback } from "react";
import { VIDEO_MODELS, IMAGE_MODELS } from "@/lib/data";

export type CreationMode = "text" | "image" | "video" | "audio";
export type InputMode = "prompt" | "rss";

interface LocationState {
  mode?: CreationMode;
  style?: string;
  prompt?: string;
  model?: string;
}

interface CreationStudioState {
  activeTab: CreationMode;
  selectedStyle: string;
  selectedRatio: string;
  prompt: string;
  selectedModel: string;
  selectedAvatar: string | null;
  selectedVoice: string | null;
  isLibraryOpen: boolean;
  inputMode: InputMode;
  selectedPromptTitle: string | null;
}

interface CreationStudioActions {
  setActiveTab: (tab: CreationMode) => void;
  setSelectedStyle: (style: string) => void;
  setSelectedRatio: (ratio: string) => void;
  setPrompt: (prompt: string) => void;
  setSelectedModel: (model: string) => void;
  setSelectedAvatar: (avatar: string | null) => void;
  setSelectedVoice: (voice: string | null) => void;
  setIsLibraryOpen: (open: boolean) => void;
  setInputMode: (mode: InputMode) => void;
  setSelectedPromptTitle: (title: string | null) => void;
  clearSelectedPrompt: () => void;
  toggleInputMode: () => void;
}

interface CreationStudioDerived {
  currentModels: string[];
  isAvatarMode: boolean;
  getPreviewDimensions: () => string;
}

type UseCreationStudioReturn = CreationStudioState & CreationStudioActions & CreationStudioDerived;

/**
 * Custom hook to manage Creation Studio state
 * Consolidates 11 useState calls into a single, organized hook
 *
 * @example
 * const studio = useCreationStudio();
 * studio.setActiveTab("video");
 * studio.setPrompt("A beautiful sunset...");
 */
export function useCreationStudio(): UseCreationStudioReturn {
  // Get location state from browser history
  const locationState: LocationState = typeof window !== "undefined"
    ? window.history.state?.usr || {}
    : {};

  // Core state
  const [activeTab, setActiveTab] = useState<CreationMode>(
    locationState.mode || "image"
  );
  const [selectedStyle, setSelectedStyle] = useState(
    locationState.style || "Cinematic"
  );
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const [prompt, setPrompt] = useState(locationState.prompt || "");
  const [selectedModel, setSelectedModel] = useState(
    locationState.model || (activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0])
  );
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("prompt");
  const [selectedPromptTitle, setSelectedPromptTitle] = useState<string | null>(null);

  // Update default model when tab changes (if not manually set from idea)
  useEffect(() => {
    if (!locationState.model) {
      setSelectedModel(activeTab === "video" ? VIDEO_MODELS[0] : IMAGE_MODELS[0]);
    }
  }, [activeTab, locationState.model]);

  // Handle incoming state updates (like from Library navigation)
  useEffect(() => {
    if (locationState.mode) setActiveTab(locationState.mode);
    if (locationState.prompt) setPrompt(locationState.prompt);
    if (locationState.style) setSelectedStyle(locationState.style);
  }, [locationState.mode, locationState.prompt, locationState.style]);

  // Derived values
  const currentModels = activeTab === "video" ? VIDEO_MODELS : IMAGE_MODELS;
  const isAvatarMode = activeTab === "video" && selectedModel.includes("Avatar");

  // Helper for dynamic preview sizing
  const getPreviewDimensions = useCallback(() => {
    switch (selectedRatio) {
      case "16:9":
        return "aspect-video w-full max-w-3xl";
      case "9:16":
        return "aspect-[9/16] max-w-[300px] w-full";
      case "4:5":
        return "aspect-[4/5] max-w-[360px] w-full";
      case "1:1":
      default:
        return "aspect-square max-w-[400px] w-full";
    }
  }, [selectedRatio]);

  // Action helpers
  const clearSelectedPrompt = useCallback(() => {
    setSelectedPromptTitle(null);
  }, []);

  const toggleInputMode = useCallback(() => {
    setInputMode((prev) => (prev === "prompt" ? "rss" : "prompt"));
  }, []);

  return {
    // State
    activeTab,
    selectedStyle,
    selectedRatio,
    prompt,
    selectedModel,
    selectedAvatar,
    selectedVoice,
    isLibraryOpen,
    inputMode,
    selectedPromptTitle,

    // Actions
    setActiveTab,
    setSelectedStyle,
    setSelectedRatio,
    setPrompt,
    setSelectedModel,
    setSelectedAvatar,
    setSelectedVoice,
    setIsLibraryOpen,
    setInputMode,
    setSelectedPromptTitle,
    clearSelectedPrompt,
    toggleInputMode,

    // Derived
    currentModels,
    isAvatarMode,
    getPreviewDimensions,
  };
}
