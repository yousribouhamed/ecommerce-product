-- Allow anonymous access to employees table for demo purposes
create policy "Allow anonymous access"
  on employees
  for all
  to anon
  using (true)
  with check (true);
