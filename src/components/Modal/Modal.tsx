import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {

  const handleOnBackdropClick = (ev: React.MouseEvent<HTMLDivElement> ) => {
    if (ev.target === ev.currentTarget) {
      onClose()
      return
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    }
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
  }, [onClose])

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleOnBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
