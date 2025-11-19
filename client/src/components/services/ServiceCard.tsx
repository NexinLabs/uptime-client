import { useState } from "react";
import { Edit, Trash2, ExternalLink, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface Service {
  _id: string;
  name: string;
  url: string;
  method: string;
  status: number;
  lastrun: string;
}

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
}

export const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const statusConfig = {
    0: { color: "bg-red-500", text: "Down", textColor: "text-red-500" },
    1: { color: "bg-emerald-500", text: "Up", textColor: "text-emerald-500" },
    2: { color: "bg-yellow-500", text: "Pending", textColor: "text-yellow-500" },
  };

  const status = statusConfig[service.status as keyof typeof statusConfig] || statusConfig[2];

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(service._id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <Circle className={`h-3 w-3 mt-1 flex-shrink-0 ${status.color}`} fill="currentColor" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white truncate">
                {service.name || "Unnamed Service"}
              </h4>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-gray-400 truncate">{service.url}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                {service.method}
              </span>
              <span className="text-xs text-gray-500">
                Last check: {formatDate(service.lastrun)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <div className="text-right mr-2">
            <p className={`font-medium ${status.textColor}`}>{status.text}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(service)}
            className="text-gray-400 "
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowDeleteDialog(true)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        serviceName={service.name || service.url}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};
