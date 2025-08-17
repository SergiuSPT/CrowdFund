import React,{useState, createContext, useContext} from "react";
import Layout from "../../Components/Layout";
import Form from "../../Components/Forms";
import MinContributionContext from "../../Contexts/minContributionContext";
import ErrorMessageContext from "../../Contexts/ErrorMessageContext";
import LoadingContext from "../../Contexts/LoadingContext";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes";

export default function CamapignNew(){
    const [minContribution, setMinContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContribution).send({
                from: accounts[0]
            });
            
            Router.pushRoute('/');
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return (
        <Layout>
            <h3>Create Campaign:</h3>
            <MinContributionContext.Provider value={{ minContribution, setMinContribution }}>
                <ErrorMessageContext.Provider value={{errorMessage, setErrorMessage}}>
                    <LoadingContext.Provider value={{loading, setLoading}}>
                    <Form onSubmit={handleSubmit} />
                    </LoadingContext.Provider>
                </ErrorMessageContext.Provider>
            </MinContributionContext.Provider>
        </Layout>
    );
}