import { useEffect, useState } from 'react';
import {
  OpenApiParamType,
  OpenApiResponseType,
  OpenApiSubKeyType,
  jsonKey,
  jsonKeyType,
  rootKey,
  rootKeyType,
} from '../api/types';
import api from '../api/api';

export const useSeries = (key: OpenApiSubKeyType<typeof jsonKey>, param?: OpenApiParamType) => {
  const [data, setData] = useState<OpenApiResponseType<jsonKeyType>>();

  useEffect(() => {
    let timer = setTimeout(async function request() {
      let delay = 5000;
      try {
        const data = await api.series(key, param);
        setData(data);
      } catch (error) {
        if (error instanceof Response) {
          console.log('HTTP Error:', error.status);
          if (error.status === 429) {
            // too many request to server
            delay *= 2;
          }
        }
      }
      timer = setTimeout(request, delay);
      return () => clearTimeout(timer);
    });

    return () => clearTimeout(timer);
  }, [key, param]);

  return data;
};
