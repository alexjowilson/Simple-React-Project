import React, { useState } from 'react';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {

    const [enteredUsername, setEnteredUsername] = useState(''); // array destructuring
    const [enteredAge, setEnteredAge] = useState();
    const [error, setError] = useState();

    const usernameChangeHandler = (event) =>
    {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) =>
    {
        setEnteredAge(event.target.value);
    }

    /* function to handle when a user submits the form below */
    const addUserHandler = (event) => {
        event.preventDefault(); // stop default HTTP request

        /* error checking */
        // when user tries to enter empty form
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0)
        {
            console.log("tell the user to put something in the entries");
            setError({
                title: 'Invalid input', 
                message: 'Please enter in a valid name and age (non-empty values)'
            });
            return;    
        }

        // when user enters invalid age
        if(+enteredAge <= 0)
        {
            setError({
                title: 'Invalid age', 
                message: 'Please enter in a valid age (number greater than 0)'
            });
            return;
        }

        // console.log("Username = " + enteredUsername + ", Age = " + enteredAge);
        /* 
            forward the newly enteredUsername, entered age
            to the parent, App.js that holds the array that stores the
            array of (usernames,age)
        */
        props.onAddUser(enteredUsername,enteredAge);

        /* reset input fields after form submission */
        setEnteredUsername('');
        setEnteredAge('');
    };


    /* function to handle error once user clicks cancel or out of pop up window */
    const errorHandler = () =>
    {
       setError(null); // clear the null error once user clicks out of pop up window
    }


    return ( 
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}

            <Card currentStyling={`${styles['input']}`}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>

    );
};

export default AddUser;