import { exec } from 'node:child_process';

async function main() {
    process.chdir('/usr/local/bin')
    exec('curl -o- https://dl.elv.sh/linux-amd64/elvish-v0.18.0.tar.gz | tar x')
}

await main()