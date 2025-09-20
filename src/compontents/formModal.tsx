import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  ModalButton,
} from "./modal";
import { useState } from "react";

export function FormModal({
  isOpen,
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  onConfirm: (input: string | null) => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalTitle>Modal Title</ModalTitle>
        <ModalDescription>Modal Description</ModalDescription>
        <input
          name="input"
          pattern=".{3,}"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ModalButton onClick={() => onConfirm(input || null)}>
          submit
        </ModalButton>
        <ModalButton>cancel</ModalButton>
      </ModalContent>
    </Modal>
  );
}
