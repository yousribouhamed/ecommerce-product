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
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductFormProps {
    initialData?: any;
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(
        initialData?.image_url || null
    );
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setImageFile(file);
            setError(null);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);

            // Add image file if selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create product');
            }

            // Success! Redirect to products page
            router.push("/products");
            router.refresh();
        } catch (err: any) {
            console.error('Form submission error:', err);
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
                                <Label htmlFor="name">Product Name *</Label>
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
                                <Label htmlFor="price">Price ($) *</Label>
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
                                <Label htmlFor="stock">Stock Quantity *</Label>
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
                            <CardDescription>
                                Upload a product image (max 5MB)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {imagePreview ? (
                                <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 rounded-full bg-destructive p-1.5 text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-muted-foreground/50 hover:bg-muted"
                                >
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Click to upload</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (max 5MB)</p>
                                    </div>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </CardContent>
                    </Card>

                    {error && (
                        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                            <p className="text-sm font-medium text-destructive">{error}</p>
                        </div>
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
