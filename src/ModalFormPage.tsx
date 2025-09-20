import { OverlayProvider } from "overlay-kit";
import { callModal } from "./utils/callModal";

const ModalFormPage = () => {
  return (
    <OverlayProvider>
      <button
        onClick={async () => {
          const result = await callModal();
          console.log(result);
        }}
      >
        Open Modal
      </button>
    </OverlayProvider>
  );
};

export default ModalFormPage;
