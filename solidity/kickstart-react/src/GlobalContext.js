import React from "react";

export const GlobalContext = React.createContext()

export function GlobalProvider(props){

    const [account,setAccount] = React.useState('')
    const [currentPage,setCurrentPage] = React.useState('home')
    let store = {
        account: account,
        setAccount: setAccount,
        currentPage: currentPage,
        setCurrentPage: setCurrentPage
    }

    return (
        <GlobalContext.Provider value={store}>
            {props.children}
        </GlobalContext.Provider>
    )
}