"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash, Plus, ArrowRight, Github } from "lucide-react";

export default function ButtonDemo() {
    return (
        <div className="p-10 space-y-12 bg-muted/20 min-h-screen">
            <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Standard Variants</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="default">Default Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                    <Button variant="destructive-outline">Destructive Outline</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Sizes</h2>
                <div className="flex flex-wrap gap-4 items-end">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default Size</Button>
                    <Button size="lg">Large Size</Button>
                    <Button size="xl">Extra Large</Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Icon Buttons</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button size="icon" variant="outline">
                        <Plus />
                    </Button>
                    <Button size="icon-sm" variant="secondary">
                        <ShoppingCart />
                    </Button>
                    <Button size="icon-lg" variant="default">
                        <ArrowRight />
                    </Button>
                    <Button size="icon-xl" variant="destructive">
                        <Trash />
                    </Button>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">With Icons & States</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button className="gap-2">
                        <ShoppingCart className="size-4" />
                        Add to Cart
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Github className="size-4" />
                        Login with GitHub
                    </Button>
                    <Button disabled className="gap-2">
                        Disabled State
                    </Button>
                    <Button variant="outline" className="opacity-50">
                        Loading...
                    </Button>
                </div>
            </section>
        </div>
    );
}
