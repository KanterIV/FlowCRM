'use client';

import { Field } from 'formik';
import React from 'react';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, id, ...rest }: IInputProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="mb-2 text-base color-gray-900">
          {label}
        </label>
      )}
      <Field
        {...rest}
        id={id}
        className="p-3 h-11 text-sm rounded border border-gray-300 shadow"
      />
    </div>
  );
};

export default Input;
