import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string().required(),
  tag: Yup.string().oneOf(["personal", "work", "study", "other"]).required(),
});

const NoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      tag: "personal" as NoteTag,
    },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <textarea
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      <select
        name="tag"
        value={formik.values.tag}
        onChange={formik.handleChange}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default NoteForm;
