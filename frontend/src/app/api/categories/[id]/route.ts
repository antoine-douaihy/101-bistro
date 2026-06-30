import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET single category
export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const params = await ctx.params
  const { data, error } = await supabaseServer
    .from('categories')
    .select(`
      id, menu_id, image, image_low, status, sort_order,
      category_translations ( language_id, name, description )
    `)
    .eq('id', params.id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PUT update category
export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const params = await ctx.params
  const body = await request.json()
  const { menu_id, image, image_low, status, sort_order, translations } = body

  // Update category
  const { error: catError } = await supabaseServer
    .from('categories')
    .update({ menu_id, image, image_low, status, sort_order })
    .eq('id', params.id)

  if (catError) return NextResponse.json({ error: catError.message }, { status: 500 })

  // Update translations
  if (translations) {
    for (const [code, t] of Object.entries(translations) as any) {
      const language_id = code === 'en' ? 1 : code === 'ar' ? 2 : 3
      const { error } = await supabaseServer
        .from('category_translations')
        .upsert(
          { category_id: Number(params.id), language_id, name: t.name, description: t.description ?? '' },
          { onConflict: 'category_id,language_id' }
        )
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

// DELETE category
export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const params = await ctx.params
  // Check if category has products
  const { count } = await supabaseServer
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', params.id)

  if (count && count > 0) {
    return NextResponse.json(
      { error: `Cannot delete — category has ${count} products. Move or delete them first.` },
      { status: 400 }
    )
  }

  const { error } = await supabaseServer
    .from('categories')
    .delete()
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}