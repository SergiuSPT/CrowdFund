import React from "react";
import {Table, TableRow, TableCell, Button} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

export default function RequestRow(props){
    async function handleApprove(){
        const campaign = await Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({
            from: accounts[0]
        });
    }
    async function handleFinalize(){
        const campaign = await Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({
            from: accounts[0]
        });
    }

    const readyToFinalize =
    parseInt(props.request.approvalCount) > props.approversCount / 2;

    return(
        <TableRow disabled={props.request.isComplete}
      positive={readyToFinalize && !props.request.isComplete}>
            <TableCell>{props.id +1}</TableCell>
            <TableCell>{props.request.description}</TableCell>
            <TableCell>{web3.utils.fromWei(props.request.value,'ether')}</TableCell>
            <TableCell>{props.request.recipient}</TableCell>
            <TableCell>{props.request.approvalCount}/{props.approversCount}</TableCell>
            <TableCell>{props.request.isComplete ? null: (<Button color="green" basic onClick={handleApprove}>Approve</Button>)}</TableCell>
            <TableCell>{props.request.isComplete ? null: (<Button color="teal" basic onClick={handleFinalize}>Finalize</Button>)}</TableCell>
        </TableRow>
    );
}