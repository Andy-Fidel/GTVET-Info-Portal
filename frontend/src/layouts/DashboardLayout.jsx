import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { usersAPI, authAPI, contactAPI } from '../services/api';
import { useAppStore } from '../store/appStore';
import {
    LayoutDashboard,
    Building2,
    BookOpen,
    Users,
    Bell,
    Menu,
    ChevronDown,
    ChevronRight,
    LogOut,
    User,
    Plus,
    Settings,
    Moon,
    Sun,
    View,
    Mail,
    Megaphone,
} from 'lucide-react';
import logo from '../assets/logo.png';
import { Button } from '../components/ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/DropdownMenu';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../components/ui/Collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/Sheet';
import { Badge } from '../components/ui/Badge';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
    const { user, setUser, unreadMessagesCount, setUnreadMessagesCount } = useAppStore();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }

        if (user) {
            fetchUnreadCount();
        }

        const interval = setInterval(fetchUnreadCount, 60000); // Fetch every minute
        return () => clearInterval(interval);
    }, [user]);

    const fetchUnreadCount = async () => {
        if (!user || user.role?.toLowerCase() !== 'admin') return;
        try {
            const response = await contactAPI.getUnreadCount();
            setUnreadMessagesCount(response.data.count);
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
        }
    };



    const fetchUser = async () => {
        try {
            const response = await usersAPI.getMe();
            setUser(response.data.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    // Toggle theme helper
    const toggleTheme = () => {
        const root = window.document.documentElement;
        root.classList.toggle('dark');
        setIsDark(!isDark);
    };

    const NavItem = ({ to, icon: Icon, label, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasChildren = React.Children.count(children) > 0;

        if (hasChildren) {
            return (
                <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
                    <div className="flex items-center w-full">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between p-2 h-auto hover:bg-slate-100 dark:hover:bg-slate-800">
                                <div className="flex items-center">
                                    <Icon className="mr-2 h-4 w-4" />
                                    {!sidebarOpen ? null : <span>{label}</span>}
                                </div>
                                {sidebarOpen && (isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                            </Button>
                        </CollapsibleTrigger>
                        {/* Add action dropdown if needed, but per requirement "Add dropdowns" might be separate or part of the item */}
                        {sidebarOpen && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Add New</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <CollapsibleContent className="pl-6 space-y-1">
                        {children}
                    </CollapsibleContent>
                </Collapsible>
            );
        }

        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    cn(
                        "flex items-center p-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                        isActive ? "bg-slate-100 dark:bg-slate-800 font-medium" : "text-slate-600 dark:text-slate-400"
                    )
                }
            >
                <Icon className="mr-2 h-4 w-4" />
                {sidebarOpen && <span>{label}</span>}
            </NavLink>
        );
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
            window.location.href = '/login';
        }
    };

    const SidebarContent = () => (
        <div className="space-y-2 py-4">
            <div className={cn("px-4 py-6 flex items-center", sidebarOpen ? "justify-start gap-3" : "justify-center")}>
                <div className="w-12 h-12 bg-white rounded-full p-1.5 shadow-md border border-slate-200 flex-shrink-0">
                    <img src={logo} alt="GTVET Logo" className="w-full h-full object-contain" />
                </div>
                {sidebarOpen && (
                    <div className="flex flex-col">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 tracking-tight leading-none">
                            TVET Hub
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            Admin Portal
                        </span>
                    </div>
                )}
            </div>
            <nav className="space-y-1 px-2">
                <NavLink to="/dashboard" className={({ isActive }) => cn("flex items-center w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800", isActive && "bg-slate-100 dark:bg-slate-800")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {sidebarOpen && "Dashboard"}
                </NavLink>

                {user?.role?.toLowerCase() === 'admin' && (
                    <>
                        {/* Public Institution List */}
                        <div className="space-y-1">
                            <Collapsible className="w-full">
                                <div className="flex items-center justify-between w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md group">
                                    <div className="flex items-center">
                                        <Building2 className="mr-2 h-4 w-4" />
                                        {sidebarOpen && <span className="text-sm font-medium">Public Institution</span>}
                                    </div>
                                </div>
                                {sidebarOpen && (
                                    <div className="pl-6 space-y-1 mt-1">
                                        <NavLink to="/dashboard/institutions/public" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <View className="mr-2 h-3 w-3" />
                                            All Institutions
                                        </NavLink>
                                        <NavLink to="/dashboard/institutions/add-public" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <Plus className="mr-2 h-3 w-3" />
                                            Add Institution
                                        </NavLink>
                                    </div>
                                )}
                            </Collapsible>
                        </div>

                        {/* Private Institution List */}
                        <div className="space-y-1">
                            <Collapsible className="w-full">
                                <div className="flex items-center justify-between w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md group">
                                    <div className="flex items-center">
                                        <Building2 className="mr-2 h-4 w-4" />
                                        {sidebarOpen && <span className="text-sm font-medium">Private Institution</span>}
                                    </div>
                                </div>
                                {sidebarOpen && (
                                    <div className="pl-6 space-y-1 mt-1">
                                        <NavLink to="/dashboard/institutions/private" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <View className="mr-2 h-3 w-3" />
                                            All Institutions
                                        </NavLink>
                                        <NavLink to="/dashboard/institutions/add-private" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <Plus className="mr-2 h-3 w-3" />
                                            Add Private Institution
                                        </NavLink>
                                    </div>
                                )}
                            </Collapsible>
                        </div>

                        {/* Programme List */}
                        <div className="space-y-1">
                            <Collapsible className="w-full">
                                <div className="flex items-center justify-between w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md group">
                                    <div className="flex items-center">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        {sidebarOpen && <span className="text-sm font-medium">Programmes</span>}
                                    </div>
                                </div>
                                {sidebarOpen && (
                                    <div className="pl-6 space-y-1 mt-1">
                                        <NavLink to="/dashboard/programmes" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <View className="mr-2 h-3 w-3" />
                                            All Programmes
                                        </NavLink>
                                        <NavLink to="/dashboard/programmes/add" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                            <Plus className="mr-2 h-3 w-3" />
                                            Add Programme
                                        </NavLink>
                                    </div>
                                )}
                            </Collapsible>
                        </div>

                        {/* Inquiries / Messages */}
                        <NavLink to="/dashboard/messages" className={({ isActive }) => cn("flex items-center w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 justify-between", isActive && "bg-slate-100 dark:bg-slate-800")}>
                            <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                {sidebarOpen && "Inquiries"}
                            </div>
                            {sidebarOpen && unreadMessagesCount > 0 && (
                                <Badge variant="destructive" className="h-5 min-w-5 px-1 flex items-center justify-center text-[10px] font-bold">
                                    {unreadMessagesCount}
                                </Badge>
                            )}
                        </NavLink>
                    </>
                )}

                {/* Announcements (Admin and Editor) */}
                {(user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'editor') && (
                    <NavLink to="/dashboard/announcements" className={({ isActive }) => cn("flex items-center w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800", isActive && "bg-slate-100 dark:bg-slate-800")}>
                        <Megaphone className="mr-2 h-4 w-4" />
                        {sidebarOpen && "Announcements"}
                    </NavLink>
                )}

                {/* Users (Admin Only) */}
                {user?.role?.toLowerCase() === 'admin' && (
                    <div className="space-y-1">
                        <Collapsible className="w-full">
                            <div className="flex items-center justify-between w-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md group">
                                <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    {sidebarOpen && <span className="text-sm font-medium">Users</span>}
                                </div>
                            </div>
                            {sidebarOpen && (
                                <div className="pl-6 space-y-1 mt-1">
                                    <NavLink to="/dashboard/users" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                        <Users className="mr-2 h-3 w-3" />
                                        All Users
                                    </NavLink>
                                    <NavLink to="/dashboard/users/add" className="w-full flex items-center h-8 px-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                                        <Plus className="mr-2 h-3 w-3" />
                                        Add User
                                    </NavLink>
                                </div>
                            )}
                        </Collapsible>
                    </div>
                )}
            </nav>
        </div>
    );

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar for Desktop */}
            <aside className={cn(
                "hidden border-r bg-white dark:bg-slate-950 md:block transition-all duration-300",
                sidebarOpen ? "w-64" : "w-16"
            )}>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="flex items-center justify-between border-b bg-white dark:bg-slate-950 px-6 py-3">
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64">
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>

                        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        {/* Notifications */}
                        <div className="relative">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                                {unreadMessagesCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs shadow-lg shadow-primary/20">
                                        {unreadMessagesCount}
                                    </Badge>
                                )}
                            </Button>
                        </div>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.profile_picture_url} alt={user?.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name || 'Loading...'}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email || '...'}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
