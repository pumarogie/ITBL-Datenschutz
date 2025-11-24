"use client";

import { MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";

export type ButtonStyle = "default" | "green" | "red" | "neutral" | "secondary";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
  style?: ButtonStyle;
  disabled?: boolean | undefined;
  type?: "submit" | "button" | undefined;
} & PropsWithChildren;

export const Button = ({
  children,
  onClick,
  className,
  style,
  disabled,
  type,
}: ButtonProps) => {
  const buttonBase =
    "inline-flex justify-center items-center align-center px-6 py-3 font-medium rounded-2xl transition-colors";
  let buttonStyle = "bg-orange-500 text-white";
  let buttonHoverStyle = "hover:bg-orange-600";
  if (style === "green") {
    buttonStyle = "bg-lime-500 text-white";
    buttonHoverStyle = "hover:bg-lime-600";
  } else if (style === "red") {
    buttonStyle = "bg-red-500 text-white";
    buttonHoverStyle = "hover:bg-red-600";
  } else if (style === "secondary") {
    buttonStyle = "text-[#004F86] bg-transparent border-2 border-sky-100";
    buttonHoverStyle = "hover:bg-sky-100";
  } else if (style === "neutral") {
    buttonStyle = "bg-gray-500 text-white";
    buttonHoverStyle = "hover:bg-gray-600";
  }
  const buttonDisabledStyle = "opacity-50 " + buttonStyle;

  const mergedStyle = clsx(
    buttonBase,
    disabled ? buttonDisabledStyle : buttonStyle,
    className,
    onClick ? "cursor-pointer" : "cursor-default",
    onClick && !disabled && buttonHoverStyle,
  );
  return (
    <button
      className={mergedStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
