'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroImageProps {
  /** Remote hero artwork. Host must be allow-listed in `next.config.ts` images.remotePatterns. */
  src: string;
  /** Header content — eyebrow, heading and description — rendered over the photo. */
  children: ReactNode;
  /** Load eagerly — set on the topmost hero of a page so it is not lazy-loaded below the fold. */
  priority?: boolean;
  /** Spacing/override hook for pages whose header rhythm differs. */
  className?: string;
}

/**
 * Page hero: a full-width photograph with the page's heading set over it.
 *
 * The photo is decorative — it carries no information the heading and
 * description do not already state — so it takes an empty `alt`. That keeps
 * screen readers from announcing a meaningless description and means no
 * translated string is needed for it in either locale.
 *
 * The scrim is deliberately heavy. These photos are busy (tools, wrapping
 * paper, hands), and a light overlay leaves a large serif headline fighting
 * the detail underneath it. Content sits in normal flow so the padding sets
 * the hero's height and the `fill` image stretches to match.
 *
 * Animation uses `animate` rather than `whileInView` on purpose — a hero is
 * above the fold, and an in-view trigger can leave it stuck at opacity 0 when
 * the observer does not fire.
 */
export default function PageHeroImage({
  src,
  children,
  priority = false,
  className = 'mb-12 md:mb-16',
}: PageHeroImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative z-10 overflow-hidden rounded-3xl border border-accent/15 bg-neutral-900 shadow-lg ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/75 via-neutral-900/60 to-neutral-900/80" />

      <div className="relative z-10 px-6 sm:px-10 py-20 md:py-28 text-center">{children}</div>
    </motion.div>
  );
}
