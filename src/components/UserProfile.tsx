'use client';

import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, LogIn } from 'lucide-react';
import Link from 'next/link';


export function UserProfile() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleSignOut = () => {
    if (auth) {
      signOut(auth);
    }
  };

  if (isUserLoading) {
    return <div className="p-2 text-sm text-center">Loading...</div>
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoURL || undefined} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow overflow-hidden">
          <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut} className="h-8 w-8 shrink-0">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="p-2">
      <Button asChild className="w-full">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    </div>
  )
}
