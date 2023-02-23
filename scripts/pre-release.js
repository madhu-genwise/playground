/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');

const PACKAGE_PATH = process.cwd();
const BUILD_PATH = path.join(PACKAGE_PATH, './public');

/**
 * @name getVersion
 * @returns {string} version
 */
const getVersion = async () => {
	return new Promise((resolve) => {
		const packageFile = path.join(PACKAGE_PATH, 'package.json');
		console.log('reading package');
		fs.readFile(packageFile, (err, data) => {
			if (err) resolve(null);
			const packageJson = JSON.parse(data);
			resolve(packageJson.version);
		});
	});
};

/**
 * Generate version.json file for build folder
 * @returns
 */
async function createVersionFile() {
	const version = await getVersion();
	if (!version) return;

	const versionContent = {
		version,
	};
	console.log(versionContent, 'JSON');
	const versionJsonPath = path.join(BUILD_PATH, 'version.json');

	await Promise.all([fs.writeFile(versionJsonPath, JSON.stringify(versionContent, null, 2))]);
}

// Generate version.json
createVersionFile();
