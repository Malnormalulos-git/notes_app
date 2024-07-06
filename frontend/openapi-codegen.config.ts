import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  notes_app_frontend: {
    from: {
      source: "url",
      url: "http://localhost:5292/swagger/v1/swagger.json",
    },
    outputDir: "./src/api",
    to: async (context) => {
      const filenamePrefix = "notes_app";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  }
});
