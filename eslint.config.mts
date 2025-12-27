import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Disable requiring React to be in scope when using JSX (React 17+)
      "react/react-in-jsx-scope": "off",
      // Also not needed with the new JSX transform
      "react/jsx-uses-react": "off",
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
]);
