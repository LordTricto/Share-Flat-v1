module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier",
	],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 2020,
		project: "./tsconfig.json",
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"max-len": [
			"error",
			150,
			2,
			{
				ignoreUrls: true,
				ignoreComments: false,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
		"lines-between-class-members": "off",
		// indent: [2, "tab"],
		"no-tabs": ["error", {allowIndentationTabs: true}],
		// "brace-style": ["error", "stroustrup"],
		"no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
		"no-continue": 0,
		"no-useless-constructor": 0,
		// 'no-param-reassign': 0,
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": ["error"],
		"prefer-destructuring": 0,
		"react/function-component-definition": [2, {namedComponents: "function-declaration"}],
		"no-trailing-spaces": ["error"],
		"prettier/prettier": [
			"error",
			{},
			{
				usePrettierrc: true,
			},
		],
	},
};
