import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({isAuthenticated,component:Component,redirectRoute="/",...rest}:any) => {
    return (
        <Route 
            {...rest}
            component={(props:any)=>(
                (isAuthenticated)
                    ?<Component {...props} />
                    :<Redirect to={redirectRoute}/>
            )} 
         />
    )
}

export default PrivateRoute