import { useOutsideClickEffect } from "../hooks/useOutsideClickEffect";
import { useCallbackRef } from "../hooks/useCallbackRef";
import { useState, type ComponentPropsWithRef } from "react";
import { Portal } from "./portal";
import { useEscapeKey } from "../hooks/useEscapeKey";

export function Modal({
  isOpen,
  onClose,
  children,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
} & ComponentPropsWithRef<"div">) {
  const [ModalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const onCloseRef = useCallbackRef(onClose);

  useOutsideClickEffect(ModalRef, onCloseRef);
  useEscapeKey(onCloseRef);

  return (
    <Portal {...props} ref={setModalRef}>
      {children}
    </Portal>
  );
}
