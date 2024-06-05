// tsup.config.ts

import { defineConfig } from "tsup";

export default defineConfig({
    // The file we created above that will be the entrypoint to the library.
    format: ["cjs", "esm"],
    entry: [
        "src/index.ts", // main entry
        "src/icons/index.ts", // lucide icons
        "src/input/index.tsx",
        "src/text/index.tsx",
        "src/button/index.tsx",
        "src/dialog/index.tsx",
        "src/label/index.tsx",
        "src/form/index.tsx",
        "src/toast/index.tsx",
        "src/alert/index.tsx",
        "src/toast/toaster.tsx",
        "src/toast/use-toast.tsx",
        "src/themes/provider.tsx",
        "src/themes/theme.ts",
    ],
    // Enable TypeScript type definitions to be generated in the output.
    // This provides type-definitions to consumers.
    dts: true,
    // Clean the `dist` directory before building.
    // This is useful to ensure the output is only the latest.
    clean: true,
    // Sourcemaps for easier debugging.
    sourcemap: true,
});