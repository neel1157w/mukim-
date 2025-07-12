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
} from "lucide-react";

const menuItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/items", label: "My Items", icon: Shirt },
    { href: "/dashboard/swaps", label: "Swaps", icon: HeartHandshake, badge: 3 },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton 
                                    isActive={pathname === item.href}
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
