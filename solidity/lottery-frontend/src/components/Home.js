import React from "react";
import web3 from "../web3";
import Lottery from "../contracts/Lottery";

function Home(){

    const [account, setAccount] = React.useState('')
    const [manager, setManager] = React.useState('')
    const [players, setPlayers] = React.useState([])
    const [balance, setBalance] = React.useState('')
    const [loaders, setLoaders] = React.useState({
        enter: false,
        pickWinner: false
    })
    const [inputs, setInputs] = React.useState({
        ether: '0.01'
    })

    React.useEffect(()=> {
        web3.eth.getAccounts()
            .then(accounts=>setAccount(accounts[0]))
        Lottery.methods.manager().call().then(setManager)
        Lottery.methods.getPlayers().call().then(setPlayers)
        web3.eth.getBalance(Lottery.options.address).then(setBalance)

        window.ethereum.on('accountsChanged',(accounts)=>setAccount(accounts[0]))

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
            enter: true
        })

        Lottery.methods.enter().send({
            from: account,
            value: web3.utils.toWei(inputs.ether,'ether')
        })
        .then(res=>{
            console.log(res)
            alert(`You are Entered!\nTxn Hash: ${res.transactionHash}`)
            setLoaders({
                ...loaders,
                enter: false
            })
        })
        .catch(err=> {
            console.log(err)
            alert(err.message)
            setLoaders({
                ...loaders,
                enter: false
            })
        })
    }

    const pickWinner = ()=>{
        setLoaders({
            ...loaders,
            pickWinner: true
        })

        Lottery.methods.pickWinner().send({from:account})
            .then(res=>{
                console.log(res)
                setLoaders({
                    ...loaders,
                    pickWinner: false
                })
                getLastWinner()
            })
            .catch(err=>{
                console.log(err)
                alert(err.message)
                setLoaders({
                    ...loaders,
                    pickWinner: false
                })
            })

        const getLastWinner = () => {
          Lottery.methods.lastWinner().call()
              .then(res=>alert(`winner: ${res}`))
              .catch(console.log)
        }
    }


    return(
        <React.Fragment>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container justify-content-end">
                    <span className="navbar-text">
                        <i className="fa fa-wallet fa-lg"/>
                        <span style={{padding:'2px'}}/>
                        {account.slice(0,6)}...{account.slice(-4)}
                    </span>
                </div>
            </nav>

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
                        <label htmlFor={"ether"}>Amount of ether to enter:</label>
                        <input type={"number"} name={"ether"} style={{margin: '8px'}}
                               value={inputs.ether}
                               onChange={handleInput}
                        />
                    </div>
                    <button type={"submit"} onClick={handleSubmit}>
                        Enter!
                    </button>
                    {loaders.enter && <i className="fa fa-spinner fa-spin fa-lg" style={{color:'#aaa'}}/>}
                </form>

                <hr/>

                {(account && account===manager) && <React.Fragment>
                    <h4>Ready to pick a winner?</h4>
                    <button onClick={pickWinner}>pick a winner!</button>
                    {loaders.pickWinner && <i className="fa fa-spinner fa-spin fa-lg" style={{color:'#aaa'}}/>}
                    <hr/>
                </React.Fragment>}

            </div>
        </React.Fragment>
    )
}

export default Home;