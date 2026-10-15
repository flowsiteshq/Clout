import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import JoinClout from "./pages/JoinClout";
import NotFound from "./pages/NotFound";

const NightDashboard = lazy(async () => ({ default: (await import("./pages/CloutPortals")).NightDashboard }));
const TalentPortal = lazy(async () => ({ default: (await import("./pages/CloutPortals")).TalentPortal }));
const PartnerPortal = lazy(async () => ({ default: (await import("./pages/CloutPortals")).PartnerPortal }));
const OpsPortal = lazy(async () => ({ default: (await import("./pages/CloutPortals")).OpsPortal }));

function PortalLoading() {
  return <main className="app-route-loading">Preparing your Clout experience…</main>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/night"><Suspense fallback={<PortalLoading />}><NightDashboard /></Suspense></Route>
      <Route path="/talent"><Suspense fallback={<PortalLoading />}><TalentPortal /></Suspense></Route>
      <Route path="/partner"><Suspense fallback={<PortalLoading />}><PartnerPortal /></Suspense></Route>
      <Route path="/ops"><Suspense fallback={<PortalLoading />}><OpsPortal /></Suspense></Route>
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
