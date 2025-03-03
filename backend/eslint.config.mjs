import firefly from "@outwalk/firefly/eslint";
import ts from "@typescript-eslint/eslint-plugin";

export default {
    files: ["src/**/*.{js,ts}"],
    plugins: { "@typescript-eslint": ts },
    languageOptions: { ...firefly.configs.language },
    rules: {
        ...firefly.configs.recommended,
        "@typescript-eslint/no-explicit-any": "error"
    }
}