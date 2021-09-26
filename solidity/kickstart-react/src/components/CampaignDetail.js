import React from "react";
import {GlobalContext} from "../GlobalContext";
import {Link} from "react-router-dom";
import web3 from "../web3";
import Campaign from "../contracts/Campaign";
import ContributionForm from "./ContributionForm";


function CampaignDetail(props){
    const {setCurrentPage} = React.useContext(GlobalContext)

    const [minimumContribution,setMinimumContribution] = React.useState('0')
    const [balance,setBalance] = React.useState('0')
    const [nRequests, setNRequests] = React.useState('0')
    const [nContributors, setNContributors] = React.useState('0')
    const [manager,setManager] = React.useState('0x...')

    const campaign = Campaign(props.match.params.address);

    React.useEffect(()=>{
        setCurrentPage('campaignDetail')
        web3.eth.getBalance(campaign.options.address).then(setBalance)
        campaign.methods.manager().call().then(setManager)
        campaign.methods.minimumContribution().call()
            .then(res=>{
                setMinimumContribution(res)
            })
        campaign.methods.nContributors().call().then(setNContributors)
        campaign.methods.nRequests().call().then(setNRequests)


    },[])


    return(
        <React.Fragment>
            <div className="container">
                <h4>Campaign Detail</h4>
                <div className="row">
                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{props.match.params.address}</h5>
                                        <h6 className="card-subtitle mb-2">
                                            <a href={`https://rinkeby.etherscan.io/address/${props.match.params.address}`}
                                               className="card-link" target="_blank" rel="noreferrer"
                                            >Contract Address</a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{manager}</h5>
                                        <h6 className="card-subtitle mb-2">
                                            <a href={`https://rinkeby.etherscan.io/address/${manager}`}
                                               className="card-link" target="_blank" rel="noreferrer"
                                            >Manager</a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{web3.utils.fromWei(balance,'ether')} ETH</h5>
                                        <h6 className="card-subtitle mb-2">
                                            Campaign Balance
                                        </h6>
                                        <p className="card-text caption">
                                            This balance is how much ether this campaign has left to spend.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{web3.utils.fromWei(minimumContribution,'ether')} ETH</h5>
                                        <h6 className="card-subtitle mb-2">
                                            Minimum Contribution
                                        </h6>
                                        <p className="card-text caption">
                                            You must contribute at least this much ether to become a contributor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{nRequests}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            <Link to={`/campaigns/${props.match.params.address}/requests`} className="card-link">
                                                Requests
                                            </Link>
                                        </h6>
                                        <p className="card-text caption">
                                            A request tries to withdraw ether from the contract.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{nContributors}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Contributors</h6>
                                        <p className="card-text caption">
                                            Number of people who already donated to this campaign.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="row">
                            <ContributionForm
                                address={props.match.params.address}
                                minContribution={minimumContribution}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default CampaignDetail;