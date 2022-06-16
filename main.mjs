import { mkdir, stat, writeFile } from 'node:fs/promises';

async function main() {
    const cacheDir = process.env['RUNNER_TOOL_CACHE'];
    try {
        await stat(`${cacheDir}/elvish`);
        console.log('Exists!');
    } catch (e) {
        console.log("Doesn't exist :(");
    }
    await mkdir(`${cacheDir}/elvish/1.1.0/x64`, {recursive: true});
    await writeFile(`${cacheDir}/elvish/1.1.0/x64/elvish`, 'fake elvish');
    await writeFile(`${cacheDir}/elvish/1.1.0/x64.complete`, '');
}

await main()
