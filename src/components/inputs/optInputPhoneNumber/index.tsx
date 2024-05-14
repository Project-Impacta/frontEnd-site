import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Dot } from 'lucide-react';
import React from 'react';

interface InputCPFForMobileProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Tipo explícito para onChange
  onBlur: React.FocusEventHandler<HTMLInputElement>; // Tipo explícito para onBlur
}

export const InputPhoneMobile: React.FC<InputCPFForMobileProps> = ({
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <InputOTP maxLength={11} {...rest}>
      <InputOTPGroup className="w-64 min-w-full">
        <InputOTPSlot index={0} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={1} onChange={onChange} onBlur={onBlur} />
        <InputOTPSeparator icon={<Dot />} />
        <InputOTPSlot index={2} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={3} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={4} onChange={onChange} onBlur={onBlur} />

        <InputOTPSlot index={5} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={6} onChange={onChange} onBlur={onBlur} />
        <InputOTPSeparator icon={<Dot />} />
        <InputOTPSlot index={7} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={8} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={9} onChange={onChange} onBlur={onBlur} />
        <InputOTPSlot index={10} onChange={onChange} onBlur={onBlur} />
      </InputOTPGroup>
    </InputOTP>
  );
};
