
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

const ImageUpload = ({ onImagesChange, maxImages = 5, existingImages = [] }: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    
    try {
      const newImageUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create a data URL for preview (in real app, you'd upload to Supabase Storage)
        const reader = new FileReader();
        const imageUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        newImageUrls.push(imageUrl);
      }
      
      const updatedImages = [...images, ...newImageUrls];
      setImages(updatedImages);
      onImagesChange(updatedImages);
      
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
        <span className="text-sm text-gray-500">
          {images.length}/{maxImages} images
        </span>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative p-2">
              <div className="aspect-square relative">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <Card className="border-dashed border-2 p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No images uploaded yet</p>
          <p className="text-sm text-gray-400">Click "Upload Images" to add photos</p>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
