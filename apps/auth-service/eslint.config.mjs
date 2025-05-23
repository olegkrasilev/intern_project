import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import pluginPromise from "eslint-plugin-promise";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import nodePlugin from "eslint-plugin-n";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        globals: {
          ...globals.node,
          ...globals.jest,
        },
      },
    },
  },

  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  pluginPromise.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  nodePlugin.configs["flat/recommended-script"],
]);
