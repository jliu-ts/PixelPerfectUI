import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomeFeed from "@/pages/HomeFeed";
import CreationStudio from "@/pages/CreationStudio";
import GenerationResult from "@/pages/GenerationResult";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeFeed} />
      <Route path="/create" component={CreationStudio} />
      <Route path="/result" component={GenerationResult} />
      
      {/* Placeholder routes */}
      <Route path="/search" component={HomeFeed} />
      <Route path="/notifications" component={HomeFeed} />
      <Route path="/profile" component={HomeFeed} />
      
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
