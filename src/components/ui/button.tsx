import { FC, ReactNode } from "react";
import { Button as TgButton } from "@telegram-apps/telegram-ui";

import { bem } from "@/css/bem";

import "./ui.css";

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
