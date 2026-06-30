/**
 * Benelli Lounge — Supabase Seed Script
 *
 * Reads products.json and inserts all data into Supabase.
 *
 * Setup:
 *   1. npm install @supabase/supabase-js
 *   2. Fill in SUPABASE_URL and SUPABASE_SERVICE_KEY below
 *      (use the service_role key, NOT the anon key — it bypasses RLS)
 *   3. Place products.json in the same folder as this file
 *   4. node seed.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL         = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_SERVICE_KEY = 'YOUR_SERVICE_ROLE_KEY'
// ─────────────────────────────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const LANG_CODE_TO_ID = { en: 1, ar: 2, ku: 3 }

async function seed() {
  const raw = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8')
  const { products } = JSON.parse(raw)

  console.log(`Seeding ${products.length} products…`)

  // ── Collect unique menus and categories ──────────────────────────────────
  const menusMap     = new Map()
  const categoriesMap = new Map()

  for (const p of products) {
    if (!menusMap.has(p.menu_id)) {
      menusMap.set(p.menu_id, { id: p.menu_id, names: p.menu_name })
    }
    if (!categoriesMap.has(p.category_id)) {
      categoriesMap.set(p.category_id, {
        id:      p.category_id,
        menu_id: p.menu_id,
        names:   p.category_name,
      })
    }
  }

  // ── Insert menus ─────────────────────────────────────────────────────────
  console.log('Inserting menus…')
  const menus = [...menusMap.values()]
  const { error: menuErr } = await supabase
    .from('menus')
    .upsert(menus.map((m, i) => ({ id: m.id, status: true, sort_order: i })))
  if (menuErr) throw menuErr

  // ── Insert menu translations ──────────────────────────────────────────────
  const menuTranslations = []
  for (const m of menus) {
    for (const [code, name] of Object.entries(m.names)) {
      const language_id = LANG_CODE_TO_ID[code]
      if (language_id && name) {
        menuTranslations.push({ menu_id: m.id, language_id, name })
      }
    }
  }
  const { error: mtErr } = await supabase
    .from('menu_translations')
    .upsert(menuTranslations, { onConflict: 'menu_id,language_id' })
  if (mtErr) throw mtErr

  // ── Insert categories ─────────────────────────────────────────────────────
  console.log('Inserting categories…')
  const categories = [...categoriesMap.values()]
  const { error: catErr } = await supabase
    .from('categories')
    .upsert(
      categories.map((c, i) => ({
        id:         c.id,
        menu_id:    c.menu_id,
        status:     true,
        sort_order: i,
      }))
    )
  if (catErr) throw catErr

  // ── Insert category translations ──────────────────────────────────────────
  const categoryTranslations = []
  for (const c of categories) {
    for (const [code, name] of Object.entries(c.names)) {
      const language_id = LANG_CODE_TO_ID[code]
      if (language_id && name) {
        categoryTranslations.push({ category_id: c.id, language_id, name })
      }
    }
  }
  const { error: ctErr } = await supabase
    .from('category_translations')
    .upsert(categoryTranslations, { onConflict: 'category_id,language_id' })
  if (ctErr) throw ctErr

  // ── Insert products ───────────────────────────────────────────────────────
  console.log('Inserting products…')
  const BATCH = 50

  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH)

    // Products
    const { error: pErr } = await supabase.from('products').upsert(
      batch.map((p, j) => ({
        id:           p.id,
        category_id:  p.category_id,
        price:        p.price,
        calorie:      p.calorie ?? 0,
        status:       p.status ?? true,
        image:        p.image,
        image_medium: p.image_medium,
        image_low:    p.image_low,
        video:        p.video,
        sort_order:   i + j,
      }))
    )
    if (pErr) throw pErr

    // Product translations
    const translations = []
    for (const p of batch) {
      for (const [code, spec] of Object.entries(p.translations ?? {})) {
        const language_id = LANG_CODE_TO_ID[code]
        if (language_id && spec.name) {
          translations.push({
            product_id:  p.id,
            language_id,
            name:        spec.name,
            description: spec.description ?? '',
          })
        }
      }
    }
    if (translations.length) {
      const { error: tErr } = await supabase
        .from('product_translations')
        .upsert(translations, { onConflict: 'product_id,language_id' })
      if (tErr) throw tErr
    }

    // Product variants
    const variants = []
    const variantTranslations = []
    for (const p of batch) {
      for (const [idx, v] of (p.variants ?? []).entries()) {
        variants.push({
          id:         v.id,
          product_id: p.id,
          price:      v.price,
          status:     v.status ?? true,
          sort_order: idx,
        })
        for (const [code, spec] of Object.entries(v.translations ?? {})) {
          const language_id = LANG_CODE_TO_ID[code]
          if (language_id && spec.name) {
            variantTranslations.push({
              variant_id:  v.id,
              language_id,
              name:        spec.name,
            })
          }
        }
      }
    }
    if (variants.length) {
      const { error: vErr } = await supabase
        .from('product_variants')
        .upsert(variants)
      if (vErr) throw vErr
    }
    if (variantTranslations.length) {
      const { error: vtErr } = await supabase
        .from('variant_translations')
        .upsert(variantTranslations, { onConflict: 'variant_id,language_id' })
      if (vtErr) throw vtErr
    }

    console.log(`  ✓ ${Math.min(i + BATCH, products.length)} / ${products.length}`)
  }

  console.log('✅ Seed complete!')
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
