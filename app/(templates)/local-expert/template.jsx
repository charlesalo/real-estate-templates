/**
 * Local Expert "ink settle" page transition.
 *
 * A template (not a layout) remounts with a fresh key on every navigation, so
 * the wrapper below is a brand-new DOM node each time — which replays the CSS
 * enter animation. The incoming page fades up from a soft blur into focus, like
 * print settling onto paper. See page-transition.css.
 *
 * This is an enter-only effect (no outgoing snapshot), so it works identically
 * on a short page or a very tall one — unlike a full-page 3D transform.
 */
export default function LocalExpertTemplate({ children }) {
  return <div className="le-page-enter">{children}</div>
}
