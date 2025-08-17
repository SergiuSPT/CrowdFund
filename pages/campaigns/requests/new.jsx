import React,{use, useState} from "react";
import { Form, Button,Message, FormField, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../Components/Layout";

export default function RequestNew({address}){
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event){
        event.preventDefault();
        console.log("Submitting request..."); 
        console.log("Campaign address:", address);
        const campaign = Campaign(address);
        setLoading(true);
        setErrorMessage("");
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value,'ether'),
                recipient
            ).send({from:accounts[0] });
            Router.pushRoute(`/campaigns/${address}/requests`);
        }catch(err){
            setErrorMessage(err.message);
        }
        setLoading(false);
    }
    return(
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a request:</h3>
            <Form onSubmit={handleSubmit} error={!!errorMessage}>
                <FormField>
                    <label>Description</label>
                    <Input value={description} onChange={event => setDescription(event.target.value)} />
                </FormField>

                <FormField>
                    <label>Value in Ether</label>
                    <Input value={value} onChange={event => setValue(event.target.value)}/>
                </FormField>

                <FormField>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={event => setRecipient(event.target.value)}/>
                </FormField>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>Create</Button>
            </Form>
        </Layout>
    );
}


RequestNew.getInitialProps = async (props) => {
    const { address } = props.query;
    return { address };
};
