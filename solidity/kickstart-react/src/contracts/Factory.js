import web3 from '../web3';
import factoryInterface from './Factory.json';

const address = '0x4BD888bb0377101eaB60F1CdF65Ef44836A21e35'

const factory = new web3.eth.Contract(factoryInterface.abi,address)
export default factory;