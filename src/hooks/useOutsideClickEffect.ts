import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

type OneOrMore<T> = T | Array<T>;

export function useOutsideClickEffect(
  container: OneOrMore<HTMLElement | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
  enabled = true
) {
  const containers = useRef<HTMLElement[]>([]);

  const handleDocumentClick = useCallbackRef(
    (event: MouseEvent | TouchEvent) => {
      if (event.target === null) {
        return;
      }

      if (containers.current.length === 0) {
        return;
      }

      if (containers.current.some((x) => x.contains(event.target as Node))) {
        return;
      }

      callback(event);
    }
  );

  useEffect(() => {
    containers.current = Array.isArray(container)
      ? container.filter((el) => el != null)
      : [container].filter((el) => el != null);
  }, [container]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick, enabled]);
}
