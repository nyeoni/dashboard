const DEMO_PROJECT_API_TOCKEN = "XGJHUSQZTI2AVIENWA27HI5V";
const DEMO_PROJECT_CODE = "5490";
const OPEN_API_HEADERS = {
  "x-whatap-pcode": DEMO_PROJECT_CODE,
  "x-whatap-token": DEMO_PROJECT_API_TOCKEN,
};

const OPEN_API_ROOT = "https://api.whatap.io/open/api";

type OPEN_API_TYPE = {
  root: Record<string, string>;
  json: Record<string, string>;
};

const rootKey: OpenApiKeyType = "root";
const jsonKey: OpenApiKeyType = "json";

const OPEN_API: OPEN_API_TYPE = {
  root: {
    act_agent: "활성화 상태의 에이전트 수",
    inact_agent: "비활성화 상태의 에이전트 수",
    host: "호스트 수",
    cpucore: "호스트의 CPU 코어 합",
    txcount: "트랜잭션 수",
    tps: "초당 트랜잭션 수",
    user: "5분간 집계된 고유 사용자 수",
    actx: "액티브 트랜잭션 수",
    rtime: "평균 응답 시간",
    cpu: "CPU 사용률",
    threadpool_active: "쓰레드풀 활성 쓰레드 수",
    threadpool_queue: "쓰레드풀 큐잉 쓰레드 수",
    dbc_count: "전체 DB Connection 수",
    dbc_active: "활성(Active) DB Connection 수",
    dbc_idle: "비활성(Idle) DB Connection 수",
    act_method: "액티브 Method 수",
    act_sql: "액티브 SQL 수",
    act_httpc: "액티브 HTTP Call 수",
    act_dbc: "액티브 DB Connection 수",
    act_socket: "액티브 Socket 수",
  },
  json: {
    "exception/{stime}/{etime}": "Exception 발생 ",
  },
};

type OpenApiType = typeof OPEN_API;
type OpenApiKeyType = keyof OpenApiType;
type OpenApiSubKeyType<T extends OpenApiKeyType> = keyof OpenApiType[T];

const getPath = (url: string, param: Record<string, any> = {}): string => {
  let path = url;
  for (let key in param) {
    path = path.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
  }

  return path;
};

type OpenApiInfoType = {
  url: string;
  name: string;
};

async function getOpenApiInfo<T extends OpenApiKeyType>(
  type: T,
  key: OpenApiSubKeyType<T>
): Promise<OpenApiInfoType> {
  if (key in OPEN_API[type]) {
    return {
      url: [OPEN_API_ROOT, type, key].filter((path) => !!path).join("/"),
      name: OPEN_API[type][key],
    };
  } else {
    throw Error("Invalid type");
  }
}

type RootDataType = number;

type RecordType = {
  oids: string;
  time: number;
  classHash: number;
  count: number;
  service: string;
  class: string;
  serviceHash: number;
  snapSeq: string;
  msg: string;
};
type JsonDataType = {
  records: RecordType[];
  total: number;
  retrievedTotal?: number;
};

// fetch 해서 받아온 데이터의 타입을 정의
type ResponseType<T extends OpenApiKeyType> = {
  key: keyof OPEN_API_TYPE[T];
  name: string;
  data: T extends RootDataType ? RootDataType : JsonDataType;
};

async function fetchOpenApi<T extends OpenApiKeyType>(
  type: T,
  key: OpenApiSubKeyType<T>,
  param?: Record<string, any>
): Promise<ResponseType<T>> {
  try {
    const { url, name }: OpenApiInfoType = await getOpenApiInfo(type, key);
    const data = await fetch(getPath(url, param), { headers: OPEN_API_HEADERS })
      .then((res) => res.json())
      .then((data) => ({ key, name, data }));
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from the Open API");
  }
}

const spot = (
  key: OpenApiSubKeyType<typeof rootKey>,
  param?: Record<string, any>
) => fetchOpenApi(rootKey, key, param);
const series = (
  key: OpenApiSubKeyType<typeof jsonKey>,
  param?: Record<string, any>
) => fetchOpenApi(jsonKey, key, param);

export default { spot, series };
