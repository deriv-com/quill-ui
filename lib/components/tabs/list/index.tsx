import { ComponentProps } from 'react'
import clsx from 'clsx'
import './list.scss'

type TabListProps = ComponentProps<'div'>

export const TabList = ({ children, className }: TabListProps) => {
  return (
    <div className={clsx('tab-list--container', className)}>
      <div
        className="tab-list--item"
        role="tablist"
        aria-orientation="horizontal"
      >
        {children}
      </div>
    </div>
  )
}
