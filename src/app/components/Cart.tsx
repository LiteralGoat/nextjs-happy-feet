import { useRouter } from 'next/navigation'
import Button from './Button'

const Cart = () => {
  const router = useRouter()
  return (
    <Button type="small" color="blue" onClick={() => router.push('/checkout')}>
      Cart
    </Button>
  )
}

export default Cart
