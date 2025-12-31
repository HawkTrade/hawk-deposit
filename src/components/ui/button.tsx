import { FC, ReactNode, Ref } from "react";
import { Button as TgButton } from "@telegram-apps/telegram-ui";

import { bem } from "@/css/bem";

import "./ui.css";
import { cn } from "@/lib/utils";

const [, e] = bem("button");

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  mode?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  mode = "primary",
  disabled,
}) => (
  <TgButton className={e(mode)} onClick={onClick} disabled={disabled}>
    {children}
  </TgButton>
);

const Spinner: React.FC = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid"
    xmlns="http://www.w3.org/2000/svg"
    style={{ mixBlendMode: "difference" }}
  >
    <circle
      cx="10"
      cy="10"
      r="7"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="11 33"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 10 10"
        to="360 10 10"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  children: React.ReactNode;
  prefixIcon?: React.ReactNode | React.ReactElement;
  suffixIcon?: React.ReactNode | React.ReactElement;
  loading?: boolean;
}

export const PNButton = ({
  suffixIcon,
  prefixIcon,
  children,
  ref,
  loading,
  ...props
}: IButtonProps) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-medium text-[17px] transition-all active:scale-[0.98] shadow-lg shadow-zinc-900/20",
        loading && "cursor-not-allowed opacity-50",
        props.className
      )}
    >
      {prefixIcon && <span>{prefixIcon}</span>}
      <span className="flex gap-1">
        {children}
        {loading && <Spinner />}
      </span>
      {suffixIcon && <span>{suffixIcon}</span>}
    </button>
  );
};
