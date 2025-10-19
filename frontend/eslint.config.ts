import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'
import importPlugin from 'eslint-plugin-import'


export default defineConfigWithVueTs(
  globalIgnores(['dist/**/*', '**/*.d.ts']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    files: ['src/**/*.{ts,js,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          js: tsParser,
          ts: tsParser
        },
        projectService: true,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    processor: pluginVue.processors['.vue'],
    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
      pluginVue
    },
    rules: {
      // common
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'eslint/no-negated-condition': 'off',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Встроенные и внешние зависимости
            'internal', // Внутренние модули
            ['parent', 'sibling', 'index', 'type'] // Родительские, соседние и индексные
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc', // Сортировка по алфавиту
            caseInsensitive: true // Игнорировать регистр
          },
          pathGroups: [
            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'] // Исключить сортировку встроенных и внешних
        }
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'no-undef': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-assertions': ['warn', {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never'
      }],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }],

      // @stylistic
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'function', 'while'] },
        { blankLine: 'always', prev: ['if', 'for', 'function', 'while'], next: '*' }
      ],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error', 'always', { singleValue: false }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/dot-location': ['error', 'object'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/implicit-arrow-linebreak': ['error', 'below'],
      '@stylistic/indent': ['error', 'tab'],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/line-comment-position': ['error', { position: 'above' }],
      '@stylistic/multiline-comment-style': ['error', 'starred-block'],
      '@stylistic/lines-around-comment': ['error', { beforeBlockComment: true }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/max-statements-per-line': ['error', { max: 1, ignoredNodes: ['BreakStatement'] }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-confusing-arrow': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
      '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
      '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/brace-style': [
        'error',
        'stroustrup',
        {
          allowSingleLine: true
        }
      ],

      // Vue
      'vue/no-mutating-props': 'warn',
      'vue/no-reserved-component-names': 'error',
      'vue/no-unused-vars': 'warn',
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }],
      "vue/define-macros-order": ["error", {
        "order": ['defineProps', 'defineModel', 'defineEmits', 'defineSlots'],
        "defineExposeLast": true
      }],
      'vue/require-default-prop': 'error',
      'vue/multi-word-component-names': 'error',
      'vue/valid-v-slot': 'error',
      'vue/no-unused-components': 'warn',
      'vue/comment-directive': ['error', {
        reportUnusedDisableDirectives: false
      }],
      'vue/no-setup-props-reactivity-loss': ['error'],
    }
  }
)
