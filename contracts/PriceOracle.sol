// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PriceOracle {
    mapping(address => uint256) public currentPrices;
    mapping(address => uint256) public arbitragePrices;

    function setCurrentPrice(address token, uint256 price) external {
        currentPrices[token] = price;
    }

    function setArbitragePrice(address token, uint256 price) external {
        arbitragePrices[token] = price;
    }

    function getCurrentPrice(address token) external view returns (uint256) {
        return currentPrices[token];
    }

    function getArbitragePrice(address token) external view returns (uint256) {
        return arbitragePrices[token];
    }
}
