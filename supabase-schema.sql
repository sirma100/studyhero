-- Create signups table for StudyHero waitlist
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

create table signups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  university text not null,
  course text not null,
  year text not null,
  willing_to_pay text not null,
  created_at timestamp with time zone default now()
);

-- Create index on email for faster lookups
create index signups_email_idx on signups (email);

-- Create index on created_at for ordering
create index signups_created_at_idx on signups (created_at desc);

-- Enable Row Level Security (RLS)
alter table signups enable row level security;

-- Create policy to allow public inserts (for signups)
create policy "Allow public signups"
  on signups
  for insert
  to anon
  with check (true);

-- Create policy to allow authenticated reads (for admin dashboard)
-- Change this to your preferred authentication method
create policy "Allow public reads"
  on signups
  for select
  to anon
  using (true);

-- Note: For production, you should restrict read access to authenticated admin users only
-- Example policy for authenticated users:
-- create policy "Allow authenticated reads"
--   on signups
--   for select
--   to authenticated
--   using (true);
