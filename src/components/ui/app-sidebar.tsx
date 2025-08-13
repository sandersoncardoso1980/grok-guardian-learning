import { useState } from "react";
import { 
  BookOpen, 
  Code, 
  User, 
  Settings, 
  Home,
  Upload,
  Users,
  BarChart,
  MessageSquare,
  Trophy,
  Clock,
  CheckCircle
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole?: "student" | "admin";
}

const studentItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: Home },
  { title: "Estudos", url: "/student/study", icon: BookOpen },
  { title: "Exercícios", url: "/student/exercises", icon: Code },
  { title: "Progresso", url: "/student/progress", icon: Trophy },
  { title: "Chat IA", url: "/student/chat", icon: MessageSquare },
  { title: "Perfil", url: "/student/profile", icon: User },
];

const adminItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Materiais", url: "/admin/upload", icon: Upload },
  { title: "Alunos", url: "/admin/students", icon: Users },
  { title: "Relatórios", url: "/admin/reports", icon: BarChart },
  { title: "Chat IA", url: "/admin/chat", icon: MessageSquare },
  { title: "Configurações", url: "/admin/settings", icon: Settings },
];

export function AppSidebar({ userRole = "student" }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const items = userRole === "admin" ? adminItems : studentItems;
  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-gradient-to-b from-sidebar-background to-sidebar-background/95">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-accent rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sm font-bold text-sidebar-foreground">CodeLearn</h2>
                <p className="text-xs text-sidebar-foreground/60">
                  {userRole === "admin" ? "Admin Panel" : "Aprendizado"}
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium px-4 py-2">
            {userRole === "admin" ? "Administração" : "Estudos"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg transition-all">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Status (only for students) */}
        {userRole === "student" && !collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                <Clock className="w-3 h-3" />
                <span>Estudando há 2h hoje</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                <CheckCircle className="w-3 h-3" />
                <span>5 exercícios concluídos</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}