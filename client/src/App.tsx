import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomeFeed from "@/pages/HomeFeed";
import CreationStudio from "@/pages/CreationStudio";
import GenerationResult from "@/pages/GenerationResult";
import VideoEditor from "@/pages/VideoEditor";
import SocialShare from "@/pages/SocialShare";
import Profile from "@/pages/Profile";
import BattleMode from "@/pages/BattleMode";
import ARCamera from "@/pages/ARCamera";
import IdeaGenerator from "@/pages/IdeaGenerator";
import BrandKit from "@/pages/BrandKit";
import ContextSources from "@/pages/ContextSources";
import EcommerceConnect from "@/pages/EcommerceConnect";
import AvatarStudio from "@/pages/AvatarStudio";
import AffiliateDashboard from "@/pages/AffiliateDashboard";
import CollabRoom from "@/pages/CollabRoom";
import AssetMarketplace from "@/pages/AssetMarketplace";
import PricingTiers from "@/pages/PricingTiers";
import PitchDeck from "@/pages/PitchDeck";
import Onboarding from "@/pages/Onboarding";
import Notifications from "@/pages/Notifications";
import SearchPage from "@/pages/SearchPage";
import DeepResearch from "@/pages/DeepResearch";
import DesignSystem from "@/pages/DesignSystem";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Default to Onboarding for demo purposes */}
      <Route path="/welcome" component={Onboarding} />
      
      <Route path="/" component={HomeFeed} />
      <Route path="/create" component={CreationStudio} />
      <Route path="/result" component={GenerationResult} />
      <Route path="/editor" component={VideoEditor} />
      <Route path="/share" component={SocialShare} />
      <Route path="/profile" component={Profile} />
      <Route path="/battle" component={BattleMode} />
      <Route path="/camera" component={ARCamera} />
      <Route path="/ideas" component={IdeaGenerator} />
      <Route path="/brand" component={BrandKit} />
      <Route path="/context" component={ContextSources} />
      <Route path="/store" component={EcommerceConnect} />
      <Route path="/avatars" component={AvatarStudio} />
      <Route path="/affiliate" component={AffiliateDashboard} />
      <Route path="/collab" component={CollabRoom} />
      <Route path="/marketplace" component={AssetMarketplace} />
      <Route path="/pricing" component={PricingTiers} />
      <Route path="/pitch" component={PitchDeck} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/search" component={SearchPage} />
      <Route path="/research" component={DeepResearch} />
      <Route path="/design" component={DesignSystem} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
