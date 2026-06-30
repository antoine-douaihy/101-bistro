import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET all categories
export async function GET() {
  const { data, error } = await supabaseServer
    .from('categories')
    .select(`
      id, menu_id, image, image_low, status, sort_order,
      category_translations ( language_id, name, description )
    `)
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST create new category
export async function POST(request: Request) {
  const body = await request.json()
  const { menu_id, image, image_low, status, sort_order, translations } = body

  if (!menu_id || !translations?.en?.name) {
    return NextResponse.json({ error: 'menu_id and English name are required' }, { status: 400 })
  }

  // Insert category
  const { data: category, error: catError } = await supabaseServer
    .from('categories')
    .insert({ menu_id, image, image_low, status: status ?? true, sort_order: sort_order ?? 0 })
    .select()
    .single()

  if (catError) return NextResponse.json({ error: catError.message }, { status: 500 })

  // Insert translations
  const translationRows = Object.entries(translations).map(([code, t]: [string, any]) => ({
    category_id: category.id,
    language_id: code === 'en' ? 1 : code === 'ar' ? 2 : 3,
    name:        t.name,
    description: t.description ?? '',
  }))

  const { error: transError } = await supabaseServer
    .from('category_translations')
    .insert(translationRows)

  if (transError) return NextResponse.json({ error: transError.message }, { status: 500 })

  return NextResponse.json(category, { status: 201 })
}