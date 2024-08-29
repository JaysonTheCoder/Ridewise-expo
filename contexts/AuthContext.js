import React, { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = function({ children }) {
    const [ id, setID ] = useState(null)
    const [ driver, setDriver ] = useState('')
    const [ bus_number, setBusNumber ] = useState('')
    const [ status, setStatus ] = useState('')

    let value = {
        setID,
        setDriver,
        setBusNumber,
        setStatus,
        id,
        driver,
        bus_number,
        status
    }
    return (
        <AuthContext.Provider value={ value }>
            { children }
        </AuthContext.Provider>
    )
}