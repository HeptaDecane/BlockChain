import React from "react";
import web3 from "../web3";
import Lottery from "../contracts/Lottery";

function Home(){

    const [account, setAccount] = React.useState('')
    const [manager, setManager] = React.useState('')

    React.useEffect(()=> {
        web3.eth.getAccounts()
            .then(accounts=>setAccount(accounts[0]))

        Lottery.methods.manager().call()
            .then(manager=>setManager(manager))
    }, [])

    return(
        <React.Fragment>
            <h6>Account: {account}</h6>
            <h6>Manager: {manager}</h6>
        </React.Fragment>
    )
}

export default Home;