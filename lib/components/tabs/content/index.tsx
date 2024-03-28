import { Children, ComponentProps, useContext } from 'react'
import { TabContext } from '../container'

type ContentProps = ComponentProps<'div'>

export const TabContent = ({ children, className }: ContentProps) => {
  const { activeTab } = useContext(TabContext)
  const childArr = Children.toArray(children)
  const activeChild = childArr.find((_el, i) => i === activeTab)
  return <div className={className}>{activeChild}</div>
}

TabContent.displayName = 'TabContent'
