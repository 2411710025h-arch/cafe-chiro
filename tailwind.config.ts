import type { Config } from "tailwindcss";

/**
 * CAFE CHIRO design system.
 *
 * Palette is intentionally monochrome — extracted from the brand board:
 *   Charcoal Black #111111, Icy Gray #E6E9EC, White.
 * No chromatic accent. Hierarchy comes from ink fills, hairlines and space.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111111",
          soft: "#2a2c2e",
          muted: "#6b7075"
        },
        paper: {
          DEFAULT: "#ffffff",
          soft: "#fafafa",
          dim: "#f4f5f6"
        },
        mist: {
          DEFAULT: "#e6e9ec",
          strong: "#d7dbe0"
        },
        line: "#e6e9ec"
      },
      fontFamily: {
        // Inter for Latin; a robust system CJK stack for JP/KR glyphs.
        sans: [
          "var(--font-inter)",
          "Inter",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Noto Sans JP",
          "Yu Gothic",
          "Meiryo",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "system-ui",
          "sans-serif"
        ],
        jp: [
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Noto Sans JP",
          "Yu Gothic",
          "Meiryo",
          "var(--font-inter)",
          "sans-serif"
        ],
        kr: [
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "var(--font-inter)",
          "sans-serif"
        ]
      },
      fontSize: {
        // Fluid display sizes for editorial headlines.
        "display-xl": ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.9rem, 4vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.5rem, 2.6vw, 2.1rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }]
      },
      letterSpacing: {
        label: "0.22em",
        wide: "0.14em"
      },
      maxWidth: {
        container: "1320px",
        prose: "62ch"
      },
      spacing: {
        "section": "clamp(4.5rem, 9vw, 9rem)",
        "gutter": "clamp(1.25rem, 4vw, 2.5rem)"
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        DEFAULT: "8px",
        img: "12px"
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      transitionDuration: {
        "250": "250ms",
        "450": "450ms",
        "600": "600ms"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 450ms ease both"
      }
    }
  },
  plugins: []
};

export default config;
