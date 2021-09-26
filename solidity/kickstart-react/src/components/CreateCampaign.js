import React from "react";
import factory from "../contracts/Factory";
import {GlobalContext} from "../GlobalContext";
import web3 from "../web3";
import {useHistory} from "react-router-dom";

function CreateCampaign(){
    const {account} = React.useContext(GlobalContext)
    const {setCurrentPage} = React.useContext(GlobalContext)

    const [loaders, setLoaders] = React.useState({
        creation: false,
    })
    const [inputs, setInputs] = React.useState({
        ether: '0.01'
    })

    const history = useHistory()

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

        let message = document.getElementById("message")
        message.classList.remove('alert-danger')
        message.classList.remove('alert-success')
        message.innerHTML = ""

        factory.methods.createCampaign(web3.utils.toWei(inputs.ether,'ether'))
            .send({from: account})
            .then(res=>{
                message.classList.add('alert-success')
                message.innerHTML = `Contract Created! Txn Hash: ${res.transactionHash}`
                history.push('/')
            })
            .catch(err=>{
                message.classList.add('alert-danger')
                message.innerHTML = err.message
            })
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
                    <button type={"submit"} className="btn btn-primary"
                            disabled={loaders.creation} onClick={handleSubmit}
                    >
                        Create!
                    </button>
                    <span style={{margin:'0.5rem'}}>
                        {loaders.creation && <i className="fa fa-spinner fa-spin fa-lg"/>}
                    </span>
                </form>
                <hr/>
                <div className="alert" role="alert" id="message"/>
            </div>
        </React.Fragment>
    )
}

export default CreateCampaign;