'use client';

import React from 'react';
import { Gamepad2, Home, Logs } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import PlayerInfo from '@/components/players/player-info';
import { ModeToggle } from '@/components/mode-toggle';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Games',
    url: '/games',
    icon: Gamepad2,
  },
  {
    title: 'Scoreboard',
    url: '/scoreboard',
    icon: Logs,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathName = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center justify-between',
            !open && 'flex-col '
          )}
        >
          {open ? (
            <h1 className="text-2xl">Local Quiz</h1>
          ) : (
            <h1 className="text-2xl">LQ</h1>
          )}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathName === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <PlayerInfo />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
