// eslint.config.mjs
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextCore from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  {
    ignores: [".next/**", "out/**", "build/**", "dist/**", "node_modules/**", "next-env.d.ts"],
  },

  // Базовый JS
  js.configs.recommended,

  // Next.js
  ...nextCore,
  ...nextTs,

  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      // "plugin:@typescript-eslint/recommended",
      // "plugin:prettier/recommended"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      //------------------------------------------------
      // наши правила
      //------------------------------------------------

      // Импорт сортировка
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Только стрелочные функции
      "func-style": ["error", "expression"],

      // 2 пробела
      indent: ["error", 2, { SwitchCase: 1 }],

      // console.log → warning
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Ошибка на неиспользуемые переменные
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // нейминг
      "@typescript-eslint/naming-convention": [
        "error",

        // 1. Типы, интерфейсы — PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },

        // 2. Переменные, функции, утилиты — camelCase
        {
          selector: "variableLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },

        // >>> ДОБАВЛЕННОЕ — чтобы const Comp не ругался
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          filter: {
            regex: "^Comp$",
            match: true,
          },
        },

        // 3. Константы верхнего уровня — camelCase | UPPER_CASE
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE"],
        },

        // 4. Экспортируемые компоненты function
        {
          selector: "function",
          modifiers: ["exported"],
          format: ["PascalCase"],
          filter: {
            regex: "^[A-Z]",
            match: true,
          },
        },

        // 5. Экспортируемые компоненты const Button = () => {}
        {
          selector: "variable",
          modifiers: ["exported", "const"],
          types: ["function"],
          format: ["PascalCase"],
          filter: {
            regex: "^[A-Z]",
            match: true,
          },
        },

        // 6. Исключения для Zod схем (*Schema)
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          filter: {
            regex: ".*Schema$",
            match: true,
          },
        },

        // 7. Разрешить snake_case только для данных API
        {
          selector: "variable",
          format: null, // не проверять формат
          filter: {
            regex: "^[_a-z]+$",
            match: true,
          },
        },
      ],
    },
  },

  // Server Actions — разрешаем function
  {
    files: ["**/*actions.ts", "**/actions/**/*.ts", "**/actions/**/*.tsx", "middleware.ts"],
    rules: {
      "func-style": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportNamedDeclaration > VariableDeclaration",
          message: "Server Actions must be declared with `export function`, not arrow functions",
        },
      ],
    },
  },
  {
    files: ["src/shared/shadcn/**/*.ts", "src/shared/shadcn/**/*.tsx"],
    rules: {
      "func-style": "off",
      "no-restricted-syntax": "off",
    },
  },
  {
    files: ["app/api/**/*.ts", "app/api/**/*.tsx"],
    rules: {
      "func-style": "off",
      "no-restricted-syntax": "off",
    },
  },
]);
