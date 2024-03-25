import { screen, render } from 'test-utils'
import ActionSheet from '..'

describe('<ActionSheet.Content/>', () => {
  it('should render correctly with className and children', () => {
    render(<ActionSheet.Content className="px-50">Content</ActionSheet.Content>)
    const contentEl = screen.getByText('Content')
    expect(contentEl).toBeInTheDocument()
    expect(contentEl).toHaveClass('px-50')
  })
})
