usePlugin('@nomiclabs/buidler-truffle5');
usePlugin('solidity-coverage');

module.exports = {
  networks: {
    buidlerevm: {
      gas: 95000000,
      blockGasLimit: 95000000,
    },
  },
  solc: {
    version: '0.6.10',
    optimizer: {
      enabled: true,
      runs: 200,
    },
    evmVersion: 'constantinople',
  },
};
