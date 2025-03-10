"use client";

import * as React from "react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
// import Logo from "@/assets/svgs/Logo";
import { ChartSpline, User, Package, BookDown,LogOut,Gauge, Users, List, PackagePlus, Heart, LayoutList } from "lucide-react";
import { useUser } from "@/context/UserContext";

const data = {
  
        Admin: [
          { title: "Dashboard", url: "/dashboard/admin", icon: Gauge, isActive: true, },
          { title: "User Management", url: "/dashboard/admin/user-management", icon: Users },
          { title: "Listing Management", url: "/dashboard/admin/listing-management", icon: List },
          { title: "My Profile", url: "/dashboard/admin/profile", icon: User },
        ],
        User: [
          { title: "Dashboard", url: "/dashboard", icon: Gauge, isActive: true, },
          { title: "Manage Listings", url: "/dashboard/listing", icon: Package },
          { title: "Track Purchases", url: "/dashboard/purchase-history", icon: Package },
          { title: "Track Sales", url: "/dashboard/sales-history", icon: Package },
          // { title: "WishList", url: "/dashboard/wishlist", icon: Heart },
          { title: "Profile", url: "/dashboard/profile", icon: User },
        ],
     
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {user} = useUser()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  {/* <Logo /> */}
                  <h1 className="text-3xl">SH</h1>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NextMart</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
            user?.role == 'admin' ? <NavMain items={data.Admin} /> : <NavMain items={data.User} />
        }
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
