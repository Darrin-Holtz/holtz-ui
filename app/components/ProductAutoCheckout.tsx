"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function ProductAutoCheckout({ formId }: { formId: string }) {
  const searchParams = useSearchParams();
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    const shouldCheckout = searchParams.get("checkout") === "1";
    if (!shouldCheckout || hasSubmittedRef.current) {
      return;
    }

    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) {
      return;
    }

    hasSubmittedRef.current = true;
    form.requestSubmit();
  }, [formId, searchParams]);

  return null;
}
