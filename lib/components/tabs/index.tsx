import { ReactNode } from 'react'
import { TabContainer } from './container'
import { TabList } from './list'
import { TabTrigger } from './trigger'
import { TabContent } from './content'
import { TabPanel } from './panel'

type TabType = {
  Container: typeof TabContainer
  List: typeof TabList
  Trigger: typeof TabTrigger
  Content: typeof TabContent
  Panel: typeof TabPanel
}

export const Tab: TabType = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

Tab.Container = TabContainer
Tab.List = TabList
Tab.Trigger = TabTrigger
Tab.Content = TabContent
Tab.Panel = TabPanel

export default Tab
