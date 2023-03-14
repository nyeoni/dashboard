import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import Header from './components/common/Header';
import { theme } from './style/theme';
import Content from './components/common/Content';
import ApplicationInfoChart from './components/containers/ApplicationInfoChart';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const HOUR = 1000 * 60 * 60;
function App() {
  // const [act]

  //   const httpcSeries = useSeries('exception/{stime}/{etime}', { stime: Date.now() - HOUR, etime: Date.now() });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Content>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ApplicationInfoChart />
        </ErrorBoundary>
      </Content>
      <div style={{ padding: 20 }}>
        <h1>Open API (Application)</h1>
        <a href="https://docs.whatap.io/kr/appendix/open_api_application.pdf" target="_blank">
          가이드 문서
        </a>
        {/* <h2>프로젝트 API 예시</h2>
        <h3>Spot 정보 조회 URL</h3>
        <pre>{JSON.stringify(inactAgent, null, 4)}</pre>
        <pre>{JSON.stringify(actAgent, null, 4)}</pre>
        <pre>{JSON.stringify(actSQL, null, 4)}</pre>
        <hr />
        <h3>통계 정보 조회 URL</h3> */}
        {/* <pre>{JSON.stringify(httpcSeries, null, 4)}</pre> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
