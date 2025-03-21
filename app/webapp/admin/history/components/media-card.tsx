import type React from "react";
import { MediaCard as BaseMediaCard } from "@/app/webapp/components/media-card";

export function MediaCard(props: React.ComponentProps<typeof BaseMediaCard>) {
  return <BaseMediaCard {...props} />;
}
