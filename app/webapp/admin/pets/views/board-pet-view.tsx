"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  Hotel,
  Dog,
  Cat,
  Loader2,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Pet } from "../utils/types";
import PageLayout from "@/app/webapp/components/PageLayout";

// Custom time picker component
const TimePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (time: string) => void;
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = ["00", "15", "30", "45"];

  const [selectedHour, selectedMinute] = value
    .split(":")
    .map((v, i) => (i === 0 ? Number.parseInt(v) : v));

  return (
    <PopoverContent className="w-auto p-0" align="start">
      <div className="flex h-[300px]">
        <div className="border-r overflow-y-auto p-2 w-16">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`cursor-pointer rounded-md p-2 text-center text-sm hover:bg-muted ${
                selectedHour === hour
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => {
                onChange(
                  `${hour.toString().padStart(2, "0")}:${selectedMinute}`,
                );
              }}
            >
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="overflow-y-auto p-2 w-16">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={`cursor-pointer rounded-md p-2 text-center text-sm hover:bg-muted ${
                selectedMinute === minute
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
              onClick={() => {
                onChange(
                  `${selectedHour.toString().padStart(2, "0")}:${minute}`,
                );
              }}
            >
              {minute}
            </div>
          ))}
        </div>
      </div>
    </PopoverContent>
  );
};

// Pricing tiers based on pet size
const dogDaycarePricing = {
  Small: 25,
  Medium: 30,
  Large: 40,
  XL: 50,
};

const dogAccommodationPricing = {
  Small: 320,
  Medium: 400,
  Large: 480,
  XL: 550,
};

const catPricing = {
  standard: {
    kitten: 300,
    adult: 400,
  },
  extraGuest: {
    smallToMedium: 200,
    large: 300,
  },
};

// Boarding type
type BoardingType = "Daycare" | "LongStay";

// Boarding details
interface BoardingDetails {
  petIds: string[];
  type: BoardingType;
  startDate: Date;
  endDate: Date;
  startTime?: string;
  endTime?: string;
  notes?: string;
  pricing?: {
    total: number;
    breakdown: { petName: string; price: number }[];
  };
}

// Pricing utility function
const calculateBoardingPrice = (
  pet: Pet,
  type: BoardingType,
  startDate: Date,
  endDate: Date,
  startTime?: string,
  endTime?: string,
): { total: number; breakdown: { petName: string; price: number }[] } => {
  let petPrice = 0;

  if (pet.type === "Dog") {
    if (type === "Daycare") {
      // Calculate hours for daycare
      let hours = 8; // Default to 8 hours if times not provided

      if (startTime && endTime) {
        const startHour = Number.parseInt(startTime.split(":")[0]);
        const startMinute = Number.parseInt(startTime.split(":")[1]);
        const endHour = Number.parseInt(endTime.split(":")[0]);
        const endMinute = Number.parseInt(endTime.split(":")[1]);

        // Calculate total hours including partial hours
        hours = endHour - startHour;
        if (endMinute > startMinute) hours += 0.5;
        else if (endMinute < startMinute) hours -= 0.5;

        // Minimum 1 hour
        hours = Math.max(1, hours);
      }

      // Get hourly rate based on size
      const hourlyRate = dogDaycarePricing[pet.size || "Medium"];
      petPrice = hourlyRate * hours;
    } else {
      // For long stay, calculate number of days
      const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      // Minimum 1 day
      const stayDays = Math.max(1, days);

      // Get daily rate based on size
      const dailyRate = dogAccommodationPricing[pet.size || "Medium"];
      petPrice = dailyRate * stayDays;
    }
  } else if (pet.type === "Cat") {
    // For cats, we use a simpler pricing model
    const isKitten = pet.age && pet.age < 1;
    const isLarge = pet.size === "Large" || pet.size === "XL";

    // Base price for standard room
    petPrice = isKitten
      ? catPricing.standard.kitten
      : catPricing.standard.adult;

    // For long stay, multiply by days
    if (type === "LongStay") {
      const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      const stayDays = Math.max(1, days);
      petPrice *= stayDays;
    }
  }

  // Round to 2 decimal places
  petPrice = Math.round(petPrice * 100) / 100;

  return {
    total: petPrice,
    breakdown: [
      {
        petName: pet.name,
        price: petPrice,
      },
    ],
  };
};

interface BoardPetViewProps {
  pet: Pet | null;
  onBack: () => void;
  onSubmit: (details: BoardingDetails) => Promise<boolean>;
  isSubmitting: boolean;
}

export default function BoardPetView({
  pet,
  onBack,
  onSubmit,
  isSubmitting,
}: BoardPetViewProps) {
  const [boardingDetails, setBoardingDetails] = useState<BoardingDetails>({
    petIds: [],
    type: "Daycare",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "09:00",
    endTime: "17:00",
    notes: "",
  });

  // Initialize pet ID when pet changes
  useEffect(() => {
    if (pet) {
      setBoardingDetails((prev) => ({
        ...prev,
        petIds: [pet.id],
      }));
    }
  }, [pet]);

  // Handle boarding type change
  const handleBoardingTypeChange = (type: BoardingType) => {
    setBoardingDetails((prev) => ({
      ...prev,
      type,
      // Reset dates/times based on type
      ...(type === "Daycare"
        ? {
            startDate: new Date(),
            endDate: new Date(),
            startTime: "09:00",
            endTime: "17:00",
          }
        : {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            startTime: undefined,
            endTime: undefined,
          }),
    }));
  };

  // Calculate pricing whenever relevant details change
  useEffect(() => {
    if (pet) {
      const pricing = calculateBoardingPrice(
        pet,
        boardingDetails.type,
        boardingDetails.startDate,
        boardingDetails.endDate,
        boardingDetails.startTime,
        boardingDetails.endTime,
      );

      // Only update if the price has actually changed
      if (
        !boardingDetails.pricing ||
        boardingDetails.pricing.total !== pricing.total ||
        JSON.stringify(boardingDetails.pricing.breakdown) !==
          JSON.stringify(pricing.breakdown)
      ) {
        setBoardingDetails((prev) => ({
          ...prev,
          pricing,
        }));
      }
    }
  }, [
    pet,
    boardingDetails.type,
    boardingDetails.startDate,
    boardingDetails.endDate,
    boardingDetails.startTime,
    boardingDetails.endTime,
  ]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!pet) return;
    await onSubmit(boardingDetails);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, "PPP");
  };

  // Format time for display
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = Number.parseInt(hour);
    const period = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  if (!pet) return null;

  return (
    <PageLayout title={`Board Pet: ${pet?.name}`} onBack={onBack}>
      <div className="space-y-6">
        {/* Pet info */}
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={pet.image} alt={pet.name} />
            <AvatarFallback className="bg-primary/10">
              {pet.type === "Dog" ? (
                <Dog className="h-8 w-8 text-primary" />
              ) : (
                <Cat className="h-8 w-8 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-medium">{pet.name}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              {/* Ensure pet type badges match the table design
              Use the same styling as in the PetsTable component */}
              <Badge
                className={`whitespace-nowrap ${
                  pet.type === "Dog"
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                    : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
                }`}
              >
                {pet.type === "Dog" ? (
                  <Dog className="mr-1 h-3 w-3" />
                ) : (
                  <Cat className="mr-1 h-3 w-3" />
                )}
                {pet.type}
              </Badge>
              <span className="ml-2">{pet.breed}</span>
              <span className="mx-1">•</span>
              <span>{pet.size}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Boarding type and dates */}
          <div className="space-y-4">
            {/* Boarding type selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Boarding Type</Label>
              <RadioGroup
                value={boardingDetails.type}
                onValueChange={(value) =>
                  handleBoardingTypeChange(value as BoardingType)
                }
                className="flex flex-col space-y-2"
              >
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    boardingDetails.type === "Daycare"
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "hover:bg-muted/50 border-border"
                  }`}
                >
                  <RadioGroupItem
                    value="Daycare"
                    id="daycare"
                    className="text-primary"
                  />
                  <Label
                    htmlFor="daycare"
                    className="flex items-center cursor-pointer"
                  >
                    <CalendarClock className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <span className="font-medium">Daycare (Same Day)</span>
                      <p className="text-sm text-muted-foreground">
                        For short-term pet care during the day
                      </p>
                    </div>
                  </Label>
                </div>
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    boardingDetails.type === "LongStay"
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "hover:bg-muted/50 border-border"
                  }`}
                >
                  <RadioGroupItem
                    value="LongStay"
                    id="longstay"
                    className="text-primary"
                  />
                  <Label
                    htmlFor="longstay"
                    className="flex items-center cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4 mr-2 text-amber-500" />
                    <div>
                      <span className="font-medium">
                        Long Stay (Multiple Days)
                      </span>
                      <p className="text-sm text-muted-foreground">
                        For extended boarding periods
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {boardingDetails.type === "Daycare" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-sm font-medium">
                      Drop-off Time
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="start-time"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                          {boardingDetails.startTime
                            ? formatTime(boardingDetails.startTime)
                            : "Select time"}
                        </Button>
                      </PopoverTrigger>
                      <TimePicker
                        value={boardingDetails.startTime || "09:00"}
                        onChange={(time) =>
                          setBoardingDetails((prev) => ({
                            ...prev,
                            startTime: time,
                          }))
                        }
                      />
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-sm font-medium">
                      Pick-up Time
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-time"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Clock className="mr-2 h-4 w-4 text-amber-500" />
                          {boardingDetails.endTime
                            ? formatTime(boardingDetails.endTime)
                            : "Select time"}
                        </Button>
                      </PopoverTrigger>
                      <TimePicker
                        value={boardingDetails.endTime || "17:00"}
                        onChange={(time) =>
                          setBoardingDetails((prev) => ({
                            ...prev,
                            endTime: time,
                          }))
                        }
                      />
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daycare-date" className="text-sm font-medium">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="daycare-date"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        {formatDate(boardingDetails.startDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={boardingDetails.startDate}
                        onSelect={(date) =>
                          date &&
                          setBoardingDetails((prev) => ({
                            ...prev,
                            startDate: date,
                            endDate: date,
                          }))
                        }
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-sm font-medium">
                      Check-in Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="start-date"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {formatDate(boardingDetails.startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={boardingDetails.startDate}
                          onSelect={(date) => {
                            if (!date) return;

                            // Ensure end date is not before start date
                            const newEndDate =
                              boardingDetails.endDate < date
                                ? date
                                : boardingDetails.endDate;

                            setBoardingDetails((prev) => ({
                              ...prev,
                              startDate: date,
                              endDate: newEndDate,
                            }));
                          }}
                          initialFocus
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-sm font-medium">
                      Check-out Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-date"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-amber-500" />
                          {formatDate(boardingDetails.endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={boardingDetails.endDate}
                          onSelect={(date) =>
                            date &&
                            setBoardingDetails((prev) => ({
                              ...prev,
                              endDate: date,
                            }))
                          }
                          initialFocus
                          disabled={(date) => date < boardingDetails.startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Notes and pricing */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Enter any special instructions or requirements..."
                value={boardingDetails.notes || ""}
                onChange={(e) =>
                  setBoardingDetails((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Pricing summary */}
            {boardingDetails.pricing && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-medium">Pricing Summary</h3>
                <div className="space-y-2">
                  {boardingDetails.pricing.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.petName}</span>
                      <span className="font-medium">
                        ₱{item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ₱{boardingDetails.pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Hotel className="mr-2 h-4 w-4" />
                Create Boarding
              </>
            )}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
