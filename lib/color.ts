// generate n distinct HSL colors
export function generatePastelColors(n: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < n; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 65 + Math.floor(Math.random() * 28); // 65–80%
    const lightness = 45 + Math.floor(Math.random() * 14);  // 45–55%

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
