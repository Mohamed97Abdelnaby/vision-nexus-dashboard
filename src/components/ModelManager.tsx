
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Brain } from "lucide-react";

const availableModels = [
  { id: "person-detection", name: "Person Detection", category: "Detection" },
  { id: "vehicle-detection", name: "Vehicle Detection", category: "Detection" },
  { id: "license-plate", name: "License Plate Recognition", category: "Recognition" },
  { id: "object-detection", name: "Object Detection", category: "Detection" },
  { id: "safety-monitoring", name: "Safety Monitoring", category: "Safety" },
  { id: "face-recognition", name: "Face Recognition", category: "Recognition" },
  { id: "motion-detection", name: "Motion Detection", category: "Detection" },
  { id: "crowd-counting", name: "Crowd Counting", category: "Analytics" },
];

interface ModelManagerProps {
  cameraId: number;
  currentModels: string[];
  onModelsUpdate: (models: string[]) => void;
}

export function ModelManager({ cameraId, currentModels, onModelsUpdate }: ModelManagerProps) {
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleAddModel = () => {
    if (selectedModel && !currentModels.includes(selectedModel)) {
      onModelsUpdate([...currentModels, selectedModel]);
      setSelectedModel("");
    }
  };

  const handleRemoveModel = (modelId: string) => {
    onModelsUpdate(currentModels.filter(id => id !== modelId));
  };

  const getModelName = (id: string) => {
    return availableModels.find(model => model.id === id)?.name || id;
  };

  const getCategoryColor = (modelId: string) => {
    const category = availableModels.find(model => model.id === modelId)?.category;
    switch (category) {
      case "Detection": return "bg-blue-500/10 text-blue-500";
      case "Recognition": return "bg-green-500/10 text-green-500";
      case "Safety": return "bg-red-500/10 text-red-500";
      case "Analytics": return "bg-purple-500/10 text-purple-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Models Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a model to add..." />
            </SelectTrigger>
            <SelectContent>
              {availableModels
                .filter(model => !currentModels.includes(model.id))
                .map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      <span>{model.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {model.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddModel} disabled={!selectedModel}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Active Models:</h4>
          {currentModels.length === 0 ? (
            <p className="text-sm text-muted-foreground">No models active</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentModels.map((modelId) => (
                <Badge key={modelId} className={`${getCategoryColor(modelId)} flex items-center gap-1`}>
                  {getModelName(modelId)}
                  <button
                    onClick={() => handleRemoveModel(modelId)}
                    className="ml-1 hover:bg-black/20 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
