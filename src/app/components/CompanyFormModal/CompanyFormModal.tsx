'use client';

import React from 'react';
import CompanyForm, {
  CompanyFormProps,
} from '@/app/components/CompanuForm/CompanyForm';
import Modal, { ModalProps } from '@/app/components/Modal/Modal';

export interface CompanyFormModalProps extends ModalProps {
  onSubmit: CompanyFormProps['onSubmit'];
}

export default function CompanyFormModal({
  onSubmit,
  ...rest
}: CompanyFormModalProps) {
  return (
    <Modal {...rest}>
      <CompanyForm onSubmit={onSubmit} />
    </Modal>
  );
}
