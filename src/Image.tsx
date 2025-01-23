import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  allowFullscreen?: boolean;
}

export const Image = ({ src, alt, className, allowFullscreen = true }: ImageProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          className={cn("cursor-pointer hover:opacity-90 transition-opacity", className)}
          src={src}
          alt={alt}
        />
      </DialogTrigger>
      {allowFullscreen && (
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <div className="w-full h-full max-h-[85vh] max-w-[85vw] overflow-auto">
            <img className="w-full h-auto" src={src} alt={alt} />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
