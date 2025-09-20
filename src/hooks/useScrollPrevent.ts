import { useEffect } from "react";

export function useScrollPrevent() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);
}
