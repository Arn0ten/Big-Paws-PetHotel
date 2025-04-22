"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowLeft,
  Info,
  Dog,
  Cat,

  CalendarIcon,
} from "lucide-react";
import { IoMdMail } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { PetOwner, BoardingDetails } from "../utils/types";
import PageLayout from "@/app/webapp/components/PageLayout";
import { Calendar } from "@/components/ui/calendar";
import { FaCalendarDay } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";

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

interface BoardPetsViewProps {
  owner: PetOwner | null;
  onBack: () => void;
  onSubmit: (data: BoardingDetails) => Promise<boolean>;
  isSubmitting: boolean;
}

export default function BoardPetsView({
  owner,
  onBack,
  onSubmit,
  isSubmitting,
}: BoardPetsViewProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Form state
  const [formData, setFormData] = useState<BoardingDetails>({
    petIds: [],
    type: "Daycare",
    startDate: today,
    endDate: tomorrow,
    startTime: "09:00",
    endTime: "17:00",
    notes: "",
  });

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!owner) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pet owner not found</h2>
          <p className="text-muted-foreground mt-2">
            The requested pet owner could not be found.
          </p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  // Get available pets (not currently boarding)
  const availablePets = owner.pets.filter((pet) => !pet.isBoarding);

  // Handle pet selection
  const handlePetSelection = (petId: string) => {
    setFormData((prev) => {
      if (prev.petIds.includes(petId)) {
        return {
          ...prev,
          petIds: prev.petIds.filter((id) => id !== petId),
        };
      } else {
        return {
          ...prev,
          petIds: [...prev.petIds, petId],
        };
      }
    });

    // Clear error if it exists
    if (errors.petIds) {
      setErrors({
        ...errors,
        petIds: "",
      });
    }
  };

  // Handle boarding type change
  const handleBoardingTypeChange = (type: BoardingType) => {
    setFormData((prev) => ({
      ...prev,
      type,
      // Reset dates/times based on type
      ...(type === "Daycare"
        ? {
            startDate: today,
            endDate: today,
            startTime: "09:00",
            endTime: "17:00",
          }
        : {
            startDate: today,
            endDate: tomorrow,
            startTime: undefined,
            endTime: undefined,
          }),
    }));
  };

  // Handle date changes
  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        startDate: date,
      });

      // Clear error if it exists
      if (errors.startDate) {
        setErrors({
          ...errors,
          startDate: "",
        });
      }
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        endDate: date,
      });

      // Clear error if it exists
      if (errors.endDate) {
        setErrors({
          ...errors,
          endDate: "",
        });
      }
    }
  };

  // Handle time changes
  const handleStartTimeChange = (time: string) => {
    setFormData({
      ...formData,
      startTime: time,
    });
  };

  const handleEndTimeChange = (time: string) => {
    setFormData({
      ...formData,
      endTime: time,
    });
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      notes: e.target.value,
    });
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

  // Calculate boarding duration in days
  const calculateDuration = () => {
    if (formData.type === "Daycare") return 1;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    let totalCost = 0;
    const duration = calculateDuration();

    // Calculate cost for each selected pet
    formData.petIds.forEach((petId) => {
      const pet = owner.pets.find((p) => p.id === petId);
      if (!pet) return;

      if (formData.type === "Daycare") {
        // Calculate hours for daycare
        let hours = 8; // Default to 8 hours if times not provided

        if (formData.startTime && formData.endTime) {
          const startHour = Number.parseInt(formData.startTime.split(":")[0]);
          const startMinute = Number.parseInt(formData.startTime.split(":")[1]);
          const endHour = Number.parseInt(formData.endTime.split(":")[0]);
          const endMinute = Number.parseInt(formData.endTime.split(":")[1]);

          // Calculate total hours including partial hours
          hours = endHour - startHour;
          if (endMinute > startMinute) hours += 0.5;
          else if (endMinute < startMinute) hours -= 0.5;

          // Minimum 1 hour
          hours = Math.max(1, hours);
        }

        // Get hourly rate based on size
        const hourlyRate =
          dogDaycarePricing[pet.size as keyof typeof dogDaycarePricing] ||
          dogDaycarePricing.Medium;
        totalCost += hourlyRate * hours;
      } else {
        if (pet.type === "Dog") {
          const dailyRate =
            dogAccommodationPricing[
              pet.size as keyof typeof dogAccommodationPricing
            ] || dogAccommodationPricing.Medium;
          totalCost += dailyRate * duration;
        } else if (pet.type === "Cat") {
          const isKitten = pet.age < 1;
          const dailyRate = isKitten
            ? catPricing.standard.kitten
            : catPricing.standard.adult;
          totalCost += dailyRate * duration;
        }
      }
    });

    return totalCost;
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate pet selection
    if (formData.petIds.length === 0) {
      newErrors.petIds = "Please select at least one pet";
    }

    // Validate dates
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      if (end < start) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      // Form was submitted successfully, navigation will be handled by the parent component
    }
  };

  return (
    <PageLayout title={`Board Pet: ${owner.name}`} onBack={onBack}>
      <div className="space-y-6">
        {/* Owner info */}
        <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={owner.avatar} alt={owner.name} />
            <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-medium">{owner.name}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <IoMdMail className="h-4 w-4 mr-1" />
              {owner.email}
            </div>
          </div>
        </div>

        {/* Pet Selection - Move outside the grid to span full width */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              Select Pets to Board
            </h3>
            {errors.petIds && (
              <p className="text-xs text-destructive">{errors.petIds}</p>
            )}
          </div>

          {availablePets.length === 0 ? (
            <div className="rounded-md border p-4 text-center">
              <p className="text-muted-foreground">
                No pets available for boarding.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                All of {owner.name}'s pets are currently boarding or no pets
                have been registered.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {availablePets.map((pet) => (
                <div
                  key={pet.id}
                  className={`rounded-md border p-4 cursor-pointer transition-all ${
                    formData.petIds.includes(pet.id)
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handlePetSelection(pet.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`pet-${pet.id}`}
                      checked={formData.petIds.includes(pet.id)}
                      onCheckedChange={() => handlePetSelection(pet.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={`pet-${pet.id}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {pet.name}
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={
                            pet.type === "Dog"
                              ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                              : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-white dark:hover:bg-purple-600"
                          }
                        >
                          {pet.type === "Dog" ? (
                            <Dog className="mr-1 h-3 w-3" />
                          ) : (
                            <Cat className="mr-1 h-3 w-3" />
                          )}
                          {pet.type}
                        </Badge>
                        <Badge variant="outline">{pet.size}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {pet.breed} • {pet.age} years old
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Boarding type and dates */}
          <div className="space-y-4">
            {/* Boarding type selection */}
            <div className="space-y-2">
              <Label className="text-base font-medium">Boarding Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) =>
                  handleBoardingTypeChange(value as BoardingType)
                }
                className="flex flex-col space-y-2"
              >
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    formData.type === "Daycare"
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
                    <GoClockFill className="h-4 w-4 mr-2 text-blue-500" />
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
                    formData.type === "LongStay"
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
                    <FaCalendarDay className="h-4 w-4 mr-2 text-amber-500" />
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

            {formData.type === "Daycare" ? (
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
                          <GoClockFill className="mr-2 h-4 w-4 text-blue-500" />
                          {formData.startTime
                            ? formatTime(formData.startTime)
                            : "Select time"}
                        </Button>
                      </PopoverTrigger>
                      <TimePicker
                        value={formData.startTime || "09:00"}
                        onChange={handleStartTimeChange}
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
                          <GoClockFill className="mr-2 h-4 w-4 text-amber-500" />
                          {formData.endTime
                            ? formatTime(formData.endTime)
                            : "Select time"}
                        </Button>
                      </PopoverTrigger>
                      <TimePicker
                        value={formData.endTime || "17:00"}
                        onChange={handleEndTimeChange}
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
                        <FaCalendarDay className="mr-2 h-4 w-4 text-primary" />
                        {formatDate(formData.startDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) =>
                          date &&
                          setFormData((prev) => ({
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
                  {errors.startDate && (
                    <p className="text-xs text-destructive">
                      {errors.startDate}
                    </p>
                  )}
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
                          <FaCalendarDay className="mr-2 h-4 w-4 text-blue-500" />
                          {formatDate(formData.startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => {
                            if (!date) return;

                            // Ensure end date is not before start date
                            const newEndDate =
                              formData.endDate < date ? date : formData.endDate;

                            setFormData((prev) => ({
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
                    {errors.startDate && (
                      <p className="text-xs text-destructive">
                        {errors.startDate}
                      </p>
                    )}
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
                          <FaCalendarDay className="mr-2 h-4 w-4 text-amber-500" />
                          {formatDate(formData.endDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) =>
                            date &&
                            setFormData((prev) => ({ ...prev, endDate: date }))
                          }
                          initialFocus
                          disabled={(date) => date < formData.startDate}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.endDate && (
                      <p className="text-xs text-destructive">
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Duration: {calculateDuration()} days</span>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Pet selection, notes and pricing */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={handleNotesChange}
                placeholder="Enter any special instructions or notes for this boarding"
                rows={4}
              />
            </div>
            {/* Pricing summary */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium">Pricing Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Number of pets:</span>
                  <span>{formData.petIds.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>
                    {formData.type === "Daycare"
                      ? "1 day"
                      : `${calculateDuration()} days`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-500">
                    ₱
                    {calculateEstimatedCost().toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onBack}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              availablePets.length === 0 ||
              formData.petIds.length === 0
            }
            className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>Create Boarding</>
            )}
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
