"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    Shirt,
    HeartHandshake,
    UserCircle,
    LogOut,
    Badge,
    Shield,
} from "lucide-react";

const menuItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/items", label: "My Items", icon: Shirt },
    { href: "/dashboard/swaps", label: "Swaps", icon: HeartHandshake, badge: 3 },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
    // { href: "/admin", label: "Admin", icon: Shield },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // A simple flag to determine if the user is an admin.
  // In a real app, this would be based on user roles from your auth system.
  const isAdmin = false; 

  const visibleMenuItems = isAdmin 
    ? [...menuItems, { href: "/admin", label: "Admin", icon: Shield }] 
    : menuItems;


  return (
    <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {visibleMenuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton 
                                    isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
                                    tooltip={{children: item.label, side: "right"}}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                    {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                         <SidebarMenuButton tooltip={{children: "Logout", side: "right"}}>
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset className="max-w-full">
            <div className="p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </SidebarInset>
        </div>
    </SidebarProvider>
  );
}