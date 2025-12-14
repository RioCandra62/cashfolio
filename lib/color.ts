export function colorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.floor(Math.random() * 360);
  const saturation = 70; // 70% sesuai style tailwind
  const lightness = 60; // sedikit soft
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
