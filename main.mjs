import { exec } from 'node:child_process';

async function main() {
    process.chdir('/usr/local/bin');
    const p = exec(
        'curl -o- https://dl.elv.sh/linux-amd64/elvish-v0.18.0.tar.gz | tar x',
        { stdio: 'inherit' });
    await new Promise((resolve, reject) => {
        p.on('exit', (code) => {
            if (code === 0) {
                res();
            } else {
                reject(new Error(`Script exited with ${code}`));
            }
        });
    });
}

await main()