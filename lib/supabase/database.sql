-- Buat tabel announcements
create table announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buat tabel regulations
create table regulations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Aktifkan RLS
alter table announcements enable row level security;
alter table regulations enable row level security;

-- Izinkan akses baca publik (karena ini website company profile)
create policy "Allow public read access on announcements"
  on announcements for select
  using (true);

create policy "Allow public read access on regulations"
  on regulations for select
  using (true);