import { screen, render } from 'test-utils'
import ActionSheet from '..'

describe('<ActionSheet.HandleBar/>', () => {
  it('should render correctly with props', () => {
    render(<ActionSheet.HandleBar aria-label="Handle Bar" />)
    const handleBarEl = screen.getByLabelText('Handle Bar')
    expect(handleBarEl).toBeInTheDocument()
  })
})
