import React, {useState} from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {

  const [usersList, setUsersList] = useState([]); // array to hold array of (usernames,age), initially empty

  /* handler to update usersList whenever user adds in a new (username,age) */
  const onAddUserHandler = (uName, uAge) => {

    /* update usersList */
    setUsersList( (prevUsersList) =>
    {
      /* copy all items in previous list and append new (username,age) to the array */
      return [...prevUsersList, {name: uName, age: uAge, id: Math.random().toString()}]
    });
  }


  return (
    <div>
      <AddUser onAddUser={onAddUserHandler}></AddUser>
      <UsersList users={usersList}/> 
    </div>
  );
}

export default App;
