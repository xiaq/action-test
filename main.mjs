import { spawn } from 'node:child_process';

const archMap = {ia32: '386', x64: 'amd64'};
const platformMap = {win32: 'windows'};

async function main() {
    let version = process.env['INPUT_ELVISH-VERSION'];
    if (!version) {
        throw new Error('The version input must not be empty');
    }
    if (/^\d/.test(version)) {
        version = 'v' + version;
    }
    const arch = archMap[process.arch] || process.arch;
    const platform = platformMap[process.platform] || process.platform;
    const urlBase = `https://dl.elv.sh/${platform}-${arch}/elvish-${version}`;
    if (platform === 'windows') {
        await run('pwsh', '-c',
            `
            New-Item -ItemType Directory C:\\elvish
            Write-Output C:\\elvish >> $Env:GITHUB_PATH
            Set-Location C:\\elvish
            Invoke-RestMethod -Uri '${urlBase}.zip' -OutFile elvish.zip
            Expand-Archive elvish.zip -DestinationPath .
            Remove-Item elvish.zip
            New-Item -ItemType SymbolicLink -Path elvish -Target elvish-${version}
            `);
    } else {
        await run('sh', '-c',
            `
            cd /usr/local/bin
            curl -o- ${urlBase}.tar.gz | tar xz
            ln -sf elvish-${version} elvish
            `);
    }
}

function run(cmd, ...args) {
    const p = spawn(cmd, args, {stdio: 'inherit'});
    return new Promise((resolve, reject) => {
        let errored = false;
        p.on('error', (err) => {
            errored = true;
            reject(err);
        });
        p.on('exit', (code, signal) => {
            if (errored) {
                return;
            }
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Exited with ${code} (signal: ${signal})`));
            }
        });
    });
}

await main();
