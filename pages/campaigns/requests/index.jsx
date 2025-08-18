import React, { useState } from "react"; 
import { Button, Card, Container, Header, Icon, Message, Grid } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import Layout from "../../../Components/Layout";
import web3 from "../../../ethereum/web3";

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [message, setMessage] = useState({ content: "", type: "" });

  const onApprove = async (index) => {
    const campaign = Campaign(address);
    setLoadingIndex(index);
    setMessage({ content: "", type: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(index).send({ from: accounts[0] });
      setMessage({ content: `Request #${index} approved successfully!`, type: "success" });
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
    }

    setLoadingIndex(null);
  };

  const onFinalize = async (index) => {
    const campaign = Campaign(address);
    setLoadingIndex(index);
    setMessage({ content: "", type: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
      setMessage({ content: `Request #${index} finalized successfully!`, type: "success" });
    } catch (err) {
      setMessage({ content: err.message, type: "error" });
    }

    setLoadingIndex(null);
  };

  const renderRequests = () => {
    return requests.map((req, index) => {
      const approvalCount = parseInt(req.approvalCount);
      const totalApprovers = parseInt(approversCount);
      const readyToFinalize = approvalCount > totalApprovers / 2;

      return (
        <Card key={index} fluid color={readyToFinalize ? "green" : "blue"}>
          <Card.Content>
            <Card.Header>
              <Icon name="file alternate outline" /> Request #{index}
            </Card.Header>
            <Card.Meta>{req.description}</Card.Meta>
            <Card.Description>
              <p>
                <strong>Amount:</strong> {web3.utils.fromWei(req.value, "ether")} ETH
              </p>
              <p>
                <strong>Recipient:</strong>{" "}
                <span style={{ overflowWrap: "break-word" }}>{req.recipient}</span>
              </p>
              <p>
                <strong>Approvals:</strong> {approvalCount}/{totalApprovers}
              </p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Grid columns={2} stackable>
              <Grid.Column>
                {req.complete ? (
                  <Message positive compact size="tiny">
                    Completed
                  </Message>
                ) : (
                  <Button
                    basic
                    color="green"
                    icon
                    labelPosition="left"
                    style={{ marginBottom: "0.5rem" }}
                    onClick={() => onApprove(index)}
                    loading={loadingIndex === index}
                    disabled={loadingIndex === index}
                  >
                    <Icon name="thumbs up" />
                    Approve
                  </Button>
                )}
              </Grid.Column>
              <Grid.Column textAlign="right">
                {!req.complete && (
                  <Button
                    basic
                    color="blue"
                    icon
                    labelPosition="left"
                    onClick={() => onFinalize(index)}
                    loading={loadingIndex === index}
                    disabled={loadingIndex === index}
                  >
                    <Icon name="check" />
                    Finalize
                  </Button>
                )}
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      );
    });
  };

  return (
    <Layout>
      <Container style={{ marginTop: "2rem" }}>
        <Header as="h2" textAlign="center" color="blue">
          <Icon name="tasks" />
          Requests
          <Header.Subheader>
            A list of spending requests for this campaign
          </Header.Subheader>
        </Header>

        <div style={{ marginBottom: "1.5rem", textAlign: "right" }}>
          <Link route={`/campaigns/${address}/requests/new`}>
            <a>
              <Button primary icon labelPosition="left">
                <Icon name="plus" />
                Add Request
              </Button>
            </a>
          </Link>
        </div>

        {message.content && (
          <Message
            success={message.type === "success"}
            error={message.type === "error"}
            content={message.content}
          />
        )}

        <Card.Group stackable itemsPerRow={1}>
          {renderRequests()}
        </Card.Group>
      </Container>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);

  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((_, index) => campaign.methods.requests(index).call())
  );

  const safeRequests = requests.map(req => ({
    description: req.description,
    value: req.value.toString(),
    recipient: req.recipient,
    approvalCount: req.approvalCount.toString(),
    complete: req.complete,
  }));

  return {
    address,
    requests: safeRequests,
    requestCount: requestCount.toString(),
    approversCount: approversCount.toString(),
  };
};

export default RequestIndex;
