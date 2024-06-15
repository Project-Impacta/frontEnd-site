import { Input } from '@/components/ui';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ value, onChange }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative z-10">
      {searchOpen ? (
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Procurar Produto"
          className="bg-white h-10 px-5 pr-4 rounded-full text-sm focus:outline-none shadow-md transition-all duration-300"
        />
      ) : (
        <button
          className="bg-white h-10 w-10 rounded-full flex justify-center items-center focus:outline-none shadow-md transition-all duration-300 transform hover:scale-110"
          onClick={() => setSearchOpen(true)}
          title="Abrir campo de pesquisa"
        >
          <Search className="text-gray-600" />
        </button>
      )}
      {searchOpen && (
        <button
          className="absolute top-0 right-0 m-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition-all duration-300"
          onClick={() => setSearchOpen(false)}
          title="Fechar campo de pesquisa"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchButton;
