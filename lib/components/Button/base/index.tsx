
  import { forwardRef } from 'react'
  import clsx from "clsx";
  import "../button.scss";
  import "../../../styles/quill.css";
  import { Text } from "../../Typography/text";
  import {StandaloneChevronDownRegularIcon } from "@deriv/quill-icons";
  import { ButtonProps } from "../types";
  
  const ButtonSize = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;
export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
  >(
    (
      {
        className,
        color = "coral",
        icon: Icon,
        children,
        isDropdownOpen,
        dropdown = false,
        selected,
        isLoading = false,
        size = "md",
        label,
        iconPosition,
        variant = "primary",
        ...rest
      },
      ref,
      ) => {
        const buttonColorClass = `quill__color--${variant}-${color}`;
    
  
      return (
        <button
        className={clsx(
            "quill-button",
            "quill-button__size",
             ButtonSize[size],
            buttonColorClass,
            className,
            {...rest}
              )}
  
          disabled={rest.disabled}
          data-state={selected ? 'selected' : ''}
          ref={ref}
         
        >
          {iconPosition === "start" && Icon && !isLoading && <Icon iconSize={size} />}
              { /* To be Added isLoading based on requirement*/}
           
                {children && <div>{children}</div>}  
        
                {label && (
                    <Text as="span" color={`${color}`}>{label}</Text>
                )}
                {iconPosition === "end" && Icon && !isLoading && <Icon iconSize={size}/>}
        {dropdown && (
            <>
                    <StandaloneChevronDownRegularIcon
                                        iconSize={size}
                                        data-state={isDropdownOpen ? "open" : "close"}
                                        className={`${isDropdownOpen && "quill-button__transform"}`}
                            />
            </>
        )}
        </button>
      )
    },
  )
  
  Button.displayName = 'Button'
  
  export default Button
  