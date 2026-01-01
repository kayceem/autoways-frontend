// Vike-compatible Link component
// Can be used as a drop-in replacement for react-router-dom's Link

export function Link({ to, href, children, className, ...props }) {
  const targetHref = to || href;

  return (
    <a href={targetHref} className={className} {...props}>
      {children}
    </a>
  );
}

export default Link;
