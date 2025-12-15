// generate n distinct HSL colors
export function generatePastelColors(n: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.floor(Math.random() * 360); // random hue
    const saturation = 40 + Math.floor(Math.random() * 20); // 40-60%
    const lightness = 80 + Math.floor(Math.random() * 10); // 80-90%
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}


// optional: generate color from string (legacy)
export function colorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 50%)`;
}
