import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalButton,
  ModalDescription,
} from "./compontents/modal";

const ModalFormPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalContent>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>Modal Description</ModalDescription>
            <ModalButton>Close</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalFormPage;
