import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportProject(files: Record<string, string>): Promise<void> {
  const zip = new JSZip();

  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });

  const blob = await zip.generateAsync({ type: "blob" });

  saveAs(blob, "holtz-ui-project.zip");
}
