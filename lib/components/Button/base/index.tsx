
  import { forwardRef } from 'react'
  import clsx from "clsx";
  import "../button.scss";
  import "../../../styles/quill.css";
  import { Typography } from "../../Typography/base";
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
        isFullWidth = false,
        isLoading = false,
        size = "md",
        label,
        iconPosition,
        variant = "primary",
        onItemSelect,
        ...rest
      },
      ref,
      ) => {
        const buttonColorClass = `quill__color--${variant}-${color}`;
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (dropdown) return
        if (selected === undefined) {
          const target = event.currentTarget
          const isSelected = target.getAttribute('data-state') === 'selected'
          const selected_state = isSelected ? '' : 'selected'
          target.setAttribute('data-state', selected_state)
          onItemSelect?.(event, !isSelected)
        } else {
          onItemSelect?.(event, selected)
        }
      }
  
      return (
        <button
        className={clsx(
            "quill-button",
            "quill-button__size",
            ButtonSize[size],
            buttonColorClass,

            {
                "quill-button__full-width": isFullWidth,
            },
            className,
            {...rest}
        )}
          data-state={selected ? 'selected' : ''}
          ref={ref}
          onClick={handleClick}
        >
          {iconPosition == "start" && Icon && !isLoading && <Icon iconSize={size} />}
              { /* To be Added isLoading based on requirement*/}
           
                  <div  >{children}</div>
        
                {label && (
                    <Typography as="span" color={`${color}`}>{label}</Typography>
                )}
                {iconPosition == "end" && Icon && !isLoading && <Icon iconSize={size}/>}
          {dropdown && (
            <>
                <StandaloneChevronDownRegularIcon
                          iconSize={size}
                          data-state={isDropdownOpen ? "open" : "close"}
                          className={clsx(isDropdownOpen && "quill-button__transform")}
                    />
            </>
          )}
        </button>
      )
    },
  )
  
  Button.displayName = 'Button'
  
  export default Button
  