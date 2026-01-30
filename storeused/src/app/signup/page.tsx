"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Github, Chrome, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            console.log("🚀 Starting sign up process for:", email);
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (signUpError) {
                console.error("❌ Supabase Sign Up Error:", signUpError);
                setError(signUpError.message);
            } else {
                console.log("✅ Sign Up Success Response:", data);
                if (data.user?.identities?.length === 0) {
                    console.warn("⚠️ User already exists but tried to sign up again. Confirmation email might not be sent.");
                    setError("This email is already registered. Please try logging in or reset your password.");
                } else {
                    setSuccess(true);
                }
            }
        } catch (err) {
            console.error("💥 Unexpected error during sign up:", err);
            setError("An unexpected error occurred. Please check the console.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendToken = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("📧 Attempting to resend confirmation email to:", email);
            const { error: resendError } = await supabase.auth.resend({
                type: 'signup',
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });

            if (resendError) {
                console.error("❌ Supabase Resend Error:", resendError);
                // Common error: "Email limit exceeded" (Supabase has a low rate limit for the default provider)
                setError(resendError.message);
                if (resendError.status === 429) {
                    console.error("⏱️ Rate limit hit. Supabase's default email provider allows only 3 emails per hour.");
                }
            } else {
                console.log("✅ Resend request accepted by Supabase.");
                alert("Confirmation email resent! Please check your inbox and spam folder.");
            }
        } catch (err) {
            console.error("💥 Unexpected error during resend:", err);
            setError("Could not resend email. Check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    const signInWithProvider = async (provider: 'github' | 'google') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) setError(error.message);
    };

    if (success) {
        return (
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card className="p-6 md:p-8 text-center flex flex-col gap-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                            <ShoppingCart className="size-6" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                            <CardDescription>
                                We&apos;ve sent a confirmation link to <strong>{email}</strong>. Please click it to activate your account.
                            </CardDescription>
                        </div>
                        <div className="space-y-4">
                            <Button className="w-full" render={
                                <Link href="/login">Back to Login</Link>
                            } />
                            <button
                                type="button"
                                onClick={handleResendToken}
                                disabled={loading}
                                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 disabled:opacity-50"
                            >
                                {loading ? "Resending..." : "Didn't receive an email? Resend"}
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0 md:grid md:grid-cols-2">
                        <CardContent className="p-6 md:p-8">
                            <form onSubmit={handleSignup} className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                                        <ShoppingCart className="size-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                                    <CardDescription>
                                        Join StoreUsed today and start managing your inventory
                                    </CardDescription>
                                </div>

                                {error && (
                                    <div className="bg-destructive/15 text-destructive text-xs p-3 rounded-lg border border-destructive/20">
                                        {error}
                                    </div>
                                )}

                                <div className="grid gap-4">
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
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={setPassword}
                                            isRequired
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={setConfirmPassword}
                                            isRequired
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Sign up"}
                                    </Button>
                                </div>

                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                                        Or sign up with
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" className="w-full" type="button" onClick={() => signInWithProvider('github')}>
                                        <Github className="mr-2 size-4" />
                                        GitHub
                                    </Button>
                                    <Button variant="outline" className="w-full" type="button" onClick={() => signInWithProvider('google')}>
                                        <Chrome className="mr-2 size-4" />
                                        Google
                                    </Button>
                                </div>

                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="font-medium underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                        <div className="relative hidden bg-muted md:block">
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary p-10 text-primary-foreground">
                                <blockquote className="space-y-2 text-center">
                                    <p className="text-lg font-medium">
                                        &ldquo;Joining StoreUsed was the best decision for our scaling business. The onboarding was seamless and the tools are top-notch.&rdquo;
                                    </p>
                                    <footer className="text-sm opacity-80">
                                        &mdash; Sarah Jenkins, COO at ReScale
                                    </footer>
                                </blockquote>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </Card>
                    <div className="text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By signing up, you agree to our <Link href="#">Terms of Service</Link>{" "}
                        and <Link href="#">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
