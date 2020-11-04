import { Contract } from 'web3-eth-contract';
import { getAddress } from '@harmony-js/crypto';
import Web3 from 'web3';
import { mulDecimals } from '../../utils';
import { ethToWei, getGasPrice } from './helpers';
const BN = require('bn.js');

export interface IEthMethodsInitParams {
  web3: Web3;
  ethManagerContract: Contract;
}

export class EthMethods {
  private web3: Web3;
  private ethManagerContract: Contract;

  constructor(params: IEthMethodsInitParams) {
    this.web3 = params.web3;
    this.ethManagerContract = params.ethManagerContract;
  }

  swapEth = async (userAddr, amount, sendTxCallback?) => {
    // @ts-ignore
    const accounts = await ethereum.enable();

    //const bob = this.web3.utils.fromAscii(userAddr)
    const hmyAddrHex = this.web3.utils.fromAscii(userAddr) //this.web3.eth.abi.encodeParameter('bytes', userAddr) //getAddress(userAddr).checksum; todo: add validation

    const estimateGas = await this.ethManagerContract.methods
      .swap(hmyAddrHex)
      .estimateGas({
        value: ethToWei(amount),
        from: accounts[0]
      });

    const gasLimit = Math.max(
      estimateGas + estimateGas * 0.3,
      Number(process.env.ETH_GAS_LIMIT),
    );

    let transaction = await this.ethManagerContract.methods
      .swap(hmyAddrHex)
      .send({
        value: ethToWei(amount),
        from: accounts[0],
        gas: new BN(gasLimit),
        gasPrice: await getGasPrice(this.web3)
      })
      .on('transactionHash', hash => sendTxCallback(hash));

    return transaction.events.Locked;
  };

  checkEthBalance = async addr => {
    return await this.web3.eth.getBalance(addr);
  };
}
