// Shared decorative backdrop for blog pages: a faint grid plus a top glow.
export function BlogBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(24,63,36,0.05)_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(28,78,44,0.08),transparent)]" />
    </>
  );
}
