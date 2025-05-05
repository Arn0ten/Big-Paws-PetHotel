"use client";
import { motion } from "framer-motion";
import { PendingRegistrationTable } from "./components/peding-registration-table";
import { pendingRegistrations } from "../data/pending-registration-sample-data";

export default function PendingRegistrationPage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pending Registrations
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage pending pet owner registrations.
        </p>
      </div>

      {/* Pending Registration Table */}
      <PendingRegistrationTable registrations={pendingRegistrations} />
    </motion.div>
  );
}
