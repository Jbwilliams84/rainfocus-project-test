import { readFile, writeFile } from 'node:fs/promises';

const output = new URL('../build/', import.meta.url);
const index = new URL('index.html', output);
const html = await readFile(index, 'utf8');
const entry = html.match(/<script type="module"[^>]* src="([^"]+)"><\/script>/);
const stylesheet = html.match(/<link rel="stylesheet"[^>]* href="([^"]+)"[^>]*>/);

if (!entry) throw new Error('Missing production entry script.');
if (!stylesheet) throw new Error('Missing production stylesheet.');

const bundle = await readFile(new URL(entry[1], output), 'utf8');
const inlineScript = bundle.replace(/<\/script/gi, '<\\/script');
const css = await readFile(new URL(stylesheet[1], output), 'utf8');
const inlineStyle = css.replace(/<\/style/gi, '<\\/style');
const standalone = html
  .replace(entry[0], () => `<script type="module">${inlineScript}</script>`)
  .replace(stylesheet[0], () => `<style>${inlineStyle}</style>`);
await writeFile(index, standalone);
