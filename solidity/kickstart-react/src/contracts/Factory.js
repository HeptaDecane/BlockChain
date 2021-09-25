import web3 from '../web3';
import factoryInterface from './Factory.json';

const address = '0x692c95698637D852ed9781F03e38C8aF6A3D5a35'

const Factory = new web3.eth.Contract(factoryInterface.abi,address)
export default Factory;