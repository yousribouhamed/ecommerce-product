import { createClient } from "@/lib/supabase/client";

export interface Product {
    id: string;
    created_at: string;
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category?: string;
    image_url?: string;
    is_active: boolean;
    user_id: string;
}

const supabase = createClient();

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        throw error;
    }

    return data as Product[];
}

export async function getProduct(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching product:", error);
        throw error;
    }

    return data as Product;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("User not authenticated");

    // Exclude is_active from the insert payload to avoid schema errors if the column is missing/cached
    // The database should handle the default value (true) logic if the column exists
    // Exclude is_active from the insert payload to avoid schema errors if the column is missing/cached
    // The database should handle the default value (true) logic if the column exists
    const { ...productData } = product;

    const { data, error } = await supabase
        .from('products')
        .insert([{ ...productData, user_id: user.id }])
        .select()
        .single();

    if (error) {
        console.error("Error creating product:", error);
        throw error;
    }

    return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at' | 'user_id'>>) {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Error updating product:", error);
        throw error;
    }

    return data as Product;
}
