import { screen, render } from 'test-utils'
import userEvent from '@testing-library/user-event'
import Close from '.'

describe('<ActionSheet.Close/>', () => {
  it('should render correctly with children', () => {
    render(<Close>close</Close>)
    const close = screen.getByText('close')
    expect(close).toBeInTheDocument()
  })
  it('should call `handleToggle` method on click', async () => {
    const handleClickMock = jest.fn()
    render(<Close onClick={handleClickMock}>close</Close>)
    const close = screen.getByText('close')
    await userEvent.click(close)
    expect(handleClickMock).toHaveBeenCalled()
  })
})
