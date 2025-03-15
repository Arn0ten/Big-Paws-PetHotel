"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface DialogContextType {
  openDialog: (content: React.ReactNode) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | null>(null)

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<React.ReactNode[]>([])

  const openDialog = useCallback((content: React.ReactNode) => {
    setDialogs((prev) => [...prev, content])
  }, [])

  const closeDialog = useCallback(() => {
    setDialogs((prev) => prev.slice(0, -1))
  }, [])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <DialogManager dialogs={dialogs} />
    </DialogContext.Provider>
  )
}

const DialogManager: React.FC<{ dialogs: React.ReactNode[] }> = ({ dialogs }) => {
  return (
    <AnimatePresence>
      {dialogs.length > 0 && (
        <motion.div
          key="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
        >
          <motion.div
            key="dialog-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            {dialogs[dialogs.length - 1]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

