import React from "react";
import {GlobalContext} from "../GlobalContext";
import {Link} from "react-router-dom";
import Campaign from "../contracts/Campaign";
import RequestRow from "./RequestRow";

function Requests(props){

    const {setCurrentPage} = React.useContext(GlobalContext)

    const [requests,setRequests] = React.useState([])
    const [nContributors,setNContributors] = React.useState(0)
    const [message,setMessage] = React.useState('')
    const [messageClass,setMessageClass] = React.useState('')

    const campaign = Campaign(props.match.params.address)

    React.useEffect(()=>{
        setCurrentPage('requests')
        async function fetchData(){
            try{
                let nRequests = await campaign.methods.nRequests().call()
                nRequests = parseInt(nRequests)

                Promise.all(
                    Array(nRequests).fill()
                        .map((e,i)=>campaign.methods.requests(i).call())
                ).then(setRequests)

                campaign.methods.nContributors().call().then(setNContributors)
            } catch (err){
                console.error(err)
            }
        }
        fetchData()
    },[])

    return(
        <React.Fragment>
            <div className="container">
                <h4>Requests</h4>
                <div className="row">
                    <div className="col">
                        found {requests.length} request(s)
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount (ETH)</th>
                            <th scope="col">Recipient</th>
                            <th scope="col">Approvals Count</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request,index)=>
                            <RequestRow
                                address={props.match.params.address}
                                key={index}
                                id={index}
                                nContributors={nContributors}
                                request={request}
                                setMessage = {setMessage}
                                setMessageClass={setMessageClass}
                            />
                        )}
                    </tbody>
                </table>
                <div className="row">
                    <Link to={`/campaigns/${props.match.params.address}/requests/new`}>
                        <button className="btn btn-primary">Add Request</button>
                    </Link>
                </div>
                <hr/>
                <div className={`alert ${messageClass}`} role="alert" id="message">
                    {message}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Requests;