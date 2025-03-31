import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className = "",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  let typeClass = "";
  switch (type) {
    case "default":
      typeClass = "text-base leading-6";
      break;
    case "defaultSemiBold":
      typeClass = "text-base leading-6 font-semibold";
      break;
    case "title":
      typeClass = "text-3xl font-bold leading-8";
      break;
    case "subtitle":
      typeClass = "text-xl font-bold";
      break;
    case "link":
      typeClass = "leading-[30px] text-base";
      break;
  }

  return (
    <Text
      className={`${typeClass} ${className}`}
      style={[{ color: type === "link" ? "#333333" : color }, style]}
      {...rest}
    />
  );
}
