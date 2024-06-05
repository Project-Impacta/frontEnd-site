import axios from 'axios';

import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent } from 'react';

export interface Imagem {
  _id: string
  productId: string
  hash: string
  mimetype: string
}

const ImageGallery: React.FC = () => {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [novaImagem, setNovaImagem] = useState<File | null>(null);

  useEffect(() => {
    fetchImagens();
  }, []);

  const fetchImagens = async () => {
    try {
      const response = await axios.get('http://localhost:3333/productImage',
        {
          headers: {
            'Content-Type': 'application/json',
            secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
            token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
          }
        }
      );
      const imagens = response.data.data.map((imagem: Imagem) => ({
        ...imagem
      }));
      setImagens(imagens);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImagem(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!novaImagem) {
      console.error('Nenhuma imagem selecionada');
      return;
    }

    try {
      const formData = new FormData();
      // Implementar logica pegando o id do produto que o admin selecionar
      const productId = '6643aec65b8c2cd43e65dcab';
      formData.append('productId', productId);
      formData.append('image', novaImagem);
      const response = await axios.post(
        'http://localhost:3333/productImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
            token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
          },
        },
      );
      setImagens([...imagens, response.data.imagem]);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3333/productImage/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
        }
      }
      );
      setImagens(imagens.filter((imagem) => imagem._id !== id));
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
    }
  };

  return (
    <div>
      <h1>Galeria de Imagens</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
      <ul>
        {imagens.map((imagem) => (
          <li key={imagem._id}>
            {imagem.hash ? (
              <Image
                src={`data:image/jpeg;base64,${imagem.hash}`}
                alt={imagem.productId}
                width={150}
                height={150}
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
            <p>{imagem.productId}</p>
            <button onClick={() => handleDelete(imagem.productId)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
