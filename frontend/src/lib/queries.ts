import { supabase } from './supabase'
import type { Menu, Category, Product, Variant, Lang } from '@/types'

export async function getMenuData(): Promise<Menu[]> {
  const { data: menus, error: menuErr } = await supabase
    .from('menus')
    .select(`
      id, status,
      menu_translations ( language_id, name )
    `)
    .eq('status', true)
    .order('sort_order')
  if (menuErr) throw menuErr

  const { data: categories, error: catErr } = await supabase
    .from('categories')
    .select(`
      id, menu_id, image, image_low, status, sort_order,
      category_translations ( language_id, name, description )
    `)
    .eq('status', true)
    .order('sort_order')
  if (catErr) throw catErr

  const { data: products, error: prodErr } = await supabase
    .from('products')
    .select(`
      id, category_id, price, calorie, status, image, image_medium, image_low, video, sort_order,
      product_translations ( language_id, name, description ),
      product_variants (
        id, price, status, sort_order,
        variant_translations ( language_id, name )
      )
    `)
    .eq('status', true)
    .order('sort_order')
  if (prodErr) throw prodErr

  const langMap: Record<number, Lang> = { 1: 'en', 2: 'ar', 3: 'ku' }

  function buildTranslations<T extends { language_id: number }>(
    rows: T[],
    pick: (r: T) => object
  ): Record<Lang, any> {
    const out: any = {}
    for (const r of rows) {
      const code = langMap[r.language_id]
      if (code) out[code] = pick(r)
    }
    return out
  }

  const shapedProducts: Product[] = (products ?? []).map((p: any) => ({
    id:           p.id,
    category_id:  p.category_id,
    price:        p.price,
    calorie:      p.calorie,
    status:       p.status,
    image:        p.image,
    image_medium: p.image_medium,
    image_low:    p.image_low,
    video:        p.video,
    sort_order:   p.sort_order,
    translations: buildTranslations(p.product_translations, (r: any) => ({
      name: r.name, description: r.description,
    })),
    variants: (p.product_variants ?? []).map((v: any) => ({
      id:           v.id,
      price:        v.price,
      status:       v.status,
      translations: buildTranslations(v.variant_translations, (r: any) => ({
        name: r.name,
      })),
    })) as Variant[],
  }))

  const shapedCategories: Category[] = (categories ?? []).map((c: any) => ({
    id:           c.id,
    menu_id:      c.menu_id,
    image:        c.image,
    image_low:    c.image_low,
    status:       c.status,
    sort_order:   c.sort_order,
    translations: buildTranslations(c.category_translations, (r: any) => ({
      name: r.name, description: r.description,
    })),
    products: shapedProducts.filter(p => p.category_id === c.id),
  }))

  return (menus ?? []).map((m: any) => ({
    id:           m.id,
    status:       m.status,
    translations: buildTranslations(m.menu_translations, (r: any) => ({
      name: r.name,
    })),
    categories: shapedCategories.filter(c => c.menu_id === m.id),
  }))
}