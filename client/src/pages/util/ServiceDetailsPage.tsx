
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { servicesAPI } from "@/lib/api";
import { Sidebar } from "@/components/layouts/Sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    ArrowLeft,
    Globe,
    Clock,
    Calendar,
    Settings,
    Activity,
    RefreshCw,
    Menu,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trash,
    Edit
} from "lucide-react";
import { ActivityLogs } from "@/components/services/ActivityLogs";
import { ServiceFormDialog } from "@/components/services/ServiceFormDialog";

const ServiceDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Sidebar state
    const [isMobile, setisMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

    // Data state
    const [service, setService] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [logsLoading, setLogsLoading] = useState(true);

    // Dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isFetching = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            setisMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchServiceDetails = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const response = await servicesAPI.getService(id);
            setService(response.data);
        } catch (error: any) {
            console.error("Error fetching service details:", error);
            toast({
                title: "Error",
                description: "Failed to load service details",
                variant: "destructive"
            });
            // Fallback: navigate back if not found
            if (error.response?.status === 404) {
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    }, [id, toast, navigate]);

    const fetchServiceLogs = useCallback(async () => {
        if (!id) return;
        try {
            setLogsLoading(true);
            const response = await servicesAPI.getServiceLogs(id, 50);
            const logsData = (response.data as any)?.logs || [];

            const transformedLogs = logsData.map((record: any) => ({
                id: `${record.meta?.timestamp || Date.now()}-${Math.random()}`,
                serviceName: service?.name || service?.url || 'Unknown',
                url: service?.url || '',
                method: service?.method || 'HEAD',
                status: record.level === 'info' ? 'success' : record.level === 'error' ? 'failed' : 'pending',
                statusCode: record.status_code || 0,
                timestamp: record.meta?.timestamp || new Date().toISOString(),
                message: record.message,
                responseTime: record.meta?.response_time_ms || null
            }));

            // Sort by time desc
            transformedLogs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            setLogs(transformedLogs);
        } catch (error) {
            console.error("Error fetching service logs:", error);
        } finally {
            setLogsLoading(false);
        }
    }, [id, service]);

    useEffect(() => {
        if (id) {
            fetchServiceDetails();
        }
    }, [id, fetchServiceDetails]);

    useEffect(() => {
        if (id && service) {
            fetchServiceLogs();
        }
    }, [id, service, fetchServiceLogs]);

    const handleRefresh = async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        await Promise.all([fetchServiceDetails(), fetchServiceLogs()]);
        isFetching.current = false;
        toast({
            title: "Refreshed",
            description: "Service data updated",
        });
    };

    const handleDelete = async () => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this service? This action cannot be undone.")) return;

        try {
            await servicesAPI.deleteService(id);
            toast({
                title: "Service deleted",
                description: "Service successfully removed",
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error deleting service:", error);
            toast({
                title: "Error",
                description: "Failed to delete service",
                variant: "destructive"
            });
        }
    };

    const renderStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">Operational</span>
                    </div>
                );
            case 0:
            case 2:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                        <XCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">Down</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">Unknown</span>
                    </div>
                );
        }
    };

    if (loading && !service) {
        return (
            <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full overflow-x-hidden">
            <Sidebar
                isMobile={isMobile}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                activeTabId={undefined} // No active tab from dashboard list
            />

            <div id="content" className={`${!isMobile ? 'ml-72' : ''} flex-1 min-h-screen bg-gray-900 text-white w-full overflow-x-hidden`}>
                {/* Header */}
                <div className="flex flex-row justify-between items-center bg-gray-800 p-4 sticky top-0 z-10 border-b border-gray-700">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h2 className="text-xl font-bold truncate max-w-[200px] sm:max-w-md">
                            {service?.name || service?.url}
                        </h2>
                    </div>
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

                <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
                    {/* Access Controls & Status */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-3xl font-bold">{service?.name || 'Unnamed Service'}</h1>
                                {renderStatusBadge(service?.status)}
                            </div>
                            <a href={service?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                                <Globe className="h-4 w-4" />
                                {service?.url}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="secondary" className="flex-1 md:flex-none gap-2" onClick={() => setIsDialogOpen(true)}>
                                <Edit className="h-4 w-4" /> Edit
                            </Button>
                            <Button variant="destructive" className="flex-1 md:flex-none gap-2" onClick={handleDelete}>
                                <Trash className="h-4 w-4" /> Delete
                            </Button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-400 mb-2">
                                <Clock className="h-5 w-5" />
                                <span className="font-medium">Check Interval</span>
                            </div>
                            <p className="text-2xl font-bold">{service?.delay}s</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-400 mb-2">
                                <Activity className="h-5 w-5" />
                                <span className="font-medium">Avg Response</span>
                            </div>
                            <p className="text-2xl font-bold">
                                {service?.report?.lastweek?.avgResponseTime ? Math.round(service.report.lastweek.avgResponseTime) : 0}ms
                            </p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            <div className="flex items-center gap-3 text-gray-400 mb-2">
                                <Calendar className="h-5 w-5" />
                                <span className="font-medium">Last Checked</span>
                            </div>
                            <p className="text-xl font-bold">
                                {service?.lastrun ? new Date(service.lastrun).toLocaleString() : 'Never'}
                            </p>
                        </div>
                    </div>

                    {/* Detail Configuration */}
                    <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-400" />
                            <h3 className="font-semibold text-lg">Configuration Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">HTTP Method</h4>
                                <div className="font-mono bg-gray-900/50 p-2 rounded border border-gray-700 inline-block">
                                    {typeof service?.method === 'string' ? service.method : service?.method?.method || 'HEAD'}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Expected Status Codes</h4>
                                <div className="font-mono text-gray-200">
                                    200, 201, 202, 204
                                </div>
                            </div>
                            {service?.headers && Object.keys(service.headers).length > 0 && (
                                <div className="col-span-full">
                                    <h4 className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Custom Headers</h4>
                                    <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-sm overflow-x-auto font-mono text-gray-300">
                                        {JSON.stringify(service.headers, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Logs Section */}
                    <div className="bg-gray-800/30 rounded-xl border border-gray-700">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="font-semibold text-lg">Recent Logs</h3>
                        </div>
                        <div className="p-6">
                            <ActivityLogs logs={logs} loading={logsLoading} />
                        </div>
                    </div>
                </div>
            </div>

            <ServiceFormDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                service={service}
                onSuccess={() => {
                    fetchServiceDetails();
                    setIsDialogOpen(false);
                }}
            />
        </div>
    );
};

export default ServiceDetailsPage;
