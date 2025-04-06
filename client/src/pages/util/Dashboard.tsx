import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardTabsConfig } from "@/config";

import TopLabel from "@/components/ui/labels/TopLabel";
import CommingSoon from "@/components/ui/labels/CommingSoon";

import { Menu, Target, ListRestart, Logs, Activity, Clock, Globe, AlertTriangle } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
    const navigate = useNavigate();
    const params = useParams();
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
            id: DashboardTabsConfig.ServerLogs.id,
            name: DashboardTabsConfig.ServerLogs.name,
            icon: Logs
        },
    ];

    const [isMobile, setisMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeTab, setActiveTab] = useState(0);

    async function windowManage() {
        window.onresize = () => {
            setisMobile(window.innerWidth < 768);
        };
    }

    useEffect(() => {
        windowManage();
        // console.log(params.id?.toString());
    }, [params]);

    return (
        <div className="container flex-row flex min-w-screen min-h-screen">
            <div id="sidebar" className={`fixed text-white overflow-hidden transition-all duration-200 z-10 h-screen bg-gray-800 ${isSidebarOpen || !isMobile ? 'w-72' : 'w-0'}`}>
                <div className="header bg-emerald-700 p-4">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>UptimeClient</h2>
                </div>
                <ul className="p-4 *:my-4 *:bg-gray-700 *:p-2 *:rounded-md flex-shrink-0 whitespace-nowrap">
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
            </div>

            <div id="content" className={`${!isMobile && 'ml-72 max-w-[calc(100vw-288px)'} flex-1  min-h-screen bg-gray-900 text-white `}>
                <div className="flex flex-row justify-between items-center bg-gray-800 p-4">
                    <h2 className="text-2xl font-bold">{tabs[activeTab]?.name}</h2>
                    {isMobile && <Menu className="hover:text-gray-400 transition-colors duration-300 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
                </div>

                {tabs[activeTab].id == DashboardTabsConfig.Monitoring.id && (
                    <div className="p-6 space-y-6 ">
                        {/* Overview Cards */}
                        <div id="overview-tabs-container" className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">
                            
                            {/* Overall Uptime */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Activity className="h-8 w-8 text-emerald-500" />
                                    <span className="text-emerald-500 text-sm font-medium">OPERATIONAL</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">99.9%</h3>
                                <p className="text-gray-400 text-sm">Overall Uptime</p>
                            </div>

                            {/* Avg Response Time */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Clock className="h-8 w-8 text-blue-500" />
                                    <span className="text-blue-500 text-sm font-medium">LATENCY</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">187ms</h3>
                                <p className="text-gray-400 text-sm">Average Response</p>
                            </div>

                            {/* Total Monitors/Services */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <Globe className="h-8 w-8 text-purple-500" />
                                    <span className="text-purple-500 text-sm font-medium">MONITORS</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">24</h3>
                                <p className="text-gray-400 text-sm">Active Services</p>
                            </div>

                            {/* Total Incidents */}
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                                    <span className="text-yellow-500 text-sm font-medium">INCIDENTS</span>
                                </div>
                                <h3 className="text-2xl font-bold mt-4">2</h3>
                                <p className="text-gray-400 text-sm">Open Issues</p>
                            </div>
                        </div>

                        {/* Monitoring Table */}
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-700">
                                <h3 className="text-xl font-semibold">Service Status</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                        <div key={index} className="bg-gray-800/50 p-4 rounded-lg flex items-center justify-between hover:bg-gray-700/50 transition-all duration-300">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                                <div>
                                                    <h4 className="font-medium">Service {index + 1}</h4>
                                                    <p className="text-sm text-gray-400">https://service{index + 1}.example.com</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-emerald-500">Up</p>
                                                <p className="text-sm text-gray-400">99.9% uptime</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.Restarter.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                            <CommingSoon/>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Service Restarter</h2>
                                <p className="text-gray-400">Configure automatic restart rules for your services</p>
                            </div>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == DashboardTabsConfig.ServerLogs.id && (
                    <div className="p-6">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                        {/* <span className="absolute top-[-15px] backdrop-blur-lg bg-black px-2 ml-6 border-emerald-500 border rounded-lg">Comming Soon</span> */}
                            {/* <CommingSoon/> */}
                            <TopLabel text="Comming Soon" variant="default"/>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Server Logs</h2>
                                <p className="text-gray-400">View and analyze your server logs</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;