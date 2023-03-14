import { useEffect, useMemo, useState } from 'react';
import api from './api/api';
import { useSpot } from './hooks/useSpot';
import { useSeries } from './hooks/useSeries';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import Header from './components/common/Header';
import { theme } from './style/theme';
import Pannel from './components/common/Pannel';
import Content from './components/common/Content';

const HOUR = 1000 * 60 * 60;
function App() {
  // const [act]
  const [inactAgent] = useSpot('inact_agent');
  const [actAgent] = useSpot('act_agent');
  const [actSQL] = useSpot('act_sql');
  const httpcSeries = useSeries('exception/{stime}/{etime}', { stime: Date.now() - HOUR, etime: Date.now() });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Content>
        <Pannel title="title">texttexttexttext</Pannel>
      </Content>
      <div style={{ padding: 20 }}>
        <h1>Open API (Application)</h1>
        <a href="https://docs.whatap.io/kr/appendix/open_api_application.pdf" target="_blank">
          가이드 문서
        </a>
        <h2>프로젝트 API 예시</h2>
        <h3>Spot 정보 조회 URL</h3>
        <pre>{JSON.stringify(inactAgent, null, 4)}</pre>
        <pre>{JSON.stringify(actAgent, null, 4)}</pre>
        <pre>{JSON.stringify(actSQL, null, 4)}</pre>
        <hr />
        <h3>통계 정보 조회 URL</h3>
        {/* <pre>{JSON.stringify(httpcSeries, null, 4)}</pre> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
