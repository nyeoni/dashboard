## Todo

- `Endpoint` 를 기준으로 10개이상의 open-api 사용하기
- 실시간 5초 주기로 데이터 갱신하기
- 3종류 (인포매틱스, 막대 차트, 라인 차트)의 5개 이상의 위젯

## Progress

### CRA to Vite

- 빠른 개발환경 + typescript 환경 설정을 위해서 `vite` migration 을 진행함
- `vite` : Start vite dev server in the current directory
- `vite build` : build for production
- `vite preview` : Locally preview production build
- https://cathalmacdonnacha.com/migrating-from-create-react-app-cra-to-vite

### Type Alias 설정

기존에 정의되어있는 `OPEN_API` 에 `OpenApiType` 을 부여해주었고, `root("")` 와 `json("json")` 을 구분해주어 `OpenApiResponseType` 설정해주었다.

- `OpenApiType`

```
export type rootKeyType = '';
export type jsonKeyType = 'json';

export const rootKey = '';
export const jsonKey = 'json';

// 'root' & 'json' 을 구분해주기 위함
export type OpenApiType = {
  [root in rootKeyType]: Record<string, string>;
} & {
  [json in jsonKeyType]: Record<string, string>;
};
```

- `OpenApiResponseType`

```
export type OpenApiResponseType<T extends OpenApiKeyType> = {
  key: keyof OpenApiType[T];
  name: string;
  data: T extends rootKeyType ? RootDataType : JsonDataType;
};
```

### Api Call Logic

`api` 로직을 구현하기 전에 사전 만족해야하는 조건은 다음과 같다.

- 10개 이상의 `api` 사용
- 5초 주기로 데이터 갱신

그래서 10개 이상의 `api` 를 호출할때 `key` 만 주면 편하게 5초 주기로 데이터를 갱신해주는 `useApiPolling` hook 을 만들기로 결정하였다.

## TIL

### setTimeout vs setInterval

https://simsimjae.tistory.com/368

### typescript arg 타입 추론

https://catchts.com/infer-arguments

### Fetch API 사용한 이유

https://velog.io/@eunbinn/Axios-vs-Fetch#fetch-%EB%B0%8F-axios%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B0%84%EB%9E%B5%ED%95%9C-%EA%B0%9C%EC%9A%94

### .eslintcache 가 뭔가

### robots.txt 더 자세히 알아보기

### never type

- `typescript` 의 공집합이다.

### Notice

1. 3종류의 5가지의 위젯

- 429 에러 api 호출이 너무 많아서 발생하는 에러
- 429 에러가 발생하지 않게 구현하기
