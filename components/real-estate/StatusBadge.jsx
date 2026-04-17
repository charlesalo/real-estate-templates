import { cn } from '@/lib/utils'

const STATUS_STYLES = {
  Active: 'bg-emerald-500/90 text-white',
  Pending: 'bg-amber-500/90 text-white',
  Sold: 'bg-rose-600/90 text-white',
}

export default function StatusBadge({ status = 'Active' }) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-semibold backdrop-blur-sm',
        STATUS_STYLES[status] ?? STATUS_STYLES.Active,
      )}
    >
      {status}
    </span>
  )
}
