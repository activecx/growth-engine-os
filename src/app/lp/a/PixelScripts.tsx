'use client';

// Meta Pixel + Microsoft Clarity loader for the /lp/a funnel.
// Pixel IDs are public by design (they ship in client JS), so a hardcoded
// fallback is safe and guarantees tracking works even if the Vercel env var
// isn't set. Standard events (ViewContent / InitiateCheckout / AddPaymentInfo /
// Purchase) are fired from the funnel pages via src/lib/track.ts.

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '2311378976049409';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'wqbcz6bes1';

export default function PixelScripts() {
  const pathname = usePathname();
  const firstLoad = useRef(true);

  // The base snippet fires the first PageView; fire one on each SPA route change too.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    w.fbq?.('track', 'PageView');
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel base */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Microsoft Clarity — heatmaps + session recordings */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>
    </>
  );
}
