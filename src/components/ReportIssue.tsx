import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  MapPin, 
  Upload, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Car,
  Trash2,
  Droplets
} from "lucide-react";

const issueTypes = [
  { id: "road", label: "Road Issues", icon: Car, color: "bg-accent" },
  { id: "lighting", label: "Street Lighting", icon: Lightbulb, color: "bg-primary" },
  { id: "waste", label: "Waste Management", icon: Trash2, color: "bg-secondary" },
  { id: "water", label: "Water Issues", icon: Droplets, color: "bg-blue-500" },
  { id: "safety", label: "Safety Concerns", icon: AlertTriangle, color: "bg-destructive" },
];

const ReportIssue = () => {
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !description) {
      toast({
        title: "Missing Information",
        description: "Please select an issue type and provide a description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Issue Reported Successfully!",
      description: "Your report has been submitted and assigned ID #CIV-2024-001",
    });
    
    // Reset form
    setSelectedType("");
    setDescription("");
    setLocation("");
    setImage(null);
    setIsSubmitting(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast({
            title: "Location Captured",
            description: "Your current location has been added to the report.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Report a Civic Issue</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help make your community better by reporting issues that need attention. 
            Your report will be tracked and resolved by the relevant authorities.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-card border-0 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Type Selection */}
              <div>
                <label className="text-sm font-medium mb-4 block">Issue Type</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {issueTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          selectedType === type.id
                            ? "border-primary bg-primary/10 shadow-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center mb-2`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] resize-none"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="text-sm font-medium mb-2 block">
                  Location
                </label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter location or coordinates..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="px-4"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">Photo Evidence</label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {image ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-8 h-8 text-secondary mx-auto" />
                        <p className="text-sm font-medium text-secondary">Image uploaded</p>
                        <p className="text-xs text-muted-foreground">{image.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-medium">Add a photo</p>
                        <p className="text-xs text-muted-foreground">Click to upload or take a picture</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="report"
                className="w-full h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Report...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Submit Report
                  </div>
                )}
              </Button>
            </form>
          </Card>

          {/* Quick tips */}
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="text-xs">
                📸 Add clear photos
              </Badge>
              <Badge variant="secondary" className="text-xs">
                📍 Include exact location
              </Badge>
              <Badge variant="secondary" className="text-xs">
                📝 Be specific in description
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssue;