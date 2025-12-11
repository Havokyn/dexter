import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#58A6FF',
          light: '#a5cfff',
          dark: '#1f6feb',
        },
        success: '#3fb950',
        error: '#f85149',
        warning: '#d29922',
        muted: {
          DEFAULT: '#808080',
          dark: '#303030',
          light: '#c0c0c0',
        },
        accent: {
          cyan: '#39c5cf',
          magenta: '#bc4de0',
        },
        background: {
          primary: '#0d1117',
          secondary: '#161b22',
          tertiary: '#1c2128',
        },
        border: {
          DEFAULT: '#30363d',
          hover: '#484f58',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
