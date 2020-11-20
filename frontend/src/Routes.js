import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Companies from './Companies'
import Jobs from './Jobs'
import Company from './Company'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Profile from './Profile'


const Routes = ({setToken}) => {
    return (
      <div className="pt-5">
        <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <Login setToken={setToken} />
            </Route>

            <Route exact path="/signup">
              <SignUp setToken={setToken} />
            </Route>

            <ProtectedRoute exact path="/companies">
              <Companies />
            </ProtectedRoute>

            <ProtectedRoute path="/companies/:handle">
              <Company />
            </ProtectedRoute>

            <ProtectedRoute exact path="/jobs">
              <Jobs />
            </ProtectedRoute>

            <ProtectedRoute path="/users/:username">
              <Profile />
            </ProtectedRoute>

            <Route>
              <p>404! Page Not Found!</p>
            </Route>

        </Switch>
      </div>
          )
}

export default Routes