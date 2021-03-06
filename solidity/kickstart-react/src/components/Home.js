import React from "react";
import factory from "../contracts/Factory";
import {Link} from "react-router-dom";
import {GlobalContext} from "../GlobalContext";

function Home(){
    const {setCurrentPage} = React.useContext(GlobalContext)
    const [campaigns, setCampaigns] = React.useState([])

    React.useEffect(()=>{
        setCurrentPage('home')
        factory.methods.getDeployedCampaigns().call()
            .then(setCampaigns).catch(console.log)
    },[])

    return(
        <React.Fragment>
            <div className="container">
                <h4>Open Campaigns</h4>
                {campaigns.map((element,i)=>
                    <div className="card" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{element}</h5>
                            <Link to={`/campaigns/${element}`} className="card-link">
                                View Campaign
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Home;