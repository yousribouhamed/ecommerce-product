import { createClient } from "@/lib/supabase/client";

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    id: string;
    order_id: string;
    product_name: string;
    quantity: number;
    price: number;
    product_image?: string;
}

export interface Order {
    id: string;
    created_at: string;
    user_id: string;
    status: OrderStatus;
    total_amount: number;
    shipping_address?: Record<string, unknown>;
    payment_status?: string;
    order_items?: OrderItem[];
}

const supabase = createClient();

export async function getOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (*)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }

    return data as Order[];
}

export async function getOrderById(id: string) {
    const { data, error } = await supabase
        .from('orders')
        .select(`
      *,
      order_items (*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching order ${id}:`, error);
        throw error;
    }

    return data as Order;
}
