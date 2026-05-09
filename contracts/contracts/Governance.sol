// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Stake-to-vote DAO with timelocked execution.
contract Governance is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    uint256 public votingPeriod = 3 days;
    uint256 public timelockDelay = 2 days;
    uint256 public proposalThreshold;
    uint256 public quorum;

    enum State { Pending, Active, Defeated, Succeeded, Queued, Executed, Canceled }

    struct Proposal {
        address proposer;
        string description;
        address target;
        uint256 value;
        bytes data;
        uint256 startTime;
        uint256 endTime;
        uint256 eta;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        bool canceled;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public votingPower; // staked balance for voting

    event ProposalCreated(uint256 indexed id, address indexed proposer, string description);
    event Voted(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event Queued(uint256 indexed id, uint256 eta);
    event Executed(uint256 indexed id);
    event Canceled(uint256 indexed id);
    event StakedForVoting(address indexed user, uint256 amount);
    event UnstakedFromVoting(address indexed user, uint256 amount);

    constructor(address token_, uint256 proposalThreshold_, uint256 quorum_) {
        require(token_ != address(0), "token=0");
        token = IERC20(token_);
        proposalThreshold = proposalThreshold_;
        quorum = quorum_;
    }

    // ---- Voting power management ----

    function stakeForVoting(uint256 amount) external nonReentrant {
        require(amount > 0, "amount=0");
        token.safeTransferFrom(msg.sender, address(this), amount);
        votingPower[msg.sender] += amount;
        emit StakedForVoting(msg.sender, amount);
    }

    function unstakeFromVoting(uint256 amount) external nonReentrant {
        require(amount > 0 && amount <= votingPower[msg.sender], "bad amount");
        votingPower[msg.sender] -= amount;
        token.safeTransfer(msg.sender, amount);
        emit UnstakedFromVoting(msg.sender, amount);
    }

    // ---- Proposal lifecycle ----

    function propose(
        string calldata description,
        address target,
        uint256 value,
        bytes calldata data
    ) external returns (uint256 id) {
        require(votingPower[msg.sender] >= proposalThreshold, "below threshold");
        id = ++proposalCount;
        Proposal storage p = proposals[id];
        p.proposer = msg.sender;
        p.description = description;
        p.target = target;
        p.value = value;
        p.data = data;
        p.startTime = block.timestamp;
        p.endTime = block.timestamp + votingPeriod;
        emit ProposalCreated(id, msg.sender, description);
    }

    function castVote(uint256 id, bool support) external {
        Proposal storage p = proposals[id];
        require(state(id) == State.Active, "not active");
        require(!hasVoted[id][msg.sender], "already voted");
        uint256 weight = votingPower[msg.sender];
        require(weight > 0, "no power");
        hasVoted[id][msg.sender] = true;
        if (support) p.forVotes += weight;
        else p.againstVotes += weight;
        emit Voted(id, msg.sender, support, weight);
    }

    function queue(uint256 id) external {
        require(state(id) == State.Succeeded, "not succeeded");
        Proposal storage p = proposals[id];
        p.eta = block.timestamp + timelockDelay;
        emit Queued(id, p.eta);
    }

    function execute(uint256 id) external payable nonReentrant {
        require(state(id) == State.Queued, "not queued");
        Proposal storage p = proposals[id];
        require(block.timestamp >= p.eta, "timelock");
        p.executed = true;
        if (p.target != address(0) && p.data.length > 0) {
            (bool ok, ) = p.target.call{value: p.value}(p.data);
            require(ok, "exec failed");
        }
        emit Executed(id);
    }

    function cancel(uint256 id) external {
        Proposal storage p = proposals[id];
        require(msg.sender == p.proposer, "not proposer");
        require(!p.executed, "executed");
        p.canceled = true;
        emit Canceled(id);
    }

    function state(uint256 id) public view returns (State) {
        Proposal storage p = proposals[id];
        if (p.canceled) return State.Canceled;
        if (p.executed) return State.Executed;
        if (block.timestamp <= p.endTime) {
            return p.startTime == 0 ? State.Pending : State.Active;
        }
        uint256 total = p.forVotes + p.againstVotes;
        if (total < quorum || p.forVotes <= p.againstVotes) return State.Defeated;
        if (p.eta == 0) return State.Succeeded;
        return State.Queued;
    }
}
