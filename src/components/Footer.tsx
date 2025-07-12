"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  const hideFooter = ['/login', '/register'].includes(pathname);

  if (hideFooter) {
    return null;
  }
  
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-sidebar-foreground">
          <p className="font-bold italic">Made with ❤️, ~FourLoopers Team.</p>
        </div>
      </div>
    </footer>
  );
}
