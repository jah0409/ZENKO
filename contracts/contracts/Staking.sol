// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Flexible single-asset staking with continuously accruing rewards.
contract Staking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    // APY in basis points (e.g. 4000 = 40%). Owner-adjustable up to MAX_APY_BPS.
    uint256 public apyBps;
    uint256 public constant MAX_APY_BPS = 4000; // 40%

    uint256 private constant YEAR = 365 days;
    uint256 private constant BPS = 10_000;

    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt; // accrued but unclaimed
        uint256 lastUpdate;
        uint256 totalClaimed;
        uint256 startedAt;
    }

    mapping(address => StakeInfo) private _stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);
    event ApyUpdated(uint256 apyBps);

    constructor(address owner_, address token_, uint256 apyBps_) Ownable(owner_) {
        require(token_ != address(0), "token=0");
        require(apyBps_ <= MAX_APY_BPS, "apy too high");
        token = IERC20(token_);
        apyBps = apyBps_;
    }

    function setApy(uint256 newApyBps) external onlyOwner {
        require(newApyBps <= MAX_APY_BPS, "apy too high");
        apyBps = newApyBps;
        emit ApyUpdated(newApyBps);
    }

    function staked(address user) external view returns (uint256) {
        return _stakes[user].amount;
    }

    function stakeInfo(address user) external view returns (StakeInfo memory) {
        return _stakes[user];
    }

    function pendingRewards(address user) public view returns (uint256) {
        StakeInfo memory s = _stakes[user];
        return s.rewardDebt + _accrued(s);
    }

    function _accrued(StakeInfo memory s) internal view returns (uint256) {
        if (s.amount == 0) return 0;
        uint256 dt = block.timestamp - s.lastUpdate;
        return (s.amount * apyBps * dt) / (BPS * YEAR);
    }

    function _settle(address user) internal {
        StakeInfo storage s = _stakes[user];
        if (s.amount > 0) {
            s.rewardDebt += _accrued(s);
        }
        s.lastUpdate = block.timestamp;
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "amount=0");
        _settle(msg.sender);
        token.safeTransferFrom(msg.sender, address(this), amount);
        StakeInfo storage s = _stakes[msg.sender];
        s.amount += amount;
        if (s.startedAt == 0) s.startedAt = block.timestamp;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage s = _stakes[msg.sender];
        require(amount > 0 && amount <= s.amount, "bad amount");
        _settle(msg.sender);
        s.amount -= amount;
        token.safeTransfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claim() external nonReentrant {
        _settle(msg.sender);
        StakeInfo storage s = _stakes[msg.sender];
        uint256 reward = s.rewardDebt;
        require(reward > 0, "nothing to claim");
        s.rewardDebt = 0;
        s.totalClaimed += reward;
        require(token.balanceOf(address(this)) >= s.amount + reward, "reward pool low");
        token.safeTransfer(msg.sender, reward);
        emit Claimed(msg.sender, reward);
    }

    /// @notice Owner can fund the rewards pool with extra tokens.
    function fundRewards(uint256 amount) external onlyOwner {
        token.safeTransferFrom(msg.sender, address(this), amount);
    }
}
