import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET single menu
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabaseServer
    .from('menus')
    .select(`
      id, status, sort_order,
      menu_translations ( language_id, name )
    `)
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PUT update menu
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const { status, sort_order, translations } = body

  const { error: menuError } = await supabaseServer
    .from('menus')
    .update({ status, sort_order })
    .eq('id', id)

  if (menuError) return NextResponse.json({ error: menuError.message }, { status: 500 })

  if (translations) {
    for (const [code, t] of Object.entries(translations) as any) {
      const language_id = code === 'en' ? 1 : code === 'ar' ? 2 : 3
      const { error } = await supabaseServer
        .from('menu_translations')
        .upsert(
          { menu_id: Number(id), language_id, name: t.name },
          { onConflict: 'menu_id,language_id' }
        )
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

// DELETE menu
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { count } = await supabaseServer
    .from('categories')
    .select('id', { count: 'exact', head: true })
    .eq('menu_id', id)

  if (count && count > 0) {
    return NextResponse.json(
      { error: `Cannot delete — menu has ${count} categories. Move or delete them first.` },
      { status: 400 }
    )
  }

  const { error } = await supabaseServer
    .from('menus')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}