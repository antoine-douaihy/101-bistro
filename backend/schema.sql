-- =============================================
-- Benelli Lounge Menu — Supabase Schema
-- Run this in: Supabase > SQL Editor > New Query
-- =============================================

-- 1. Languages
create table languages (
  id   serial primary key,
  code text not null unique,  -- 'en', 'ar', 'ku'
  name text not null,         -- 'English', 'العربية', 'کوردی'
  dir  text not null default 'ltr' -- 'ltr' or 'rtl'
);

insert into languages (code, name, dir) values
  ('en', 'English',  'ltr'),
  ('ar', 'العربية',  'rtl'),
  ('ku', 'کوردی',    'rtl');

-- 2. Menus
create table menus (
  id         integer primary key,
  status     boolean not null default true,
  sort_order integer not null default 0
);

-- 3. Menu translations
create table menu_translations (
  id          serial primary key,
  menu_id     integer not null references menus(id) on delete cascade,
  language_id integer not null references languages(id) on delete cascade,
  name        text not null,
  unique (menu_id, language_id)
);

-- 4. Categories
create table categories (
  id                 integer primary key,
  menu_id            integer not null references menus(id) on delete cascade,
  parent_category_id integer references categories(id) on delete set null,
  image              text,
  image_low          text,
  blurhash           text,
  status             boolean not null default true,
  sort_order         integer not null default 0
);

-- 5. Category translations
create table category_translations (
  id          serial primary key,
  category_id integer not null references categories(id) on delete cascade,
  language_id integer not null references languages(id) on delete cascade,
  name        text not null,
  description text,
  unique (category_id, language_id)
);

-- 6. Products
create table products (
  id           integer primary key,
  category_id  integer not null references categories(id) on delete cascade,
  price        numeric(10, 2),
  calorie      integer default 0,
  status       boolean not null default true,
  image        text,
  image_medium text,
  image_low    text,
  video        text,
  sort_order   integer not null default 0
);

-- 7. Product translations
create table product_translations (
  id          serial primary key,
  product_id  integer not null references products(id) on delete cascade,
  language_id integer not null references languages(id) on delete cascade,
  name        text not null,
  description text,
  unique (product_id, language_id)
);

-- 8. Product variants (e.g. sizes, options with different prices)
create table product_variants (
  id         serial primary key,
  product_id integer not null references products(id) on delete cascade,
  price      numeric(10, 2),
  status     boolean not null default true,
  sort_order integer not null default 0
);

-- 9. Variant translations
create table variant_translations (
  id          serial primary key,
  variant_id  integer not null references product_variants(id) on delete cascade,
  language_id integer not null references languages(id) on delete cascade,
  name        text not null,
  unique (variant_id, language_id)
);

-- =============================================
-- Indexes for query performance
-- =============================================
create index on categories (menu_id);
create index on products (category_id);
create index on product_translations (product_id);
create index on product_translations (language_id);
create index on category_translations (category_id);
create index on product_variants (product_id);

-- =============================================
-- Row Level Security (RLS)
-- Public can read everything. Only authenticated
-- users (admin) can write.
-- =============================================
alter table languages            enable row level security;
alter table menus                enable row level security;
alter table menu_translations    enable row level security;
alter table categories           enable row level security;
alter table category_translations enable row level security;
alter table products             enable row level security;
alter table product_translations enable row level security;
alter table product_variants     enable row level security;
alter table variant_translations enable row level security;

-- Public read policy
create policy "Public read" on languages            for select using (true);
create policy "Public read" on menus                for select using (true);
create policy "Public read" on menu_translations    for select using (true);
create policy "Public read" on categories           for select using (true);
create policy "Public read" on category_translations for select using (true);
create policy "Public read" on products             for select using (true);
create policy "Public read" on product_translations for select using (true);
create policy "Public read" on product_variants     for select using (true);
create policy "Public read" on variant_translations for select using (true);

-- Authenticated (admin) write policy
create policy "Admin write" on menus                for all using (auth.role() = 'authenticated');
create policy "Admin write" on menu_translations    for all using (auth.role() = 'authenticated');
create policy "Admin write" on categories           for all using (auth.role() = 'authenticated');
create policy "Admin write" on category_translations for all using (auth.role() = 'authenticated');
create policy "Admin write" on products             for all using (auth.role() = 'authenticated');
create policy "Admin write" on product_translations for all using (auth.role() = 'authenticated');
create policy "Admin write" on product_variants     for all using (auth.role() = 'authenticated');
create policy "Admin write" on variant_translations for all using (auth.role() = 'authenticated');
