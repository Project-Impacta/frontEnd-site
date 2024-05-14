import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Dot, Minus } from 'lucide-react';
import React from 'react';

interface InputCPFProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

export const InputCPF: React.FC<InputCPFProps> = ({
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <InputOTP maxLength={11} {...rest}>
      <InputOTPGroup className="w-64 min-w-full">
        <InputOTPSlot index={0} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={1} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={2} onChange={onChange} onBlur={onBlur} />
        <InputOTPSeparator icon={<Dot />} />
        <InputOTPSlot index={3} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={4} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={5} onChange={onChange} onBlur={onBlur} />
        <InputOTPSeparator icon={<Dot />} />
        <InputOTPSlot index={6} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={7} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={8} onChange={onChange} onBlur={onBlur} />
        <InputOTPSeparator icon={<Minus />} />
        <InputOTPSlot index={9} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={10} onChange={onChange} onBlur={onBlur} />
      </InputOTPGroup>
    </InputOTP>
  );
};
