'use client'; 

import { useSearchParams } from 'next/navigation';
import OTPForm from '@/Components/OTPForm/OTPForm';

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div>
      <OTPForm email={email} />
    </div>
  );
}