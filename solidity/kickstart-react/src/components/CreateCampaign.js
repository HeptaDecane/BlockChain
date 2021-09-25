import React from "react";
import Factory from "../contracts/Factory";
import {GlobalContext} from "../GlobalContext";
import web3 from "../web3";

function CreateCampaign(){
    const {account} = React.useContext(GlobalContext)
    const {setCurrentPage} = React.useContext(GlobalContext)

    const [loaders, setLoaders] = React.useState({
        creation: false,
    })
    const [inputs, setInputs] = React.useState({
        ether: '0.01'
    })

    React.useEffect(()=>{
        setCurrentPage('createCampaign')
    },[])

    const handleInput = (event)=>{
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        setLoaders({
            ...loaders,
            creation: true
        })

        Factory.methods.createCampaign(web3.utils.toWei(inputs.ether,'ether'))
            .send({from: account})
            .then(console.log).catch(console.log)
            .finally(()=>{
                setLoaders({
                    ...loaders,
                    creation: false
                })
            })
    }

    return(
        <React.Fragment>
            <div className="container">
                <h4>New Campaign</h4>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor={"ether"} className="form-label">Minimum Contribution (ether):</label>
                        <input type={"number"} name={"ether"} className="form-control"
                               value={inputs.ether}
                               onChange={handleInput}
                        />
                    </div>
                    <button type={"submit"} className="btn btn-primary" onClick={handleSubmit}>
                        Create!
                    </button>
                    <span style={{margin:'0.5rem'}}>
                        {loaders.creation && <i className="fa fa-spinner fa-spin fa-lg"/>}
                    </span>
                </form>
            </div>
        </React.Fragment>
    )
}

export default CreateCampaign;