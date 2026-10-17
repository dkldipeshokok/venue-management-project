import type { ControllerRenderProps } from 'react-hook-form';
import { Input } from '@/components/index';

interface TextFieldProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export function TextField({ field, placeholder, type = 'text', disabled }: TextFieldProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      className="h-10"
      {...field}
      disabled={disabled}
    />
  );
}
