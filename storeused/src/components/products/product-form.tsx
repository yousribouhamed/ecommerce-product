"use client";

import * as React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/base/input/input";
import { CategorySelector } from "@/components/category-selector";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct, type Product } from "@/lib/api/products";
import { uploadProductImage } from "@/app/actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Dropzone,
    DropzoneEmptyState,
    DropzoneContent
} from "@/components/kibo-ui/dropzone";

interface ProductFormProps {
    initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [files, setFiles] = React.useState<File[]>([]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        let imageUrl = formData.get("image_url") as string;

        try {
            if (files.length > 0) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', files[0]);
                const result = await uploadProductImage(uploadFormData);

                if (result.error) {
                    throw new Error(result.error);
                }

                if (result.url) {
                    imageUrl = result.url;
                }
            }

            const productData = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: parseFloat(formData.get("price") as string),
                stock_quantity: parseInt(formData.get("stock") as string),
                category: formData.get("category") as string,
                image_url: imageUrl,
                is_active: true,
            };

            if (initialData) {
                await updateProduct(initialData.id, productData);
            } else {
                await createProduct(productData);
            }
            router.push("/products");
            router.refresh();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save product.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                <div className="md:col-span-2 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                            <CardDescription>
                                Basic information about the product.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={initialData?.name}
                                    placeholder="e.g. Wireless Headphones"
                                    isRequired
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={initialData?.description}
                                    placeholder="Describe your product..."
                                    className="min-h-32"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory & Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    defaultValue={initialData?.price?.toString()}
                                    placeholder="0.00"
                                    isRequired
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    defaultValue={initialData?.stock_quantity?.toString()}
                                    placeholder="0"
                                    isRequired
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <CategorySelector name="category" defaultValue={initialData?.category} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Image</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Dropzone
                                src={files}
                                onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
                                maxFiles={1}
                                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                            >
                                <DropzoneEmptyState />
                                <DropzoneContent />
                            </Dropzone>
                            <div className="grid gap-2">
                                <Label htmlFor="image_url">Or Image URL</Label>
                                <Input
                                    id="image_url"
                                    name="image_url"
                                    defaultValue={initialData?.image_url}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {error && (
                        <p className="text-sm font-medium text-destructive">{error}</p>
                    )}

                    <div className="flex flex-col gap-2">
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? "Update Product" : "Create Product"}
                        </Button>
                        <Button type="button" variant="outline" size="lg" className="w-full" disabled={loading} render={
                            <Link href="/products">Cancel</Link>
                        } />
                    </div>
                </div>
            </div>
        </form>
    );
}
