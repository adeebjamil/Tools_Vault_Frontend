"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slotId: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({
  slotId,
  format = "auto",
  responsive = true,
  style,
  className,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) return null;

  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
