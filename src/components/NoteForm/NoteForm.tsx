import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { createNote } from "../../services/noteService";
import type { NoteTag, NoteCreateData } from "../../types/note";
import type { FormikHelpers } from "formik";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  text: Yup.string().required("Text is required"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["personal", "work", "study", "other"])
    .required(),
});

const initialValues: NoteCreateData = {
  title: "",
  text: "",
  tag: "personal",
};

const NoteForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (
    values: NoteCreateData,
    { resetForm }: FormikHelpers<NoteCreateData>
  ) => {
    mutation.mutate(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label>Title</label>
          <Field name="title" />
          <FormikError name="title" component="div" />
        </div>
        <div>
          <label>Text</label>
          <Field name="text" as="textarea" />
          <FormikError name="text" component="div" />
        </div>
        <div>
          <label>Tag</label>
          <Field name="tag" as="select">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </Field>
          <FormikError name="tag" component="div" />
        </div>
        <button type="submit">Add Note</button>
      </Form>
    </Formik>
  );
};

export default NoteForm;
