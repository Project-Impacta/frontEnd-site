import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';

export const fetchProducts = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
        token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
      },
    };

    const response = await fetch(`${API_URL}/product`, requestOptions);
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Adicionando :any para definir o tipo da variável error como any
    throw new Error(`Erro ao buscar produtos: ${error.message}`);
  }
};
