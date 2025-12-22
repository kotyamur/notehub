import { useId } from "react";
import { Formik, Field, Form, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Values } from "../../types/note";
import css from "./NoteForm.module.css";


const addNoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  content: Yup.string().max(500, "Must be 500 characters or less"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

const initialValues: Values = { title: "", content: "", tag: "" };

interface NoteFormProps {
  onClose: () => void;
  onCreate: (newNote: Values) => void;
}

const NoteForm = ({ onClose, onCreate }: NoteFormProps) => {
  const fieldId = useId();

  const handleSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    console.log("Order data:", values);

    onCreate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    
    actions.resetForm();
    // actions.setSubmitting(false);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addNoteSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="">-- Choose note tag --</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
