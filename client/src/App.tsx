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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
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
      
      {/* Placeholder routes */}
      <Route path="/search" component={HomeFeed} />
      <Route path="/notifications" component={HomeFeed} />
      
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
