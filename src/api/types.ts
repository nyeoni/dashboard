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

export type OpenApiKeyType = keyof OpenApiType;
export type OpenApiSubKeyType<T extends OpenApiKeyType> = keyof OpenApiType[T];
export type OpenApiParamType = {
  [key: string]: any;
};

// open api response type
// 1. root -> return number
// 2. json -> return JsonDataType
export type RootDataType = string;

export type RecordType = {
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
export type JsonDataType = {
  records: RecordType[];
  total: number;
  retrievedTotal?: number;
};

// getOpenApiInfoType 에서 사용하는 type
export type OpenApiInfoType = {
  url: string;
  name: string;
};

export type OpenApiDataType<T extends OpenApiKeyType> = {
  data: T extends rootKeyType ? RootDataType : JsonDataType;
};

// fetch 해서 받아온 데이터의 타입을 정의
export type OpenApiResponseType<T extends OpenApiKeyType> = {
  key: keyof OpenApiType[T];
  name: string;
  data: OpenApiDataType<T>;
};

export interface ApiError extends Error {
  response?: {
    status: number;
    statusText: string;
  };
}
