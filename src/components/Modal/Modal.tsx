import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} onClick={() => onClose()}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

// import { useEffect } from "react";
// import { createPortal } from "react-dom";
// import css from "./Modal.module.css";

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }

// const modalRoot = document.getElementById("modal-root") as HTMLElement;

// const Modal = ({ onClose, children }: ModalProps) => {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.code === "Escape") {
//         onClose();
//       }
//     };

//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = "auto";
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onClose]);

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return createPortal(
//     <div className={css.backdrop} onClick={handleBackdropClick}>
//       <div className={css.modal}>{children}</div>
//     </div>,
//     modalRoot
//   );
// };

// export default Modal;
