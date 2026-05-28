import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll top on page change
    window.scrollTo({
      top: 0,
      behavior: "instant", // ensures no animation glitch
    });

    // Prevent mobile browsers from restoring scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [pathname]);

  return null;
}
