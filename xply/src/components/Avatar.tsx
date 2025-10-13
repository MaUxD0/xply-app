

type Props = {
  size?: number; // tamaño en px (opcional, por defecto 96 -> equivalente a w-24 h-24)
  outer?: string; // color círculo exterior
  lower?: string; // color semicírculo inferior
  inner?: string; // color círculo interior (rostro)
};

export default function Avatar({
  size = 96,
  outer = "#0E0A2A",
  lower = "#C72C8D",
  inner = "#F72585",
}: Props) {
  const radius = size / 2;
  // radio del círculo pequeño interior (aprox 0.25 del tamaño)
  const smallR = size * 0.26;

  return (
    // contenedor para centrarlo en layout (puedes ajustar clases tailwind)
    <div style={{ width: size, height: size }} className="mx-auto">
      {/* SVG garantiza que el semicírculo quede perfectamente recortado */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Avatar"
      >
        {/* Círculo exterior (fondo) */}
        <circle cx={radius} cy={radius} r={radius} fill={outer} />

        {/* Semicírculo inferior: dibujamos un arco/sector que cubre la mitad inferior */}
        {/* Usamos path para que quede exactamente dentro del círculo */}
        <path
          d={`
            M ${radius - radius} ${radius} 
            A ${radius} ${radius} 0 0 0 ${radius + radius} ${radius}
            L ${radius + radius} ${radius + radius}
            L ${radius - radius} ${radius + radius}
            Z
          `}
          fill={lower}
        />

        {/* Círculo pequeño central (rostro) */}
        <circle cx={radius} cy={radius} r={smallR} fill={inner} />
      </svg>
    </div>
  );
}
