import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardTabsConfig } from "@/config";
import { servicesAPI, authAPI } from "@/lib/api";
import { ServiceFormDialog } from "@/components/services/ServiceFormDialog";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ActivityLogs } from "@/components/services/ActivityLogs";

import TopLabel from "@/components/ui/labels/TopLabel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Menu, Target, ListRestart, Logs, Activity, Clock, Globe, AlertTriangle, Plus, RefreshCw, LogOut, User } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { toast } = useToast();

    // User state
    const [user, setUser] = useState<{ name: string; _id: string } | null>(null);

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

    const [isMobile, setisMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeTab, setActiveTab] = useState(0);

    // State for services
    const [services, setServices] = useState<any[]>([]);
    const [overview, setOverview] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);

    async function windowManage() {
        window.onresize = () => {
            setisMobile(window.innerWidth < 768);
        };
    }

    const fetchOverview = async () => {
        try {
            const response = await servicesAPI.getOverview();
            console.log('Overview response:', response);
            setOverview(response.data);
        } catch (error) {
            console.error("Error fetching overview:", error);
        }
    };


    const fetchUserInfo = async () => {
        try {
            const response = await authAPI.authenticate();
            const auth_data: any = response.data;
            if (auth_data) {
                setUser({
                    name: auth_data.name,
                    _id: auth_data._id
                });
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            // If authentication fails, redirect to login
            navigate('/login');
        }
    };

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await servicesAPI.getServices();
            console.log('Services response:', response);
            const servicesData = response.data as any[] || [];
            setServices(servicesData);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async () => {
        try {
            // Fetch all services first if not already loaded
            const servicesData = services.length > 0 ? services : (await servicesAPI.getServices()).data as any[];

            // Fetch logs from each service's Log model
            const allLogs: any[] = [];
            for (const service of servicesData) {
                try {
                    const response = await servicesAPI.getServiceLogs(service._id, 50);
                    const serviceLogsData = (response.data as any)?.logs || [];

                    // Transform log records to match ActivityLogs interface
                    const transformedLogs = serviceLogsData.map((record: any) => ({
                        id: `${service._id}-${record.meta?.timestamp || Date.now()}`,
                        serviceName: service.name || service.url,
                        url: record.meta?.url || service.url,
                        method: record.method,
                        status: record.level === 'info' ? 'success' : record.level === 'error' ? 'failed' : 'pending',
                        statusCode: record.status_code || 0,
                        timestamp: record.meta?.timestamp || new Date().toISOString(),
                        message: record.message,
                        responseTime: record.meta?.response_time_ms || null
                    }));

                    allLogs.push(...transformedLogs);
                } catch (error) {
                    console.error(`Error fetching logs for service ${service._id}:`, error);
                }
            }

            // Sort logs by timestamp (most recent first)
            allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            // Limit to 50 most recent logs
            setLogs(allLogs.slice(0, 50));
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    const handleCreateService = () => {
        setSelectedService(null);
        setIsDialogOpen(true);
    };

    const handleEditService = (service: any) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const handleDeleteService = async (serviceId: string) => {
        try {
            await servicesAPI.deleteService(serviceId);
            fetchServices();
            fetchOverview();
        } catch (error) {
            console.error("Error deleting service:", error);
            throw error; // Re-throw so ServiceCard can handle it
        }
    };

    const handleServiceSuccess = () => {
        fetchServices();
        fetchOverview();
        fetchLogs();
    };

    const handleRefresh = () => {
        fetchServices();
        fetchOverview();
        fetchLogs();
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();

            // Clear any stored tokens/session data
            localStorage.removeItem('token');
            sessionStorage.clear();

            toast({
                title: "Logged out successfully",
                description: "You have been logged out of your account.",
            });

            // Redirect to login page
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

    useEffect(() => {
        windowManage();
        fetchUserInfo();
        fetchOverview();
        fetchServices();
        fetchLogs();
    }, [params]);

    return (
        <div className="container flex-row flex min-w-screen min-h-screen">
            <div id="sidebar" className={`fixed text-white overflow-hidden transition-all duration-200 z-10 h-screen bg-gray-800 ${isSidebarOpen || !isMobile ? 'w-72' : 'w-0'} flex flex-col`}>
                <div className="header bg-emerald-700 p-4">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>UptimeClient</h2>
                </div>
                <ul className="p-4 *:my-4 *:bg-gray-700 *:p-2 *:rounded-md flex-shrink-0 whitespace-nowrap flex-1">
                    {tabs.map((tab, index) => (
                        <li key={tab.id} onClick={() => {
                            if (tab.url) navigate(tab.url);
                            setActiveTab(index);
                            setIsSidebarOpen(false);
                        }} className="flex items-center gap-2 hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
                            <tab.icon /> {tab.name}
                        </li>
                    ))}
                </ul>

                {/* User Info & Logout Section */}
                <div className="p-4 border-t border-gray-700 space-y-3">
                    {/* User Profile */}
                    <div
                        onClick={() => navigate('/profile')}
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

            <div id="content" className={`${!isMobile && 'ml-72 max-w-[calc(100vw-288px)'} flex-1  min-h-screen bg-gray-900 text-white `}>
                <div className="flex flex-row justify-between items-center bg-gray-800 p-4">
                    <h2 className="text-2xl font-bold">{tabs[activeTab]?.name}</h2>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRefresh}
                            className="text-gray-400 hover:text-white"
                        >
                            <RefreshCw className="h-5 w-5" />
                        </Button>
                        {isMobile && <Menu className="hover:text-gray-400 transition-colors duration-300 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
                    </div>
                </div>

                {tabs[activeTab].id == DashboardTabsConfig.Monitoring.id && (
                    <div className="p-6 space-y-6 ">
                        {/* Overview Cards */}
                        <div id="overview-tabs-container" className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">

                            {/* Overall Uptime */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Activity className="h-8 w-8 text-emerald-500" />
                                    <span className="text-emerald-500 text-sm font-medium">
                                        {overview?.status || "LOADING"}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">
                                    {overview?.overallUptime?.toFixed(1) || "0.0"}%
                                </h3>
                                <p className="text-gray-400 text-sm">Overall Uptime</p>
                            </div>

                            {/* Avg Response Time */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Clock className="h-8 w-8 text-blue-500" />
                                    <span className="text-blue-500 text-sm font-medium">LATENCY</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">
                                    {overview?.avgResponseTime || "0"}ms
                                </h3>
                                <p className="text-gray-400 text-sm">Average Response</p>
                            </div>

                            {/* Total Monitors/Services */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Globe className="h-8 w-8 text-purple-500" />
                                    <span className="text-purple-500 text-sm font-medium">MONITORS</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">
                                    {overview?.activeServices || 0}/{overview?.totalServices || 0}
                                </h3>
                                <p className="text-gray-400 text-sm">Active Services</p>
                            </div>

                            {/* Total Incidents */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                                    <span className="text-yellow-500 text-sm font-medium">INCIDENTS</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">
                                    {overview?.incidents || 0}
                                </h3>
                                <p className="text-gray-400 text-sm">Open Issues</p>
                            </div>
                        </div>

                        {/* Monitoring Table */}
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Service Status</h3>
                                <Button onClick={handleCreateService} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Service
                                </Button>
                            </div>
                            <div className="p-6">
                                {loading ? (
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-gray-800/50 p-4 rounded-lg animate-pulse">
                                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : services.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Globe className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                                        <p className="text-gray-400 mb-4">No services configured yet</p>
                                        <Button onClick={handleCreateService} className="bg-emerald-600 hover:bg-emerald-700">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Your First Service
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {services.map((service) => (
                                            <ServiceCard
                                                key={service._id}
                                                service={service}
                                                onEdit={handleEditService}
                                                onDelete={handleDeleteService}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.Restarter.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                            <TopLabel text="Comming Soon" variant="default" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Service Restarter</h2>
                                <p className="text-gray-400">Configure automatic restart rules for your services</p>
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.Security.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                            <TopLabel text="Comming Soon" variant="default" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                                <p className="text-gray-400">Manage security configurations for your monitoring services</p>
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.Reports.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                            <TopLabel text="Comming Soon" variant="default" />
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Reports</h2>
                                <p className="text-gray-400">Generate and view reports on your service performance and uptime</p>
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.ServerLogs.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                            <div className="p-6 border-b border-gray-700">
                                <h2 className="text-xl font-semibold">Recent Activity</h2>
                                <p className="text-gray-400 text-sm mt-1">Monitor your service checks and performance</p>
                            </div>
                            <div className="p-6">
                                <ActivityLogs logs={logs} loading={loading} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Service Form Dialog */}
            <ServiceFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                service={selectedService}
                onSuccess={handleServiceSuccess}
            />
        </div>
    );
};

export default Dashboard;