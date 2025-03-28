"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Image, Video, Sparkles } from "lucide-react";

interface MediaAnalysisProps {
  files: File[];
  requestType: string;
  petName: string;
  onAnalysisComplete?: (analysis: string) => void;
}

export function MediaAnalysis({
  files,
  requestType,
  petName,
  onAnalysisComplete,
}: MediaAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Simulate AI analysis of media files
  useEffect(() => {
    if (files.length === 0) {
      setAnalysis(null);
      setMediaType(null);
      setTags([]);
      return;
    }

    setIsAnalyzing(true);

    // Determine media type
    const isVideo = files.some((file) => file.type.startsWith("video/"));
    setMediaType(isVideo ? "video" : "image");

    // Simulate AI processing delay
    const timer = setTimeout(() => {
      // Generate mock analysis based on file type and request type
      let analysisText = "";
      let generatedTags: string[] = [];

      if (isVideo) {
        analysisText = `This video shows ${petName} ${getRandomActivity("video")}. ${petName} appears ${getRandomMood()} and ${getRandomBehavior()}.`;
        generatedTags = [
          "video",
          getRandomMood(),
          getRandomBehavior(),
          getRandomActivity("video"),
        ];
      } else {
        if (files.length === 1) {
          analysisText = `This photo shows ${petName} ${getRandomActivity("photo")}. ${petName} looks ${getRandomMood()} and ${getRandomBehavior()}.`;
        } else {
          analysisText = `These ${files.length} photos show ${petName} ${getRandomActivity("photo")}. In the images, ${petName} appears ${getRandomMood()} and ${getRandomBehavior()}.`;
        }
        generatedTags = [
          "photo",
          getRandomMood(),
          getRandomBehavior(),
          getRandomActivity("photo"),
        ];
      }

      // Add request-specific analysis
      if (requestType === "grooming") {
        analysisText += ` The grooming session has left ${petName} looking clean and well-groomed with a shiny coat.`;
        generatedTags.push("groomed", "clean");
      }

      setAnalysis(analysisText);
      setTags([...new Set(generatedTags)]);
      setIsAnalyzing(false);

      // Notify parent component of analysis completion
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisText);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [files, requestType, petName, onAnalysisComplete]);

  // Helper functions to generate random descriptions
  function getRandomMood(): string {
    const moods = [
      "happy",
      "relaxed",
      "content",
      "calm",
      "playful",
      "curious",
      "energetic",
      "peaceful",
    ];
    return moods[Math.floor(Math.random() * moods.length)];
  }

  function getRandomBehavior(): string {
    const behaviors = [
      "well-adjusted to the environment",
      "comfortable in our care",
      "showing good energy levels",
      "interacting positively with staff",
      "displaying healthy behavior",
      "adapting well to the boarding routine",
      "enjoying the amenities we provide",
      "responding well to attention",
    ];
    return behaviors[Math.floor(Math.random() * behaviors.length)];
  }

  function getRandomActivity(type: "photo" | "video"): string {
    const photoActivities = [
      "resting comfortably in the boarding area",
      "enjoying some quiet time",
      "posing nicely for the camera",
      "looking alert and attentive",
      "relaxing in a comfortable spot",
      "after playtime, looking content",
      "with a healthy appearance and bright eyes",
      "in our specially designed pet spaces",
    ];

    const videoActivities = [
      "playing with toys",
      "during exercise time",
      "interacting with our staff",
      "exploring the play area",
      "during a supervised activity session",
      "enjoying outdoor time",
      "during socialization with other pets",
      "during feeding time, showing good appetite",
    ];

    const activities = type === "photo" ? photoActivities : videoActivities;
    return activities[Math.floor(Math.random() * activities.length)];
  }

  if (files.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Sparkles className="h-4 w-4" />
          AI Media Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm text-blue-700 dark:text-blue-400">
              Analyzing media content...
            </span>
          </div>
        ) : analysis ? (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              {mediaType === "video" ? (
                <Video className="h-4 w-4 mt-0.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              ) : (
                <Image className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              )}
              <p className="text-sm">{analysis}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
