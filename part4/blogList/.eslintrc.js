module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'
		],
		'arrow-spacing': [
			'error', { 'before': true, 'after': true }
		],
		'space-in-parens': ['error', 'always'],
		'space-infix-ops': ['error', { 'int32Hint': false }],
		'comma-spacing': ['error', { 'before': false, 'after': true }]
	}
}
