import { mkdir, writeFile } from 'node:fs/promises';

async function main() {
    const cacheDir = process.env['RUNNER_TOOL_CACHE'];
    await mkdir(`${cacheDir}/elvish/0.1.0/x64`, {recursive: true});
    await writeFile(`${cacheDir}/elvish/0.1.0/x64/elvish`, 'fake elvish');
    await writeFile(`${cacheDir}/elvish/0.1.0/x64.complete`, '');
}

await main()