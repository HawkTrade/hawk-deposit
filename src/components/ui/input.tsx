import { FC } from "react";
import { Input as TgInput } from "@telegram-apps/telegram-ui";

import { bem } from "@/css/bem";

import "./ui.css";

const [, e] = bem("input");

export interface InputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Input: FC<InputProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => (
  <div className={e("")}>
    {label && <div className={e("label")}>{label}</div>}

    <TgInput
      className={e("field")}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: 0 }}
    />
  </div>
);
