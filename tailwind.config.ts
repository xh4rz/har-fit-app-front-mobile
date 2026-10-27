/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.tsx',
		'./src/app/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
		'./src/context/**/*.{js,jsx,ts,tsx}',
		'./src/modules/**/*.{js,jsx,ts,tsx}',
		'./src/screens/**/*.{js,jsx,ts,tsx}'
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				background: 'var(--background)',
				card: 'var(--card)',
				foreground: 'var(--foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				input: 'var(--input)',
				border: 'var(--border)',
				ring: 'var(--ring)',
				destructive: 'var(--destructive)',
				'destructive-focused': 'var(--destructive-focused)',
				'destructive-focused-background':
					'var(--destructive-focused-background)'
			}
		}
	}
};
