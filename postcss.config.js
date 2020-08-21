const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss')('tailwindcss.js');

module.exports = {
	plugins: [
		tailwindcss,
		autoprefixer,
	]
}