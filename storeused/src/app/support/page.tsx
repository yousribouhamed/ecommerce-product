"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/base/input/input";
import { ContactTextArea } from "@/components/base/input/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Send, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
    const [submitted, setSubmitted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CheckCircle2 className="size-10" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Message Received!</h1>
                        <p className="text-muted-foreground mt-2 max-w-md">
                            Thank you for reaching out. Our support team has been notified and will get back to you within 24 hours.
                        </p>
                    </div>
                    <Button size="lg" onClick={() => setSubmitted(false)}>
                        Send another message
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 py-4 lg:py-8 max-w-5xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-none">Support Center</Badge>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">How can we help?</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Have a question about your store or need technical assistance? Fill out the form below and our team will jump right in.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                            <CardHeader className="bg-primary px-8 py-10 text-primary-foreground">
                                <CardTitle className="text-2xl font-bold">Contact Support</CardTitle>
                                <CardDescription className="text-primary-foreground/80 text-lg">
                                    We typically respond in less than 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Your Name"
                                            placeholder="John Doe"
                                            isRequired
                                            size="md"
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="john@example.com"
                                            isRequired
                                            size="md"
                                        />
                                    </div>
                                    <Input
                                        label="Subject"
                                        placeholder="How can we help you?"
                                        isRequired
                                        size="md"
                                    />
                                    <ContactTextArea
                                        label="Message"
                                        placeholder="Tell us more about your issue..."
                                        isRequired
                                        rows={6}
                                    />
                                    <Button
                                        type="submit"
                                        size="xl"
                                        className="w-full mt-2 font-bold"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : (
                                            <>
                                                <Send className="mr-2 size-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold">Other ways to connect</h3>

                            <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <MessageSquare className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Live Chat</p>
                                    <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-5pm</p>
                                    <Button variant="link" size="sm" className="p-0 h-auto mt-1">Start chatting</Button>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Email Us</p>
                                    <p className="text-sm text-muted-foreground">Detailed inquiries and reports</p>
                                    <p className="text-sm font-medium text-primary mt-1">support@storeused.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone className="size-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Phone Support</p>
                                    <p className="text-sm text-muted-foreground">Urgent issues and calls</p>
                                    <p className="text-sm font-medium text-primary mt-1">+1 (888) 123-4567</p>
                                </div>
                            </div>
                        </div>

                        <Card className="bg-primary/5 border-none">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-primary">Quick Tip</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground -mt-2">
                                Check our <Button variant="link" size="sm" className="p-0 h-auto inline-block">Help Center</Button> for instant answers to frequently asked questions about orders and shipping.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
