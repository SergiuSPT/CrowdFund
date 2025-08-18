import React, { useState } from "react";
import { Form, Button, Input, Message, Container, Segment, Header, Icon } from "semantic-ui-react";
import Layout from "../../Components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

function CampaignNew() {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Container style={{ marginTop: "3rem", maxWidth: "600px" }}>
        <Segment padded="very" style={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <Header as="h2" textAlign="center" color="teal" style={{ marginBottom: "1.5rem" }}>
            <Icon name="plus circle" />
            <Header.Content>Create a New Campaign</Header.Content>
          </Header>

          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Minimum Contribution (wei)
              </label>
              <Input
                label="wei"
                labelPosition="right"
                placeholder="Enter amount in wei"
                value={minimumContribution}
                onChange={(e) => setMinimumContribution(e.target.value)}
                style={{ fontSize: "1rem" }}
              />
            </Form.Field>

            <Message error header="Oops!" content={errorMessage} />

            <Button
              primary
              loading={loading}
              fluid
              size="large"
              style={{ borderRadius: "8px", marginTop: "1rem" }}
            >
              <Icon name="rocket" /> Create Campaign
            </Button>
          </Form>
        </Segment>
      </Container>
    </Layout>
  );
}

export default CampaignNew;
