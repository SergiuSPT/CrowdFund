import React,{useState} from "react";
import { Button,Table,TableRow, TableHeaderCell,TableHeader,TableBody } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../Components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../Components/RequestRow";

export default function RequestIndex(props){
    function renderRow(){
        return(
            props.requests.map((request,index) => {
                return(
                    <RequestRow key={index} id={index} request={request} address={props.address} approversCount={props.approversCount}/>
                );
            })
        );

    }
    return(
        <Layout>
        <h3>Request List</h3>
        <Link route={`/campaigns/${props.address}/requests/new`}>
            <a>
                <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
            </a>
        </Link>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Recipient</TableHeaderCell>
                    <TableHeaderCell>Approval Count</TableHeaderCell>
                    <TableHeaderCell>Approve</TableHeaderCell>
                    <TableHeaderCell>Finalize</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {renderRow()}
            </TableBody>
        </Table>
        <div>Found {props.requestCount} requests</div>
        </Layout>
    );
}

RequestIndex.getInitialProps = async (props) => {
    const {address} = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element,index) => {
            return campaign.methods.requests(index).call()
        })
    );

    const serializedRequests = requests.map(request => ({
      description: request.description,
      value: request.value.toString(),
      recipient: request.recipient,
      isComplete: request.isComplete,
      approvalCount: request.approvalCount.toString()
    }));

    return { 
      address, 
      requests: serializedRequests, 
      requestCount: requestCount.toString(),
      approversCount: approversCount.toString() 
    };
};