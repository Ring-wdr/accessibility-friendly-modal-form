import { useOutsideClickEffect } from "../hooks/useOutsideClickEffect";
import { useCallbackRef } from "../hooks/useCallbackRef";
import {
  useState,
  type ComponentPropsWithRef,
  useId,
  useLayoutEffect,
} from "react";
import { Portal } from "./portal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import {
  ModalContextProvider,
  useModalContext,
} from "../context/modal-context";
import { delay } from "../utils/delay";
import { isFocusable } from "../utils/element/isFocusable";
import { useScrollPrevent } from "../hooks/useScrollPrevent";

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <ModalContextProvider isOpen={isOpen} onClose={onClose}>
      {children}
    </ModalContextProvider>
  );
}

const focusCallback = (element: HTMLElement | null) => {
  if (!element) {
    return;
  }
  const currentFocusElement = document.activeElement;
  delay(100).then(() => element.focus());
  return () => {
    if (
      currentFocusElement instanceof HTMLElement &&
      isFocusable(currentFocusElement)
    ) {
      currentFocusElement?.focus();
    }
  };
};

export function ModalContent({
  children,
  ...props
}: Omit<ComponentPropsWithRef<"div">, "id">) {
  const { titleId, descriptionId, onClose } = useModalContext();
  const [ModalRef, setModalRef] = useState<HTMLDivElement | null>(null);
  const onCloseRef = useCallbackRef(onClose);

  useOutsideClickEffect(ModalRef, onCloseRef);
  useEscapeKey(onCloseRef);
  useScrollPrevent();

  return (
    <Portal
      role="dialog"
      aria-modal
      {...props}
      aria-labelledby={titleId ?? undefined}
      aria-describedby={descriptionId ?? undefined}
      ref={setModalRef}
    >
      {children}
    </Portal>
  );
}

export function ModalTitle({
  children,
  ...props
}: Omit<ComponentPropsWithRef<"h2">, "id">) {
  const id = useId();
  const { setTitleId } = useModalContext();

  useLayoutEffect(() => {
    setTitleId(id);
    return () => {
      setTitleId(null);
    };
  }, [id, setTitleId]);

  return (
    <h2 {...props} ref={focusCallback} id={id}>
      {children}
    </h2>
  );
}

export function ModalDescription({
  children,
  ...props
}: Omit<ComponentPropsWithRef<"p">, "id">) {
  const id = useId();
  const { setDescriptionId } = useModalContext();

  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => {
      setDescriptionId(null);
    };
  }, [id, setDescriptionId]);

  return (
    <p {...props} id={id}>
      {children}
    </p>
  );
}

export function ModalButton({
  children,
  ...props
}: Omit<ComponentPropsWithRef<"button">, "id">) {
  const { onClose } = useModalContext();
  return (
    <button
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        onClose();
      }}
    >
      {children}
    </button>
  );
}
