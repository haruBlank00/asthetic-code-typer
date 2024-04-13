import { type ClassValue, clsx } from "clsx";
import { PrismTheme, themes } from "prism-react-renderer";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TThemeKey = keyof typeof themes;
export const themesToArray = (themes: Record<TThemeKey, PrismTheme>) => {
  const themesArray: { value: TThemeKey; label: string }[] = [];

  for (const key in themes) {
    if (Object.prototype.hasOwnProperty.call(themes, key)) {
      themesArray.push({
        value: key as TThemeKey,
        label: key,
      });
    }
  }
  return themesArray;
};
