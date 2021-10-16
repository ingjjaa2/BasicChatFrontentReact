import React,{useContext,useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

  import {ChatPage} from '../pages/ChatPage';
  import {AuthRouter} from './authRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const AppRouter = () => {

  const {auth,verifyToken} = useContext(AuthContext)

  useEffect(() => {
    verifyToken();
  }, [verifyToken])


    if(auth.checking){
      return (
        <div>Loading</div>
      );
    }

    return (
        <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
              <PublicRoute  isAuthenticated={auth.logged}  path="/auth"  component={AuthRouter}/>
              <PrivateRoute isAuthenticated={auth.logged}  path="/"  component={ChatPage} redirectRoute="/auth"/>
              {/* <Route exact path="/"  component={ChatPage} /> */}
              {/* <Route path="/auth"  component={AuthRouter} /> */}

              {/* <Redirect to="/"/> */}
          </Switch>
        </div>
      </Router>
    )
}
