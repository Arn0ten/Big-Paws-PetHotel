import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

// Update the default pet avatars to use the correct paths
// Default pet avatars
const DEFAULT_DOG_AVATAR = "/default-images/default-dog.png";
const DEFAULT_CAT_AVATAR = "/default-images/default-cat.png";

interface PetCardProps {
  pet: {
    id: string;
    name: string;
    breed: string;
    age: number;
    size: string;
    avatar?: string;
    type: "dog" | "cat" | string;
    boarding?: {
      status: string;
      startDate: string;
      endDate: string;
      package: string;
      totalPrice: number;
      remainingAmount?: number;
    };
  };
}

export function PetCard({ pet }: PetCardProps) {
  // Determine which default avatar to use based on pet type
  const getDefaultAvatar = () => {
    if (pet.type?.toLowerCase() === "cat") return DEFAULT_CAT_AVATAR;
    return DEFAULT_DOG_AVATAR; // Default to dog if type is unknown
  };

  const avatarSrc = pet.avatar || getDefaultAvatar();

  return (
    <Link href={`/webapp/pet-owner/pets/${pet.id}`}>
      <Card className="hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors cursor-pointer border-2 border-border/40 dark:border-border/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarSrc} alt={pet.name} />
              <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground">
                {pet.name}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground/90">
                {pet.breed} • {pet.size} size • {pet.age}{" "}
                {pet.age === 1 ? "year" : "years"} old
              </p>

              {pet.boarding ? (
                <Badge
                  variant="outline"
                  className="mt-2 bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                >
                  Currently Boarding
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="mt-2 bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                >
                  Not Boarding
                </Badge>
              )}
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground dark:text-muted-foreground/80" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
