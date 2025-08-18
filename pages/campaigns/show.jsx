import React from "react";
import { Card, Grid, Button, Container, Header, Segment, Icon } from "semantic-ui-react";
import Layout from "../../Components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../Components/ContributeForm";
import { Link } from "../../routes";

function CampaignShow(props) {
  function renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
    } = props;

    const items = [
  {
    header: manager,
    meta: "Address of Manager",
    description:
      "The manager created this campaign and can create requests to withdraw money.",
    style: { overflowWrap: "break-word" },
  },
  {
    header: minimumContribution.toString(),
    meta: "Minimum Contribution (wei)",
    description:
      "You must contribute at least this much wei to become an approver.",
  },
  {
    header: requestsCount.toString(),
    meta: "Number of Requests",
    description:
      "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
  },
  {
    header: approversCount.toString(),
    meta: "Number of Approvers",
    description:
      "Number of people who have already donated to this campaign.",
  },
  {
    header: web3.utils.fromWei(balance.toString(), "ether"),
    meta: "Campaign Balance (ether)",
    description:
      "The balance is how much money this campaign has left to spend.",
  },
];

    return <Card.Group items={items} itemsPerRow={2} stackable />;
  }

  return (
    <Layout>
      <Container style={{ marginTop: "3rem" }}>
        <Segment padded="very" style={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <Header as="h2" textAlign="center" color="teal" style={{ marginBottom: "2rem" }}>
            <Icon name="info circle" />
            <Header.Content>Campaign Details</Header.Content>
          </Header>

          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={10}>{renderCards()}</Grid.Column>

              <Grid.Column width={6}>
                <Segment raised>
                  <Header as="h3" textAlign="center" color="blue">
                    <Icon name="donate" />
                    Contribute to this Campaign
                  </Header>
                  <ContributeForm address={props.address} />
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${props.address}/requests`}>
                  <a>
                    <Button primary size="large" fluid style={{ borderRadius: "8px" }}>
                      <Icon name="money bill alternate" /> View Requests
                    </Button>
                  </a>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
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


export default CampaignShow;
