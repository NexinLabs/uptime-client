import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, Target, ListRestart, Logs } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const Dashboard = () => {
    const navigate = useNavigate();
    const params = useParams();
    const tabs = [
        {
            id: 3462346,
            name: "Monitoring",
            icon: Target
        },
        {
            id: 3462347,
            name: "Restarter",
            icon: ListRestart,
            url: "#"
        },
        {
            id: 3462348,
            name: "Server Logs",
            icon: Logs
        },
    ]
    const [isMobile, setisMobile] = useState(window.innerWidth < 768);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeTab, setActiveTab] = useState(0);
    // change mobile status based on window width
    async function windowManage() {
        window.onresize = () => {
            setisMobile(window.innerWidth < 768)
        }
    }

    useEffect(() => {
        windowManage(), []
        console.log(params.id?.toString())
    }, [params])


    return (
        <div className="container flex-row flex min-w-screen min-h-screen">
            <div id="sidebar" className={`fixed text-white overflow-hidden transition-all duration-200  z-10 h-screen  bg-gray-800 ${isSidebarOpen || !isMobile ? 'w-72' : 'w-0 '}`}>
                <div className="header bg-emerald-700 p-4">
                    <h2 className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>UptimeClient</h2>
                </div>
                <ul className="p-4 *:my-4 *:bg-gray-700 *:p-2 *:rounded-md flex-shrink-0 whitespace-nowrap">
                    {tabs.map((tab, index) => (
                        <li key={tab.id} onClick={() => {
                            if (tab.url) navigate(tab.url);

                            setActiveTab(index);

                            setIsSidebarOpen(false)
                        }} className="flex items-center gap-2 hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
                            <tab.icon /> {tab.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div id="content" className={`${!isMobile && 'ml-72'} flex-1 min-w-screen min-h-screen bg-gray-900 text-white`}>

                <div className="flex flex-row justify-between items-center bg-gray-800 p-4">
                    <h2 className="text-2xl font-bold">{tabs[activeTab]?.name}</h2>
                    {isMobile && <Menu className="hover:text-gray-400 transition-colors duration-300 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
                </div>


                {tabs[activeTab].id == 3462346 && (
                    <div className={`container p-4 ${!isMobile ? 'grid grid-cols-2' : 'flex flex-col '} w-full  gap-4`}>

                        <div className={`content rounded-lg overflow-hidden order-${isMobile ? 2 : 1}`}>
                            <div className="flex  min-w-full gap-4 m-4">
                                <Skeleton className="h-8 w-[300px]" />
                                <Skeleton className="h-8 w-[150px]" />
                            </div>
                            {/* table content */}
                            <div className={`tab`}>
                                <div className="h-full p-4 mt-4 rounded *:my-2">
                                    {[1, 2, 3, 4, 5].map((item, index) => (
                                        <Skeleton key={item + index} className={`${isMobile ? 'h-24' : 'h-12'} w-full`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* stats tab */}
                        <div className={`container order-${isMobile ? 1 : 2} rounded-lg overflow-hidden`}>
                            <div className="stats-tab block *:my-2">
                                <div className="subdivision flex flex-row gap-4">
                                    <Skeleton className="h-48 w-[50%]" />
                                    <Skeleton className="h-48 w-[50%]" />
                                </div>
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    </div>

                )}
                {tabs[activeTab].id == 3462347 && (
                    <div className={`container p-4 ${!isMobile ? 'grid grid-cols-2' : 'flex flex-col '} w-full h-full gap-4`}>

                        <div className="content  w-full h-full rounded-lg overflow-hidden">
                            <h2>Restarter</h2>
                        </div>
                    </div>
                )}

                {tabs[activeTab].id == 3462348 && (
                    <div className={`container p-4 ${!isMobile ? 'grid grid-cols-2' : 'flex flex-col '} w-full h-full gap-4`}>

                        <div className="content  w-full h-full rounded-lg overflow-hidden">
                            <h2>Server Logs</h2>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Dashboard;