import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/landing";
import Discover from "@/pages/discover";
import EventDetail from "@/pages/event-detail";
import TicketCheckout from "@/pages/ticket-checkout";
import TicketConfirmation from "@/pages/ticket-confirmation";
import EventChatPage from "@/pages/event-chat";
import OrganizerHub from "@/pages/organizer-hub";
import OrganizerDashboard from "@/pages/organizer-dashboard";
import CreateEvent from "@/pages/create-event";
import EditEvent from "@/pages/edit-event";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/discover" component={Discover} />
      <Route path="/event/:id" component={EventDetail} />
      <Route path="/checkout" component={TicketCheckout} />
      <Route path="/confirmation" component={TicketConfirmation} />
      <Route path="/chat" component={EventChatPage} />
      <Route path="/organizer/hub" component={OrganizerHub} />
      <Route path="/organizer/dashboard" component={OrganizerDashboard} />
      <Route path="/organizer/create" component={CreateEvent} />
      <Route path="/organizer/edit" component={EditEvent} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
