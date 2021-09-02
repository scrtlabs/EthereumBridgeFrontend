import React, { Suspense } from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { EthBridge } from './pages/EthBridge';
import { Explorer } from './pages/Explorer';
import { Tokens } from './pages/Tokens';
import { InfoModal } from './components/InfoModal';
import { EarnRewards } from './pages/Earn';
import { FAQPage } from './pages/FAQ';
import { FinancePage } from './pages/Finance';

export const App: React.FC = () => (
  <Providers>
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/tokens" component={Tokens} />
        <Route exact path="/faq" component={FAQPage} />
        <Route exact path="/finance" component={FinancePage} />
        <Route exact path="/explorer" component={Explorer} />
        <Route exact path="/earn" component={EarnRewards} />
        <Route exact path="/" component={EthBridge} />
        <Route exact path="/operations/:operationId" component={EthBridge} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
    <ActionModals />
    <InfoModal />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);
