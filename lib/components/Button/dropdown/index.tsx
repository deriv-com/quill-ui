import { forwardRef } from 'react'
import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ButtonProps } from '../types'
import clsx from 'clsx'
import { Button } from '../base'
import './dropdown.scss'
import { Typography } from "../../Typography/base";

export type TSingleSelectItem = {
    value: number | string
    label: string | React.ReactNode
  }
  
  export interface SingleSelectChipProps extends ButtonProps {
    options: TSingleSelectItem[]
    defaultOption: TSingleSelectItem
    onSelectionChange: (item: TSingleSelectItem) => void
  }

  
const Options = ({ item }: { item: TSingleSelectItem }) => {
  return (
    <Listbox.Option value={item}>
      {({  selected }) => (
        <li
          className={clsx(

              'dropdown-menu__item',
              selected && `dropdown-menu__item--selected`,
          )}
        >
        <Typography> {item.label}</Typography> 
        </li>
      )}
    </Listbox.Option>
  )
}

export const DropdownButton = forwardRef<
  HTMLButtonElement,
  SingleSelectChipProps
>(
  (
    {
      defaultOption,
      size,
      icon,
      label,
      color,
      disabled,
      options,
      onSelectionChange,
      ...rest
    },
    ref,
  ) => {
    const [selectedItem, setSelectedItem] =
      useState<TSingleSelectItem>(defaultOption)

    const handleItemSelect = (item: TSingleSelectItem) => {
      setSelectedItem(item)
      onSelectionChange?.(item)
    }
        console.log('selectedItem',selectedItem)

    return (
      <div className="flex flex-col">
        <Listbox value={selectedItem} onChange={handleItemSelect}>
          {({ open }) => (
            <>
              <Listbox.Button as="div">
                <Button
                  {...rest}
                  icon={icon}
                  size={size}
                  color={color}
                  label={label}
                  ref={ref}
                  dropdown
                  selected={selectedItem.value !== defaultOption.value}
                  isDropdownOpen={open}
                  disabled={disabled}
                >
                  <Typography as="span" color={`${color}`}>{selectedItem?.label}</Typography>
                </Button>
              </Listbox.Button>
              <Transition
                enter={clsx('dropdown-menu__transition--enter')}
                enterFrom={clsx('dropdown-menu__transition--enter-from')}
                enterTo={clsx('dropdown-menu__transition--enter-to')}
                leave={clsx('dropdown-menu__transition--leave')}
                leaveFrom={clsx('dropdown-menu__transition--leave-from')}
                leaveTo={clsx('dropdown-menu__transition--leave-to')}
              >
                <Listbox.Options
                 className={clsx('dropdown-menu__container')}
                >
                  <Options item={defaultOption} />
                  {options.map((item) => (
                    <Options
                      item={item}
                          key={item.value}
                          
                    />
                  ))}
                            </Listbox.Options>
                            </Transition>
           
            </>
          )}
        </Listbox>
      </div>
    )
  },
)

DropdownButton.displayName = 'DropdownButton'

export default DropdownButton
