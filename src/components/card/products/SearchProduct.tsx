import { Input } from '../../ui/input';
import React, { memo } from 'react';

interface SearchProps {
  onChange: (text: string) => void;
}
function Search({ onChange }: Readonly<SearchProps>) {
  console.log('Search rendered!');
  return (
    <Input
      type="text"
      placeholder="Pesquisar produto"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
export default memo(Search);
