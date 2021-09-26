import web3 from "../web3";
import campaignInterface from './Campaign.json'

function Campaign(address){
    return new web3.eth.Contract(campaignInterface.abi,address)
}

export default Campaign;