
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, role, status, department } = body;

        // Basic validation
        if (!name || !email || !role) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("employees")
            .insert([
                {
                    name,
                    email,
                    role,
                    status: status || "Active",
                    // For now, storing department in permissions or metadata if needed, 
                    // but schema didn't show department column. 
                    // Ignoring department for table insert based on schema.sql read.
                },
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("employees")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
