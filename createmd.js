const fs = require('fs')
const path = require('path')
const readline = require('readline')

const ENV_NAME = 'ZHISHIKU_DIR'
const baseDir = process.env[ENV_NAME];

if (!baseDir) {
    console.log(`Missing environment variable: ${ENV_NAME}`)
    process.exit(-1)
}

const today = new Date(new Date().getTime() + 3600 * 1000 * 8).toISOString().replace(/T.+/, '');

const mkdir = (title) => {
    const dir = path.join(baseDir, today, title)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    return dir;
}

// Set up the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask a question and get a response
rl.question('Input article title:  ', (title) => {
    const dirName = title.trim().replace(/\s+/g, '_')

    const dirPath = mkdir(dirName);

    const readmePath = path.join(dirPath, 'README.md')
    if (!fs.existsSync(readmePath)) {
        console.log(readmePath)
        fs.writeFileSync(readmePath,
            `---
creationDate: ${today}            
tags: []
---

# ${title}
`);
    }
    rl.close();
});
