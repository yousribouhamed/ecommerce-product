"use client";

import * as React from "react";
import { StoreNavbar } from "@/components/store/navbar";
import { Product, getProducts } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, Package } from "lucide-react";

export default function StorePage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                // Filter only active products for the store
                setProducts(data.filter(p => p.is_active));
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-muted/5">
            <StoreNavbar />

            {/* Hero Section */}
            <div className="bg-primary text-primary-foreground py-16 md:py-24">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                        Welcome to StoreFront
                    </h1>
                    <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                        Discover our curated collection of premium products. Quality you can trust, prices you'll love.
                    </p>
                </div>
            </div>

            <main className="container mx-auto py-12">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Products</h2>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                        <Package className="h-12 w-12 opacity-20 mb-4" />
                        <p className="text-lg font-medium">No products available</p>
                        <p>Check back later for new arrivals.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {products.map((product) => (
                            <div key={product.id} className="group relative flex flex-col gap-2">
                                {/* Image Container */}
                                <div className="aspect-[1.1] relative bg-muted/20 flex items-center justify-center overflow-hidden rounded-md mb-2">
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="bg-zinc-200 text-zinc-600 px-2 py-0.5 text-[10px] font-bold uppercase rounded-sm tracking-wider">
                                            New In
                                        </span>
                                    </div>

                                    {/* Action Button */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <button
                                            className="group/button relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm font-medium text-black transition-all duration-300 hover:w-24 disabled:opacity-50 disabled:hover:w-8"
                                            disabled={product.stock_quantity <= 0}
                                        >
                                            <p className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
                                                Add to Cart
                                            </p>
                                            <div className="absolute right-2">
                                                <ShoppingBag className="size-4 text-black" />
                                            </div>
                                        </button>
                                    </div>

                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <Package className="h-12 w-12 text-muted-foreground/30" />
                                    )}

                                    {product.stock_quantity <= 0 && (
                                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[1px] z-20">
                                            <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                                Sold Out
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex justify-between items-end gap-2">
                                    <div className="flex flex-col">
                                        <h3 className="font-black text-base uppercase tracking-tight leading-none text-black">
                                            {product.name}
                                        </h3>
                                        <p className="text-[10px] uppercase font-bold text-zinc-400 mt-1 tracking-wider">
                                            {product.category || "Uncategorized"}
                                        </p>
                                    </div>
                                    <span className="font-medium text-lg text-black leading-none">
                                        {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(product.price)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
