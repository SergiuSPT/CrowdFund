import React from "react";
import { Card, Button, Container, Header, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../Components/Layout";
import { Link } from "../routes";

function CampaignIndex({ campaigns }) {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: (
          <div style={{ overflowWrap: "break-word", fontSize: "1rem" }}>
            {address}
          </div>
        ),
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>
              <Button primary fluid style={{ marginTop: "0.5rem" }}>
                <Icon name="eye" /> View Campaign
              </Button>
            </a>
          </Link>
        ),
        color: "teal",
        fluid: true,
        style: {
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "1rem",
        },
      };
    });

    return <Card.Group items={items} stackable itemsPerRow={3} />;
  };

  return (
    <Layout>
      <Container style={{ marginTop: "2rem" }}>
        <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
          <Icon name="ethereum" color="teal" />
          <Header.Content>Open Campaigns</Header.Content>
        </Header>

        {renderCampaigns()}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link route="/campaigns/new">
            <a>
              <Button primary size="large" icon labelPosition="left">
                <Icon name="add circle" />
                Create Campaign
              </Button>
            </a>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
