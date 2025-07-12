import Link from "next/link";
import { Shirt } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-sidebar-foreground">
          <p>Made with ❤️, ~FourLoopers Team.</p>
        </div>
      </div>
    </footer>
  );
}
