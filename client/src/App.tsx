import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/home-simple";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;