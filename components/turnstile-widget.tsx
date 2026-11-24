"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Cloudflare's published test site key passes locally; production sets NEXT_PUBLIC_TURNSTILE_SITE_KEY.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({
  onToken,
  action = "lead-form",
}: {
  onToken: (token: string) => void;
  action?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile)
  );
  const callback = useRef(onToken);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!ready || !container.current || !window.turnstile) {
      return;
    }
    const id = window.turnstile.render(container.current, {
      sitekey: SITE_KEY,
      action,
      callback: (token: string) => callback.current(token),
      "expired-callback": () => callback.current(""),
      "error-callback": () => callback.current(""),
    });
    return () => window.turnstile?.remove(id);
  }, [ready, action]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="min-h-[65px]" />
    </>
  );
}
