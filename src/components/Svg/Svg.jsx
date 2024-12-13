const Icon = ({ name, size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} fill={color} aria-hidden="true">
    <use href={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
