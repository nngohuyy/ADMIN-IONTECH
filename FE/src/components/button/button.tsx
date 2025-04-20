import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "bordered" | "text";
  startContent?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  size = "md",
  radius = "full",
  color = "default",
  variant = "solid",
  startContent,
  className = "",
  type = "button",
  isFullWidth = false,
  isIconOnly = false,
  isDisabled = false,
  onClick,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 h-8 text-sm",
    md: "px-4 h-10 text-smid",
    lg: "px-6 h-12 text-base",
  };

  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const colorClasses = {
    default: "bg-gray-500 hover:bg-gray-600 text-white",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const variantClasses = {
    solid: colorClasses[color],
    bordered: `border border-${color}-500 text-${color}-500 hover:bg-${color}-800 hover:text-blue-500`,
    text: "bg-transparent text-blue-500 hover:bg-blue-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex flex-row items-center gap-2
        ${className}
        ${sizeClasses[size]}
        ${radiusClasses[radius]}
        ${variantClasses[variant]}
        ${isFullWidth ? "w-full" : ""}
        ${isIconOnly ? "p-1" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      type={type}
    >
      {startContent}
      {children}
    </button>
  );
}

