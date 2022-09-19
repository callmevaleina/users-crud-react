import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UsersForm = ({
  getUsers,
  selectedUser,
  updateUser,
  deselectUser,
  isAddingUser,
  showAlert,
  setCloseAlert
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selectedUser) {
      reset(selectedUser);
    }
  }, [selectedUser]);

  const visibility = () => {
    setIsVisible(!isVisible);
  };

  const clearInput = () => {
    deselectUser();
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
    });
  };

 

  const submit = (data) => {
    if (selectedUser) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${selectedUser.id}/`,
          data
        )
        .then(() => getUsers())
        .catch((error) => console.log(error.response.data));
      isAddingUser();
      showAlert("UPDATED USER")
      setCloseAlert(true)
    } else {
      axios
        .post("https://users-crud1.herokuapp.com/users/", data)
        .then(() => getUsers())
        .catch((error) => console.log(error.response));
      isAddingUser();
      showAlert("CREATED USER")
      setCloseAlert(true)

    }
    clearInput();
 
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(submit)}>
        <i
          onClick={() => {
            isAddingUser();
            clearInput();
          }}
          className="fa-solid fa-xmark xmarkForm"
        ></i>
        <h2 className="title">
          {selectedUser ? "Update User" : "Create User"}
        </h2>
        <p className="subtitle">
          {selectedUser ? "Your info is safe with us." : "It's quick and easy."}
        </p>
        <div className="inputContainer">
          {/* <label htmlFor="first_name"></label> */}
          <input
            required
            type="text"
            placeholder="First name"
            id="first_name"
            {...register("first_name")}
          />
        </div>

        <div className="inputContainer">
          {/* <label htmlFor="last_name">Last name: </label> */}
          <input
            required
            placeholder="Last name"
            type="text"
            id="last_name"
            {...register("last_name")}
          />
        </div>
        <div className="inputContainer">
          {/* <label htmlFor="email"> Email: </label> */}
          <input
            required
            placeholder="Email"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>

        <div className="inputContainer">
          {/* <label htmlFor="password">Password: </label> */}
          <div className="passwordContainer">
            <input
              required
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              id="password"
              {...register("password")}
            />
            {isVisible ? (
              <i onClick={visibility} className="fa-regular fa-eye-slash"></i>
            ) : (
              <i onClick={visibility} className="fa-regular fa-eye"></i>
            ) }
          </div>
        </div>

        <div className="dateContainer">
          
          <input required type="date" id="birthday" {...register("birthday")} />
          <i className="fa-solid fa-cake-candles"></i>
         
        </div>

        <div className="buttonContainer">
          <button className="create">{selectedUser ? "Save" : "Create"}</button>
          <button className="clear" type="button" onClick={clearInput}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;