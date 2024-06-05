import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Imagem {
  id: string;
  nome: string;
  dados?: string;
}

const ImageGallery: React.FC = () => {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [novaImagem, setNovaImagem] = useState<File | null>(null);

  useEffect(() => {
    fetchImagens();
  }, []);

  const fetchImagens = async () => {
    try {
      const response = await axios.get('http://localhost:5000/imagens');
      const imagens = response.data.imagens.map((imagem: Imagem) => ({
        ...imagem,
        dados: imagem.dados ?? '', // Garante que 'dados' não seja indefinido
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
      formData.append('imagem', novaImagem);
      const response = await axios.post(
        'http://localhost:5000/imagens',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
      await axios.delete(`http://localhost:5000/imagens/${id}`);
      setImagens(imagens.filter((imagem) => imagem.id !== id));
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
          <li key={imagem.id}>
            {imagem.dados ? (
              <Image
                src={`data:image/jpeg;base64,${imagem.dados}`}
                alt={imagem.nome}
                width={150}
                height={150}
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
            <p>{imagem.nome}</p>
            <button onClick={() => handleDelete(imagem.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
