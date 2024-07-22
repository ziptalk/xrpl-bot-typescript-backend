// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArbitrageContract is Ownable {
    struct Deposit {
        uint256 amount;
        address token;
    }

    mapping(address => Deposit[]) public deposits;

    event DepositMade(address indexed user, uint256 amount, address token);
    event ArbitrageExecuted(address indexed user, uint256 profit, address token);

    function deposit(uint256 amount, address token) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender].push(Deposit(amount, token));
        emit DepositMade(msg.sender, amount, token);
    }

    function executeArbitrage(address user, address token) external onlyOwner {
        uint256 profit = calculateArbitrageProfit(user, token);
        require(profit > 0, "No arbitrage opportunity");
        IERC20(token).transfer(user, profit);
        emit ArbitrageExecuted(user, profit, token);
    }

    function calculateArbitrageProfit(address user, address token) internal view returns (uint256) {
        // 아비트리지 이익 계산 로직 구현
        return 100; // 예시 수익
    }

    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
}