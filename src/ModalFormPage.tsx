import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalButton,
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
            모달입니다..
            <ModalButton>Close</ModalButton>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalFormPage;
