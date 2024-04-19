import { TextField } from '@mui/material';
import React from 'react';

interface InputProps {
  readonly value?: string;
  readonly name?: string;
  readonly id?: string;
  readonly label?: string | number;
  readonly style?: string;
  readonly multiline?: boolean;
  readonly placeholder?: string;
}

export default function Input({
  value,
  label,
  style,
  multiline,
  placeholder,
  name,
  id,
}: InputProps): JSX.Element {
  return (
    <TextField
      id={id}
      name={name}
      placeholder={placeholder}
      value={value} // Alteração aqui para usar 'name' em vez de 'id'
      label={label}
      variant="outlined"
      className={style}
      multiline={multiline}
    />
  );
}
