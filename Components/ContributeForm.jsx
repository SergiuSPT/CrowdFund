import React,{useState, useContext} from "react";
import { Button, Form, FormField, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from "../routes";
import ErrorMessageContext from "../Contexts/ErrorMessageContext";
import LoadingContext from "../Contexts/LoadingContext";

export default function ContributeForm({address}){
    const [value, setValue] = useState('');
    const { errorMessage, setErrorMessage} = useContext(ErrorMessageContext);
    const { loading, setLoading } = useContext(LoadingContext);
    async function handleSubmit(event){
        event.preventDefault();
        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage("");
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.replaceRoute(`/campaigns/${address}`);
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
        setValue("");
    }
    return(
        <div>
            <h3>Contribute to this campaign!</h3>
            <Form onSubmit={handleSubmit} error={!!errorMessage}>
                <FormField>
                    <label>Amount to contribute</label>
                    <Input 
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        label="ether"
                        labelPosition="right"
                    />
                </FormField>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>Contribute!</Button>
            </Form>
        </div>
    );
}