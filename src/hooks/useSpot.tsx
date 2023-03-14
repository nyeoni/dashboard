import { useEffect, useState } from 'react';
import { OpenApiParamType, OpenApiResponseType, OpenApiSubKeyType, rootKey, rootKeyType } from '../api/types';
import api from '../api/api';

export const useSpot = (key: OpenApiSubKeyType<typeof rootKey>, param?: OpenApiParamType) => {
  const [data, setData] = useState<OpenApiResponseType<rootKeyType>>();

  useEffect(() => {
    let timer = setTimeout(async function request() {
      let delay = 5000;
      try {
        const data = await api.spot(key, param);
        setData(data);
      } catch (error) {
        console.log('fucking error');
        if (error instanceof Response) {
          console.log('HTTP Error:', error.status);
          if (error.status === 429) {
            // too many request to server
            console.log('429 Error occurs!!!!!!');
            delay *= 2;
          }
        }
      }
      timer = setTimeout(request, delay);
      return () => clearTimeout(timer);
    });

    return () => clearTimeout(timer);
  }, [key, param]);

  return [data];
};
