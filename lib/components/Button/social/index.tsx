import { forwardRef } from 'react'
import { SocialAppleWhiteIcon, SocialGoogleBrandIcon } from '@deriv/quill-icons/Social'
import { SocialFacebookBrandIcon } from '@deriv/quill-icons/Social'
import { SocialAppleBlackIcon } from '@deriv/quill-icons/Social'
import { SocialButtonProps } from '../types'
import clsx from 'clsx'
import { ButtonSize } from '../base'
import './social.scss'
import '../button.scss'

export const socialButtonIconSize = {
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 24,
    height: 24,
  },
  xl: {
    width: 32,
    height: 32,
  },
}

export const SocialButton = forwardRef<
  HTMLButtonElement,
  SocialButtonProps
>(
  (
    {
      size = 'md',
      variant = 'primary',
      social = "google",
      hideLabel = false,
      fullWidth,
      className,
      ...rest
    },
    ref,
    ) => {
        const buttonColorClass = variant === 'primary' ? `social-button__variant--${social}--primary` : `social_button__variant--secondary`;
        const socialButtonName = social.charAt(0).toUpperCase() + social.slice(1)
       
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
        {...rest}
        ref={ref}
        >
            {social === 'google' && <SocialGoogleBrandIcon {...socialButtonIconSize[size]} />}
            {social === 'facebook' && <SocialFacebookBrandIcon {...socialButtonIconSize[size]} fill="#fff"/>}
            {social === 'apple' &&
                variant === 'primary' ? <SocialAppleWhiteIcon {...socialButtonIconSize[size]} /> :
                social === 'apple' && variant === 'secondary' ? <SocialAppleBlackIcon {...socialButtonIconSize[size]} /> : null}
            {!hideLabel && <span className={clsx(`quill-button__size--${size}-font-size`,
                    `social-button__variant--${social}--${variant}-color`, 'social-button__weight--bold')} >{socialButtonName}</span>}
      </button>
    )
  },
)

SocialButton.displayName = 'SocialButton'

export default SocialButton
