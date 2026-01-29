-- Enable RLS on products table if not already enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insert on products" ON products;
DROP POLICY IF EXISTS "Allow public select on products" ON products;
DROP POLICY IF EXISTS "Allow public update on products" ON products;
DROP POLICY IF EXISTS "Allow public delete on products" ON products;

-- Create policy to allow anyone to insert products
CREATE POLICY "Allow public insert on products"
ON products
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow anyone to select products
CREATE POLICY "Allow public select on products"
ON products
FOR SELECT
TO public
USING (true);

-- Create policy to allow anyone to update products
CREATE POLICY "Allow public update on products"
ON products
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create policy to allow anyone to delete products
CREATE POLICY "Allow public delete on products"
ON products
FOR DELETE
TO public
USING (true);

-- Note: These policies allow public access for development/testing
-- For production, you should restrict access to authenticated users only
-- by changing "TO public" to "TO authenticated" and adding appropriate checks
