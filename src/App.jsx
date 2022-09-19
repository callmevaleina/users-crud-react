import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import logo from "./assets/logoSnapbook.png";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [actionAlert, setActionAlert] = useState("");
  const [closeAlert, setCloseAlert] = useState(false);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data));
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    console.log(user);
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUsers());
  };

  const deselectUser = () => {
    setSelectedUser(null);
  };

  const updateUsers = (data) => {
    axios
      .put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, data)
      .then(() => getUsers())
      .catch((error) => console.log(error.response.data));
  };

  const isAddingUser = () => {
    setIsAdding(!isAdding);
  };

  const showAlert = (alertType) => {
    setActionAlert(alertType);
  };

  const deleteAlert = () => {
    setCloseAlert(false);
  };

 

  

  
  let usersByLastName = []
  let usersCopy = [...users]


  const [search, setSearch]=useState('')

  
   if (!search) {
     usersByLastName = users
   }else{
    usersByLastName = usersCopy.filter((user)=> user.last_name.toLowerCase().includes(search.toLocaleLowerCase()))

   }

   const searcher = (e)=>{
    setSearch(e.target.value)
   }
 

  return (
    <div className="App">
      <div className="logoContainer">
        <img src={logo} width="500px" />
      </div>

      <div className="searchBar">
        <input 
        placeholder="Search by Last Name"
        id="inputSearch" 
        type="text"
        value={search}
        onChange={searcher} />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      {closeAlert && (
        <div className="alertContainer">
          <div className="alertBox">
            <i
              onClick={() => setCloseAlert(false)}
              className="fa-solid fa-xmark xmarkAlert"
            ></i>

            {actionAlert === "DELETED USER" ? (
              <i className="fa-solid fa-circle-xmark modalIcon red"></i>
            ) : (
              <i className="fa-solid fa-circle-check modalIcon green"></i>
            )}

            <h2>{actionAlert}</h2>
          </div>
        </div>
      )}

      {isAdding && (
        <UsersForm
          getUsers={getUsers}
          selectedUser={selectedUser}
          updateUsers={updateUsers}
          deselectUser={deselectUser}
          isAddingUser={isAddingUser}
          showAlert={showAlert}
          setCloseAlert={setCloseAlert}
        />
      )}

          <UsersList
          users={usersByLastName}
          selectUser={selectUser}
          deleteUser={deleteUser}
          isAddingUser={isAddingUser}
          showAlert={showAlert}
          setCloseAlert={setCloseAlert}
        /> 

  
      
    </div>
  );
}

export default App;