/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProductForm } from "@/components/products/product-form";
import { getProduct, type Product } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    const [product, setProduct] = React.useState<Product | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProduct(params.id as string);
                setProduct(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to load product.");
            } finally {
                setLoading(false);
            }
        }
        if (params.id) {
            fetchProduct();
        }
    }, [params.id]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </DashboardLayout>
        );
    }

    if (error || !product) {
        return (
            <DashboardLayout>
                <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                    <AlertCircle className="h-12 w-12 text-destructive opacity-20" />
                    <div className="max-w-[400px]">
                        <p className="font-medium text-destructive">{error || "Product not found"}</p>
                    </div>
                    <Button variant="outline" render={
                        <Link href="/products">Back to Products</Link>
                    } />
                </div>
            </DashboardLayout>
        );
    }

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
                        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                        <p className="text-muted-foreground">Update product details and inventory.</p>
                    </div>
                </div>

                <ProductForm initialData={product} />
            </div>
        </DashboardLayout>
    );
}
