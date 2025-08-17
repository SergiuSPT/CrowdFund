import React from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../Components/Layout";
import factory from "../ethereum/factory";

export default function CampaignIndex({ campaigns }) {
  const renderCampaigns = () => {
    return campaigns.map((address) => {
      return (
        <Card
          fluid
          key={address}
          header={
            <div style={{ overflowWrap: "break-word" }}>
              {address}
            </div>
          }
          description={
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          }
        />
      );
    });
  };

  return (
    <Layout>
      <div style={{ marginBottom: "20px" }}>
        <Link route="/campaigns/new">
          <a>
            <Button primary floated="right">
              Create Campaign
            </Button>
          </a>
        </Link>
        <h3>Open Campaigns</h3>
      </div>
      <Card.Group>{renderCampaigns()}</Card.Group>
    </Layout>
  );
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};
