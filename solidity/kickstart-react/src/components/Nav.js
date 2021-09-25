import React from "react";
import web3 from "../web3";
import {GlobalContext} from "../GlobalContext";
import {Link} from "react-router-dom";

function Nav(){
    const {account,setAccount} = React.useContext(GlobalContext)
    const {currentPage,setCurrentPage} = React.useContext(GlobalContext)

    React.useEffect(()=> {
        web3.eth.getAccounts()
            .then(accounts => {
                setAccount(accounts[0] || '')
            }).catch(console.log)

        if(typeof window.ethereum !== 'undefined'){
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts[0] || '')
            })
        }

    },[])

    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">Kickstart</Link>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {currentPage!=='createCampaign' && <li className="nav-item">
                            <Link to="/campaigns/new">
                                <button className="btn btn-primary" aria-current="page">
                                    <i className="fa fa-plus-circle"/> Create
                                </button>
                            </Link>
                        </li>}
                    </ul>
                </div>
                <div className="container justify-content-end">
                    <span className="navbar-text">
                        <i className="fa fa-wallet fa-lg"/>
                        <span style={{padding:'2px'}}/>
                        {account.slice(0,6)}...{account.slice(-4)}
                    </span>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Nav;