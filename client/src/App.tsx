import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from "lucide-react";

// HomeFeed is the landing route, so it stays in the entry chunk — lazy-loading it would
// only add a round trip before first paint. Every other screen is split out.
import HomeFeed from "@/pages/HomeFeed";

const CreationStudio = lazy(() => import("@/pages/CreationStudio"));
const GenerationResult = lazy(() => import("@/pages/GenerationResult"));
const VideoEditor = lazy(() => import("@/pages/VideoEditor"));
const SocialShare = lazy(() => import("@/pages/SocialShare"));
const Profile = lazy(() => import("@/pages/Profile"));
const BattleMode = lazy(() => import("@/pages/BattleMode"));
const ARCamera = lazy(() => import("@/pages/ARCamera"));
const IdeaGenerator = lazy(() => import("@/pages/IdeaGenerator"));
const BrandKit = lazy(() => import("@/pages/BrandKit"));
const ContextSources = lazy(() => import("@/pages/ContextSources"));
const EcommerceConnect = lazy(() => import("@/pages/EcommerceConnect"));
const AvatarStudio = lazy(() => import("@/pages/AvatarStudio"));
const AffiliateDashboard = lazy(() => import("@/pages/AffiliateDashboard"));
const CollabRoom = lazy(() => import("@/pages/CollabRoom"));
const WritersRoom = lazy(() => import("@/pages/WritersRoom"));
const AssetMarketplace = lazy(() => import("@/pages/AssetMarketplace"));
const PricingTiers = lazy(() => import("@/pages/PricingTiers"));
const PitchDeck = lazy(() => import("@/pages/PitchDeck"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const DeepResearch = lazy(() => import("@/pages/DeepResearch"));
const DesignSystem = lazy(() => import("@/pages/DesignSystem"));
const Wallet = lazy(() => import("@/pages/Wallet"));
const ManageFeeds = lazy(() => import("@/pages/ManageFeeds"));
const MediaKit = lazy(() => import("@/pages/MediaKit"));
const LegalGuard = lazy(() => import("@/pages/LegalGuard"));
const Sponsorships = lazy(() => import("@/pages/Sponsorships"));
const PodcastStudio = lazy(() => import("@/pages/PodcastStudio"));
const PodcastPublish = lazy(() => import("@/pages/PodcastPublish"));
const PromptLibrary = lazy(() => import("@/pages/PromptLibrary"));
const NotFound = lazy(() => import("@/pages/not-found"));

function RouteFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center" role="status" aria-live="polite">
      <Loader2 size={24} className="animate-spin text-accent" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Default to Onboarding for demo purposes */}
      <Route path="/welcome" component={Onboarding} />

      <Route path="/" component={HomeFeed} />
      <Route path="/create" component={CreationStudio} />
      <Route path="/library" component={PromptLibrary} />
      <Route path="/podcast/studio" component={PodcastStudio} />
      <Route path="/podcast/publish" component={PodcastPublish} />
      <Route path="/result" component={GenerationResult} />
      <Route path="/editor" component={VideoEditor} />
      <Route path="/share" component={SocialShare} />
      <Route path="/profile" component={Profile} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/battle" component={BattleMode} />
      <Route path="/ar-cam" component={ARCamera} />
      <Route path="/ideas" component={IdeaGenerator} />
      <Route path="/brand" component={BrandKit} />
      <Route path="/context" component={ContextSources} />
      <Route path="/store" component={EcommerceConnect} />
      <Route path="/avatars" component={AvatarStudio} />
      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/collab" component={CollabRoom} />
      <Route path="/writer" component={WritersRoom} />
      <Route path="/marketplace" component={AssetMarketplace} />
      <Route path="/pricing" component={PricingTiers} />
      <Route path="/pitch" component={PitchDeck} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/search" component={SearchPage} />
      <Route path="/research" component={DeepResearch} />
      <Route path="/design" component={DesignSystem} />
      <Route path="/feeds" component={ManageFeeds} />
      <Route path="/media-kit" component={MediaKit} />
      <Route path="/legal" component={LegalGuard} />
      <Route path="/sponsorships" component={Sponsorships} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Suspense fallback={<RouteFallback />}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
