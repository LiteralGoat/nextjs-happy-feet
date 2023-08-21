import { Archivo_Black } from 'next/font/google'
 
const archivo_black = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
})

interface ButtonProps {
  type: 'small' | 'medium' | 'large',
  color: 'blue' | 'yellow'
  stretch?: boolean,
  children: any //TODO: type better
  onClick?: () => void
}

const Button = ({ type, color, stretch, children, onClick }: ButtonProps) => {
  return (
    <button 
      className={`${type}-button ${color}-button button ${archivo_black.className} ${stretch ? 'stretch-button' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
