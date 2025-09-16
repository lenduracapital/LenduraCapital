import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Shadcn/UI compatibility colors - mapped to design tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Brand Primary Colors - Full Scale
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary-hsl))",
            50: "hsl(var(--brand-primary-50-hsl))",
            100: "hsl(var(--brand-primary-100-hsl))",
            200: "hsl(var(--brand-primary-200-hsl))",
            300: "hsl(var(--brand-primary-300-hsl))",
            400: "hsl(var(--brand-primary-400-hsl))",
            500: "hsl(var(--brand-primary-500-hsl))",
            600: "hsl(var(--brand-primary-600-hsl))",
            700: "hsl(var(--brand-primary-700-hsl))",
            800: "hsl(var(--brand-primary-800-hsl))",
            900: "hsl(var(--brand-primary-900-hsl))",
            hover: "hsl(var(--brand-primary-hover-hsl))",
            light: "hsl(var(--brand-primary-light-hsl))",
            dark: "hsl(var(--brand-primary-dark-hsl))",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary-hsl))",
            50: "hsl(var(--brand-secondary-50-hsl))",
            100: "hsl(var(--brand-secondary-100-hsl))",
            500: "hsl(var(--brand-secondary-500-hsl))",
            700: "hsl(var(--brand-secondary-700-hsl))",
            light: "hsl(var(--brand-secondary-light-hsl))",
            dark: "hsl(var(--brand-secondary-dark-hsl))",
          },
        },
        
        // Semantic Colors
        success: "hsl(var(--color-success-hsl))",
        warning: "hsl(var(--color-warning-hsl))",
        error: "hsl(var(--color-error-hsl))",
        info: "hsl(var(--color-info-hsl))",
        
        // Neutral Color Scale
        white: "hsl(var(--color-white-hsl))",
        black: "hsl(var(--color-black-hsl))",
        gray: {
          50: "hsl(var(--color-gray-50-hsl))",
          100: "hsl(var(--color-gray-100-hsl))",
          200: "hsl(var(--color-gray-200-hsl))",
          300: "hsl(var(--color-gray-300-hsl))",
          400: "hsl(var(--color-gray-400-hsl))",
          500: "hsl(var(--color-gray-500-hsl))",
          600: "hsl(var(--color-gray-600-hsl))",
          700: "hsl(var(--color-gray-700-hsl))",
          800: "hsl(var(--color-gray-800-hsl))",
          900: "hsl(var(--color-gray-900-hsl))",
        },
        
        // Component-specific colors
        'input-focus': "hsl(var(--brand-primary-hsl) / 0.1)",
        'input-border': "hsl(var(--color-gray-300-hsl))",
        'card-border': "hsl(var(--color-gray-200-hsl))",
        'nav-link': "hsl(var(--color-gray-700-hsl))",
        'hero-text': "hsl(var(--color-white-hsl))",
        'footer-text': "hsl(var(--color-gray-300-hsl))",
      },
      
      // Typography System - Mapped to Design Tokens
      fontFamily: {
        brand: ['var(--font-brand)'],
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      
      fontSize: {
        // Responsive font sizes using design tokens
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      
      fontWeight: {
        thin: 'var(--font-thin)',
        light: 'var(--font-light)',
        normal: 'var(--font-normal)',
        medium: 'var(--font-medium)',
        semibold: 'var(--font-semibold)',
        bold: 'var(--font-bold)',
        extrabold: 'var(--font-extrabold)',
        black: 'var(--font-black)',
      },
      
      lineHeight: {
        none: 'var(--leading-none)',
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)',
      },
      
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },
      
      // Spacing System - Mapped to Design Tokens
      spacing: {
        0: 'var(--space-0)',
        px: 'var(--space-px)',
        '0.5': 'var(--space-0-5)',
        1: 'var(--space-1)',
        '1.5': 'var(--space-1-5)',
        2: 'var(--space-2)',
        '2.5': 'var(--space-2-5)',
        3: 'var(--space-3)',
        '3.5': 'var(--space-3-5)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        11: 'var(--space-11)',
        12: 'var(--space-12)',
        14: 'var(--space-14)',
        16: 'var(--space-16)',
        18: 'var(--space-18)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        28: 'var(--space-28)',
        32: 'var(--space-32)',
        36: 'var(--space-36)',
        40: 'var(--space-40)',
        44: 'var(--space-44)',
        48: 'var(--space-48)',
        52: 'var(--space-52)',
        56: 'var(--space-56)',
        60: 'var(--space-60)',
        64: 'var(--space-64)',
        72: 'var(--space-72)',
        80: 'var(--space-80)',
        96: 'var(--space-96)',
        
        // Component-specific spacing
        'container': 'var(--container-padding)',
        'section-y': 'var(--section-padding-y)',
        'section-x': 'var(--section-padding-x)',
        'card': 'var(--card-padding)',
        'button-x': 'var(--button-padding-x)',
        'button-y': 'var(--button-padding-y)',
        'hero-y': 'var(--hero-padding-y)',
        'hero-x': 'var(--hero-padding-x)',
      },
      
      // Visual Design System - Border Radius, Shadows, etc.
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        base: 'var(--radius-base)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
        
        // Maintain shadcn compatibility
        DEFAULT: "var(--radius)",
      },
      
      borderWidth: {
        0: 'var(--border-0)',
        1: 'var(--border-1)',
        2: 'var(--border-2)',
        4: 'var(--border-4)',
        8: 'var(--border-8)',
        DEFAULT: 'var(--border-1)',
      },
      
      boxShadow: {
        sm: 'var(--shadow-sm)',
        base: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        none: 'var(--shadow-none)',
        
        // Brand-specific shadows
        brand: 'var(--shadow-brand)',
        'brand-lg': 'var(--shadow-brand-lg)',
        'brand-hover': 'var(--shadow-brand-hover)',
        
        // Component-specific shadows
        'card-hover': 'var(--card-shadow-hover)',
        'input-focus': 'var(--input-focus-shadow)',
      },
      
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-overlay': 'var(--gradient-overlay)',
        'gradient-overlay-dark': 'var(--gradient-overlay-dark)',
        'gradient-radial': 'var(--gradient-radial)',
      },
      
      opacity: {
        0: 'var(--opacity-0)',
        5: 'var(--opacity-5)',
        10: 'var(--opacity-10)',
        20: 'var(--opacity-20)',
        25: 'var(--opacity-25)',
        30: 'var(--opacity-30)',
        40: 'var(--opacity-40)',
        50: 'var(--opacity-50)',
        60: 'var(--opacity-60)',
        70: 'var(--opacity-70)',
        75: 'var(--opacity-75)',
        80: 'var(--opacity-80)',
        90: 'var(--opacity-90)',
        95: 'var(--opacity-95)',
        100: 'var(--opacity-100)',
      },
      
      zIndex: {
        0: 'var(--z-0)',
        10: 'var(--z-10)',
        20: 'var(--z-20)',
        30: 'var(--z-30)',
        40: 'var(--z-40)',
        50: 'var(--z-50)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        fixed: 'var(--z-fixed)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
        overlay: 'var(--z-overlay)',
        max: 'var(--z-max)',
      },
      // Transitions using Design Tokens
      transitionTimingFunction: {
        'brand': 'var(--ease-brand)',
        'smooth': 'var(--ease-smooth)',
        'default': 'var(--ease-out)',
      },
      
      transitionDuration: {
        75: 'var(--duration-75)',
        100: 'var(--duration-100)',
        150: 'var(--duration-150)',
        200: 'var(--duration-200)',
        300: 'var(--duration-300)',
        500: 'var(--duration-500)',
        700: 'var(--duration-700)',
        1000: 'var(--duration-1000)',
        fast: 'var(--duration-150)',
        normal: 'var(--duration-200)',
        slow: 'var(--duration-300)',
      },
      
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "skeleton-loading": {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "calc(200px + 100%) 0" },
        },
        // Brand-specific animations using tokens
        "fade-in-up": {
          "0%": { 
            opacity: "var(--opacity-0)", 
            transform: "translateY(var(--space-4))" 
          },
          "100%": { 
            opacity: "var(--opacity-100)", 
            transform: "translateY(0)" 
          },
        },
        "slide-in-right": {
          "0%": { 
            opacity: "var(--opacity-0)", 
            transform: "translateX(var(--space-8))" 
          },
          "100%": { 
            opacity: "var(--opacity-100)", 
            transform: "translateX(0)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--duration-200) var(--ease-out)",
        "accordion-up": "accordion-up var(--duration-200) var(--ease-out)",
        "fade-in": "fade-in var(--duration-300) var(--ease-out)",
        "skeleton-loading": "skeleton-loading var(--duration-1000) var(--ease-in-out) infinite",
        "fade-in-up": "fade-in-up var(--duration-300) var(--ease-brand)",
        "slide-in-right": "slide-in-right var(--duration-200) var(--ease-out)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "21/9": "21 / 9",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
  // Performance optimizations
  corePlugins: {
    preflight: true,
  },
} satisfies Config;