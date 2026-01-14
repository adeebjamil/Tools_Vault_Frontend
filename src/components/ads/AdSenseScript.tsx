"use client";

import Script from "next/script";

interface AdSenseScriptProps {
  pId?: string;
}

export default function AdSenseScript({ pId }: AdSenseScriptProps) {
  const publisherId = pId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!publisherId) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
