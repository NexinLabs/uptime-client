import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    serviceName: string;
    onConfirm: () => void;
    loading?: boolean;
}

export const DeleteConfirmDialog = ({
    open,
    onOpenChange,
    serviceName,
    onConfirm,
    loading,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                        <DialogTitle className="text-xl font-bold">Delete Service</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400 pt-2">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-white">{serviceName}</span>?
                        <br />
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-3 pt-4">
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
