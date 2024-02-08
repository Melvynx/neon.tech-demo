'use client';

import { Toaster } from '@/components/ui/sonner';
import { PropsWithChildren } from 'react';

export const Providers = (props: PropsWithChildren) => {
  return (
    <>
      <Toaster closeButton position="top-right" />
      {props.children}
    </>
  );
};
