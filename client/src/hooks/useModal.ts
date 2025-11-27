import { useState, useCallback } from "react";

interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: (open: boolean) => void;
}

/**
 * Simple modal state management hook
 *
 * @example
 * const deleteModal = useModal();
 *
 * <Button onClick={deleteModal.open}>Delete</Button>
 * <Modal open={deleteModal.isOpen} onClose={deleteModal.close}>
 *   ...
 * </Modal>
 */
export function useModal(initialState = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

interface UseModalWithDataReturn<T> extends UseModalReturn {
  data: T | null;
  openWith: (data: T) => void;
  clearData: () => void;
}

/**
 * Modal state with associated data (e.g., for edit modals)
 *
 * @example
 * const editModal = useModalWithData<Prompt>();
 *
 * <Button onClick={() => editModal.openWith(prompt)}>Edit</Button>
 * <EditModal
 *   open={editModal.isOpen}
 *   prompt={editModal.data}
 *   onClose={editModal.close}
 * />
 */
export function useModalWithData<T>(initialState = false): UseModalWithDataReturn<T> {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clearing data to allow for exit animations
    setTimeout(() => setData(null), 200);
  }, []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const openWith = useCallback((newData: T) => {
    setData(newData);
    setIsOpen(true);
  }, []);

  const clearData = useCallback(() => setData(null), []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setIsOpen,
    openWith,
    clearData,
  };
}
