import { ComponentPropsWithoutRef, useContext } from 'react'
import { qtJoin } from 'qtMerge'
import { ActionSheetContext } from '../root'

type HeaderProps = ComponentPropsWithoutRef<'div'>

const Header = ({ className, ...rest }: HeaderProps) => {
  const { expandable } = useContext(ActionSheetContext)
  return (
    <div
      className={qtJoin(
        'sticky left-50 bg-solid-slate-50',
        expandable ? 'top-1000' : 'top-50',
        className,
      )}
      {...rest}
    />
  )
}

export default Header
