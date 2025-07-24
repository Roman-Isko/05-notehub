import { useEffect } from "react";
import css from "./Modal.module.css";
import ReactDOM from "react-dom";
import type { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="css.backdrop" onClick={onClose}>
      <div className="css.content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
