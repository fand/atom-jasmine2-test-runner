"use babel";

import { exec } from "child_process";

function execAsync(command, options) {
	return new Promise((resolve, reject) => {
		exec(command, options, function (err, stdout, stderr) {
			if (err) {
				return reject(err);
			}
			resolve(stdout);
		});
	});
};

export default async function (pkg, version = "*") {
	try {
		require(pkg);
	} catch (ex) {

		const installing = document.createElement("div");
		installing.style = "background-color:#fff; display:flex; height:100%; flex-direction:column; justify-content:center; align-items:center;";
		installing.innerHTML = `<span style="font-size:20px; font-weight:bold; margin-bottom:15px; color:#333;">Installing ${pkg}@${version}</span><progress></progress>`;

		document.body.appendChild(installing);

		const commands = [
			`npm install --save-dev ${pkg}@${version}`,
			`apm rebuild ${pkg}`,
		];
		for (const command of commands) {
			await execAsync(command, { cwd: __dirname });
		}

		installing.remove();

		require(pkg);
	}
};
