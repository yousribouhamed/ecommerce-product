import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Store } from "lucide-react";

export function StoreNavbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/store" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Store className="size-5" />
                    </div>
                    <span>StoreFront</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="relative">
                        <ShoppingCart className="size-5" />
                        <span className="sr-only">Cart</span>
                        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            0
                        </span>
                    </Button>
                    <Button render={
                        <Link href="/login">Login</Link>
                    } />
                </div>
            </div>
        </nav>
    );
}
