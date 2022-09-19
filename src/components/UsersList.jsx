import React from "react";

const UsersList = ({
  users,
  selectUser,
  deleteUser,
  isAddingUser,
  showAlert,
  setCloseAlert
}) => {


  const deleteAlert = () => {
    return showAlert("DELETED USER");
  };

  return (
    <div className="usersTable">
      <div className="usersBox">
        <div className="usersTitle">
          <h4>First name</h4>
          <h4>Last name</h4>
          <h4>Password</h4>
          <h4>Birthday</h4>
          <h4>Email</h4>
        </div>
        <div className="usersContainer">
          {users.map((user) => (
            <div key={user.id} className="userCard">
              <div className="nameBtns">
              <div className="editDelete">
                <i
                  onClick={() => {
                    selectUser(user);
                    isAddingUser();
                  }}
                  className="fa-solid fa-pencil pencil"
                ></i>
                <i
                  onClick={() => {
                    deleteUser(user.id);
                    setCloseAlert(true)
                    deleteAlert();
                  }}
                  class="fa-regular fa-trash-can"
                ></i>
              </div>
              <h3 className="firstName"> {user.first_name}</h3>
              </div>
              <h3 className="lastName"><span className="tagDescription"><i className="fa-solid fa-user"></i> </span>{user.last_name}</h3>

              <p className="password"><span className="tagDescription"><i className="fa-solid fa-lock"></i></span>{user.password}</p>
              <p className="birthdayDate"><span className="tagDescription"><i className="fa-solid fa-cake-candles"></i> </span>{user.birthday}</p>
              <p className="email"><span className="tagDescription"><i className="fa-solid fa-envelope"></i> </span>{user.email}</p>
              
            </div>
          ))}
          <div onClick={() => isAddingUser()} className="addUserContainer">
            <div className="addUser">
              <i className="fa-solid fa-user-plus"></i>Add User
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;