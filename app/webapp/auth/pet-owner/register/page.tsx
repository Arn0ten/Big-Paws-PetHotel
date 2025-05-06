"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthLayout } from "@/app/webapp/auth/pet-owner/components/AuthLayout";
import { PasswordStrengthMeter } from "@/app/webapp/auth/pet-owner/components/PasswordStrengthMeter";
import { usePasswordValidation } from "@/app/webapp/auth/pet-owner/hooks/usePasswordValidation";
import {
  isValidEmail,
  isValidPhone,
} from "@/app/webapp/auth/pet-owner/utils/validation";

interface RegistrationFormData {
  fullName: string;
  contact: string;
  contactType: "email" | "phone";
  street: string;
  province: string;
  provinceCode: string;
  city: string;
  cityCode: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function PetOwnerRegistrationPage() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    contact: "",
    contactType: "email",
    street: "",
    province: "",
    provinceCode: "",
    city: "",
    cityCode: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<any[]>([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const router = useRouter();
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [provinces, setProvinces] = useState<any[]>([]);

  // Password validation hook
  const {
    passwordCriteria: passwordValidation,
    passwordStrength,
    isValid,
  } = usePasswordValidation({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });

  // Effect for client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to fetch provinces on mount
  useEffect(() => {
    // Fetch provinces from the API
    const fetchProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const response = await fetch("https://psgc.gitlab.io/api/provinces/");
        const data = await response.json();
        // Store the fetched provinces
        setProvinces(data);
        setIsLoadingProvinces(false);
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setIsLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  // useCallback hook to memoize the function
  const fetchCities = useCallback(
    async (provinceCode: string) => {
      if (provinceCode) {
        try {
          setIsLoadingCities(true);
          // Fetch cities from the API based on selected province
          const response = await fetch(
            `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`,
          );
          const data = await response.json();
          setCities(data);
          if (
            formData.city &&
            !data.some((city: { name: string; }) => city.name === formData.city)
          ) {
            setFormData((prev) => ({ ...prev, city: "", cityCode: "" }));
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setIsLoadingCities(false);
        }
      } else {
        setCities([]);
      }
    },
    [formData.city],
  );

  // Update cities whenever province changes
  useEffect(() => {
    fetchCities(formData.provinceCode);
  }, [formData.provinceCode, fetchCities]);

  /**
   * Handle input field changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Detect contact type
    if (name === "contact") {
      const contactType = value.includes("@") ? "email" : "phone";
      setFormData((prev) => ({ ...prev, [name]: value, contactType }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Handle select changes
   */
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /**
   * Handle checkbox state changes
   */
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));

    if (formErrors.agreeToTerms) {
      setFormErrors((prev) => ({ ...prev, agreeToTerms: "" }));
    }
  };

  /**
   * Validate the form before submission
   */
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validate name
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    // Validate contact (email or phone)
    if (!formData.contact) {
      errors.contact = "Email or phone number is required";
    } else if (
      formData.contactType === "email" &&
      !isValidEmail(formData.contact)
    ) {
      errors.contact = "Please enter a valid email address";
    } else if (
      formData.contactType === "phone" &&
      !isValidPhone(formData.contact)
    ) {
      errors.contact = "Please enter a valid phone number (numbers only)";
    }

    // Validate address
    if (!formData.street.trim()) {
      errors.street = "Street address is required";
    }
    if (!formData.province) {
      errors.province = "Province is required";
    }
    if (!formData.city) {
      errors.city = "City/Municipality is required";
    }

    // Validate password (basic check - the detailed validation is handled by the hook)
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Password strength validation
    if (
      !passwordValidation.length ||
      !passwordValidation.uppercase ||
      !passwordValidation.lowercase ||
      !passwordValidation.number ||
      !passwordValidation.symbol
    ) {
      errors.password = "Password does not meet security requirements";
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms =
        "You must agree to the Terms of Service and Privacy Policy";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // This is where you would normally make an API call to register the user
      // For demonstration purposes, we'll simulate a successful registration

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // BACKEND INTEGRATION POINT:
      // Add your actual API call here to register the pet owner
      // Example:
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.fullName,
      //     [formData.contactType]: formData.contact,
      //     address: {
      //       street: formData.street,
      //       province: formData.province,
      //       city: formData.city
      //     },
      //     password: formData.password
      //   })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.error || 'Registration failed');

      // On successful registration
      // Show success dialog instead of immediately redirecting
      setSuccessDialogOpen(true);
      // router.push("/webapp/auth/pet-owner/login?registered=true")
    } catch (error) {
      console.error("Registration error:", error);
      setFormErrors((prev) => ({
        ...prev,
        submit:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Legal content for the Terms & Privacy dialog
  const legalContent = (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-background py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Terms & Privacy Policy
            </h1>
            <p className="text-center mb-8 text-muted-foreground">
              Last Updated: January 15, 2025 | Effective Date: February 1, 2025
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <p className="flex items-start">
                <span className="mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1">
                  ⚠️
                </span>
                <span>
                  This document is governed by the laws of the Republic of the
                  Philippines, including but not limited to the Data Privacy Act
                  of 2012 (Republic Act No. 10173), the Consumer Act of the
                  Philippines (Republic Act No. 7394), and the E-Commerce Act
                  (Republic Act No. 8792), as amended by subsequent legislation
                  through 2025.
                </span>
              </p>
            </div>

            {/* Terms of Service and Privacy Policy content - shortened for brevity */}
            <section className="mb-6 bg-card rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold m-0">Terms of Service</h2>
              </div>

              <h3 className="text-xl font-semibold mb-4">
                1. Service Agreement
              </h3>
              <p className="mb-4">
                By using Big Paws Pet Hotel services, you agree to comply with
                and be bound by the following terms and conditions. We reserve
                the right to modify these terms at any time.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                2. Pet Care Services
              </h3>
              <p className="mb-4">
                All pets must be up-to-date with vaccinations as required by the
                Philippine Veterinary Medical Association and the Bureau of
                Animal Industry.
              </p>

              <h3 className="text-xl font-semibold mb-4">3. Payment Terms</h3>
              <p className="mb-4">
                Payment is required at the time of service. We accept cash,
                credit cards, and digital payments.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold m-0">Privacy Policy</h2>
              </div>

              <p className="mb-4">
                This Privacy Policy complies with the Data Privacy Act of 2012
                (Republic Act No. 10173) and its Implementing Rules and
                Regulations.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                1. Information Collection
              </h3>
              <p className="mb-4">
                We collect information necessary to provide pet care services,
                including contact details, pet records, and payment information.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                2. Data Subject Rights
              </h3>
              <p className="mb-4">
                Under the Data Privacy Act of 2012, you have the rights to be
                informed, access, object, erasure, damages, file a complaint,
                rectify inaccuracies, and data portability.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <AuthLayout showBackToLogin>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Pet Owner Registration</h1>
          <p className="text-muted-foreground mt-1">
            Create your Big Paws Pet Hotel account
          </p>
        </div>

        {/* General submission error */}
        {formErrors.submit && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{formErrors.submit}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={isLoading}
              className={formErrors.fullName ? "border-destructive" : ""}
            />
            {formErrors.fullName && (
              <p className="text-destructive text-sm">{formErrors.fullName}</p>
            )}
          </div>

          {/* Email or Phone */}
          <div className="space-y-2">
            <Label htmlFor="contact">
              Email or Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              name="contact"
              placeholder="Enter your email or phone number"
              value={formData.contact}
              onChange={handleInputChange}
              disabled={isLoading}
              className={formErrors.contact ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {formData.contactType === "email"
                ? "Using email for login"
                : "Using phone number for login"}
            </p>
            {formErrors.contact && (
              <p className="text-destructive text-sm">{formErrors.contact}</p>
            )}
          </div>

          {/* Address - Street */}
          <div className="space-y-2">
            <Label htmlFor="street">
              Street Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="street"
              name="street"
              placeholder="Enter your street address"
              value={formData.street}
              onChange={handleInputChange}
              disabled={isLoading}
              className={formErrors.street ? "border-destructive" : ""}
            />
            {formErrors.street && (
              <p className="text-destructive text-sm">{formErrors.street}</p>
            )}
          </div>

          {/* Province */}
          <div className="space-y-2">
            <Label htmlFor="province">
              Province <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              {isLoadingProvinces ? (
                <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm animate-pulse" />
              ) : (
                <Select
                  value={formData.provinceCode}
                  onValueChange={(value) => {
                    const selectedProvince = provinces.find(
                      (p) => p.code === value,
                    );
                    if (selectedProvince) {
                      setFormData((prev) => ({
                        ...prev,
                        province: selectedProvince.name,
                        provinceCode: selectedProvince.code,
                        city: "",
                        cityCode: "",
                      }));
                    }
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger
                    className={formErrors.province ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            {formErrors.province && (
              <p className="text-destructive text-sm">{formErrors.province}</p>
            )}
          </div>

          {/* City/Municipality */}
          <div className="space-y-2">
            <Label htmlFor="city">
              City/Municipality <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              {isLoadingCities ? (
                <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm animate-pulse" />
              ) : (
                <Select
                  value={formData.cityCode}
                  onValueChange={(value) => {
                    const selectedCity = cities.find((c) => c.code === value);
                    if (selectedCity) {
                      setFormData((prev) => ({
                        ...prev,
                        city: selectedCity.name,
                        cityCode: selectedCity.code,
                      }));
                    }
                  }}
                  disabled={isLoading || !formData.province || isLoadingCities}
                >
                  <SelectTrigger
                    className={formErrors.city ? "border-destructive" : ""}
                  >
                    <SelectValue
                      placeholder={
                        !formData.province
                          ? "Please select province first"
                          : isLoadingCities
                            ? "Loading cities..."
                            : "Select a city/municipality"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city) => (
                      <SelectItem key={city.code} value={city.code}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            {formErrors.city && (
              <p className="text-destructive text-sm">{formErrors.city}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className={
                  formErrors.password ? "border-destructive pr-10" : "pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-2">
              <PasswordStrengthMeter
                strength={passwordStrength}
                criteria={passwordValidation}
                showCriteria={true}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Example of strong password: <b>"Bigpaws2024!"</b> (contains
                uppercase, lowercase, numbers, and special characters)
              </p>
            </div>
            {formErrors.password && (
              <p className="text-destructive text-sm">{formErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                className={
                  formErrors.confirmPassword
                    ? "border-destructive pr-10"
                    : "pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-destructive text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3 mt-8">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="grid gap-2 leading-none">
              <label
                htmlFor="agreeToTerms"
                className={`text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 
                  ${formErrors.agreeToTerms ? "text-destructive" : ""}`}
              >
                By registering, you agree to our{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDialogOpen(true);
                  }}
                  className="text-primary hover:underline font-medium"
                  type="button"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDialogOpen(true);
                  }}
                  className="text-primary hover:underline font-medium"
                  type="button"
                >
                  Privacy Policy
                </button>
              </label>
              {formErrors.agreeToTerms && (
                <p className="text-destructive text-xs">
                  {formErrors.agreeToTerms}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-8" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Account"
            )}
          </Button>
        </form>

        {/* Terms & Privacy Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Terms & Privacy Policy</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh]">
              <div className="p-4">{legalContent}</div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {/* Registration Success Dialog */}
        <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                Registration Successful!
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              <div className="p-3 mx-auto bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <p>Your account has been registered successfully!</p>
              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-left">
                <AlertDescription className="text-sm">
                  <p className="font-medium mb-1">Important:</p>
                  <p>
                    Your account needs to be verified and approved by an
                    administrator before you can access all features.
                  </p>
                  <p className="mt-2">
                    You may contact Big Paws Pet Hotel directly or visit in
                    person to expedite the approval process.
                  </p>
                </AlertDescription>
              </Alert>
              <Button
                className="w-full"
                onClick={() =>
                  router.push("/webapp/auth/pet-owner/login?registered=true")
                }
              >
                Proceed to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AuthLayout>
  );
}
