
  import { forwardRef } from 'react'
  import clsx from "clsx";
  import "../button.scss";
  import "../../../styles/quill.css";
  import {LabelPairedChevronDownLgRegularIcon, LabelPairedChevronDownMdRegularIcon, LabelPairedChevronDownSmRegularIcon, LabelPairedChevronDownXlRegularIcon } from "@deriv/quill-icons";
  import { ButtonProps } from "../types";
  
export  const ButtonSize = {
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
        colorStyle = "coral",
        icon: Icon,
        children,
        isDropdownOpen,
        dropdown = false,
        selected,
        fullWidth = false,
        isLoading = false,
        size = "md",
        label,
        iconPosition,
        variant = "primary",
        ...rest
      },
      ref,
      ) => {
        const buttonColorClass = `quill__color--${variant}-${colorStyle}`;
    
  
      return (
        <button
        className={clsx(
            "quill-button",
            "quill-button__size",
             ButtonSize[size],
            buttonColorClass,
            className,
            fullWidth && "quill-button__full-width",
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
                    <span className={clsx(`quill-button__size--${size}-font-size`,
                    `quill__color--${variant}-${colorStyle}-color`)}>{label}</span>
                )}
                {iconPosition === "end" && Icon && !isLoading && <Icon iconSize={size}/>}
        {dropdown && (
            <>
              {size === "sm" && <LabelPairedChevronDownSmRegularIcon data-state={isDropdownOpen ? "open" : "close"}
                                        className={clsx(`${isDropdownOpen && "quill-button__transform"}`)}/>}
              {size === "md" && <LabelPairedChevronDownMdRegularIcon data-state={isDropdownOpen ? "open" : "close"}
                                        className={clsx(`${isDropdownOpen && "quill-button__transform"}`)}/>}
              {size === "lg" && <LabelPairedChevronDownLgRegularIcon data-state={isDropdownOpen ? "open" : "close"}
                                        className={clsx(`${isDropdownOpen && "quill-button__transform"}`)}/>}
              {size === "xl" && <LabelPairedChevronDownXlRegularIcon data-state={isDropdownOpen ? "open" : "close"}
                                        className={clsx(`${isDropdownOpen && "quill-button__transform"}`)}/>}
            
              
            </>
        )}
        </button>
      )
    },
  )
  
  Button.displayName = 'Button'
  
  export default Button
  