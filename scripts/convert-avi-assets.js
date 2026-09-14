import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

const root = process.cwd();
const targetDirs = [
  join(root, 'public/assets/home'),
  join(root, 'public/assets/pcback'),
  join(root, 'public/assets/pstyle'),
];

const walk = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (entry.isFile() && extname(entry.name).toLowerCase() === '.avi') {
      files.push(fullPath);
    }
  }

  return files;
};

const convert = (inputPath) => {
  const outputPath = inputPath.replace(/\.avi$/i, '.mp4');

  if (existsSync(outputPath)) {
    console.log(`Skipping existing converted file: ${outputPath}`);
    return;
  }

  console.log(`Converting: ${inputPath} -> ${outputPath}`);

  const result = spawnSync(
    ffmpegPath,
    [
      '-y',
      '-i',
      inputPath,
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-an',
      outputPath,
    ],
    {
      stdio: 'inherit',
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`FFmpeg failed for ${inputPath} with exit code ${result.status}`);
  }
};

for (const targetDir of targetDirs) {
  if (!existsSync(targetDir)) {
    console.log(`Skipping missing directory: ${targetDir}`);
    continue;
  }

  const files = walk(targetDir);

  if (files.length === 0) {
    console.log(`No AVI files found in ${targetDir}`);
    continue;
  }

  for (const file of files) {
    convert(file);
  }
}

console.log('AVI conversion completed.');
