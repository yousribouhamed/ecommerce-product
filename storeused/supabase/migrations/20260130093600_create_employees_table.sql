-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'Employee',
    status TEXT NOT NULL DEFAULT 'Active',
    permissions JSONB DEFAULT '{"orders": "read", "products": "read", "customers": "none"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Simple policy for employees table (Admin access recommended)
-- FOR NOW: Allow all authenticated users to read/write for local development
CREATE POLICY "Enable all for authenticated users" ON employees
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
