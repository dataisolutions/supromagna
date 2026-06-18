import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Gli apostrofi tipografici nei copy italiani sono voluti e sicuri nel JSX.
      "react/no-unescaped-entities": "off",
      // Sincronizzazioni leggere stato↔UI (menu, scroll) sono accettabili qui.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
