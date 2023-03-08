import { getPath } from '../utils';
import {
  OpenApiInfoType,
  OpenApiKeyType,
  OpenApiResponseType,
  OpenApiSubKeyType,
  OpenApiType,
  jsonKey,
  rootKey,
} from './types';

// .env -> 에 넣어서 다시 리팩토링할 예정

// api header -> using .env vals
const OPEN_API_HEADERS = {
  'x-whatap-pcode': import.meta.env.VITE_DEMO_PROJECT_CODE,
  'x-whatap-token': import.meta.env.VITE_DEMO_PROJECT_API_TOCKEN,
};

// open-api categorys
const OPEN_API: OpenApiType = {
  '': {
    act_agent: '활성화 상태의 에이전트 수',
    inact_agent: '비활성화 상태의 에이전트 수',
    host: '호스트 수',
    cpucore: '호스트의 CPU 코어 합',
    txcount: '트랜잭션 수',
    tps: '초당 트랜잭션 수',
    user: '5분간 집계된 고유 사용자 수',
    actx: '액티브 트랜잭션 수',
    rtime: '평균 응답 시간',
    cpu: 'CPU 사용률',
    threadpool_active: '쓰레드풀 활성 쓰레드 수',
    threadpool_queue: '쓰레드풀 큐잉 쓰레드 수',
    dbc_count: '전체 DB Connection 수',
    dbc_active: '활성(Active) DB Connection 수',
    dbc_idle: '비활성(Idle) DB Connection 수',
    act_method: '액티브 Method 수',
    act_sql: '액티브 SQL 수',
    act_httpc: '액티브 HTTP Call 수',
    act_dbc: '액티브 DB Connection 수',
    act_socket: '액티브 Socket 수',
  },
  json: {
    'exception/{stime}/{etime}': 'Exception 발생 ',
  },
};

// url, name 을 반환해주는 함수 -> 콜스택에 최대한 안쌓이게 하기 위해서 async 로 처리함
async function getOpenApiInfo<T extends OpenApiKeyType>(type: T, key: OpenApiSubKeyType<T>): Promise<OpenApiInfoType> {
  if (key in OPEN_API[type]) {
    const data = {
      url: [import.meta.env.VITE_OPEN_API_ROOT, type, key].filter((path) => !!path).join('/'),
      name: OPEN_API[type][key],
    };
    return data;
  } else {
    throw Error('Invalid type');
  }
}

async function fetchOpenApi<T extends OpenApiKeyType>(
  type: T,
  key: OpenApiSubKeyType<T>,
  param?: Record<string, any>,
): Promise<OpenApiResponseType<T>> {
  try {
    const { url, name }: OpenApiInfoType = await getOpenApiInfo(type, key);
    const data = await fetch(getPath(url, param), { headers: OPEN_API_HEADERS })
      .then((res) => res.json())
      .then((data) => ({ key, name, data }));

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from the Open API');
  }
}

const spot = (key: OpenApiSubKeyType<typeof rootKey>, param?: Record<string, any>) => fetchOpenApi(rootKey, key, param);
const series = (key: OpenApiSubKeyType<typeof jsonKey>, param?: Record<string, any>) =>
  fetchOpenApi(jsonKey, key, param);

export default { spot, series };
