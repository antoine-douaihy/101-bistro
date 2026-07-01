/**
 * Maps a category to a Google Material Symbols icon name (rendered via the
 * `material-symbols-outlined` font). Keyed by the category's English name,
 * normalised (lowercase, trimmed, accents stripped, `&` -> `and`) so minor
 * spelling/spacing/punctuation differences in the data still resolve.
 * Categories without an entry fall back to the default utensils icon (see
 * `MaterialIcon`), so the icon stays the same as before.
 */
const CATEGORY_ICON_MAP: Record<string, string> = {
  "salad": "yoshoku",
  "appetizer": "tapas",
  "oriental food": "washoku",
  "pizza": "local_pizza",
  "pasta": "dinner_dining",
  "sandwich": "fastfood",
  "sandwiches": "fastfood",
  // "entree" intentionally omitted — keep the default icon.
  "sauces": "skillet",
  "shots": "liquor",
  "cocktails": "local_bar",
  "beers": "sports_bar",
  "liqueurs": "liquor",
  "vermouth": "liquor",
  "vodka": "local_bar",
  "gin": "local_bar",
  "tequila": "local_bar",
  "rum": "local_bar",
  "single malt whiskey": "local_drink",
  "scotch blended whiskey": "local_drink",
  "bourbon and tennessee": "local_drink",
  "irish whiskey": "local_drink",
  "cognac": "brunch_dining",
  "champagne and sparkling wine": "brunch_dining",
  "red wine": "wine_bar",
  "white wine": "wine_bar",
  "rose wine": "wine_bar",
  "arak": "local_drink",
  "hot tea": "emoji_food_beverage",
  "hot drinks": "kettle",
  "cold drinks and shakes": "blender",
  "ice tea": "local_drink",
  "fresh juices": "nutrition",
  "smoothies": "blender",
  "soft drinks": "water_bottle",
  "sweet": "bakery_dining",
  "dolce": "bakery_dining",
  "normal shisha": "smoking_rooms",
  "fresh shisha": "smoking_rooms",
  "cigar": "smoking_rooms",
};

/** Normalise a category name to a stable lookup key. */
function normalize(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents (Rosé -> Rose)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim();
}

/** Resolve a Material Symbols icon name for a category by its English name. */
export function resolveCategoryIcon(name?: string): string | undefined {
  if (!name) return undefined;
  return CATEGORY_ICON_MAP[normalize(name)];
}
