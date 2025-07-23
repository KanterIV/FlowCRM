import React from 'react';
import Header from '@/app/components/Header/Header';

export interface IPageProps {
  params: {
    id: string[];
  };
}

export default function page({ params }: IPageProps) {
  return (
    <>
      <Header>Compains ({String(params.id)})</Header>
      <p>{new Date().toTimeString()}</p>
    </>
  );
}
