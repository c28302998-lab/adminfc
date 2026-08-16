const fs = require('fs');
const readline = require('readline');

async function analyze() {
  const logPath = '/Users/thf/.gemini/antigravity/brain/1ffb3a38-d69a-4f7a-a95c-6200ff0f4ccc/.system_generated/logs/transcript_full.jsonl';
  
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const output = [];
  let stepsCount = 0;

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'write_to_file' || call.name === 'default_api:write_to_file' || 
              call.name === 'replace_file_content' || call.name === 'default_api:replace_file_content' ||
              call.name === 'multi_replace_file_content' || call.name === 'default_api:multi_replace_file_content') {
            
            const target = call.arguments.TargetFile || call.arguments.targetFile || "unknown";
            if (target.includes('src/components') || target.includes('src/index.css')) {
               output.push(`Step: ${entry.step_index}, Tool: ${call.name}, File: ${target}`);
               output.push(`Content: ${JSON.stringify(call.arguments).substring(0, 200)}...\n`);
            }
          }
        }
      }
    } catch (e) {}
    
    stepsCount++;
    if (stepsCount > 500) break; // only look at the first 500 steps
  }

  fs.writeFileSync('/Users/thf/.gemini/antigravity/scratch/football-challenge-academy/early_tools.txt', output.join('\n'));
}

analyze().catch(console.error);
