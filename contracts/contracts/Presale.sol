// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Presale is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    // tokens (with 18 decimals) per 1 ETH
    uint256 public tokensPerEth;
    uint256 public minContribution;
    uint256 public maxContribution;
    bool public whitelistOnly;
    bool public ended;

    uint256 public totalRaised;
    uint256 public totalSold;

    mapping(address => uint256) public contributions;
    mapping(address => uint256) public purchased;
    mapping(address => bool) public whitelisted;

    event Bought(address indexed buyer, uint256 ethIn, uint256 tokensOut);
    event Whitelisted(address indexed user, bool status);
    event Withdrawn(address indexed to, uint256 amount);
    event Ended();
    event PriceUpdated(uint256 tokensPerEth);

    constructor(
        address owner_,
        address token_,
        uint256 tokensPerEth_,
        uint256 minContribution_,
        uint256 maxContribution_,
        bool whitelistOnly_
    ) Ownable(owner_) {
        require(token_ != address(0), "token=0");
        require(tokensPerEth_ > 0, "rate=0");
        require(maxContribution_ >= minContribution_, "limits");
        token = IERC20(token_);
        tokensPerEth = tokensPerEth_;
        minContribution = minContribution_;
        maxContribution = maxContribution_;
        whitelistOnly = whitelistOnly_;
    }

    receive() external payable {
        buy();
    }

    function buy() public payable nonReentrant {
        require(!ended, "ended");
        require(msg.value >= minContribution, "below min");
        uint256 newTotal = contributions[msg.sender] + msg.value;
        require(newTotal <= maxContribution, "above max");
        if (whitelistOnly) {
            require(whitelisted[msg.sender], "not whitelisted");
        }

        uint256 tokensOut = (msg.value * tokensPerEth) / 1 ether;
        require(tokensOut > 0, "zero out");
        require(token.balanceOf(address(this)) >= tokensOut, "insufficient tokens");

        contributions[msg.sender] = newTotal;
        purchased[msg.sender] += tokensOut;
        totalRaised += msg.value;
        totalSold += tokensOut;

        token.safeTransfer(msg.sender, tokensOut);
        emit Bought(msg.sender, msg.value, tokensOut);
    }

    // ---- Owner controls ----

    function setWhitelist(address[] calldata users, bool status) external onlyOwner {
        for (uint256 i; i < users.length; ++i) {
            whitelisted[users[i]] = status;
            emit Whitelisted(users[i], status);
        }
    }

    function setWhitelistOnly(bool flag) external onlyOwner {
        whitelistOnly = flag;
    }

    function setLimits(uint256 min_, uint256 max_) external onlyOwner {
        require(max_ >= min_, "limits");
        minContribution = min_;
        maxContribution = max_;
    }

    function setRate(uint256 tokensPerEth_) external onlyOwner {
        require(tokensPerEth_ > 0, "rate=0");
        tokensPerEth = tokensPerEth_;
        emit PriceUpdated(tokensPerEth_);
    }

    function endPresale() external onlyOwner {
        ended = true;
        emit Ended();
    }

    function withdrawETH(address payable to) external onlyOwner {
        uint256 bal = address(this).balance;
        (bool ok, ) = to.call{value: bal}("");
        require(ok, "withdraw failed");
        emit Withdrawn(to, bal);
    }

    function withdrawUnsoldTokens(address to) external onlyOwner {
        require(ended, "not ended");
        uint256 bal = token.balanceOf(address(this));
        token.safeTransfer(to, bal);
    }
}
