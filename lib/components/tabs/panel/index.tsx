import { ComponentProps, useContext } from 'react'
import { TabContext } from '../container'

type PaneProps = ComponentProps<'div'>

export const TabPanel = ({ children, className }: PaneProps) => {
  const { activeTab, id } = useContext(TabContext)

  return (
    <div
      role="tabpanel"
      id={`${id}-panel`}
      aria-labelledby={`${id}-trigger-${activeTab}`}
      className={className}
    >
      {children}
    </div>
  )
}

TabPanel.displayName = 'TabPanel'
