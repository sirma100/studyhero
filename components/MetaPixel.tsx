'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export default function MetaPixel({ pixelId }: { pixelId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pixelId) return;

    // Initialize pixel
    import('react-facebook-pixel')
      .then((module) => module.default)
      .then((ReactPixel) => {
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
      });
  }, [pixelId]);

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}
