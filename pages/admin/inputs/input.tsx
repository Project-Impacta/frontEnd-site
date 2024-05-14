import { TextField } from '@mui/material';
import React, { forwardRef } from 'react';

interface InputProps {
  readonly value?: string;
  readonly name?: string;
  readonly id?: string;
  readonly label?: string | number;
  readonly style?: string;
  readonly multiline?: boolean;
  readonly placeholder?: string;
  readonly type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { value, label, style, multiline, placeholder, name, id, type }: InputProps,
    ref,
  ) => {
    return (
      <TextField
        inputRef={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        label={label}
        variant="outlined"
        className={style}
        multiline={multiline}
        type={type}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
