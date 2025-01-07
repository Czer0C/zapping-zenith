export function formatNum(raw: string): string {
  const num = parseFloat(raw);

  if (isNaN(num)) return '0';

  // Convert to string with fixed decimal places for large numbers
  const str =
    Math.abs(num) >= 1e6
      ? num.toExponential(12)
      : num.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 12,
        });

  return str;
}
