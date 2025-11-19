import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { servicesAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: any;
  onSuccess?: () => void;
}

export const ServiceFormDialog = ({ open, onOpenChange, service, onSuccess }: ServiceFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  
  // Extract method string from service (handle both object and string)
  const getMethodString = (method: any): string => {
    if (typeof method === 'string') return method;
    if (method && typeof method === 'object' && method.method) return method.method;
    return 'HEAD';
  };
  
  const [formData, setFormData] = useState({
    name: service?.name || "",
    url: service?.url || "",
    method: getMethodString(service?.method),
    delay: service?.delay || 60,
    headers: service?.headers ? JSON.stringify(service.headers, null, 2) : "{}",
    body: service?.body ? JSON.stringify(service.body, null, 2) : "{}",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Parse JSON fields
      let headers = {};
      let body = {};

      try {
        headers = formData.headers ? JSON.parse(formData.headers) : {};
      } catch {
        setErrors({ headers: "Invalid JSON format" });
        setLoading(false);
        return;
      }

      try {
        body = formData.body ? JSON.parse(formData.body) : {};
      } catch {
        setErrors({ body: "Invalid JSON format" });
        setLoading(false);
        return;
      }

      const serviceData = {
        name: formData.name,
        url: formData.url,
        method: formData.method,
        delay: formData.delay,
        headers,
        body,
      };

      if (service?._id) {
        await servicesAPI.updateService(service._id, serviceData);
      } else {
        await servicesAPI.createService(serviceData);
      }

      onSuccess?.();
      onOpenChange(false);
      setFormData({
        name: "",
        url: "",
        method: "HEAD",
        delay: 60,
        headers: "{}",
        body: "{}",
      });
    } catch (error: any) {
      setErrors({ submit: error.message || "Failed to save service" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              placeholder="My API Service"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              placeholder="https://api.example.com/health"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">HTTP Method *</Label>
            <Select value={formData.method} onValueChange={(value: string) => setFormData({ ...formData, method: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HEAD">HEAD</SelectItem>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delay">Check Interval (minutes) *</Label>
            <div className="space-y-2">
              <input
                id="delay"
                type="range"
                min="1"
                max="60"
                value={formData.delay / 60}
                onChange={(e) => setFormData({ ...formData, delay: parseInt(e.target.value) * 60 })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>1 min</span>
                <span className="text-emerald-500 font-medium">{Math.round(formData.delay / 60)} minutes</span>
                <span>60 min</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="headers">Headers (JSON)</Label>
            <Textarea
              id="headers"
              placeholder='{"Authorization": "Bearer token"}'
              value={formData.headers}
              onChange={(e) => setFormData({ ...formData, headers: e.target.value })}
              rows={4}
            />
            {errors.headers && <p className="text-red-500 text-sm">{errors.headers}</p>}
          </div>

          {formData.method === "POST" && (
            <div className="space-y-2">
              <Label htmlFor="body">Request Body (JSON)</Label>
              <Textarea
                id="body"
                placeholder='{"key": "value"}'
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                rows={4}
              />
              {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
              <p className="text-red-500 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                service ? "Update Service" : "Create Service"
              )}
            </Button>
            <Button
              type="button"
              variant="white-outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
