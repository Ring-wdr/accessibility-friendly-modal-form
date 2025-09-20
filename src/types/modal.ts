export type ModalContextType = {
  isOpen: boolean;
  onClose: () => void;
  titleId: string | null;
  setTitleId: (id: string | null) => void;
  descriptionId: string | null;
  setDescriptionId: (id: string | null) => void;
};
