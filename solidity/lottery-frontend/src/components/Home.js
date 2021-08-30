import React from "react";
import web3 from "../web3";
import Lottery from "../contracts/Lottery";

function Home(){

    const [account, setAccount] = React.useState('')
    const [manager, setManager] = React.useState('')
    const [players, setPlayers] = React.useState([])
    const [balance, setBalance] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [inputs, setInputs] = React.useState({
        ether: '0.01'
    })

    React.useEffect(()=> {
        web3.eth.getAccounts()
            .then(accounts=>setAccount(accounts[0]))
        Lottery.methods.manager().call().then(setManager)
        Lottery.methods.getPlayers().call().then(setPlayers)
        web3.eth.getBalance(Lottery.options.address).then(setBalance)
    }, [])

    const handleInput = (event)=>{
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event)=>{
        event.preventDefault()
        setLoading(true)

        Lottery.methods.enter().send({
            from: account,
            value: web3.utils.toWei(inputs.ether,'ether')
        })
        .then(res=>{
            console.log(res)
            alert(`You are Entered!\nTxn Hash: ${res.transactionHash}`)
            setLoading(false)
        })
        .catch(err=> {
            console.log(err)
            alert(err.message)
            setLoading(false)
        })
    }

    return(
        <React.Fragment>
            <div className="container">
                <h2>LOTTERY CONTRACT</h2>
                <p>
                    This contract is managed by {manager}.
                    There are currently {players.length} entries,
                    competing to win {web3.utils.fromWei(balance,'ether')} ether!
                </p>

                <hr/>
                <form>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label htmlFor={"ether"}>Amount of ether to enter: </label>
                        <input type={"number"} name={"ether"}
                               value={inputs.ether}
                               onChange={handleInput}
                        />
                    </div>
                    <button type={"submit"} onClick={handleSubmit}>
                        Enter!
                    </button>
                    {loading && <i className="fa fa-spinner fa-spin fa-lg" style={{color:'#aaa'}}/>}
                </form>

            </div>
        </React.Fragment>
    )
}

export default Home;