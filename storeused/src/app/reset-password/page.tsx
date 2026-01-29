"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
    const router = useRouter();
    const supabase = createClient();
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card className="p-6 md:p-8 text-center flex flex-col gap-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success mx-auto">
                            <Lock className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold">Password reset</CardTitle>
                            <CardDescription>
                                Your password has been successfully reset. Redirecting you to login...
                            </CardDescription>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto mb-2">
                                <ShoppingCart className="size-6" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
                            <CardDescription>
                                Enter your new password below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleReset} className="grid gap-4">
                                {error && (
                                    <div className="bg-destructive/15 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={setPassword}
                                        isRequired
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        isRequired
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Update Password"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
