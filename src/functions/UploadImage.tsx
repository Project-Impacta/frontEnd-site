import { Alert, Button } from '@/components/ui';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, ChangeEvent } from 'react';

export interface Imagem {
  _id: string;
  productId: string;
  hash: string;
  mimetype: string;
}

interface ImageGalleryProps {
  productId: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ productId }) => {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [novaImagem, setNovaImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      fetchImagens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchImagens = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3333/productImage?productId=${productId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
            token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
          },
        },
      );
      const imagens = response.data.data.map((imagem: Imagem) => ({
        ...imagem,
      }));
      setImagens(imagens);
    } catch (error) {
      setError('Erro ao buscar imagens');
      console.error('Erro ao buscar imagens:', error);
    } finally {
      setLoading(false);
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

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      const originalFileName = novaImagem.name;
      const fileExtension = originalFileName.split('.').pop();
      const modifiedFileName = `${originalFileName.replace(`.${fileExtension}`, '')}_${productId}.${fileExtension}`;
      const modifiedFile = new File([novaImagem], modifiedFileName, {
        type: novaImagem.type,
      });

      formData.append('productId', productId);
      formData.append('image', modifiedFile);

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
      setSuccess('Imagem enviada com sucesso');
    } catch (error) {
      setError('Erro ao enviar imagem');
      console.error('Erro ao enviar imagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`http://localhost:3333/productImage/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
        },
      });
      setImagens(imagens.filter((imagem) => imagem._id !== id));
      setSuccess('Imagem excluída com sucesso');
    } catch (error) {
      setError('Erro ao excluir imagem');
      console.error('Erro ao excluir imagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const imagensFiltradas = imagens.filter(
    (imagem) => imagem && imagem.productId === productId,
  );

  return (
    <div>
      {imagensFiltradas.length > 0 ? (
        imagensFiltradas.map((imagem) => (
          <div key={imagem._id} className="grid items-center justify-center">
            {imagem.hash ? (
              <Image
                src={`data:image/jpeg;base64,${imagem.hash}`}
                alt={imagem.productId}
                width={150}
                height={150}
              />
            ) : (
              <Alert>Imagem não disponível</Alert>
            )}
            <div className="flex items-center justify-center mt-2">
              <Button onClick={() => handleDelete(imagem._id)}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin box " />
                ) : (
                  'Excluir'
                )}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Alert>Não existe imagem para o produto</Alert>
      )}
      {imagensFiltradas.length === 0 && (
        <div className="mt-2">
          <input
            className="justify-center items-center "
            type="file"
            onChange={handleFileChange}
          />
          <Button onClick={handleUpload} className="mt-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin box" />
            ) : (
              'Enviar Imagem'
            )}
          </Button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default ImageGallery;
