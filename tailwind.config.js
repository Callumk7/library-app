/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./features/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)"],
				inter: ["var(--font-inter)"]
			},
			colors: {
				background: {
					DEFAULT: "hsl(var(--background))",
					95: "hsl(var(--background-95))",
					90: "hsl(var(--background-90))",
				},
				foreground: "hsl(var(--foreground))",
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					foreground: "hsl(var(--success-foreground))",
				},
				alt: {
					DEFAULT: "hsl(var(--alt))",
					foreground: "hsl(var(--alt-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				midnight: {
					1: "hsl(var(--midnight-1))",
					2: "hsl(var(--midnight-2))",
					3: "hsl(var(--midnight-3))",
					4: "hsl(var(--midnight-4))",
					5: "hsl(var(--midnight-5))",
				},
				ring: "hsl(var(--ring))",
				input: "hsl(var(--input))",
			},
			keyframes: {
				slideDownAndFade: {
					from: { opacity: 0, transform: "translateY(-2px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				slideLeftAndFade: {
					from: { opacity: 0, transform: "translateX(2px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				slideUpAndFade: {
					from: { opacity: 0, transform: "translateY(2px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				slideRightAndFade: {
					from: { opacity: 0, transform: "translateX(-2px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				// toast animations
				hide: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				slideIn: {
					from: {
						transform: "translateX(calc(100% + var(--viewport-padding)))",
					},
					to: { transform: "translateX(0)" },
				},
				swipeOut: {
					from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
					to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
				},
			},
			animation: {
				slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideRightAndFade:
					"slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
				// toast animations
				hide: "hide 100ms ease-in",
				slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				swipeOut: "swipeOut 100ms ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
