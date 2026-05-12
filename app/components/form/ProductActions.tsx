"use client";

import { useTransition } from "react";
import { DeleteProduct, ToggleProductVisibility } from "@/app/actions";
import { toast } from "sonner";

interface ProductActionsProps {
  productId: string;
  isActive: boolean;
  hasPurchases: boolean;
}

export function ProductActions({ productId, isActive, hasPurchases }: ProductActionsProps) {
  const [isPendingToggle, startToggle] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();

  function handleToggle() {
    startToggle(async () => {
      const result = await ToggleProductVisibility(productId, !isActive);
      if (result?.status === "error") {
        toast.error(result.message ?? "Failed to update visibility.");
      } else {
        toast.success(isActive ? "Product hidden from marketplace." : "Product is now live.");
      }
    });
  }

  function handleDelete() {
    const msg = hasPurchases
      ? "This product has existing purchases and will be archived (hidden from marketplace). Buyers can still download it. Continue?"
      : "Permanently delete this product? This cannot be undone.";

    if (!confirm(msg)) return;

    startDelete(async () => {
      const result = await DeleteProduct(productId);
      if (result?.status === "error") {
        toast.error(result.message ?? "Failed to delete product.");
      } else {
        toast.success(hasPurchases ? "Product archived." : "Product deleted.");
      }
    });
  }

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={handleToggle}
        disabled={isPendingToggle}
        className="flex-1 text-center text-sm border rounded-lg px-3 py-2 hover:bg-neutral-50 transition-colors disabled:opacity-50"
      >
        {isPendingToggle ? "..." : isActive ? "Hide" : "Show"}
      </button>
      <button
        onClick={handleDelete}
        disabled={isPendingDelete}
        className="flex-1 text-center text-sm border border-red-200 text-red-600 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {isPendingDelete ? "..." : hasPurchases ? "Archive" : "Delete"}
      </button>
    </div>
  );
}
