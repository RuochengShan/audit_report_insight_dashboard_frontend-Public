'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, useUser } from '@/firebase';
import { signInWithMicrosoft } from '@/firebase/auth/microsoft-login';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is already logged in, redirect them to the home page.
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = () => {
    if (auth) {
      signInWithMicrosoft(auth);
    }
  };

  // While checking auth state or if user is logged in, show a loader.
  // This prevents the login button from flashing before redirecting.
  if (isUserLoading || user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // Only show the login card if the user is not logged in and auth state is determined.
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Login</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogin} className="w-full" variant="outline">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 4H21V12.5H11.5V4Z" fill="#F25022"/>
                <path d="M2 4H10.5V12.5H2V4Z" fill="#7FBA00"/>
                <path d="M11.5 13.5H21V22H11.5V13.5Z" fill="#00A4EF"/>
                <path d="M2 13.5H10.5V22H2V13.5Z" fill="#FFB900"/>
            </svg>
            Sign in with Microsoft
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
