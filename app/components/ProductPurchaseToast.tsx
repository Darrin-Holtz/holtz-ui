"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function ProductPurchaseToast() {
  const searchParams = useSearchParams();
  const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error || lastErrorRef.current === error) {
      return;
    }

    if (error === "self_purchase") {
      toast.error("You cannot buy your own product.");
      lastErrorRef.current = error;
      return;
    }

    if (error === "product_not_found") {
      toast.error("This product is no longer available.");
      lastErrorRef.current = error;
    }
  }, [searchParams]);

  return null;
}
