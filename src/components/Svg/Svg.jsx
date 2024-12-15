const Icon = ({ name, size = 14, color = "currentColor", className = "" }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    className={className}
  >
    <use href={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
