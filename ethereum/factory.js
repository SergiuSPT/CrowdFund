import web3 from './web3';
import compiledFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
    compiledFactory.abi,
    "0x8277e446e12Ce320B1A44EBDdf6c0e1F75Ffd176"
);

export default instance;