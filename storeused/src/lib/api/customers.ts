import { createClient } from "@/lib/supabase/client";

export interface Customer {
  id: string;
  created_at: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone: string | null;
  total_spend: number;
  order_count: number;
}

const supabase = createClient();

export async function getCustomers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }

  return data as Customer[];
}
