import { supabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// GET all products
export async function GET() {
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
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST create new product
export async function POST(request: Request) {
  const body = await request.json()

  const { id, category_id, price, calorie, status, image, image_medium, image_low, video, sort_order, translations, variants } = body

  if (!category_id || !translations?.en?.name) {
    return NextResponse.json({ error: 'category_id and English name are required' }, { status: 400 })
  }

  // Insert product
  const { data: product, error: productError } = await supabaseServer
    .from('products')
    .insert({ id, category_id, price, calorie: calorie ?? 0, status: status ?? true, image, image_medium, image_low, video, sort_order: sort_order ?? 0 })
    .select()
    .single()

  if (productError) return NextResponse.json({ error: productError.message }, { status: 500 })

  // Insert translations
  const translationRows = Object.entries(translations).map(([code, t]: [string, any]) => ({
    product_id:  product.id,
    language_id: code === 'en' ? 1 : code === 'ar' ? 2 : 3,
    name:        t.name,
    description: t.description ?? '',
  }))

  const { error: transError } = await supabaseServer
    .from('product_translations')
    .insert(translationRows)

  if (transError) return NextResponse.json({ error: transError.message }, { status: 500 })

  // Insert variants if any
  if (variants?.length) {
    const variantRows = variants.map((v: any, i: number) => ({
      product_id: product.id,
      price:      v.price,
      status:     v.status ?? true,
      sort_order: i,
    }))

    const { data: insertedVariants, error: variantError } = await supabaseServer
      .from('product_variants')
      .insert(variantRows)
      .select()

    if (variantError) return NextResponse.json({ error: variantError.message }, { status: 500 })

    const variantTranslationRows = insertedVariants.flatMap((v: any, i: number) =>
      Object.entries(variants[i].translations ?? {}).map(([code, t]: [string, any]) => ({
        variant_id:  v.id,
        language_id: code === 'en' ? 1 : code === 'ar' ? 2 : 3,
        name:        t.name,
      }))
    )

    if (variantTranslationRows.length) {
      const { error: vtError } = await supabaseServer
        .from('variant_translations')
        .insert(variantTranslationRows)
      if (vtError) return NextResponse.json({ error: vtError.message }, { status: 500 })
    }
  }

  return NextResponse.json(product, { status: 201 })
}