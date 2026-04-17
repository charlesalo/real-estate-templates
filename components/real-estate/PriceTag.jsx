import { cn } from '@/lib/utils'

const SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-lg font-medium',
  lg: 'text-2xl font-semibold',
}

export function formatPrice(price) {
  if (!price) return 'Price Upon Request'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PriceTag({ price, size = 'md', className }) {
  return (
    <span className={cn('font-heading tabular-nums', SIZE_CLASSES[size], className)}>
      {formatPrice(price)}
    </span>
  )
}
