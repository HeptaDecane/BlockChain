import React from "react";
import web3 from "../web3";
import {GlobalContext} from "../GlobalContext";
import {Link} from "react-router-dom";
import logo from "../images/logo192.png"

function Nav(){
    const {account,setAccount} = React.useContext(GlobalContext)
    const {currentPage} = React.useContext(GlobalContext)

    const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);

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

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);


    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{color:'gray'}}>
                        <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                        kickstart
                    </Link>
                    <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarBlock" aria-controls="#navbarBlock"
                            aria-expanded={!isNavCollapsed} aria-label="Toggle navigation"
                            onClick={handleNavCollapse}
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="#navbarBlock">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {currentPage!=='createCampaign' && <li className="nav-item">
                                <Link className="nav-link" to="/campaigns/new">
                                        <i className="fa fa-plus-circle"/> Create
                                </Link>
                            </li>}
                        </ul>
                        <span className="navbar-text">
                            <i className="fa fa-wallet fa-lg"/>
                            <span style={{padding:'2px'}}/>
                            {account.slice(0,6)}...{account.slice(-4)}
                        </span>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Nav;