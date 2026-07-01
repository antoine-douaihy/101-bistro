import type { Lang } from "@/types";

/**
 * UI copy dictionary for the static chrome (nav, hero, sections, footer, menu
 * controls). The *menu content* — category/product names, descriptions — comes
 * from the database (see `services/menu-adapter`); this file only covers the
 * fixed interface strings that aren't stored there.
 *
 * English is the source of truth: `Messages` is derived from `en`, so `ar` and
 * `ku` are type-checked to contain exactly the same keys — a missing or misspelt
 * key fails `tsc` rather than silently rendering English at runtime.
 */
const en = {
  nav: {
    home: "Home",
    menu: "Menu",
    visit: "Visit",
    categories: "Categories",
    exploreFull: "Explore the full menu",
  },

  header: {
    searchShort: "Search…",
    viewMenu: "View Menu",
    searchAria: "Search the menu",
  },

  hero: {
    titleLine1: "A modern bistro,",
    titleLine2: "plated with intent.",
    exploreMenu: "Explore the menu",
    findUs: "Find us",
  },

  home: {
    categories: {
      eyebrow: "Browse the menu",
      title: "Find your craving",
      description:
        "From small plates to fire-grilled mains — explore every corner of the kitchen.",
      viewAll: "View all",
    },
    featured: {
      eyebrow: "Chef's selection",
      title: "Signature favourites",
      description:
        "A handful of the dishes our regulars keep coming back for.",
      seeMore: "See more",
    },
    visit: {
      eyebrow: "Plan your visit",
      title: "Find us",
      description: "Walk-ins welcome. Book ahead for larger tables.",
      directions: "Directions",
      openingHours: "Opening hours",
    },
    cta: {
      title: "The whole menu, in your pocket.",
      description:
        "{count}+ dishes, always up to date. Scan at the table or browse from anywhere.",
      browseMenu: "Browse the menu",
      qrSoon: "QR menu coming soon",
    },
  },

  footer: {
    explore: "Explore",
    visitUs: "Visit us",
    hours: "Hours",
    friSun: "Fri – Sun",
    late: "late",
    rights: "© {year} {name}. All rights reserved.",
    crafted: "Crafted with care · A premium digital menu experience",
  },

  menuPage: {
    eyebrow: "The menu",
    title: "Everything we serve",
    subtitle:
      "{count}+ dishes across {categories} categories. Search by name or ingredient, filter by dietary needs, and tap any dish for the full details.",
  },

  menu: {
    all: "All",
    allInSection: "All in section",
    results: "results",
    dishes: "dishes",
    resultsFor: "for",
    clearAll: "Clear all",
    emptyTitle: "No dishes match your search",
    emptyDescription:
      "Try a different keyword, remove a filter, or browse another category. Our full menu has plenty to discover.",
    clearFilters: "Clear filters",
    soldOut: "Sold out",
    comingSoon: "Coming soon",
    filters: "Filters",
    sortBy: "Sort by",
    highlights: "Highlights",
    dietary: "Dietary",
    availability: "Availability",
    availableOnly: "Available items only",
    resetAll: "Reset all",
    show: "Show",
    chooseSize: "Choose a size",
    required: "Required",
    optional: "Optional",
    upTo: "Up to {max}",
    add: "Add",
    added: "Added",
    onlineSoon: "Online ordering coming soon — browse and plan your visit.",
    nutrition: "Nutrition (approx.)",
    allergens: "Allergens",
    quickView: "Quick view {name}",
    gridView: "Grid view",
    listView: "List view",
    sortAria: "Sort dishes",
    decreaseQty: "Decrease quantity",
    increaseQty: "Increase quantity",
  },

  search: {
    placeholder: "Search dishes, ingredients…",
    overlayPlaceholder: "Search 101 Bistro…",
    popular: "Popular",
    browseByCategory: "Browse by category",
    clear: "Clear search",
  },

  sort: {
    recommended: "Recommended",
    popular: "Most popular",
    "price-asc": "Price: low to high",
    "price-desc": "Price: high to low",
    "name-asc": "Name: A–Z",
  },

  availability: {
    available: "Available",
    limited: "Limited",
    "sold-out": "Sold out",
    "coming-soon": "Coming soon",
  },

  badges: {
    signature: "Signature",
    new: "New",
    popular: "Popular",
    "chef-special": "Chef's Special",
    seasonal: "Seasonal",
    spicy: "Spicy",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    "gluten-free": "Gluten-Free",
  },

  spice: { mild: "Mild", medium: "Medium", hot: "Hot", fiery: "Fiery" },

  days: {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  },

  common: { closed: "Closed" },
};

export type Messages = typeof en;

const ar: Messages = {
  nav: {
    home: "الرئيسية",
    menu: "القائمة",
    visit: "زيارتنا",
    categories: "الفئات",
    exploreFull: "استكشف القائمة كاملةً",
  },

  header: {
    searchShort: "بحث…",
    viewMenu: "عرض القائمة",
    searchAria: "ابحث في القائمة",
  },

  hero: {
    titleLine1: "مطعم عصري،",
    titleLine2: "يُقدَّم بعناية.",
    exploreMenu: "استكشف القائمة",
    findUs: "اعثر علينا",
  },

  home: {
    categories: {
      eyebrow: "تصفّح القائمة",
      title: "اعثر على ما تشتهيه",
      description:
        "من الأطباق الصغيرة إلى الأطباق المشوية على النار — استكشف كل ركن من المطبخ.",
      viewAll: "عرض الكل",
    },
    featured: {
      eyebrow: "اختيار الشيف",
      title: "الأطباق المميّزة",
      description: "مجموعة من الأطباق التي يعود إليها روّادنا دائماً.",
      seeMore: "عرض المزيد",
    },
    visit: {
      eyebrow: "خطّط لزيارتك",
      title: "اعثر علينا",
      description: "نرحّب بكم دون حجز. احجزوا مسبقاً للطاولات الكبيرة.",
      directions: "الاتجاهات",
      openingHours: "ساعات العمل",
    },
    cta: {
      title: "القائمة كاملةً، في جيبك.",
      description:
        "أكثر من {count} طبق، محدّثة دائماً. امسح الرمز على الطاولة أو تصفّح من أي مكان.",
      browseMenu: "تصفّح القائمة",
      qrSoon: "قائمة QR قريباً",
    },
  },

  footer: {
    explore: "استكشف",
    visitUs: "زورونا",
    hours: "ساعات العمل",
    friSun: "الجمعة – الأحد",
    late: "متأخراً",
    rights: "© {year} {name}. جميع الحقوق محفوظة.",
    crafted: "صُنع بعناية · تجربة قائمة رقمية فاخرة",
  },

  menuPage: {
    eyebrow: "القائمة",
    title: "كل ما نقدّمه",
    subtitle:
      "أكثر من {count} طبق ضمن {categories} فئة. ابحث بالاسم أو المكوّن، وصفِّ حسب احتياجاتك الغذائية، واضغط على أي طبق لعرض التفاصيل الكاملة.",
  },

  menu: {
    all: "الكل",
    allInSection: "كل القسم",
    results: "نتيجة",
    dishes: "طبق",
    resultsFor: "عن",
    clearAll: "مسح الكل",
    emptyTitle: "لا توجد أطباق تطابق بحثك",
    emptyDescription:
      "جرّب كلمة مختلفة، أو أزل مرشّحاً، أو تصفّح فئة أخرى. قائمتنا الكاملة تحوي الكثير لاكتشافه.",
    clearFilters: "مسح المرشّحات",
    soldOut: "نفدت الكمية",
    comingSoon: "قريباً",
    filters: "المرشّحات",
    sortBy: "ترتيب حسب",
    highlights: "أبرز الأطباق",
    dietary: "حِمية",
    availability: "التوفّر",
    availableOnly: "المتوفّر فقط",
    resetAll: "إعادة تعيين الكل",
    show: "عرض",
    chooseSize: "اختر الحجم",
    required: "إلزامي",
    optional: "اختياري",
    upTo: "حتى {max}",
    add: "أضف",
    added: "تمت الإضافة",
    onlineSoon: "الطلب عبر الإنترنت قريباً — تصفّح وخطّط لزيارتك.",
    nutrition: "القيمة الغذائية (تقريباً)",
    allergens: "مسبّبات الحساسية",
    quickView: "عرض سريع لـ {name}",
    gridView: "عرض شبكي",
    listView: "عرض قائمة",
    sortAria: "ترتيب الأطباق",
    decreaseQty: "إنقاص الكمية",
    increaseQty: "زيادة الكمية",
  },

  search: {
    placeholder: "ابحث عن الأطباق والمكوّنات…",
    overlayPlaceholder: "ابحث في 101 Bistro…",
    popular: "الأكثر بحثاً",
    browseByCategory: "تصفّح حسب الفئة",
    clear: "مسح البحث",
  },

  sort: {
    recommended: "موصى به",
    popular: "الأكثر رواجاً",
    "price-asc": "السعر: من الأقل للأعلى",
    "price-desc": "السعر: من الأعلى للأقل",
    "name-asc": "الاسم: أ–ي",
  },

  availability: {
    available: "متوفّر",
    limited: "كمية محدودة",
    "sold-out": "نفدت الكمية",
    "coming-soon": "قريباً",
  },

  badges: {
    signature: "مميّز",
    new: "جديد",
    popular: "رائج",
    "chef-special": "طبق الشيف",
    seasonal: "موسمي",
    spicy: "حار",
    vegetarian: "نباتي",
    vegan: "نباتي صرف",
    "gluten-free": "خالٍ من الغلوتين",
  },

  spice: { mild: "خفيف", medium: "متوسط", hot: "حار", fiery: "حار جداً" },

  days: {
    Monday: "الاثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
    Sunday: "الأحد",
  },

  common: { closed: "مغلق" },
};

const ku: Messages = {
  nav: {
    home: "سەرەکی",
    menu: "مێنیو",
    visit: "سەردان",
    categories: "پۆلەکان",
    exploreFull: "مێنیوی تەواو بگەڕێ",
  },

  header: {
    searchShort: "گەڕان…",
    viewMenu: "بینینی مێنیو",
    searchAria: "گەڕان لە مێنیو",
  },

  hero: {
    titleLine1: "بیسترۆیەکی مۆدێرن،",
    titleLine2: "بە وردی ئامادەکراوە.",
    exploreMenu: "مێنیو ببینە",
    findUs: "بماندۆزەرەوە",
  },

  home: {
    categories: {
      eyebrow: "گەڕان بەناو مێنیودا",
      title: "ئارەزووەکەت بدۆزەرەوە",
      description:
        "لە خواردنە بچووکەکانەوە تا خواردنە سەرەکییە گرێلکراوەکان — هەموو گۆشەیەکی چێشتخانە بگەڕێ.",
      viewAll: "هەموویان ببینە",
    },
    featured: {
      eyebrow: "هەڵبژاردنی چێشتلێنەر",
      title: "دیارترین خواردنەکان",
      description:
        "چەند خواردنێک کە میوانە هەمیشەییەکانمان بۆی دەگەڕێنەوە.",
      seeMore: "زیاتر ببینە",
    },
    visit: {
      eyebrow: "پلانی سەردانەکەت دابنێ",
      title: "بماندۆزەرەوە",
      description:
        "بەخێربێن بەبێ ژوانگرتن. بۆ مێزی گەورەتر پێشوەخت جێگا بگرن.",
      directions: "ئاراستەکان",
      openingHours: "کاتژمێری کارکردن",
    },
    cta: {
      title: "هەموو مێنیوەکە، لە گیرفانتدا.",
      description:
        "زیاتر لە {count} خواردن، هەمیشە نوێکراوە. لەسەر مێز سکان بکە یان لە هەر شوێنێکەوە بگەڕێ.",
      browseMenu: "مێنیو بگەڕێ",
      qrSoon: "مێنیوی QR بەم زووانە",
    },
  },

  footer: {
    explore: "گەڕان",
    visitUs: "سەردانمان بکە",
    hours: "کاتژمێر",
    friSun: "هەینی – یەکشەممە",
    late: "درەنگ",
    rights: "© {year} {name}. هەموو مافەکان پارێزراون.",
    crafted: "بە وردی دروستکراوە · ئەزموونی مێنیوی دیجیتاڵی پڕیمیۆم",
  },

  menuPage: {
    eyebrow: "مێنیو",
    title: "هەرچی پێشکەش دەکەین",
    subtitle:
      "زیاتر لە {count} خواردن لە {categories} پۆلدا. بە ناو یان پێکهاتە بگەڕێ، بەپێی پێداویستی خۆراکی فلتەر بکە، و کرتە لە هەر خواردنێک بکە بۆ وردەکارییە تەواوەکان.",
  },

  menu: {
    all: "هەموو",
    allInSection: "هەموو بەشەکە",
    results: "ئەنجام",
    dishes: "خواردن",
    resultsFor: "بۆ",
    clearAll: "سڕینەوەی هەموو",
    emptyTitle: "هیچ خواردنێک لەگەڵ گەڕانەکەت ناگونجێت",
    emptyDescription:
      "وشەیەکی جیاواز تاقی بکەرەوە، فلتەرێک لاببە، یان پۆلێکی تر بگەڕێ. مێنیوی تەواومان زۆر شت هەیە بۆ دۆزینەوە.",
    clearFilters: "سڕینەوەی فلتەرەکان",
    soldOut: "تەواوبوو",
    comingSoon: "بەم زووانە",
    filters: "فلتەرەکان",
    sortBy: "ڕیزکردن بەپێی",
    highlights: "دیارەکان",
    dietary: "خۆراکی",
    availability: "بەردەستبوون",
    availableOnly: "تەنها بەردەستەکان",
    resetAll: "ڕێستکردنەوەی هەموو",
    show: "پیشاندان",
    chooseSize: "قەبارەیەک هەڵبژێرە",
    required: "پێویست",
    optional: "ئارەزوومەندانە",
    upTo: "تا {max}",
    add: "زیادکردن",
    added: "زیادکرا",
    onlineSoon: "داواکاری ئۆنلاین بەم زووانە — بگەڕێ و پلانی سەردانەکەت دابنێ.",
    nutrition: "خۆراک (نزیکەی)",
    allergens: "هەستیارییەکان",
    quickView: "بینینی خێرا {name}",
    gridView: "پیشاندانی خانەیی",
    listView: "پیشاندانی لیستە",
    sortAria: "ڕیزکردنی خواردنەکان",
    decreaseQty: "کەمکردنەوەی بڕ",
    increaseQty: "زیادکردنی بڕ",
  },

  search: {
    placeholder: "گەڕان بۆ خواردن، پێکهاتەکان…",
    overlayPlaceholder: "گەڕان لە 101 Bistro…",
    popular: "بەناوبانگ",
    browseByCategory: "بەپێی پۆل بگەڕێ",
    clear: "سڕینەوەی گەڕان",
  },

  sort: {
    recommended: "پێشنیارکراو",
    popular: "بەناوبانگترین",
    "price-asc": "نرخ: نزمەوە بۆ بەرز",
    "price-desc": "نرخ: بەرزەوە بۆ نزم",
    "name-asc": "ناو: A–Z",
  },

  availability: {
    available: "بەردەست",
    limited: "سنووردار",
    "sold-out": "تەواوبوو",
    "coming-soon": "بەم زووانە",
  },

  badges: {
    signature: "دیاری",
    new: "نوێ",
    popular: "بەناوبانگ",
    "chef-special": "تایبەتی چێشتلێنەر",
    seasonal: "وەرزی",
    spicy: "تیژ",
    vegetarian: "ڕووەکی",
    vegan: "ڤێگان",
    "gluten-free": "بێ گلۆتین",
  },

  spice: { mild: "نەرم", medium: "مامناوەند", hot: "تیژ", fiery: "زۆر تیژ" },

  days: {
    Monday: "دووشەممە",
    Tuesday: "سێشەممە",
    Wednesday: "چوارشەممە",
    Thursday: "پێنجشەممە",
    Friday: "هەینی",
    Saturday: "شەممە",
    Sunday: "یەکشەممە",
  },

  common: { closed: "داخراوە" },
};

const MESSAGES: Record<Lang, Messages> = { en, ar, ku };

export function getMessages(locale: Lang): Messages {
  return MESSAGES[locale] ?? en;
}

/** Replace {token} placeholders, e.g. fmt(m.menu.upTo, { max: 3 }). */
export function fmt(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`
  );
}
