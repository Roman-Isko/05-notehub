import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return <p className={css.error}>Oops! Something went wrong.</p>;
}

// import css from "./ErrorMessage.module.css";

// interface ErrorMessageProps {
//   message: string;
// }

// const ErrorMessage = ({ message }: ErrorMessageProps) => (
//   <p className={css.error}>{message}</p>
// );

// export default ErrorMessage;
