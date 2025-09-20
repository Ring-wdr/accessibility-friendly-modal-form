export type ModalContextType = {
  isOpen: boolean;
  onClose: () => void;
  titleId: string | null;
  setTitleId: (id: string | null) => void;
};
