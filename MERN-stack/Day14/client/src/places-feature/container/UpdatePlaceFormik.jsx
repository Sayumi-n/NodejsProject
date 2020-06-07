import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import TextareaAutosize from "react-textarea-autosize";
import CustomTextInput from '../../shared/components/CustomTextInput';

import { DUMMY_PLACES } from "../../data";

const UpdatePlaceFormik = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    title: "",
    description: "",
    address: "",
  });

  const placeId = useParams().pid;
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === +placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setState({
        title: identifiedPlace.title,
        description: identifiedPlace.description,
        address: identifiedPlace.address,
      });
    }
    setIsLoading(false);
  }, [identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="row center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="row center">
        <p>Loading....</p>
      </div>
    );
  }

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Must be more than 3 characters")
      .required("A title is require"),
    description: Yup.string().required("A description is required"),
    address: Yup.string().required("An address is required"),
  });

  return (
    <div>
      <Formik
        initialValues={state}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          //async api post call here
          //submit code hes
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          return (
            <div className="row">
              <div className="col s6 offset-s3">
                <Form>
                  <h1>Edit a Place</h1>
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
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdatePlaceFormik;
