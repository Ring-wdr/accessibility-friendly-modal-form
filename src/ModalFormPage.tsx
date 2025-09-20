import { useState } from "react";
import { Modal } from "./compontents/modal";

const ModalFormPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          모달입니다..
        </Modal>
      )}
    </>
  );
};

export default ModalFormPage;
