import React from "react";
import {GlobalContext} from "../GlobalContext";
import {Link} from "react-router-dom";

function Requests(props){

    const {setCurrentPage} = React.useContext(GlobalContext)

    React.useEffect(()=>{
        setCurrentPage('requests')
    },[])

    return(
        <React.Fragment>
            <div className="container">
                <h4>Requests</h4>
                <table/>
                <div className="row">
                    <Link to={`/campaigns/${props.match.params.address}/requests/new`}>
                        <button className="btn btn-primary">Add Request</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Requests;