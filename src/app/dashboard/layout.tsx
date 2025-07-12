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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
    Home,
    LayoutDashboard,
    Shirt,
    HeartHandshake,
    UserCircle,
    LogOut,
    Badge,
    Shield,
} from "lucide-react";

const menuItems = [
    { href: "/dashboard/browse", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/items", label: "My Items", icon: Shirt },
    { href: "/dashboard/swaps", label: "Swaps", icon: HeartHandshake },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = true; //This will be replaced with actual role check

  const allMenuItems = [...menuItems];
  if(isAdmin) {
    // allMenuItems.push({ href: "/admin", label: "Admin", icon: Shield });
  }

  return (
    <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar collapsible="icon">
             <SidebarHeader className="p-2">
                <div className="flex h-8 items-center justify-between">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarRail />
            <SidebarContent className="p-2">
                <SidebarMenu>
                    {allMenuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} prefetch={true}>
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
