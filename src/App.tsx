import React, { useContext, useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import { Redirect, Router } from '@reach/router'
import Register from './components/Register'
import Login from './components/Login'
import { storeContext } from './Store'
import Error from './components/Error'

function App() {
  const { state, dispatch } = useContext(storeContext)
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    state.jwt && setLoggedIn(true);
  }, [state])

  return (
    <div className="App">
      <Error />
      <Router>
        <Login path='/' />
        <Register path="/register" />
        {
          loggedIn ? (
            <TodoList path="/todos" />
          ) :
            <Redirect from="*" to="/" noThrow />
        }

      </Router>

    </div>
  )
}

export default App
