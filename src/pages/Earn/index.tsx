import * as React from 'react';
import { useEffect } from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import * as styles from '../EthBridge/styles.styl';
// import { IColumn, Table } from '../../components/Table';
// import { ERC20Select } from '../Exchange/ERC20Select';
import EarnRow from '../../components/Earn/EarnRow';
import { rewardsDepositKey, rewardsKey } from '../../stores/UserStore';
import { divDecimals } from '../../utils';

export const EarnRewards = observer((props: any) => {
  const { user, tokens, rewards } = useStores();

  useEffect(() => {
    rewards.init({
      isLocal: true,
      sorter: 'none',
      pollingInterval: 20000,
    });
    rewards.fetch();
  }, [rewards]);

  return (
    <BaseContainer>
      <PageContainer>
        <Box
          direction="row"
          wrap={true}
          fill={true}
          justify="between"
          align="start"
        >
          <Box
            direction="column"
            align="center"
            justify="center"
            className={styles.base}
          >
            {rewards.allData.map(rewardToken => {
              if (rewardToken.pending_rewards === '0') {
                return null;
              }

              let token = tokens.allData.find(
                element =>
                  element.dst_address === rewardToken.inc_token.address,
              );
              if (!token) {
                return null;
              }

              if (token.display_props.symbol === 'BAC') {
                token.price = '0.76';
              }

              const rewardsToken = {
                rewardsContract: rewardToken.pool_address,
                lockedAsset: rewardToken.inc_token.symbol,
                lockedAssetAddress: token.dst_address,
                totalLockedRewards: divDecimals(
                  Number(rewardToken.total_locked) * Number(token.price),
                  rewardToken.inc_token.decimals,
                ),
                rewardsDecimals: String(rewardToken.rewards_token.decimals),
                rewards:
                  user.balanceRewards[rewardsKey(rewardToken.inc_token.symbol)],
                deposit:
                  user.balanceRewards[
                    rewardsDepositKey(rewardToken.inc_token.symbol)
                  ],
                balance: user.balanceToken[token.src_coin],
                decimals: token.decimals,
                name: token.name,
                price: token.price,
                rewardsPrice: String(rewardToken.rewards_token.price),
                display_props: token.display_props,
                remainingLockedRewards: rewardToken.pending_rewards,
                deadline: Number(rewardToken.deadline),
              };

              return (
                <EarnRow
                  key={rewardToken.inc_token.symbol}
                  userStore={user}
                  token={rewardsToken}
                />
              );
            })}
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});