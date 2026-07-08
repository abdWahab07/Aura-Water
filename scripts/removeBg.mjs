import sharp from "sharp";

const [input, output, threshArg] = process.argv.slice(2);
const thresh = Number(threshArg ?? 248);

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const isBg = (i) =>
  data[i] >= thresh && data[i + 1] >= thresh && data[i + 2] >= thresh;

const visited = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) {
  stack.push(x, 0, x, height - 1);
}
for (let y = 0; y < height; y++) {
  stack.push(0, y, width - 1, y);
}

while (stack.length) {
  const y = stack.pop();
  const x = stack.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;
  const p = y * width + x;
  if (visited[p]) continue;
  visited[p] = 1;
  const i = p * channels;
  if (!isBg(i)) continue;
  data[i + 3] = 0;
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`Wrote ${output} (${width}x${height}, threshold ${thresh})`);
