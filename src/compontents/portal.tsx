import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import type { ComponentPropsWithRef } from "react";

export function Portal(
  props: ComponentPropsWithRef<"div"> & { container?: HTMLElement | null }
) {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => setMounted(true), []);
  const container = containerProp || (mounted && globalThis?.document?.body);
  return container
    ? ReactDOM.createPortal(<div {...portalProps} />, container)
    : null;
}
