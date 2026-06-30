import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET all menus
export async function GET() {
  const { data, error } = await supabaseServer
    .from('menus')
    .select(`
      id, status, sort_order,
      menu_translations ( language_id, name )
    `)
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST create new menu
export async function POST(request: Request) {
  const body = await request.json()
  const { status, sort_order, translations } = body

  if (!translations?.en?.name) {
    return NextResponse.json({ error: 'English name is required' }, { status: 400 })
  }

  // Insert menu
  const { data: menu, error: menuError } = await supabaseServer
    .from('menus')
    .insert({ status: status ?? true, sort_order: sort_order ?? 0 })
    .select()
    .single()

  if (menuError) return NextResponse.json({ error: menuError.message }, { status: 500 })

  // Insert translations
  const translationRows = Object.entries(translations).map(([code, t]: [string, any]) => ({
    menu_id:     menu.id,
    language_id: code === 'en' ? 1 : code === 'ar' ? 2 : 3,
    name:        t.name,
  }))

  const { error: transError } = await supabaseServer
    .from('menu_translations')
    .insert(translationRows)

  if (transError) return NextResponse.json({ error: transError.message }, { status: 500 })

  return NextResponse.json(menu, { status: 201 })
}