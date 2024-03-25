import { ComponentPropsWithoutRef } from 'react'

type ContentProps = ComponentPropsWithoutRef<'div'>

const Content = (props: ContentProps) => {
  return <div {...props} />
}

export default Content
