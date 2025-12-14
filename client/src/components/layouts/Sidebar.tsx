import { useNavigate } from "react-router-dom";
import { User, LogOut, Target, ListRestart, AlertTriangle, Activity, Logs } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/ui/use-toast";

interface SidebarProps {
    isMobile: boolean;
    isOpen: boolean;
    onClose: () => void;
    activeTabId?: number;
    onTabChange?: (id: number) => void;
}

import { DashboardTabsConfig } from "@/config";

export const Sidebar = ({ isMobile, isOpen, onClose, activeTabId, onTabChange }: SidebarProps) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { toast } = useToast();

    const tabs = [
        {
            id: DashboardTabsConfig.Monitoring.id,
            name: DashboardTabsConfig.Monitoring.name,
            icon: Target
        },
        {
            id: DashboardTabsConfig.Restarter.id,
            name: DashboardTabsConfig.Restarter.name,
            icon: ListRestart,
            url: "#"
        },
        {
            id: DashboardTabsConfig.Security.id,
            name: DashboardTabsConfig.Security.name,
            icon: AlertTriangle,
            url: "#"
        },
        {
            id: DashboardTabsConfig.Reports.id,
            name: DashboardTabsConfig.Reports.name,
            icon: Activity,
            url: "#"
        },
        {
            id: DashboardTabsConfig.ServerLogs.id,
            name: DashboardTabsConfig.ServerLogs.name,
            icon: Logs
        },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            sessionStorage.clear();
            toast({
                title: "Logged out successfully",
                description: "You have been logged out of your account.",
            });
            navigate('/login');
        } catch (error: any) {
            console.error("Logout error:", error);
            toast({
                title: "Logout failed",
                description: error.message || "An error occurred during logout",
                variant: "destructive",
            });
        }
    };

    const handleTabClick = (tab: any) => {
        if (tab.url === "#") return; // Placeholder

        if (onTabChange) {
            onTabChange(tab.id);
        } else {
            // Default behavior: navigate to dashboard with tab
            // Since dashboard manages tabs with state, we might just navigate to /dashboard
            navigate('/dashboard');
            // Ideally we would pass state to set the tab, e.g. navigate('/dashboard', { state: { tabId: tab.id } })
        }

        if (isMobile) {
            onClose();
        }
    };

    return (
        <div id="sidebar" className={`fixed text-white overflow-hidden transition-all duration-200 z-10 h-screen bg-gray-800 ${isOpen || !isMobile ? 'w-72' : 'w-0'} flex flex-col`}>
            <div className="header bg-emerald-700 p-4">
                <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>UptimeClient</h2>
            </div>
            <ul className="p-4 *:my-4 *:bg-gray-700 *:p-2 *:rounded-md flex-shrink-0 whitespace-nowrap flex-1">
                {tabs.map((tab) => (
                    <li
                        key={tab.id}
                        onClick={() => handleTabClick(tab)}
                        className={`flex items-center gap-2 hover:bg-gray-600 transition-colors duration-300 cursor-pointer ${activeTabId === tab.id ? 'bg-gray-600 ring-1 ring-emerald-500' : ''}`}
                    >
                        <tab.icon /> {tab.name}
                    </li>
                ))}
            </ul>

            {/* User Info & Logout Section */}
            <div className="p-4 border-t border-gray-700 space-y-3">
                {/* User Profile */}
                <div
                    onClick={() => navigate('/profile', {
                        state: { fromDashboard: true },
                        preventScrollReset: false
                    })}
                    className="flex items-center gap-3 px-3 py-2 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.name || 'Loading...'}
                        </p>
                        <p className="text-xs text-gray-400">
                            View Profile
                        </p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300 p-3 rounded-lg transition-all duration-300 border border-red-600/30 hover:border-red-500/50 group"
                >
                    <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};
