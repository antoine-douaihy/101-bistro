export type Lang = 'en' | 'ar' | 'ku'

export interface Language {
  id: number
  code: Lang
  name: string
  dir: 'ltr' | 'rtl'
}

export interface Translation {
  name: string
  description?: string
}

export interface VariantTranslation {
  name: string
}

export interface Variant {
  id: number
  price: number | null
  status: boolean
  translations: Record<Lang, VariantTranslation>
}

export interface Product {
  id: number
  category_id: number
  price: number | null
  calorie: number
  status: boolean
  image: string | null
  image_medium: string | null
  image_low: string | null
  video: string | null
  sort_order: number
  translations: Record<Lang, Translation>
  variants: Variant[]
}

export interface Category {
  id: number
  menu_id: number
  image: string | null
  image_low: string | null
  status: boolean
  sort_order: number
  translations: Record<Lang, { name: string; description?: string }>
  products: Product[]
}

export interface Menu {
  id: number
  status: boolean
  translations: Record<Lang, { name: string }>
  categories: Category[]
}