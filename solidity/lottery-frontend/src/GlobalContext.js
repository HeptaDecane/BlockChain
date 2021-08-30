import React from "react";


export const GlobalContext = React.createContext();

export function GlobalProvider(props){

    let store = {
    }

    return(
        <GlobalContext.provider value={store}>
            {props.children}
        </GlobalContext.provider>
    )
}