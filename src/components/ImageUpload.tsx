import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageUpload, disabled }: ImageUploadProps) => {
  const { toast } = useToast();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
      toast({
        title: "Image uploaded",
        description: "Your satellite image is ready for analysis",
      });
    };
    reader.readAsDataURL(file);
  }, [onImageUpload, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
      toast({
        title: "Image uploaded",
        description: "Your satellite image is ready for analysis",
      });
    };
    reader.readAsDataURL(file);
  }, [onImageUpload, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative border-2 border-dashed border-muted hover:border-primary transition-colors rounded-lg p-8 text-center cursor-pointer group"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-muted group-hover:bg-primary/20 transition-colors">
          <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">Upload Satellite Image</p>
          <p className="text-sm text-muted-foreground mt-1">
            Drag and drop or click to browse
          </p>
        </div>
      </div>
    </div>
  );
};
