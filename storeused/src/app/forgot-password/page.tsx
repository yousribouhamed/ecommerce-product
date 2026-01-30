"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Loader2, Mail } from "lucide-react";
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

export default function ForgotPasswordPage() {
    const supabase = createClient();
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    const handleResetRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card className="p-6 md:p-8 text-center flex flex-col gap-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                            <Mail className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold">Verification sent</CardTitle>
                            <CardDescription>
                                We&apos;ve sent a password reset link to <strong>{email}</strong>.
                            </CardDescription>
                        </div>
                        <Button className="w-full" render={
                            <Link href="/login">Back to Login</Link>
                        } />
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
                            <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
                            <CardDescription>
                                Enter your email and we&apos;ll send you a link to reset your password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleResetRequest} className="grid gap-4">
                                {error && (
                                    <div className="bg-destructive/15 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={email}
                                        onChange={setEmail}
                                        isRequired
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Send Reset Link"}
                                </Button>
                            </form>
                        </CardContent>
                        <div className="p-6 text-center text-sm border-t border-border">
                            <Link href="/login" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                                <ArrowLeft className="size-4" />
                                Back to login
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
