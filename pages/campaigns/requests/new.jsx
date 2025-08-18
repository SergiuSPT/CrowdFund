import React, { useState } from "react";
import { Form, Button, Input, Message, Container, Segment, Header, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../Components/Layout";

const RequestNew = ({ address }) => {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Container style={{ marginTop: "2rem" }}>
        <Segment padded="very">
          <Header as="h2" icon textAlign="center" color="blue">
            <Icon name="file alternate outline" />
            Create a New Request
            <Header.Subheader>
              Propose how to spend this campaign’s funds
            </Header.Subheader>
          </Header>

          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label>Description</label>
              <Input
                placeholder="Describe what the request is for"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Value in Ether</label>
              <Input
                label="ETH"
                labelPosition="right"
                placeholder="Amount"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Field>

            <Form.Field>
              <label>Recipient</label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </Form.Field>

            <Message error header="Oops!" content={errorMessage} />

            <Button
              loading={loading}
              primary
              fluid
              style={{ marginTop: "1rem" }}
              icon
              labelPosition="left"
            >
              <Icon name="plus" />
              Create Request
            </Button>
          </Form>
        </Segment>
      </Container>
    </Layout>
  );
};

// 👇 Important: serialize `address` properly
RequestNew.getInitialProps = async (props) => {
  return { address: props.query.address };
};

export default RequestNew;
