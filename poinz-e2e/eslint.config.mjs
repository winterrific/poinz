import { defineConfig } from "eslint/config";

export default defineConfig([{
    languageOptions: {
        globals: {
            it: false,
            cy: false,
            Cypress: false,
            beforeEach: false,
        },
    },
}]);