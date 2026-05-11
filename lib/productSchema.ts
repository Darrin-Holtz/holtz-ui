import { z } from "zod";

type RichTextNode = {
  text?: string;
  content?: RichTextNode[];
};

const extractText = (node: RichTextNode): string =>
  [node.text ?? "", ...(node.content ?? []).map(extractText)].join(" ");

const looksLikeAbsoluteUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export const productSchema = z.object({
  name: z
    .string()
    .min(5, { message: "The name has to be a minimum character length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "The Price has to be bigger then 1" }),
  smallDescription: z
    .string()
    .min(10, { message: "Please summerize your product more" }),
  description: z
    .string()
    .refine(
      (value) => {
        try {
          const doc = JSON.parse(value) as RichTextNode;
          return extractText(doc).replace(/\s+/g, " ").trim().length >= 10;
        } catch {
          return false;
        }
      },
      { message: "Description is required" }
    ),
  images: z.array(z.string()).min(1, "At least one image is required"),
  productFile: z
    .string()
    .min(1, { message: "Pleaes upload a zip of your product" })
    .refine(
      (value) => !looksLikeAbsoluteUrl(value),
      "Product file must be a secure upload key. Please re-upload your file."
    ),
});

// For edits the product file may be kept unchanged, so we allow an existing key.
export const updateProductSchema = productSchema.extend({
  productFile: z
    .string()
    .min(1, { message: "Please upload a zip of your product" }),
});

export function getUpdateProductFormValues(formData: FormData) {
  const base = getProductFormValues(formData);
  return {
    ...base,
    // On edit the hidden field may already hold the saved key — allow it through.
    productFile: formData.get("productFile"),
  };
}

export const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),
});

export function getProductFormValues(formData: FormData) {
  const rawImages = formData.get("images");
  let images: string[] = [];

  if (typeof rawImages === "string" && rawImages.length > 0) {
    try {
      images = JSON.parse(rawImages) as string[];
    } catch {
      images = [];
    }
  }

  return {
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images,
    productFile: formData.get("productFile"),
  };
}
