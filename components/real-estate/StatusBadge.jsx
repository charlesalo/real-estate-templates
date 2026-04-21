import { cn } from '@/lib/utils'

const STATUS_STYLES = {
  Active:  'bg-[#C9A96E] text-[#0A0A0A]',
  Pending: 'bg-[#C9A96E]/70 text-[#0A0A0A]',
  Sold:    'bg-[#C9A96E]/55 text-[#0A0A0A]',
  Closed:  'bg-[#C9A96E]/55 text-[#0A0A0A]',
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
