import { createSafeContext } from "../utils/createSafeContext";
import type { ModalContextType } from "../types/modal";
import { useMemo, useRef, useState } from "react";
import { useCallbackRef } from "../hooks/useCallbackRef";

const [InnerModalContextProvider, useModalContext] =
  createSafeContext<ModalContextType>("ModalContext");

type ModalContextProviderProps = Omit<
  ModalContextType,
  "titleId" | "setTitleId"
>;

function ModalContextProvider({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
} & ModalContextProviderProps) {
  const onCloseRef = useCallbackRef(onClose);
  const [titleId, setTitleId] = useState<string | null>(null);
  const modalState = useMemo(
    () => ({ isOpen, onClose: onCloseRef, titleId, setTitleId }),
    [isOpen, onCloseRef, titleId]
  );
  return (
    <InnerModalContextProvider value={modalState}>
      {children}
    </InnerModalContextProvider>
  );
}

export { ModalContextProvider, useModalContext };
