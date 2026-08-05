// Search engines display roughly 50–60 characters of a title and 120–155 of a
// description. Generated pages interpolate content of wildly different lengths
// ("SoHo" vs "Brooklyn Heights"), so a single fixed format inevitably runs short
// on some pages and long on others.
//
// Pass candidates richest-first; the first one that fits the limit wins, which
// keeps every generated page as close to the top of the range as its content
// allows. The last candidate is the fallback when nothing fits.
export function fitWithin(candidates, max) {
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1]
}
