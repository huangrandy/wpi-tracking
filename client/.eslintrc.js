/* eslint-env node */
module.exports = {
   "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true
   },
   "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
   ],
   "parserOptions": {
      "ecmaFeatures": {
         "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
   },
   "plugins": [
      "react", "jest"
   ],
   "rules": {
      "semi": [
         "error",
         "never"
      ],
      "eqeqeq": "error",
      "no-empty": "off",
      "no-trailing-spaces": "off",
      "object-curly-spacing": [
         "error", "always"
      ],
      "arrow-spacing": [
         "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
      'no-unused-vars': 'off'

   },
   "settings": {
      "react": {
         "version": "detect"
      }
   }
}