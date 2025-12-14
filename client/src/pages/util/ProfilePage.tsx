import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, userAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, User, Bell, Lock, Mail, MessageSquare, Smartphone, Save, Eye, EyeOff } from "lucide-react";

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    notification: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Notification state
    const [notifications, setNotifications] = useState({
        email: false,
        sms: false,
        push: false,
    });
    const [notificationLoading, setNotificationLoading] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const authResponse = await authAPI.authenticate();
                const authData: any = authResponse.data;

                if (authData?._id) {
                    const profileResponse = await userAPI.getProfile(authData._id);
                    const profileData = profileResponse.data as UserProfile;
                    setUser(profileData);
                    setNotifications(profileData.notification || { email: false, sms: false, push: false });
                }
            } catch (error: any) {
                console.error("Error fetching profile:", error);
                toast({
                    title: "Error",
                    description: "Failed to load profile. Please try again.",
                    variant: "destructive",
                });
                navigate("/login", {
                    state: { from: "/profile" },
                    replace: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "New passwords do not match.",
                variant: "destructive",
            });
            return;
        }

        if (newPassword.length < 8) {
            toast({
                title: "Error",
                description: "Password must be at least 8 characters long.",
                variant: "destructive",
            });
            return;
        }

        if (!user) return;

        try {
            setPasswordLoading(true);
            await userAPI.updatePassword(user._id, currentPassword, newPassword);
            toast({
                title: "Success",
                description: "Password updated successfully.",
            });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update password.",
                variant: "destructive",
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleNotificationUpdate = async () => {
        if (!user) return;

        try {
            setNotificationLoading(true);
            await userAPI.updateNotification(user._id, notifications);
            toast({
                title: "Success",
                description: "Notification preferences updated.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to update notifications.",
                variant: "destructive",
            });
        } finally {
            setNotificationLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/dashboard")}
                        className="text-gray-400 hover:text-white"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Profile Info Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{user?.name}</h2>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="h-6 w-6 text-emerald-500" />
                        <h2 className="text-xl font-semibold">Notification Preferences</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Email Notifications */}
                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-blue-400" />
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-gray-400">Receive alerts via email</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>

                        {/* SMS Notifications */}
                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Smartphone className="h-5 w-5 text-green-400" />
                                <div>
                                    <p className="font-medium">SMS Notifications</p>
                                    <p className="text-sm text-gray-400">Receive alerts via SMS</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.sms}
                                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>

                        {/* Push Notifications */}
                        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-purple-400" />
                                <div>
                                    <p className="font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-400">Receive push notifications</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.push}
                                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                        </div>

                        <Button
                            onClick={handleNotificationUpdate}
                            disabled={notificationLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4"
                        >
                            {notificationLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Notification Preferences
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-6 w-6 text-emerald-500" />
                        <h2 className="text-xl font-semibold">Change Password</h2>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-gray-300">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    className="bg-gray-700 border-gray-600 text-white pr-10"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-gray-300">
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="bg-gray-700 border-gray-600 text-white pr-10"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-300">
                                Confirm New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-gray-700 border-gray-600 text-white pr-10"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                        >
                            {passwordLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Update Password
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
