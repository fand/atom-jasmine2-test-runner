"use babel";

import { execSync } from "child_process";

export default function (pkg, version = "*") {
	try {
		require(pkg);
	} catch (ex) {

		console.log(`\nInstalling ${pkg}@${version}`);

		const commands = [
			`npm install --no-save ${pkg}@${version}`,
			`apm rebuild ${pkg}`,
		];

		commands.forEach(function (command) {
			console.log(command);
			execSync(command, { cwd: __dirname });
		});

		require(pkg);
	}
};