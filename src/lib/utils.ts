import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { retrieveLaunchParams } from "@tma.js/sdk-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserAgent() {
  const { tgWebAppPlatform } = retrieveLaunchParams();

  console.log("Platform:", tgWebAppPlatform);
  return tgWebAppPlatform;
}
