"use client";

import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {UserPlus, Check} from "lucide-react";
import {IoAlertCircle} from "react-icons/io5";
import {FaUserEdit} from "react-icons/fa";
import {FaCircleCheck} from "react-icons/fa6";
import {MdMobileFriendly} from "react-icons/md";
import {MdAddLocationAlt} from "react-icons/md";
import {MdMarkEmailRead} from "react-icons/md";
import {FaPhone} from "react-icons/fa6";
import {FaListCheck} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {BsFillEnvelopeArrowDownFill} from "react-icons/bs";
import {BsTelephoneInboundFill} from "react-icons/bs";
import {
    useForm,
    FormProvider,
    useFormContext,
    type SubmitHandler,
} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";
import {
    mockRegistrationApi,
    type RegistrationResponse,
    type CredentialResponse,
} from "./api/registration-api";
import {IoMdArrowDropright} from "react-icons/io";

// Import the Address Step component
import {AddressStep} from "./components/address-step";
import {PetOwnerRegister} from "@/types/petOwner";
import {usePetOwnerRegistration} from "@/webapp/admin/registration/hook";


/**
 * Pet Owner Registration Form
 *
 * This component handles the registration of new pet owners in the system.
 * It collects all necessary information in a structured format ready for backend consumption.
 *
 * Backend Integration Points:
 * 1. API fetch for provinces and cities (using the registration-api service)
 * 2. Form submission in onSubmit handler - sends data to backend via registration-api
 * 3. Credential sending in handleSendCredentials - integrates with email/SMS service via registration-api
 */

// Interface for the location API response
interface Province {
    id: string;
    name: string;
}

interface City {
    id: string;
    name: string;
    provinceId: string;
}

// Main component
export default function RegistrationPage() {
    // Form steps
    const [activeStep, setActiveStep] = useState<
        "personal" | "address" | "summary"
    >("personal");
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    // Confirmation and success states
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [showCredentialOptions, setShowCredentialOptions] = useState(false);
    const [showFinalSuccess, setShowFinalSuccess] = useState(false);
    const [credentialMethod, setCredentialMethod] = useState<
        "email" | "phone" | null
    >(null);
    const [contactValue, setContactValue] = useState("");
    const [formData, setFormData] = useState<PetOwnerRegister | null>(null);

    // API data and loading states
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(false);

    // Set up form with React Hook Form
    const methods = useForm<PetOwnerRegister>({
        mode: "onChange",
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            streetAddress: "",
            stateAddress: "",
            cityAddress: "",
        },
    });

    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {errors, isDirty, isSubmitting},
    } = methods;

    const formRef = useRef<HTMLFormElement>(null);
    const watchEmail = watch("email");
    const watchContactNumber = watch("phoneNumber");

    const {toast} = useToast();

    // Handle form submission
    const onSubmit: SubmitHandler<PetOwnerRegister> = async (data) => {
        // Store the form data for potential backend submission
        setFormData(data);

        // Store contact value for credential sending
        if (data.email) {
            setContactValue(data.email);
            setCredentialMethod("email");
        } else if (data.phoneNumber) {
            setContactValue(data.phoneNumber);
            setCredentialMethod("phone");
        }

        // Show confirmation dialog
        setShowConfirmDialog(true);
    };

    const {registerPetOwner, isLoading: isRegistering} = usePetOwnerRegistration();

    // Confirm registration and submit to backend
    const handleConfirmRegistration = async (formData: PetOwnerRegister) => {
        setShowConfirmDialog(false);

        if (!formData) return;

        try {
            // Use the API service to register the pet owner
            const response = await registerPetOwner(formData);


            if (response.status === 200) {
                setShowSuccessCard(true);
                setShowCredentialOptions(true);

                toast({
                    title: "Registration Successful",
                    description: "Pet owner has been registered successfully.",
                    variant: "success",
                });
            } else {
                toast({
                    title: "Registration Failed",
                    description:
                        response.message || "Failed to register pet owner. Please try again.",
                    variant: "destructive",
                });
                setCredentialMethod(null);
            }
        } catch (error) {
            console.error("Registration failed:", error);
            toast({
                title: "Registration Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
            setCredentialMethod(null);

        }
    };


    // Reset form to register another pet owner
    const handleReset = () => {
        setShowSuccessCard(false);
        setShowCredentialOptions(false);
        setShowFinalSuccess(false);
        setCredentialMethod(null);
        setContactValue("");
        setActiveStep("personal");
        setCompletedSteps([]);
        reset();
    };

    // Handle cancellation with confirmation
    const handleCancel = () => {
        if (isDirty) {
            setShowCancelDialog(true);
        } else {
            reset();
        }
    };

    // Confirm cancellation
    const confirmCancel = () => {
        setShowCancelDialog(false);
        reset();
        setActiveStep("personal");
        setCompletedSteps([]);
    };

    // Navigate between form steps
    const navigateToStep = (step: "personal" | "address" | "summary") => {
        // Mark current step as completed if moving forward
        if (
            (activeStep === "personal" && step === "address") ||
            (activeStep === "address" && step === "summary")
        ) {
            setCompletedSteps((prev) => {
                if (!prev.includes(activeStep)) {
                    return [...prev, activeStep];
                }
                return prev;
            });
        }

        setActiveStep(step);
    };

    // Steps configuration
    const steps = [
        {
            id: "personal",
            title: "Personal",
            icon: <FaUserEdit className="h-5 w-5"/>,
            progress: 33,
        },
        {
            id: "address",
            title: "Address",
            icon: <MdAddLocationAlt className="h-5 w-5"/>,
            progress: 66,
        },
        {
            id: "summary",
            title: "Summary",
            icon: <FaListCheck className="h-5 w-5"/>,
            progress: 100,
        },
    ];

    return (
        <FormProvider {...methods}>
            <motion.div
                className="space-y-8 pb-10"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 300,
                    }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Pet Owner Registration
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Register new pet owners in the system.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!showSuccessCard ? (
                        <motion.div
                            key="registration-form"
                            initial={{y: 50, opacity: 0}}
                            animate={{
                                y: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                },
                            }}
                            exit={{
                                y: -50,
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            <Card className="border-0 shadow-lg">
                                <CardHeader className="pb-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="h-5 w-5 text-primary"/>
                                        <CardTitle>New Pet Owner Registration</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Please fill out all required fields to register a new pet
                                        owner
                                    </CardDescription>
                                </CardHeader>

                                {/* Step Navigation */}
                                <div className="px-6 py-4 border-b">
                                    <div className="flex items-center relative">
                                        {/* Progress bar background */}
                                        <div
                                            className="absolute top-1/2 left-0 w-full h-[3px] bg-muted-foreground/20 hidden sm:block z-0 -translate-y-1/2"/>

                                        {/* Animated progress bar */}
                                        <motion.div
                                            className="absolute top-1/2 left-0 h-[3px] bg-green-500 hidden sm:block z-0 -translate-y-1/2"
                                            initial={{width: "0%"}}
                                            animate={{
                                                width:
                                                    activeStep === "personal"
                                                        ? "0%"
                                                        : activeStep === "address"
                                                            ? "50%"
                                                            : "100%",
                                            }}
                                            transition={{duration: 0.5, ease: "easeInOut"}}
                                        />

                                        <div className="grid grid-cols-3 w-full">
                                            {steps.map((step, index) => (
                                                <div
                                                    key={step.id}
                                                    className="flex flex-1 items-center justify-center z-10"
                                                >
                                                    <div
                                                        className={cn(
                                                            "flex flex-col items-center text-center space-y-1",
                                                            activeStep === step.id
                                                                ? "text-green-600 dark:text-green-400"
                                                                : completedSteps.includes(step.id)
                                                                    ? "text-green-600 dark:text-green-400"
                                                                    : index <
                                                                    steps.findIndex(
                                                                        (s) => s.id === activeStep,
                                                                    )
                                                                        ? "text-green-600 dark:text-green-400"
                                                                        : "text-muted-foreground",
                                                        )}
                                                    >
                                                        <motion.div
                                                            initial={false}
                                                            animate={
                                                                activeStep === step.id
                                                                    ? {
                                                                        scale: [1, 1.15, 1],
                                                                        transition: {
                                                                            duration: 0.5,
                                                                            times: [0, 0.5, 1],
                                                                        },
                                                                    }
                                                                    : {}
                                                            }
                                                            className={cn(
                                                                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                                                                activeStep === step.id
                                                                    ? "border-green-500 bg-green-100 dark:bg-green-900/30"
                                                                    : completedSteps.includes(step.id) ||
                                                                    index <
                                                                    steps.findIndex(
                                                                        (s) => s.id === activeStep,
                                                                    )
                                                                        ? "border-green-500 bg-green-500 text-white"
                                                                        : "border-muted-foreground/30",
                                                            )}
                                                        >
                                                            {completedSteps.includes(step.id) ||
                                                            index <
                                                            steps.findIndex((s) => s.id === activeStep) ? (
                                                                <Check className="h-5 w-5"/>
                                                            ) : (
                                                                step.icon
                                                            )}
                                                        </motion.div>
                                                        <span className="text-sm font-medium hidden sm:block">
                              {step.title}
                            </span>
                                                        <span className="text-xs text-muted-foreground hidden sm:block">
                              {step.description}
                            </span>
                                                    </div>

                                                    {index < steps.length - 1 && (
                                                        <div className="w-full h-[2px] mx-2 hidden sm:block z-0"/>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="pt-6">
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSubmit(onSubmit)}
                                        id="registration-form"
                                    >
                                        <AnimatePresence mode="wait">
                                            {activeStep === "personal" && (
                                                <StepPersonalInfo
                                                    navigateToNextStep={() => navigateToStep("address")}
                                                />
                                            )}

                                            {activeStep === "address" && (
                                                <AddressStep
                                                    navigateToPreviousStep={() =>
                                                        navigateToStep("personal")
                                                    }
                                                    navigateToNextStep={() => navigateToStep("summary")}
                                                    provinces={provinces}
                                                    cities={cities}
                                                    isLoadingProvinces={isLoadingProvinces}
                                                    isLoadingCities={isLoadingCities}
                                                />
                                            )}

                                            {activeStep === "summary" && (
                                                <StepSummary
                                                    navigateToPreviousStep={() =>
                                                        navigateToStep("address")
                                                    }
                                                    handleCancel={handleCancel}
                                                    isSubmitting={isSubmitting}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <SuccessCard
                            showCredentialOptions={showCredentialOptions}
                            showFinalSuccess={showFinalSuccess}
                            credentialMethod={credentialMethod}
                            contactValue={contactValue}
                            watchEmail={watchEmail}
                            watchContactNumber={watchContactNumber}
                            handleReset={handleReset}
                        />
                    )}
                </AnimatePresence>

                {/* Confirmation Dialog */}
                <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Confirm Registration</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to register this pet owner? This action
                                cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirmDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => {

                                const currentFormData = methods.getValues();
                                console.log('=== Pet Owner Registration Form Data ===');
                                console.log({
                                    personal: {
                                        fullName: currentFormData.fullName,
                                        email: currentFormData.email,
                                        contactNumber: currentFormData.phoneNumber,
                                    },
                                    location: {
                                        streetAddress: currentFormData.streetAddress,
                                        province: currentFormData.stateAddress,
                                        city: currentFormData.cityAddress,
                                    },
                                    rawFormData: currentFormData  // Complete form data
                                });
                                handleConfirmRegistration(currentFormData);
                            }
                            }>
                                Confirm Registration
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Cancel Dialog */}
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Discard Changes</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to cancel? All entered information will be
                                lost.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
                            <Button
                                variant="outline"
                                onClick={() => setShowCancelDialog(false)}
                            >
                                Continue Editing
                            </Button>
                            <Button variant="destructive" onClick={confirmCancel}>
                                Discard Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </FormProvider>
    );
}

// Step 1: Personal Information Component
const StepPersonalInfo = ({
                              navigateToNextStep,
                          }: {
    navigateToNextStep: () => void;
}) => {
    const {
        register,
        formState: {errors},
        watch,
        trigger,
    } = useFormContext<PetOwnerRegister>();
    const watchEmail = watch("email");
    const watchContactNumber = watch("phoneNumber");

    const {toast} = useToast();

    const handleNext = async () => {
        // Validate only the personal info fields
        const isValid = await trigger(["fullName", "email", "phoneNumber"]);

        if (isValid) {
            // Add animation before navigating
            toast({
                title: "Personal information validated",
                description: "Moving to address information",
                variant: "default",
            });

            // Navigate immediately without delay
            navigateToNextStep();
        } else {
            // Show error toast
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields before proceeding",
                variant: "destructive",
            });

            // Scroll to the first error field
            const firstErrorField = Object.keys(errors)[0] as keyof PetOwnerRegister;
            const element = document.getElementById(firstErrorField);
            if (element) {
                element.scrollIntoView({behavior: "smooth", block: "center"});
                element.focus();
            }
        }
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="space-y-6"
        >
            <div className="space-y-4">
                <div>
                    <Label htmlFor="fullName" className="text-base font-medium">
                        Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="fullName"
                        placeholder="Enter pet owner's full name"
                        className={cn(
                            "mt-1.5",
                            errors.fullName &&
                            "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
                        )}
                        {...register("fullName", {
                            required: "Full name is required",
                        })}
                    />
                    {errors.fullName && (
                        <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1.5">
                            <IoAlertCircle className="h-4 w-4 mr-1"/>
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email" className="text-base font-medium">
                            Email Address{" "}
                            {!watchContactNumber && (
                                <span className="text-destructive">*</span>
                            )}
                        </Label>
                        <div className="relative">
                            <MdMarkEmailRead
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                className={cn(
                                    "pl-10 mt-1.5",
                                    errors.email &&
                                    "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
                                )}
                                {...register("email", {
                                    validate: (value) => {
                                        if (!value && !watchContactNumber) {
                                            return "Either email or contact number is required";
                                        }
                                        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
                                            return "Invalid email format";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1.5">
                                <IoAlertCircle className="h-4 w-4 mr-1"/>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="contactNumber" className="text-base font-medium">
                            Contact Number{" "}
                            {!watchEmail && <span className="text-destructive">*</span>}
                        </Label>
                        <div className="relative">
                            <FaPhone
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input
                                id="contactNumber"
                                placeholder="09XXXXXXXXX or +639XXXXXXXXX"
                                className={cn(
                                    "pl-10 mt-1.5",
                                    errors.phoneNumber &&
                                    "border-destructive dark:border-red-400 focus-visible:ring-destructive dark:focus-visible:ring-red-400",
                                )}
                                {...register("phoneNumber", {
                                    validate: (value) => {
                                        if (!value && !watchEmail) {
                                            return "Either contact number or email is required";
                                        }
                                        if (value && !/^(09|\+639)\d{9}$/.test(value)) {
                                            return "Invalid Philippine phone number";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-destructive dark:text-red-400 text-sm flex items-center mt-1.5">
                                <IoAlertCircle className="h-4 w-4 mr-1"/>
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Next Step <IoMdArrowDropright className="ml-1 h-4 w-4"/>
                </Button>
            </div>
        </motion.div>
    );
};

// Step 3: Summary Component
const StepSummary = ({
                         navigateToPreviousStep,
                         handleCancel,
                         isSubmitting,
                     }: {
    navigateToPreviousStep: () => void;
    handleCancel: () => void;
    isSubmitting: boolean;
}) => {
    const {watch} = useFormContext<PetOwnerRegister>();

    // Get all form values for summary
    const formValues = watch();

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="space-y-6"
        >
            <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                    <p className="text-sm text-green-700 dark:text-green-300 flex items-center">
                        <FaCircleCheck className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"/>
                        <span className="font-medium">
              Please review the information below before submitting.
            </span>
                    </p>
                </div>

                {/* Personal Information Summary */}
                <div className="border rounded-lg p-4 bg-muted/20">
                    <h3 className="text-lg font-medium flex items-center mb-3 text-green-700 dark:text-green-400">
                        <FaUserEdit className="h-5 w-5 mr-2"/>
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-background p-3 rounded-md border">
                            <p className="text-sm font-medium text-muted-foreground">
                                Full Name
                            </p>
                            <p className="text-base font-semibold">
                                {formValues.fullName || "—"}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-background p-3 rounded-md border">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Email Address
                                </p>
                                <p className="text-base">{formValues.email || "—"}</p>
                            </div>
                            <div className="bg-background p-3 rounded-md border">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Contact Number
                                </p>
                                <p className="text-base">{formValues.phoneNumber || "—"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Information Summary */}
                <div className="border rounded-lg p-4 bg-muted/20">
                    <h3 className="text-lg font-medium flex items-center mb-3 text-green-700 dark:text-green-400">
                        <MdAddLocationAlt className="h-5 w-5 mr-2"/>
                        Address Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-background p-3 rounded-md border">
                            <p className="text-sm font-medium text-muted-foreground">
                                Street Address
                            </p>
                            <p className="text-base">{formValues.streetAddress || "—"}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-background p-3 rounded-md border">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Province
                                </p>
                                <p className="text-base">{formValues.stateAddress || "—"}</p>
                            </div>
                            <div className="bg-background p-3 rounded-md border">
                                <p className="text-sm font-medium text-muted-foreground">
                                    City/Municipality
                                </p>
                                <p className="text-base">{formValues.cityAddress || "—"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={navigateToPreviousStep}
                >
                    Back
                </Button>
                <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="registration-form"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{rotate: 360}}
                                    transition={{
                                        duration: 1,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "linear",
                                    }}
                                    className="mr-2"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="animate-spin"
                                    >
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeDasharray="60 30"
                                        />
                                    </svg>
                                </motion.div>
                                Processing...
                            </>
                        ) : (
                            <>Register Pet Owner</>
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

// Success Card Component
const SuccessCard = ({
                         showCredentialOptions,
                         showFinalSuccess,
                         credentialMethod,
                         contactValue,
                         watchEmail,
                         watchContactNumber,
                         handleReset,
                     }: {
    showCredentialOptions: boolean;
    showFinalSuccess: boolean;
    credentialMethod: "email" | "phone" | null;
    contactValue: string;
    watchEmail: string;
    watchContactNumber: string;
    handleReset: () => void;
}) => {
    return (
        <motion.div
            key="success-card"
            initial={{scale: 0.8, opacity: 0}}
            animate={{
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                },
            }}
            exit={{
                scale: 0.8,
                opacity: 0,
                transition: {
                    duration: 0.3,
                },
            }}
            className="flex justify-center"
        >
            <Card className="w-full max-w-md border-0 shadow-lg">
                <CardHeader
                    className="text-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 dark:from-green-950/30 dark:via-green-900/20 dark:to-green-950/30 rounded-t-lg">
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="mx-auto bg-green-100 dark:bg-green-900 rounded-full p-3 mb-4"
                    >
                        <FaCircleCheck className="h-8 w-8 text-green-600 dark:text-green-300"/>
                    </motion.div>
                    <CardTitle className="text-xl text-green-700 dark:text-green-400">
                        Registration Successful!
                    </CardTitle>
                    <CardDescription className="text-green-600 dark:text-green-300">
                        The pet owner has been successfully registered in the system.
                    </CardDescription>
                </CardHeader>


                <div className="text-center space-y-4">
                    <motion.div
                        className="flex justify-center"
                        initial={{y: 10}}
                        animate={{y: [0, -10, 0]}}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    >
                        {credentialMethod === "email" ? (
                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
                                <MdMarkEmailRead className="h-12 w-12 text-green-600 dark:text-green-400"/>
                            </div>
                        ) : (
                            <motion.div
                                className="bg-green-100 dark:bg-green-900/30 rounded-full p-4"
                                animate={{
                                    rotate: [-5, 5, -5],
                                }}
                                transition={{
                                    duration: 0.3,
                                    repeat: 5,
                                    repeatType: "loop",
                                }}
                            >
                                <MdMobileFriendly className="h-12 w-12 text-green-600 dark:text-green-400"/>
                            </motion.div>
                        )}
                    </motion.div>
                    <p className="mt-4 text-muted-foreground">
                        Temporary login credentials have been sent to:
                    </p>
                    <p className="font-medium text-lg">
                        {credentialMethod === "email" ? (
                            <span className="flex items-center justify-center">
                    <MdMarkEmailRead className="h-4 w-4 mr-2 text-green-600 dark:text-green-400"/>{" "}
                                {contactValue}
                  </span>
                        ) : (
                            <span className="flex items-center justify-center">
                    <FaPhone className="h-4 w-4 mr-2 text-green-600 dark:text-green-400"/>{" "}
                                {contactValue}
                  </span>
                        )}
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg mt-4 text-sm text-muted-foreground">
                        <p>
                            <span className="font-medium text-foreground">Note:</span> The
                            pet owner will be prompted to change their password on first
                            login.
                        </p>
                        <p className="mt-2">
                            The temporary credentials will expire in 24 hours if not used.
                        </p>
                    </div>
                </div>
                <CardFooter className="flex justify-center pb-6">
                    <Button
                        onClick={handleReset}
                        className="bg-green-600 hover:bg-green-700 text-white relative overflow-hidden group"
                    >
                        <span className="relative z-10">Register Another Pet Owner</span>
                        <span
                            className="absolute inset-0 bg-green-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
