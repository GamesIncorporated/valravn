const fs = require('fs');
const { execSync } = require("child_process");

deleteModules = (args) => {
    return async function writeSoundList() {
        if(args.length === 0) throw new Error("Enter your game name. e.g: gulp deleteNodeModules --gi_019_cfs");
        const gameName = cleanUpArgs(args);
        clearEngines(gameName)
    }
}

clearEngines = (game) => {
    const engines = ['titan', 'hyperion', 'ymir', game];
    for (const engine of engines) {
        console.log("Deleting node_modules for " + engine);
        fs.rmSync(`../${engine}/node_modules`, { recursive: true, force: true });
    }
    console.log(`Switching to cd ../${game} ... Installing dependencies`);
    execSync(`cd ../${game} && npm run install:dev`, { stdio: 'inherit' });
}

cleanUpArgs = (args) => {
    return args[0].replace('--', '');
}

createPath = (gameName) => {
    return `../${gameName}/node_modules/`;
}

module.exports = { deleteModules };
