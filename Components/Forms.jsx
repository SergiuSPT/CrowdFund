import React,{useContext} from "react";
import { FormField, Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import MinContributionContext from "../Contexts/minContributionContext";
import ErrorMessageContext from "../Contexts/ErrorMessageContext";
import LoadingContext from "../Contexts/LoadingContext";

export default function Forms({onSubmit}){
    const { minContribution, setMinContribution } = useContext(MinContributionContext);
    const { errorMessage, setErrorMessage} = useContext(ErrorMessageContext);
    const { loading, setLoading } = useContext(LoadingContext);
    return(
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <FormField>
                <label>Minimum Contribution</label>
                <Input label="wei" labelPosition="right" value={minContribution} 
                onChange={event => {
                    setMinContribution(event.target.value);
                }} />
            </FormField>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>Create</Button>
        </Form>
    );
}