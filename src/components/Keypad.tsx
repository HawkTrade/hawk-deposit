import React from "react";
import { Delete } from "@/components/icons/LucideReact";
import { motion } from "motion/react";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  disabled: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  onDelete,
  disabled,
}) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  return (
    <div className="grid grid-cols-3 gap-y-3 gap-x-8 px-6 pb-2">
      {keys.map((key) => (
        <KeyButton
          key={key}
          onClick={() => onKeyPress(key)}
          label={key}
          disabled={disabled}
        />
      ))}
      <div className="flex items-center justify-center">
        <button
          onClick={onDelete}
          className="flex h-14 w-full items-center justify-center rounded-full text-zinc-400 active:bg-zinc-900 transition-colors"
          aria-label="Delete"
          disabled={disabled}
        >
          <Delete className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const KeyButton = ({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled: boolean;
}) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="flex h-14 w-full items-center justify-center rounded-full text-2xl font-normal text-white hover:bg-zinc-900/50 transition-colors"
    disabled={disabled}
  >
    {label}
  </motion.button>
);
