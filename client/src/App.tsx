import { Route, Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="*">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-600 mb-4">FundTek Capital Group</h1>
              <p className="text-xl text-gray-600 mb-8">Fast Business Financing Solutions</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </Route>
      </Router>
    </QueryClientProvider>
  );
}