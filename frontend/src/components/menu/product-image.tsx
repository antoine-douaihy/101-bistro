import Image from "next/image";
import type { ProductImage as ProductImageType } from "@/types/menu";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

/**
 * Curated, brand-harmonious gradient presets. Used as a polished placeholder
 * until real photography is provided via the CMS — the menu still looks
 * intentional and premium with zero images.
 */
const GRADIENTS = [
  "from-[#fbe9e6] to-[#f3cdbf] dark:from-[#3a1a17] dark:to-[#2a1110]",
  "from-[#f7ecdf] to-[#ecd2b6] dark:from-[#33241a] dark:to-[#241813]",
  "from-[#fdeaea] to-[#f6c9c6] dark:from-[#3a1816] dark:to-[#2b1011]",
  "from-[#eef0e6] to-[#d8e0c4] dark:from-[#23291d] dark:to-[#1a2015]",
  "from-[#f1ece8] to-[#ddd2c8] dark:from-[#2a2420] dark:to-[#1d1916]",
  "from-[#faece2] to-[#f0d0b8] dark:from-[#36231a] dark:to-[#271812]",
];

function hashIndex(seed: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

interface ProductImageProps {
  image?: ProductImageType;
  alt: string;
  /** Lucide icon name shown in the placeholder. */
  iconName?: string;
  /** Stable seed (product id) so the placeholder is deterministic. */
  seed?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}

export function ProductImage({
  image,
  alt,
  iconName,
  seed = alt,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority,
  rounded,
}: ProductImageProps) {
  const gradient = GRADIENTS[hashIndex(seed, GRADIENTS.length)];

  // Backend images come from Supabase storage (remote URLs). Render those with
  // a native <img> so no host has to be whitelisted in next.config.ts (which is
  // owned by the backend). Local/relative assets still use next/image.
  const isRemote = !!image && /^https?:\/\//.test(image.src);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-muted",
        rounded,
        className
      )}
    >
      {image ? (
        isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt || alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt || alt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        )
      ) : (
        <div
          className={cn(
            "absolute inset-0 grid place-items-center bg-gradient-to-br transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
            gradient
          )}
          aria-hidden
        >
          {/* soft sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.55),transparent_60%)] dark:bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />
          <Icon
            name={iconName}
            className="size-12 text-oxblood/25 dark:text-white/20"
          />
        </div>
      )}
    </div>
  );
}
