"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, RefreshCw, Loader2 } from "lucide-react";
import { generateProcessingNote } from "@/lib/note-templates";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NoteGeneratorProps {
  request: any;
  selectedFiles: File[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function NoteGenerator({
  request,
  selectedFiles,
  value,
  onChange,
  className,
}: NoteGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerateNote = () => {
    setIsGenerating(true);

    // Simulate a brief delay to make the generation feel more natural
    setTimeout(() => {
      try {
        // Generate a note based on the request type and selected files
        const generatedNote = generateProcessingNote(
          request,
          selectedFiles.length,
        );
        onChange(generatedNote);
        setHasGenerated(true);
      } catch (error) {
        console.error("Error generating note:", error);
      } finally {
        setIsGenerating(false);
      }
    }, 600);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateNote}
                disabled={isGenerating || !request}
                className="h-8"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : hasGenerated ? (
                  <>
                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    Regenerate
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-3.5 w-3.5" />
                    Generate Note
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasGenerated
                ? "Generate a new note with a different template"
                : "Generate a professional note based on the request type and media"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        id="processing-notes"
        placeholder="Enter processing notes for the pet owner..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="resize-none"
      />
    </div>
  );
}
