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
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push("/");
            router.refresh();
        }
        setLoading(false);
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            alert("Check your email for the confirmation link!");
        }
        setLoading(false);
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

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted/40 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0 md:grid md:grid-cols-2">
                        <CardContent className="p-6 md:p-8">
                            <form onSubmit={handleLogin} className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
                                        <ShoppingCart className="size-6" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                                    <CardDescription>
                                        Login to your StoreUsed account
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
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link
                                                href="/forgot-password"
                                                className="text-xs text-muted-foreground hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={setPassword}
                                            isRequired
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="remember" />
                                        <Label
                                            htmlFor="remember"
                                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Remember me for 30 days
                                        </Label>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Login"}
                                    </Button>
                                </div>
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                                        Or continue with
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
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/signup"
                                        className="font-medium underline underline-offset-4"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                        <div className="relative hidden bg-muted md:block">
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary p-10 text-primary-foreground">
                                <blockquote className="space-y-2 text-center">
                                    <p className="text-lg font-medium">
                                        &ldquo;StoreUsed has completely transformed how we manage our secondary inventory. The dashboard is intuitive and powerful.&rdquo;
                                    </p>
                                    <footer className="text-sm opacity-80">
                                        &mdash; Alex Rivera, CEO at Thriftify
                                    </footer>
                                </blockquote>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </Card>
                    <div className="text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                        and <Link href="#">Privacy Policy</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
}
