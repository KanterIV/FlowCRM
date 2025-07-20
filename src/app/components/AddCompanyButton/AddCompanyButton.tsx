'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/app/components/Button/CustomButton';

const CompanyFormModal = dynamic(
  () => import('../CompanyFormModal/CompanyFormModal'),
  {
    ssr: false,
  }
);

export default function AddCompanyButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>Add company</Button>
      <CompanyFormModal
        onSubmit={console.log}
        show={show}
        onClose={() => setShow(false)}
      />
    </>
  );
}
