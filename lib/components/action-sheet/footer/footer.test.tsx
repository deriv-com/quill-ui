import { screen, render } from 'test-utils'
import ActionSheet from '..'
import userEvent from '@testing-library/user-event'
import { FooterAlignment } from '../types'

describe('<ActionSheet.Footer/>', () => {
  it('should not render footer if no action passed', () => {
    render(<ActionSheet.Footer aria-label="Footer" />)
    const footerEl = screen.queryByLabelText('Footer')
    expect(footerEl).not.toBeInTheDocument()
  })
  it('should render correctly with className', () => {
    const onActionButton = jest.fn()
    render(
      <ActionSheet.Footer
        className="px-50"
        aria-label="Footer"
        primaryAction={{ content: 'Primary action', onAction: onActionButton }}
      />,
    )
    const footerEl = screen.getByLabelText('Footer')
    expect(footerEl).toHaveClass('px-50')
  })
  it('should render with primaryAction correctly', async () => {
    const onActionButton = jest.fn()
    render(
      <ActionSheet.Footer
        primaryAction={{ content: 'Primary action', onAction: onActionButton }}
      />,
    )
    const primaryBtn = screen.getByRole('button', { name: 'Primary action' })
    expect(primaryBtn).toBeInTheDocument()
    await userEvent.click(primaryBtn)
    expect(onActionButton).toHaveBeenCalled()
  })
  it('should render secondaryAction correctly', async () => {
    const onSecondaryAction = jest.fn()
    render(
      <ActionSheet.Footer
        secondaryAction={{
          content: 'Secondary action',
          onAction: onSecondaryAction,
        }}
      />,
    )
    const secondaryBtn = screen.getByRole('button', {
      name: 'Secondary action',
    })
    expect(secondaryBtn).toBeInTheDocument()
    await userEvent.click(secondaryBtn)
    expect(onSecondaryAction).toHaveBeenCalled()
  })
  const alignments: FooterAlignment[] = ['vertical', 'horizontal']

  alignments.forEach((alignment) => {
    it(`should render correctly with ${alignment}`, () => {
      render(
        <ActionSheet.Footer
          alignment={alignment}
          aria-label={`${alignment} footer`}
          primaryAction={{ content: 'action', onAction: () => null }}
        />,
      )
      const footer = screen.getByLabelText(`${alignment} footer`)
      expect(footer).toMatchSnapshot()
    })
  })
})
