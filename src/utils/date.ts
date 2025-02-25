type TimeUnit = "h" | "m" | "s";

export const simpleGenerateSecond = (
  times: [number, TimeUnit][] = []
): number => {
  let s = 0;
  for (const [v, unit] of times) {
    if (unit === "h") s += v * 60 * 60 * 1000;
    else if (unit === "m") s += v * 60 * 1000;
    else if (unit === "s") s += v * 1000;
  }

  return s;
};
