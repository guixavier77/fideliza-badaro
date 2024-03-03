import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      d: '1140px',
      t: { min: '768px', max: '1139px' },
      s: { max: '767px' },
    },
    colors: {
      white: '#FFFFFF',
      red: '#C90B0B',
      black: '#1D1D1D',
      gray: '#D9D9D9',
      darkGray: '#6D6D6D'
    }

  },
  plugins: [],
}
export default config
