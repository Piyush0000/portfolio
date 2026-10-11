import { Color, SRGBColorSpace } from "three";

export type ScenePalette = { cyan: Color; magenta: Color; violet: Color; lime: Color; bg: Color; ink: Color; light: boolean };

/** Reads the active theme's CSS color tokens so WebGL matches the DOM. */
export function readPalette(): ScenePalette {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string) => {
    const [r, g, b] = css.getPropertyValue(name).trim().split(/\s+/).map(Number);
    return new Color().setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
  };
  return {
    cyan: read("--c-cyan"),
    magenta: read("--c-magenta"),
    violet: read("--c-violet"),
    lime: read("--c-lime"),
    bg: read("--c-bg"),
    ink: read("--c-ink"),
    light: document.documentElement.dataset.theme === "light",
  };
}
