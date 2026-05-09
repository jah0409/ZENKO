export default function Logo({ className = "h-9 w-9", glow = true, src = "/logo.png", alt = "ZENKO" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain select-none`}
      style={glow ? { filter: "drop-shadow(0 0 14px rgba(0,255,163,0.55))" } : {}}
      draggable={false}
    />
  );
}
