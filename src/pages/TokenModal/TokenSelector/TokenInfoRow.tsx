import React from 'react';
import SoftTitleValue from '../../../components/Earn/SoftTitleValue';
import { Image } from 'semantic-ui-react';
import cn from 'classnames';
import * as styles from '../styles.styl';

import { CopyWithFeedback } from '../../../components/Swap/CopyWithFeedback';
import { FlexRowSpace } from '../../../components/Swap/FlexRowSpace';
import { SwapToken } from '../types/SwapToken';
import BigNumber from 'bignumber.js';
import { displayHumanizedBalance, humanizeBalance } from 'utils/formatNumber';

export const TokenInfoRow = (props: { token: SwapToken; balance?: any; onClick?: any }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className={cn(styles.tokenInfoRow)} onClick={props.onClick}>
        <div className={cn(styles.tokenInfoItemsLeft)}>
          <Image src={props.token.logo} avatar style={{ boxShadow: 'rgba(0, 0, 0, 0.075) 0px 6px 10px' }} />
          <SoftTitleValue title={props.token.symbol} subTitle={props.token.symbol} />
        </div>
        <FlexRowSpace />
        <h3 className={cn(styles.tokenInfoItemsRight)}>
          {
            displayHumanizedBalance(
            humanizeBalance(new BigNumber(props.balance as BigNumber),props.token.decimals),
            BigNumber.ROUND_DOWN,)
          }
        </h3>
      </div>
      {/* <h3 style={{ margin: 'auto',color:'#5F5F6B' }} hidden={!props.token.address}>
        <CopyWithFeedback text={props.token.address} />
      </h3> */}
    </div>
  );
};