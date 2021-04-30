import React, {useState, useEffect, createContext} from "react";

import { auth } from "../scripts/login"

export const UserContext = createContext({ user: null })

export default (props) => {
  const [user, setuser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const { displayName, email }  = user;
            setuser(user)
          }
        })
        console.log("userprovider", user)
  },[])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}