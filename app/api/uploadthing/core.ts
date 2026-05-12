import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { scanAndEnforce } from "@/lib/virusTotal";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f(
    { image: { maxFileSize: "4MB", maxFileCount: 5 } },
    { awaitServerData: false }
  )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  productFileUpload: f(
    {
      // Accept binary uploads — browsers label zip inconsistently
      // (application/zip, x-zip-compressed, octet-stream, etc).
      blob: { maxFileSize: "64MB", maxFileCount: 1 },
    },
    { awaitServerData: false }
  )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Scan the uploaded product file for malware before making it available
      const clean = await scanAndEnforce(file.url, file.key);
      if (!clean) {
        console.error(
          `[Upload] Product file rejected by virus scan — key: ${file.key}, seller: ${metadata.userId}`
        );
        // File has already been deleted from UploadThing by scanAndEnforce
        return { uploadedBy: metadata.userId, fileKey: file.key, rejected: true };
      }

      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, fileKey: file.key, rejected: false };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;