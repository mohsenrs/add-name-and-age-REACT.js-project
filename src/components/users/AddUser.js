import Card from './../ui/Card'
import Button from './../ui/Button'
import classes from './AddUser.module.css'
import { useState } from 'react'
import ErrorModal from './../ui/ErrorModal'

function AddUser(props) {
  const [enteredUserName, setEnteredUserName] = useState('')
  const [enteredUserAge, setEnteredUserAge] = useState('')
  const [error, setError] = useState(null)

  const onAddUserHandler = (e) => {
    e.preventDefault()

    if (
      enteredUserName.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      setError({
        title: 'invalid input!',
        message: 'please add correct name and age',
      })
      return
    }

    if (+enteredUserAge < 1) {
      setError({
        title: 'invalid age!',
        message: 'please add correct age',
      })
      return
    }

    props.onAddUser(enteredUserName, enteredUserAge)

    setEnteredUserName('')
    setEnteredUserAge('')
  }

  const onChangeUserNameHandler = (e) => {
    setEnteredUserName(e.target.value)
  }

  const onChangeUserAgeHandler = (e) => {
    setEnteredUserAge(e.target.value)
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={onAddUserHandler}>
          <label htmlFor='userName'>Name</label>
          <input
            type='text'
            id='userName'
            onChange={onChangeUserNameHandler}
            value={enteredUserName}
          />
          <label htmlFor='userAge'>Age</label>
          <input
            type='number'
            id='userAge'
            onChange={onChangeUserAgeHandler}
            value={enteredUserAge}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser
