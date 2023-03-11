import { useEffect, useState } from 'react';
import { OpenApiParamType, OpenApiResponseType, OpenApiSubKeyType, rootKey, rootKeyType } from '../api/types';
import api from '../api/api';

export function useSpot(key: OpenApiSubKeyType<typeof rootKey>, param?: OpenApiParamType) {
  const [data, setData] = useState<OpenApiResponseType<rootKeyType>>();

  useEffect(() => {
    let timer = setTimeout(async function request() {
      let delay = 5000;
      try {
        const data = await api.spot(key, param);
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
}
