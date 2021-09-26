import React from "react";
import {GlobalContext} from "../GlobalContext";
import Campaign from "../contracts/Campaign";
import web3 from "../web3";
import {useHistory} from "react-router-dom";

function CreateRequest(props){
    const {account} = React.useContext(GlobalContext)
    const {setCurrentPage} = React.useContext(GlobalContext)

    const [disabledState, setDisabledState] = React.useState(true)
    const [loaders, setLoaders] = React.useState({
        submitting: false,
    })
    const [inputs, setInputs] = React.useState({
        description: '',
        ether: '',
        recipient: ''
    })

    const campaign = Campaign(props.match.params.address);
    const history = useHistory()

    React.useEffect(()=>{
        setCurrentPage('createRequest')
    },[])

    const validateForm = ()=>{
        let reEthAddress = /^0x[a-fA-F0-9]{40}$/i
        let description = document.getElementById("description")
        let ether = document.getElementById("ether")
        let recipient = document.getElementById("recipient")
        let disabled = false

        if(description.value.length === 0)
            disabled = true
        if(!ether.value || parseFloat(ether.value)<=0)
            disabled = true
        if(!reEthAddress.test(recipient.value))
            disabled = true

        setDisabledState(disabled)
    }

    const handleInput = (event)=>{
        validateForm()
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event)=> {
        event.preventDefault()
        setLoaders({
            ...loaders,
            submitting: true
        })

        let message = document.getElementById("message")
        message.classList.remove('alert-danger')
        message.classList.remove('alert-success')
        message.innerHTML = ""

        let amount = web3.utils.toWei(inputs.ether,'ether')
        campaign.methods.createRequest(inputs.description,amount,inputs.recipient)
            .send({from:account})
            .then(res=>{
                message.classList.add('alert-success')
                message.innerHTML = `New Request Created`
                setInputs({
                    description: '',
                    ether: '',
                    recipient: ''
                })
                setTimeout(() => {
                    history.push(`/campaigns/${props.match.params.address}/requests`)
                }, 3000)
            })
            .catch(err=>{
                message.classList.add('alert-danger')
                message.innerHTML = err.message
            })
            .finally(()=>{
                setLoaders({
                    ...loaders,
                    submitting: false
                })
            })
    }

    return(
        <React.Fragment>
            <div className="container">
                <h4>Create Request</h4>
                <hr/>
                <form>
                    <div className="input-group mb-3">
                        <input type="text" name="description" className="form-control" placeholder="Description"
                               value={inputs.description} onChange={handleInput} id="description"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" name="ether" className="form-control" placeholder="Amount"
                               value={inputs.ether} onChange={handleInput} id="ether"
                        />
                            <span className="input-group-text" id="basic-addon2">ETH</span>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="recipient" className="form-control" placeholder="0xRecipient"
                               value={inputs.recipient} onChange={handleInput} id="recipient"
                        />
                    </div>
                    <button type={"submit"} className="btn btn-primary"
                            disabled={disabledState || loaders.submitting} onClick={handleSubmit}
                    >Submit</button>
                    <span style={{margin:'0.5rem'}}>
                        {loaders.submitting && <i className="fa fa-spinner fa-spin fa-lg"/>}
                    </span>
                </form>
                <hr/>
                <div className="alert" role="alert" id="message"/>
            </div>
        </React.Fragment>
    )
}

export default CreateRequest;