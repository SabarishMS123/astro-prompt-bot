import { useState } from "react";
import { Satellite } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Satellite className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Satellite Image Analyzer</h1>
              <p className="text-sm text-muted-foreground">AI-powered satellite imagery analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Left Panel - Image Upload/Preview */}
          <div className="flex flex-col gap-4">
            <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Satellite Image</h2>
              {!uploadedImage ? (
                <div className="flex-1 flex items-center justify-center">
                  <ImageUpload onImageUpload={setUploadedImage} />
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 rounded-lg overflow-hidden border border-border bg-muted/20">
                    <img
                      src={uploadedImage}
                      alt="Uploaded satellite"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Upload different image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col">
            <div className="bg-muted/30 px-6 py-4 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">Analysis Chat</h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface imageUrl={uploadedImage} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
