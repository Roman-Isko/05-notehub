import { useEffect } from "react";
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

// import { ReactNode, useEffect } from "react";
// import { createPortal } from "react-dom";
// import css from "./Modal.module.css";

// interface ModalProps {
//   children: ReactNode;
//   onClose: () => void;
// }

// const Modal = ({ children, onClose }: ModalProps) => {
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, [onClose]);

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={onClose}
//     >
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default Modal;
