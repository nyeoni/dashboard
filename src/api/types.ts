export type OpenApiType = {
  root: Record<string, string>;
  json: Record<string, string>;
};

export type OpenApiKeyType = keyof OpenApiType;
export type OpenApiSubKeyType<T extends OpenApiKeyType> = keyof OpenApiType[T];

export type RootDataType = number;

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

export type OpenApiInfoType = {
  url: string;
  name: string;
};

// fetch 해서 받아온 데이터의 타입을 정의
export type OpenApiResponseType<T extends OpenApiKeyType> = {
  key: keyof OpenApiType[T];
  name: string;
  data: T extends RootDataType ? RootDataType : JsonDataType;
};
