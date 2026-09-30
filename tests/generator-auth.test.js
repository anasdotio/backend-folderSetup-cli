const assert = require("node:assert/strict");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const ProjectGenerator = require("../src/utils/generator");

(async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "init-backend-jwt-"));

  const config = {
    framework: "express",
    useTypeScript: false,
    features: ["jwt"],
    databases: ["mongodb"],
    useCurrentDir: false,
  };

  const generator = new ProjectGenerator(tempDir, config);
  await generator.generate();

  const requiredFiles = [
    "src/models/user.model.js",
    "src/controllers/auth.controller.js",
    "src/services/auth.service.js",
    "src/dao/user.dao.js",
    "src/routes/auth.routes.js",
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(tempDir, file);
    assert.ok(await fs.pathExists(fullPath), `Missing generated file: ${file}`);
  }

  const appContents = await fs.readFile(
    path.join(tempDir, "src/app.js"),
    "utf8",
  );
  assert.match(
    appContents,
    /authRoutes|\/api\/auth/,
    "Auth routes should be registered in the app",
  );

  console.log("JWT auth generation test passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
