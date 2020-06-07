import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { DUMMY_PLACES } from "../../data";
import { useForm } from "../../shared/hooks/FormHooks";

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().pid;
  
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
    );
    
    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === +placeId);
    
    useEffect(() => {
      const elem = document.getElementById('description')
      console.log('DESC: ',elem);
      // M.textareaAutoResize(desc,{});
    }, [setFormData, identifiedPlace]);

    useEffect(()=>{
      if(identifiedPlace){
        setFormData(
          {
            title: {
              value: identifiedPlace.title,
              isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          }
        },
        true
      );
    }
    setIsLoading(false);
  },[setFormData, identifiedPlace]);


  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); //goes to backend
  };

  if (!identifiedPlace) {
    return (
      <div className="row center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if(isLoading){
    return(
      <p className="row center">Loading.......</p>
    )
  }

  return (
    <div className="row center">
      <form className="col s6 offset-s3" onSubmit={placeUpdateSubmitHandler}>
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.isValid}
        />
        <Input
          element="textarea"
          id="description"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)"
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.isValid}
        />
        <Input
          element="input"
          id="address"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
          initialValue={formState.inputs.address.value}
          initialValid={formState.inputs.address.isValid}
        />
        <button type="submit" disabled={!formState.isValid}>
          Add Place
        </button>
      </form>
    </div>
  );
};

export default UpdatePlace;
