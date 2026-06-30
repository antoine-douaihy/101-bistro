import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET single product
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabaseServer
    .from('products')
    .select(`
      id, category_id, price, calorie, status, image, image_medium, image_low, video, sort_order,
      product_translations ( language_id, name, description ),
      product_variants (
        id, price, status, sort_order,
        variant_translations ( language_id, name )
      )
    `)
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

// PUT update product
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const { category_id, price, calorie, status, image, image_medium, image_low, video, sort_order, translations } = body

  const { error: productError } = await supabaseServer
    .from('products')
    .update({ category_id, price, calorie, status, image, image_medium, image_low, video, sort_order })
    .eq('id', id)

  if (productError) return NextResponse.json({ error: productError.message }, { status: 500 })

  if (translations) {
    for (const [code, t] of Object.entries(translations) as any) {
      const language_id = code === 'en' ? 1 : code === 'ar' ? 2 : 3
      const { error } = await supabaseServer
        .from('product_translations')
        .upsert(
          { product_id: Number(id), language_id, name: t.name, description: t.description ?? '' },
          { onConflict: 'product_id,language_id' }
        )
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

// DELETE product
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { error } = await supabaseServer
    .from('products')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}