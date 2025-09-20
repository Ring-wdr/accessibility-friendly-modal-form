import { overlay } from "overlay-kit";
import { FormModal } from "../compontents/formModal";

export const callModal = async () => {
  const result = await overlay.openAsync<string | null>(
    ({ isOpen, close, unmount }) => {
      return (
        <FormModal
          isOpen={isOpen}
          onConfirm={(input) => {
            close(input);
            unmount();
          }}
          onClose={() => {
            close(null);
            unmount();
          }}
        />
      );
    }
  );

  return result;
};
