import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 기본 no-unused-vars 규칙 비활성화
      "no-unused-vars": "off",
      // @typescript-eslint/no-unused-vars 규칙 설정
      "@typescript-eslint/no-unused-vars": [
        "warn", // 경고로 처리
        {
          vars: "all", // 모든 변수를 확인
          args: "none", // 함수 매개변수는 확인하지 않음
          varsIgnorePattern: "^_", // _로 시작하는 변수는 무시
          argsIgnorePattern: "^_", // _로 시작하는 매개변수는 무시
        },
      ],
    },
  },
];

export default eslintConfig;
