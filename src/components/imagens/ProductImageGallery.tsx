import { Alert } from '../ui';
import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Imagem {
  _id: string;
  productId: string;
  hash: string;
  mimetype: string;
}

interface ProductImageGalleryProps {
  productId: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  productId,
}) => {
  const [imagens, setImagens] = useState<Imagem[]>([]);

  useEffect(() => {
    if (productId) {
      fetchImagens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchImagens = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/productImage?productId=${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
            token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
          },
        },
      );
      const imagens = response.data.data.map((imagem: Imagem) => ({
        ...imagem,
      }));
      setImagens(imagens);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  const imagensFiltradas = imagens.filter(
    (imagem) => imagem.productId === productId,
  );

  return (
    <div className="items-center justify-center flex 2xl:h-64 xl:h-60 lg:h-56 md:h-52 sm:h-48">
      {imagensFiltradas.length > 0 ? (
        imagensFiltradas.map((imagem) => (
          <div key={imagem._id} style={{ marginBottom: '20px' }}>
            {imagem.hash ? (
              <Image
                src={`data:image/webp;base64,${imagem.hash}`}
                alt={imagem.productId}
                width={200}
                height={200}
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <Alert>Imagem não disponível</Alert>
            )}
          </div>
        ))
      ) : (
        <Alert>Não existe imagem para o produto</Alert>
      )}
    </div>
  );
};

export default ProductImageGallery;
