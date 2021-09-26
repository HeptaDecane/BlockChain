import React from "react";
import {GlobalContext} from "../GlobalContext";
import web3 from "../web3";
import Campaign from "../contracts/Campaign";

function ContributionForm(props){

    const {account} = React.useContext(GlobalContext)

    const [loaders, setLoaders] = React.useState({
        contributing: false,
    })
    const [inputs, setInputs] = React.useState({
        ether: '0.0'
    })

    const campaign = Campaign(props.address);

    React.useEffect(()=>{
        setInputs({
            ...inputs,
            ether: web3.utils.fromWei(props.minContribution)
        })
    },[props])

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
            contributing: true
        })

        let message = document.getElementById("message")
        message.classList.remove('alert-danger')
        message.classList.remove('alert-success')
        message.innerHTML = ""

        campaign.methods.contribute().send({
            from: account,
            value: web3.utils.toWei(inputs.ether,'ether')
        }).then(res=>{
            message.classList.add('alert-success')
            message.innerHTML = `contributed ${inputs.ether} ETH`
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }).catch(err=>{
            message.classList.add('alert-danger')
            message.innerHTML = err.message
        }).finally(()=>{
            setLoaders({
                ...loaders,
                contributing: false
            })
        })

    }

    return(
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <form>
                        <h5 className="card-title">Donate to this Campaign</h5>
                        <hr/>
                        <div className="input-group mb-3">
                            <input type={"number"} name={"ether"} className="form-control"
                                   value={inputs.ether} onChange={handleInput}
                            />
                            <span className="input-group-text">ETH</span>
                        </div>
                        <div className="d-grid gap-2">
                            <button type={"submit"} className="btn btn-primary"
                                    disabled={loaders.contributing} onClick={handleSubmit}
                            >
                                {loaders.contributing?
                                    <i className="fa fa-spinner fa-spin fa-lg"/>
                                    :
                                    <React.Fragment>Contribute</React.Fragment>
                                }
                            </button>
                            <hr/>
                            <div className="alert" role="alert" id="message" style={{fontSize:"0.7em"}}/>
                        </div>
                    </form>
                </div>
            </div>

        </React.Fragment>
    )

}

export default ContributionForm;