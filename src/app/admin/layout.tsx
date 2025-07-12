import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users, listings, and orders.</p>
      </div>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" asChild><Link href="/admin/users">Manage Users</Link></TabsTrigger>
          <TabsTrigger value="listings" asChild><Link href="/admin/listings">Manage Listings</Link></TabsTrigger>
          <TabsTrigger value="orders" asChild><Link href="/admin/orders">Manage Orders</Link></TabsTrigger>
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
}
