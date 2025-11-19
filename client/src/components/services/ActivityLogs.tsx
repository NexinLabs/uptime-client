import { Clock, AlertCircle } from "lucide-react";

interface ActivityLog {
  id: string;
  serviceName: string;
  url: string;
  method: string;
  status: string;
  statusCode: number;
  timestamp: string;
  message: string;
  responseTime: number | null;
}

interface ActivityLogsProps {
  logs: ActivityLog[];
  loading?: boolean;
}

export const ActivityLogs = ({ logs, loading }: ActivityLogsProps) => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-emerald-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <div className="h-2 w-2 rounded-full bg-emerald-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-gray-800/30 p-4 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400">No activity logs yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-1">{getStatusIcon(log.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-white truncate">
                    {log.serviceName}
                  </h4>
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                    {log.method}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate mb-1">{log.url}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{formatDate(log.timestamp)}</span>
                  {log.responseTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {log.responseTime}ms
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <p className={`font-medium text-sm ${getStatusColor(log.status)}`}>
                {log.status.toUpperCase()}
              </p>
              <p className="text-xs text-gray-500 mt-1">{log.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
