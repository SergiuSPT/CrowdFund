//SPDX-License-identifier:MIT
pragma solidity >=0.8.0;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool isComplete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public restricted {
        requests.push();
        Request storage newRequest = requests[requests.length - 1];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.isComplete = false;
        newRequest.approvalCount = 0;
    }

    function getRequest(
        uint index
    )
        public
        view
        returns (
            string memory description,
            uint value,
            address recipient,
            bool isComplete,
            uint approvalCount
        )
    {
        Request storage request = requests[index];
        return (
            request.description,
            request.value,
            request.recipient,
            request.isComplete,
            request.approvalCount
        );
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.isComplete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        request.isComplete = true;
    }

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
}
