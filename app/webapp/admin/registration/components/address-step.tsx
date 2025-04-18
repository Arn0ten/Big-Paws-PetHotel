import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MapPin, ChevronRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { FormValues } from "../types";
import { TOAST_MESSAGES } from "../constants";

interface AddressStepProps {
  navigateToPreviousStep: () => void;
  navigateToNextStep: () => void;
}

export function AddressStep({
  navigateToPreviousStep,
  navigateToNextStep,
}: AddressStepProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useFormContext<FormValues>();

  const { toast } = useToast();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    // Fetch provinces from the API
    const fetchProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const response = await fetch("https://psgc.gitlab.io/api/provinces/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  const fetchCities = async (provinceCode: string) => {
    try {
      setIsLoadingCities(true);
      const response = await fetch(
        `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`,
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(["streetAddress", "province", "city"]);

    if (isValid) {
      toast({
        title: TOAST_MESSAGES.VALIDATION_SUCCESS.ADDRESS.title,
        description: TOAST_MESSAGES.VALIDATION_SUCCESS.ADDRESS.description,
      });
      navigateToNextStep();
    } else {
      toast({
        title: TOAST_MESSAGES.VALIDATION_ERROR.title,
        description: TOAST_MESSAGES.VALIDATION_ERROR.description,
        variant: "destructive",
      });

      const firstErrorField = Object.keys(errors)[0] as keyof FormValues;
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  };

  const renderError = (field: keyof FormValues) =>
    errors[field] && (
      <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1.5">
        <AlertCircle className="h-4 w-4 mr-1" />
        {errors[field]?.message}
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        {/* Street Address */}
        <div>
          <Label htmlFor="streetAddress" className="text-base font-medium">
            Street Address <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="streetAddress"
              placeholder="House/Unit number, street name, building"
              className={cn(
                "pl-10 mt-1.5 min-h-[80px]",
                errors.streetAddress &&
                  "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
              )}
              {...register("streetAddress", {
                required: "Street address is required",
              })}
            />
          </div>
          {renderError("streetAddress")}
        </div>

        {/* Province & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Province */}
          <div>
            <Label htmlFor="province" className="text-base font-medium">
              Province <span className="text-destructive">*</span>
            </Label>
            <div className="relative mt-1.5">
              {isLoadingProvinces ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Select
                  onValueChange={(value) => {
                    const [id, name] = value.split("|");
                    setValue("province", name, { shouldValidate: true });
                    setValue("provinceCode", id, { shouldValidate: true });
                    fetchCities(id); // Fetch cities based on selected province
                  }}
                >
                  <SelectTrigger
                    id="province"
                    className={cn(
                      errors.province &&
                        "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
                    )}
                  >
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {provinces.map((province: any) => (
                      <SelectItem
                        key={province.code}
                        value={`${province.code}|${province.name}`}
                      >
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <input
                {...register("province", { required: "Province is required" })}
                type="hidden"
              />
              <input {...register("provinceCode")} type="hidden" />
            </div>
            {renderError("province")}
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city" className="text-base font-medium">
              City/Municipality <span className="text-destructive">*</span>
            </Label>
            <div className="relative mt-1.5">
              {isLoadingCities ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Select
                  disabled={
                    !watch("province") || cities.length === 0 || isLoadingCities
                  }
                  onValueChange={(value) => {
                    const [id, name] = value.split("|");
                    setValue("city", name, { shouldValidate: true });
                    setValue("cityCode", id, { shouldValidate: true });
                  }}
                >
                  <SelectTrigger
                    id="city"
                    className={cn(
                      errors.city &&
                        "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
                    )}
                  >
                    <SelectValue
                      placeholder={
                        !watch("province")
                          ? "Select province first"
                          : cities.length === 0
                            ? "Loading cities..."
                            : "Select city/municipality"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city: any) => (
                      <SelectItem
                        key={city.code}
                        value={`${city.code}|${city.name}`}
                      >
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <input
                {...register("city", {
                  required: "City/Municipality is required",
                })}
                type="hidden"
              />
              <input {...register("cityCode")} type="hidden" />
            </div>
            {renderError("city")}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={navigateToPreviousStep}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700"
        >
          Next Step <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
