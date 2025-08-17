import React, {useState, useContext} from "react";
import Layout from "../../Components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, CardGroup, Grid, GridColumn, Button, GridRow} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../Components/ContributeForm";
import ErrorMessageContext from "../../Contexts/ErrorMessageContext";
import LoadingContext from "../../Contexts/LoadingContext";
import { Link } from "../../routes";

export default function CampaignShow(props) {
    const { 
        address,
        balance,
        manager,
        minimumContribution,
        requestsCount,
        approversCount
    } = props;

    const items = [
        {
            header: manager,
            meta: "Address of Manager",
            description: "The manager created this campaign and can create requests to withdraw money.",
            style: { overflowWrap: "break-word" }
        },
        {
            header: minimumContribution,
            meta: "Minimum Contribution (wei)",
            description: "You must contribute at least this much wei to become an approver."
        },
        {
            header: requestsCount,
            meta: "Number of Requests",
            description: "A request tries to withdraw money from the contract. Requests must be approved by approvers."
        },
        {
            header: approversCount,
            meta: "Number of Approvers",
            description: "Number of people who have already donated to this campaign."
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: "Campaign Balance (ether)",
            description: "The balance is how much money this campaign has left to spend."
        }
    ];
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <GridRow>
                    <GridColumn width={10}>
                        <CardGroup items={items} />
                    </GridColumn>
                    <GridColumn width={6}>
                        <ErrorMessageContext.Provider value={{errorMessage, setErrorMessage}}>
                            <LoadingContext.Provider value={{loading, setLoading}}>
                                <ContributeForm address={address} />
                            </LoadingContext.Provider>
                        </ErrorMessageContext.Provider>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <Link route={`/campaigns/${address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </GridColumn>
                </GridRow>
            </Grid>
            
            
        </Layout>
    );
}

CampaignShow.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        address: props.query.address,
        minimumContribution: summary[0].toString(),
        balance: summary[1].toString(),
        requestsCount: summary[2].toString(),
        approversCount: summary[3].toString(),
        manager: summary[4],
    };
};
