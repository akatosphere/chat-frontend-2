# Frontend Code Style & Rules

Этот документ описывает правила код-стайла, структуры и автоматизации проекта.
Обязательно к прочтению перед началом разработки.

---

# 1. Используемые инструменты

## ESLint

Статический анализатор, отвечающий за качество и корректность кода.
Проверяет:

- ошибки в TypeScript и React,
- правильность импортов,
- корректный нейминг,
- отсутствие неиспользуемых переменных,
- использование стрелочных функций,
- единый стиль кода.

## Prettier

Автоматический форматер кода.
Отвечает за:

- отступы,
- кавычки,
- длину строк,
- переносы,
- форматирование объектов и функций,
- сортировку классов Tailwind (через плагин).

## Husky + lint-staged

Автоматизируют проверки перед коммитами и пушами.
Процесс:

- при `git commit` — форматируются только изменённые файлы,
- при `git push` — запускается полный ESLint + сборка проекта.

---

# 2. Конфигурация Prettier

```js
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: "always",
};

export default config;
```

---

# 3. Конфигурация ESLint

```js
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

  js.configs.recommended,
  ...nextCore,
  ...nextTs,

  {
    files: ["**/*.ts", "**/*.tsx"],
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
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "func-style": ["error", "expression"],
      indent: ["error", 2],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/naming-convention": [
        "error",

        { selector: "typeLike", format: ["PascalCase"] },

        {
          selector: "variableLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },

        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          filter: { regex: "^Comp$", match: true },
        },

        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE"],
        },

        {
          selector: "function",
          modifiers: ["exported"],
          format: ["PascalCase"],
          filter: { regex: "^[A-Z]", match: true },
        },

        {
          selector: "variable",
          modifiers: ["exported", "const"],
          types: ["function"],
          format: ["PascalCase"],
          filter: { regex: "^[A-Z]", match: true },
        },
      ],
    },
  },
]);
```

---

# 4. Конфигурации Husky

## .husky/pre-commit

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "Running lint-staged..."
npx lint-staged
```

## .husky/pre-push

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "Running ESLint before push..."
npm run lint

echo "Building project..."
npm run build
```

---

# 5. Файлы, связанные с форматированием

## .prettierignore

```
node_modules
.next
out
build
coverage
dist
package-lock.json
pnpm-lock.yaml
```

---

# 6. Команды проекта

| Команда                 | Описание                                |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Запуск проекта                          |
| `npm run mob`           | Запуск в локальной сети                 |
| `npm run lint`          | Проверка ESLint                         |
| `npm run lint -- --fix` | ESLint с автоисправлением               |
| `npm run format`        | Форматирование Prettier                 |
| `npm run check`         | Проверка ESLint + Prettier              |
| `npm run fix`           | Полная автофиксация (ESLint + Prettier) |
| `npm run build`         | Сборка проекта                          |
| `npm run prepare`       | Установка Husky                         |

---

# 7. Структура проекта

| Папка / файл         | Описание                          |
| -------------------- | --------------------------------- |
| `src/`               | Исходный код проекта              |
| `src/components/`    | Компоненты UI                     |
| `src/app/`           | Страницы и роутинг Next.js        |
| `src/lib/`           | Утилиты, вспомогательные функции  |
| `src/hooks/`         | Пользовательские хуки             |
| `src/types/`         | Типы и интерфейсы                 |
| `public/`            | Статика                           |
| `eslint.config.mjs`  | Правила ESLint                    |
| `prettier.config.js` | Конфигурация Prettier             |
| `.husky/`            | Скрипты pre-commit/pre-push       |
| `package.json`       | Скрипты, зависимости, lint-staged |

---

# 8. Принципы код-стайла

- Используем только стрелочные функции.
- Компоненты и типы называются в PascalCase.
- Утилиты, переменные и функции — в camelCase.
- Константы верхнего уровня — camelCase или UPPER_CASE.
- Импорты автоматически сортируются.
- Tailwind классы сортируются автоматически.
- Неиспользуемые переменные запрещены.
- `console.log` запрещён (кроме `warn` и `error`).
- Файлы автоматически форматируются при коммите.

---

# 9. Итог

Проект полностью стандартизирован: единый стиль, единые правила, автоматическая проверка качества кода и предотвращение ошибок при пуше.
