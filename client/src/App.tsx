import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { NightDashboard, OpsPortal, PartnerPortal, TalentPortal } from "./pages/CloutPortals";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import JoinClout from "./pages/JoinClout";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/night" component={NightDashboard} />
      <Route path="/talent" component={TalentPortal} />
      <Route path="/partner" component={PartnerPortal} />
      <Route path="/ops" component={OpsPortal} />
      <Route path="/join" component={JoinClout} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
