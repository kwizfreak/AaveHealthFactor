const Web3 = require('web3');
const fs = require('fs')
const BigNumber = require('bignumber.js');

const userAddress = process.env.ADDRESS || '0x1b7835d2074914161dD6A2d48E393Be1dbf296D1'
const infuraToken = process.env.INFURA_TOKEN

const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${infuraToken}`);
const LendingPool = new web3.eth.Contract(JSON.parse(fs.readFileSync('./LendingPool_ABI.json', 'utf8')), '0x398eC7346DcD622eDc5ae82352F02bE94C62d119');

const output = async () => {
  console.log('Block Number: ', await web3.eth.getBlockNumber())

  let healthFactor = (await LendingPool.methods.getUserAccountData(userAddress).call({}, '10394277')).healthFactor

  if(healthFactor === '115792089237316195423570985008687907853269984665640564039457584007913129639935') {
    healthFactor = 'NIL (No Collateral)'
  } else {
    healthFactor = BigNumber.healthFactordividedBy(1e18).toFixed(2)
  }
  console.log('Heath Factor: ', healthFactor)
}

output()