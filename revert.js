const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function revert() {
  const logPath = '/Users/thf/.gemini/antigravity/brain/1ffb3a38-d69a-4f7a-a95c-6200ff0f4ccc/.system_generated/logs/transcript_full.jsonl';
  const targetDir = '/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/src';
  
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const originalContents = {};

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'default_api:write_to_file' || call.name === 'write_to_file') {
            const targetFile = call.arguments.TargetFile;
            if (targetFile && targetFile.startsWith(targetDir)) {
              if (!originalContents[targetFile]) {
                // Store the very first version of this file
                originalContents[targetFile] = call.arguments.CodeContent;
              }
            }
          }
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  console.log(`Found original contents for ${Object.keys(originalContents).length} files.`);
  
  for (const [file, content] of Object.entries(originalContents)) {
    console.log(`Reverting ${file}...`);
    fs.writeFileSync(file, content);
  }
  
  console.log('Revert complete.');
}

revert().catch(console.error);
