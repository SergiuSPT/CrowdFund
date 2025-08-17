import Web3 from 'web3';

let web3;

if(typeof window!=="undefined" && typeof window.ethereum !== "undefined"){
    //We are in the browser and Metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}else{
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/b93af1c9943a4f71b4d24267d43283b1"
    );
    web3 = new Web3(provider);
}

export default web3;