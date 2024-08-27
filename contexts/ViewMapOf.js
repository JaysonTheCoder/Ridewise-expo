import { createContext, useState, useEffect } from "react";

export const MapViewContext = createContext()

export const MapViewProvider = function({ children }) {
    const [ docData, setDocData ] = useState('')

    return(
        <MapViewContext.Provider value={{ docData, setDocData }}>
            {children}
        </MapViewContext.Provider>
    )
}
