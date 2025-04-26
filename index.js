#!/usr/bin/env node

import { copy } from 'fs-extra';
import prompts from 'prompts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('🚀 Welcome to Hackathon Starter Setup!');

  const response = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'What is your project name?',
    initial: 'my-hackathon-project'
  });

  const projectRoot = path.resolve(process.cwd(), response.projectName);

  await copy(path.join(__dirname, 'template', 'frontend'), path.join(projectRoot, 'frontend'));
  console.log('✅ Frontend ready!');


  await copy(path.join(__dirname, 'template', 'backend'), path.join(projectRoot, 'backend'));
  console.log('✅ Backend ready!');

  console.log(`\n🎉 All Done! Now:\n`);
  console.log(`cd ${response.projectName}`);
  console.log(`cd frontend && npm install`);
  console.log(`cd backend && npm install`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
