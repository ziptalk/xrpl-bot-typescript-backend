import React, { useState } from 'react';
import Web3 from 'web3';
import ArbitrageContract from './contracts/ArbitrageContract.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');

  const initWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.requestAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ArbitrageContract.networks[networkId];
    const instance = new web3.eth.Contract(
      ArbitrageContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
    setWeb3(web3);
    setAccounts(accounts);
    setContract(instance);
  };

  const handleDeposit = async () => {
    await contract.methods.deposit(amount, token).send({ from: accounts[0] });
    alert('Deposit successful');
  };

  const handleExecuteArbitrage = async () => {
    await contract.methods.executeArbitrage(accounts[0], token).send({ from: accounts[0] });
    alert('Arbitrage executed');
  };

  return (
    <div className="App">
      <button onClick={initWeb3}>Connect Wallet</button>
      <div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Token Address"
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <button onClick={handleExecuteArbitrage}>Execute Arbitrage</button>
      </div>
    </div>
  );
}

export default App;
