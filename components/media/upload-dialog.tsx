"use client";

import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadMedia } from "@/hooks/use-media";

export function UploadDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const upload = useUploadMedia();

  function resetForm() {
    setFile(null);
    setTitle("");
    setTags("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;

    await upload.mutateAsync({
      file,
      title,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    resetForm();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
      >
        <Upload className="h-4 w-4" />
        Upload
      </button>
      <DialogContent className="overflow-hidden p-0">
        <div className="relative overflow-hidden bg-linear-to-b from-brand/20 to-transparent p-6 pb-5">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand shadow-glow">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <DialogHeader className="text-left">
              <DialogTitle>Upload media</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 pt-4">
          <div>
            <label className="text-xs font-medium text-ink-muted">File</label>
            <div className="mt-1.5 rounded-xl border-2 border-dashed border-surface-border bg-canvas p-4 transition-colors hover:border-brand/40">
              <input
                type="file"
                accept="image/*,video/*"
                required
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-linear-to-r file:from-brand file:to-brand-hover file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:opacity-90"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-muted">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="reel, skincare, product"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border-2 border-surface-border bg-canvas px-3 text-sm text-ink focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={upload.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover py-3 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-60 disabled:shadow-none"
          >
            {upload.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {upload.isPending ? "Uploading..." : "Upload"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}