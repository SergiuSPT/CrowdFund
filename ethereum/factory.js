import web3 from './web3';
import compiledFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
    compiledFactory.abi,
    process.env.FACTORY_CONTRACT_ADDRESS
);

export default instance;