import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { CreateNoteData } from "../../services/noteService";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
  tag: Yup.string().oneOf(tags).required("Required"),
});

interface Props {
  onSubmit: (values: CreateNoteData) => void;
}

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm({ onSubmit }: Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label>
            Title
            <Field name="title" className={css.input} />
            {errors.title && touched.title && (
              <div className={css.error}>{errors.title}</div>
            )}
          </label>

          <label>
            Content
            <Field name="content" as="textarea" className={css.textarea} />
            {errors.content && touched.content && (
              <div className={css.error}>{errors.content}</div>
            )}
          </label>

          <label>
            Tag
            <Field name="tag" as="select" className={css.select}>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            {errors.tag && touched.tag && (
              <div className={css.error}>{errors.tag}</div>
            )}
          </label>

          <button type="submit" className={css.button}>
            Create note
          </button>
        </Form>
      )}
    </Formik>
  );
}
