import { spawn } from 'node:child_process';
import { symlink } from 'node:fs/promises';

await main()

async function main() {
    // process.chdir('/usr/local/bin');
    await run('sh', '-c',
        'curl -o- https://dl.elv.sh/linux-amd64/elvish-v0.18.0.tar.gz | tar x');
    await symlink('elvish-v0.18.0', 'elvish');
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
