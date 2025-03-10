'use client';

import { Suspense } from 'react';
import LoginFormContent from './LoginFormContent';


const LoginForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
};

export default LoginForm;
