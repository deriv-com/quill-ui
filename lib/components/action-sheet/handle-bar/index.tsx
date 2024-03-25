import { ComponentProps } from 'react'

type BarProps = ComponentProps<'div'>

const HandleBar = (props: BarProps) => {
  return (
    <div
      className="sticky left-50 top-50 flex touch-none items-center justify-center bg-solid-slate-50 py-400 lg:hidden"
      data-testid="dt-actionsheet-handle-bar"
      {...props}
    >
      <span className="inline-block h-200 w-2400 rounded-100 bg-solid-slate-200" />
    </div>
  )
}

export default HandleBar
