import './button.styles.scss'

const buttonTypeClasses = {
  google: 'google-sign-in',
  inverted: 'inverted',
}

const Button = ({ children, buttonType, ...additionalProps }) => {
  return (
    <button
      className={`button-container ${buttonTypeClasses[buttonType]}`}
      {...additionalProps}
    >
      {children}
    </button>
  )
}

export default Button
