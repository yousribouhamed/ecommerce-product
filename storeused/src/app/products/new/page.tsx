"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProductForm } from "@/components/products/product-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="lg" className="h-10 w-10 p-0" render={
                        <Link href="/products">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                    } />
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
                        <p className="text-muted-foreground">Create a new listing for your store.</p>
                    </div>
                </div>

                <ProductForm />
            </div>
        </DashboardLayout>
    );
}
