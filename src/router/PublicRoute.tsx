import React from 'react'
import { Redirect, Route } from 'react-router'

const PublicRoute = ({isAuthenticated,component:Component,...rest}:any) => {
    return (
        <Route 
            {...rest}
            component={(props:any)=>(
                (!isAuthenticated)
                    ?<Component {...props} />
                    :<Redirect to="/"/>
            )} 
         />
    )
}

export default PublicRoute
