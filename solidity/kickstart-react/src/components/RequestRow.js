import React from "react";
import {GlobalContext} from "../GlobalContext";
import Campaign from "../contracts/Campaign";
import web3 from "../web3";

function RequestRow(props){

    const {account} = React.useContext(GlobalContext)

    const [loaders, setLoaders] = React.useState({
        approving: false,
        finalizing: false
    })

    const campaign = Campaign(props.address)
    const {request, setMessage, setMessageClass} = props

    const approveRequest = ()=>{
        setMessage('')
        setMessageClass('')
        setLoaders({
            ...loaders,
            approving: true
        })

        campaign.methods.approveRequest(props.id).send({from:account})
            .then(res=>{
                setMessageClass('alert-success')
                setMessage('Success, Request Approved')
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            })
            .catch(error=>{
                setMessageClass('alert-danger')
                setMessage(error.message)
            })
            .finally(()=>{
                setLoaders({
                    ...loaders,
                    approving: false
                })
            })
    }

    const finalizeRequest = ()=>{
        setMessage('')
        setMessageClass('')
        setLoaders({
            ...loaders,
            finalizing: true
        })

        campaign.methods.finalizeRequest(props.id).send({from:account})
            .then(res=>{
                setMessageClass('alert-success')
                setMessage('Success, Request Finalized')
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            })
            .catch(error=>{
                setMessageClass('alert-danger')
                setMessage(error.message)
            })
            .finally(()=>{
                setLoaders({
                    ...loaders,
                    finalizing: false
                })
            })
    }

    const getRowType = ()=>{
        let approvals = parseInt(request.approvalsCount)
        let contributors = parseInt(props.nContributors)

        if(request.completed) return 'table-secondary'
        else if(2*approvals>contributors) return 'table-success'
        else return ''
    }

    return(
        <tr className={getRowType()}>
            <th scope="row">{props.id+1}</th>
            <td>{request.description}</td>
            <td>{web3.utils.fromWei(request.value,'ether')}</td>
            <td>{request.recipient}</td>
            <td>{request.approvalsCount}/{props.nContributors}</td>
            <td>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-dark btn-action"
                            onClick={approveRequest} disabled={request.completed}
                    >
                        {loaders.approving?
                            <i className="fa fa-spinner fa-spin fa-lg"/>
                            :
                            <React.Fragment>Approve</React.Fragment>
                        }
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-action"
                            onClick={finalizeRequest} disabled={request.completed}
                    >
                        {loaders.finalizing?
                            <i className="fa fa-spinner fa-spin fa-lg"/>
                            :
                            <React.Fragment>Finalize</React.Fragment>
                        }
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default RequestRow;