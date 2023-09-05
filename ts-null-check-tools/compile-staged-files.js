const { exec } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

// Function to find and compile TypeScript files
function compileChangedTypeScriptFiles() {
  // Run 'git diff --name-only --cached' to get a list of staged files
  exec("git diff --name-only --cached", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing git diff: ${error}`);
      return;
    }

    // Split the stdout into an array of file paths
    const stagedFiles = stdout.trim().split("\n");

    // Filter the staged files to keep only those with a .ts extension
    const tsFiles = stagedFiles
      .filter((file) => path.extname(file) === ".ts")
      .filter((tsFile) => !tsFile.endsWith(".spec.ts"));

    if (tsFiles.length === 0) {
      console.log("No staged TypeScript files found.");
      return;
    }

    // Check if tsconfig.null-checks.json exists in the current directory
    const tsconfigPath = "tsconfig.null-checks.json";
    if (!fs.existsSync(tsconfigPath)) {
      console.error("tsconfig.null-checks.json not found in the current directory.");
      return;
    }

    // Read the existing tsconfig content
    const existingTsConfig = fs.readFileSync(tsconfigPath, 'utf8');
    let tsConfigJson;
    try {
      tsConfigJson = JSON.parse(existingTsConfig);
    } catch (parseError) {
      console.error(`Error parsing ${tsconfigPath}: ${parseError.message}`);
      return;
    }

    // If the "files" property doesn't exist in the existing configuration, create it as an empty array
    tsConfigJson.include = tsConfigJson.include || [];

    // If the "exclude" property doesn't exist in the existing configuration, create it as an empty array
    tsConfigJson.exclude = tsConfigJson.exclude || [];

    // Filter out the files that are already listed in the "files" property
    const newTsFiles = tsFiles.filter((tsFile) =>
      !tsConfigJson.include.includes(tsFile) &&
      !tsConfigJson.exclude.includes(tsFile));

    // Update tsconfig.json to include the newly staged files
    tsConfigJson.include = [...tsConfigJson.include, ...newTsFiles];

    // Write the updated tsconfig.null-checks.ts file
    fs.writeFileSync(tsconfigPath, JSON.stringify(tsConfigJson, null, 2));

    // Compile the TypeScript files using the TypeScript npm package
    exec(`npx tsc --project ${tsconfigPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error compiling TypeScript files: ${error}`);
        return;
      }

      console.log("TypeScript files compiled successfully.");
    });
  });
}

// Call the function to compile changed TypeScript files
compileChangedTypeScriptFiles();
