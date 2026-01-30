
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log("=== POST /api/employees - Start ===");
    try {
        const body = await request.json();
        console.log("Request body:", body);
        const { name, email, role, status, department } = body;

        // Basic validation
        if (!name || !email || !role) {
            console.log("Validation failed - missing fields");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        console.log("Creating Supabase client...");
        const supabase = await createClient();
        console.log("Supabase client created");

        console.log("Attempting to insert employee:", { name, email, role, status: status || "Active" });
        const { data, error } = await supabase
            .from("employees")
            .insert([
                {
                    name,
                    email,
                    role,
                    status: status || "Active",
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        console.log("Employee created successfully:", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("POST /api/employees - Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function GET() {
    console.log("=== GET /api/employees - Start ===");
    try {
        console.log("Creating Supabase client...");
        const supabase = await createClient();
        console.log("Supabase client created");

        console.log("Fetching employees...");
        const { data, error } = await supabase
            .from("employees")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        console.log(`Retrieved ${data?.length || 0} employees`);
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET /api/employees - Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
