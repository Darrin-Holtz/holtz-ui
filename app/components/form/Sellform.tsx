"use client";

import { SellProduct, State } from "@/app/actions";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductFormValues, productSchema } from "@/lib/productSchema";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import { SelectCategory } from "../SelectCategory";
import TipTapEditor from "../Editor";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { SubmitButton } from "../SubmitButtons";
import z from "zod";

const initialState: State = { status: undefined, message: "" };

export function SellForm() {
    const [state, formAction] = useActionState(SellProduct, initialState);
    const [clientErrors, setClientErrors] = useState<State["errors"]>();
    const [images, setImages] = useState<string[]>([]);
    const [productFile, setProductFile] = useState("");
    const [productFileName, setProductFileName] = useState<string | null>(null);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);
    const [productFileUploadError, setProductFileUploadError] = useState<string | null>(null);

    useEffect(() => {
        if (state.status === "success") {
        toast.success(state.message);
        setClientErrors(undefined);
        } else if (state.status === "error") {
        toast.error(state.message);
        }
    }, [state]);

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const validation = productSchema.safeParse(getProductFormValues(formData));

        if (!validation.success) {
        event.preventDefault();
        setClientErrors(z.flattenError(validation.error).fieldErrors);
        return;
        }

        setClientErrors(undefined);
    };

    const fieldErrors = clientErrors ?? state.errors;
    return (
        <form action={formAction} onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <input type="hidden" name="productFile" value={productFile} />

          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Fill out the form below to list your product for sale.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-5 flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input type="text" name="name" placeholder="Enter product name" />
              {fieldErrors?.["name"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["name"][0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {fieldErrors?.["category"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["category"][0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="Enter product price"
                min="0.01"
                step="0.01"
              />
              {fieldErrors?.["price"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["price"][0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Short Description</Label>
              <Textarea
                name="smallDescription"
                placeholder="Enter product description"
              />
              {fieldErrors?.["smallDescription"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["smallDescription"][0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Detailed Description</Label>
              <TipTapEditor name="description" />
              {fieldErrors?.["description"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["description"][0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                config={{ mode: "auto" }}
                onClientUploadComplete={(result) => {
                  setImageUploadError(null);
                  setImages(result.map((file) => file.ufsUrl));
                  toast.success("Images uploaded successfully!");
                }}
                onUploadError={(error) => {
                  setImageUploadError(error.message);
                  toast.error("Image upload failed: " + error.message);
                }}
                appearance={{
                  container:
                    "mt-0 py-6 transition-colors hover:bg-muted/40 hover:border-primary/40",
                  button:
                    "text-primary-foreground focus-within:ring-primary data-[state=disabled]:bg-primary/50 data-[state=ready]:bg-primary data-[state=readying]:bg-primary/70 data-[state=uploading]:bg-primary/70 data-[state=uploading]:after:bg-primary/90",
                  uploadIcon: "h-6 w-6 text-muted-foreground",
                  label:
                    "text-sm text-primary hover:text-primary/80 cursor-pointer",
                  allowedContent: "text-xs text-muted-foreground",
                }}
              />
              {images.length > 0 && (
                <p className="text-sm text-emerald-600" aria-live="polite">
                  {images.length} image{images.length === 1 ? "" : "s"} uploaded
                </p>
              )}
              {fieldErrors?.["images"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["images"][0]}</p>
              )}
              {imageUploadError && (
                <p className="text-sm text-destructive">{imageUploadError}</p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                config={{ mode: "auto" }}
                onClientUploadComplete={(result) => {
                  setProductFileUploadError(null);
                  setProductFile(result[0]?.ufsUrl ?? "");
                  setProductFileName(result[0]?.name ?? null);
                  toast.success("Product file uploaded successfully!");
                }}
                onUploadError={(error) => {
                  setProductFileUploadError(error.message);
                  toast.error("Product file upload failed: " + error.message);
                }}
                appearance={{
                  container:
                    "mt-0 py-6 transition-colors hover:bg-muted/40 hover:border-primary/40",
                  button:
                    "text-primary-foreground focus-within:ring-primary data-[state=disabled]:bg-primary/50 data-[state=ready]:bg-primary data-[state=readying]:bg-primary/70 data-[state=uploading]:bg-primary/70 data-[state=uploading]:after:bg-primary/90",
                  uploadIcon: "h-6 w-6 text-muted-foreground",
                  label:
                    "text-sm text-primary hover:text-primary/80 cursor-pointer",
                  allowedContent: "text-xs text-muted-foreground",
                }}
              />
              {productFile && (
                <p className="text-sm text-emerald-600" aria-live="polite">
                  Uploaded: {productFileName ?? "product zip"}
                </p>
              )}
              {fieldErrors?.["productFile"]?.[0] && (
                <p className="text-sm text-destructive">{fieldErrors["productFile"][0]}</p>
              )}
              {productFileUploadError && (
                <p className="text-sm text-destructive">{productFileUploadError}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton title="Submit Your Product" />
          </CardFooter>
        </form>
    )
}