"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ExpandableScreenContextType {
  isExpanded: boolean;
  expand: () => void;
  collapse: () => void;
  layoutId: string;
  triggerRadius: string;
  contentRadius: string;
  animationDuration: number;
}

const ExpandableScreenContext = createContext<ExpandableScreenContextType | undefined>(undefined);

export function useExpandableScreen() {
  const context = useContext(ExpandableScreenContext);
  if (!context) {
    throw new Error("useExpandableScreen must be used within an ExpandableScreen");
  }
  return context;
}

interface ExpandableScreenProps {
  children: ReactNode;
  layoutId?: string;
  triggerRadius?: string;
  contentRadius?: string;
  animationDuration?: number;
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  lockScroll?: boolean;
}

export function ExpandableScreen({
  children,
  layoutId = "expandable-card",
  triggerRadius = "100px",
  contentRadius = "24px",
  animationDuration = 0.3,
  defaultExpanded = false,
  onExpandChange,
  lockScroll = true,
}: ExpandableScreenProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const expand = useCallback(() => {
    setIsExpanded(true);
    onExpandChange?.(true);
  }, [onExpandChange]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    onExpandChange?.(false);
  }, [onExpandChange]);

  // Lock scroll when expanded
  useEffect(() => {
    if (lockScroll && isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded, lockScroll]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        collapse();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isExpanded, collapse]);

  return (
    <ExpandableScreenContext.Provider
      value={{
        isExpanded,
        expand,
        collapse,
        layoutId,
        triggerRadius,
        contentRadius,
        animationDuration,
      }}
    >
      {children}
    </ExpandableScreenContext.Provider>
  );
}

interface ExpandableScreenTriggerProps {
  children: ReactNode;
  className?: string;
}

export function ExpandableScreenTrigger({
  children,
  className = "",
}: ExpandableScreenTriggerProps) {
  const { isExpanded, expand, layoutId, triggerRadius, animationDuration } =
    useExpandableScreen();

  return (
    <AnimatePresence>
      {!isExpanded && (
        <motion.div
          layoutId={layoutId}
          onClick={expand}
          className={`cursor-pointer ${className}`}
          style={{ borderRadius: triggerRadius }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ExpandableScreenContentProps {
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

export function ExpandableScreenContent({
  children,
  className = "",
  showCloseButton = true,
  closeButtonClassName = "",
}: ExpandableScreenContentProps) {
  const { isExpanded, collapse, layoutId, contentRadius, animationDuration } =
    useExpandableScreen();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={collapse}
          />

          {/* Content */}
          <motion.div
            layoutId={layoutId}
            className={`fixed inset-0 z-[9999] overflow-auto transform-gpu will-change-transform ${className}`}
            style={{ borderRadius: contentRadius }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
          >
            {children}
          </motion.div>

          {/* Close Button - Rendered last for highest stacking */}
          {showCloseButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: animationDuration, delay: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                collapse();
              }}
              className={`fixed top-6 right-6 z-[10000] p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg ${closeButtonClassName}`}
              aria-label="Close"
              type="button"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          )}
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface ExpandableScreenBackgroundProps {
  trigger?: ReactNode;
  content?: ReactNode;
  className?: string;
}

export function ExpandableScreenBackground({
  trigger,
  content,
  className = "",
}: ExpandableScreenBackgroundProps) {
  const { isExpanded } = useExpandableScreen();

  return (
    <div className={className}>
      {isExpanded ? content : trigger}
    </div>
  );
}
