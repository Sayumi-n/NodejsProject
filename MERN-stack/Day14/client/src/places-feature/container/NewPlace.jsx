import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextInput from "../../shared/components/CustomTextInput"

const NewPlace = () => {
 
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("A title is required"),
    description: Yup.string().required("A description is required"),
    address: Yup.string().required("An address is required"),
  })

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => {
          return (
            <div className="row">
              <div className="col s6 offset-s3">
                <Form>
                  <h1>Create a Place</h1>
                  <CustomTextInput label="Title" name="title" type="text" />
                  <CustomTextInput
                    label="Description"
                    name="description"
                    type="textarea"
                  />
                  <CustomTextInput label="Address" name="address" type="text" />
                  <button
                    className="waves-effect waves-light btn white-text green darken-4"
                    type="submit"
                    disabled={!!props.isSubmitting}
                  >
                    {props.isSubmitting ? "Loading..." : "Submit"}
                    <i className="material-icons right">send</i>
                  </button>
                </Form>
              </div>
              <pre>{JSON.stringify(props.values, null, 2)}</pre>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewPlace;
