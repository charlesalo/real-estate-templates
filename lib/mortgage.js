/**
 * Shared mortgage math.
 *
 * The three templates each render their own calculator UI — different
 * layouts, colours, defaults and extra cost lines. Only the amortization
 * is common, so only the amortization lives here.
 */

/**
 * Standard fixed-rate amortization:
 *
 *     P · r · (1 + r)^n
 *     ─────────────────
 *      (1 + r)^n − 1
 *
 * where r is the monthly rate and n the number of payments.
 *
 * @param {object}  args
 * @param {number}  args.principal   Loan amount (price minus down payment).
 * @param {number}  args.annualRate  Annual interest rate as a percentage, e.g. 7.25.
 * @param {number}  args.termYears   Loan term in years.
 * @returns {number} Monthly principal & interest, or 0 when the inputs
 *                   cannot produce a meaningful payment.
 */
export function monthlyPayment({ principal, annualRate, termYears }) {
  if (!Number.isFinite(principal) || principal <= 0) return 0
  if (!Number.isFinite(termYears) || termYears <= 0) return 0
  if (!Number.isFinite(annualRate) || annualRate < 0) return 0

  const n = termYears * 12

  // An interest-free loan is just the principal spread across the term.
  // Without this the formula divides by zero.
  if (annualRate === 0) return principal / n

  const r = annualRate / 100 / 12
  const growth = Math.pow(1 + r, n)
  const payment = (principal * r * growth) / (growth - 1)

  return Number.isFinite(payment) ? payment : 0
}

/**
 * Loan amount remaining after the down payment.
 *
 * @param {number} price    Purchase price.
 * @param {number} downPct  Down payment as a percentage of price.
 * @returns {number} Principal to be financed.
 */
export function principalFromDownPct(price, downPct) {
  if (!Number.isFinite(price) || !Number.isFinite(downPct)) return 0
  return price * (1 - downPct / 100)
}
