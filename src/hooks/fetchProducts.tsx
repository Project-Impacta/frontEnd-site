import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';

export const fetchProducts = async (cancelToken: axios.CancelToken) => {
  try {
    const response = await axios.get(`${API_URL}/product`, {
      headers: {
        'Content-Type': 'application/json',
        secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
        token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
      },
      cancelToken,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
  }
};
