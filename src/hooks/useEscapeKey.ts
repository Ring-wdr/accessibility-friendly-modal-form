import { useEffect } from "react";
import { useCallbackRef } from "./useCallbackRef";

export const useEscapeKey = (callback: () => void, key = "Escape") => {
  const callbackRef = useCallbackRef(callback);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callbackRef();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callbackRef, key]);
};
