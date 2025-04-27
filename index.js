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

  
  await copy(path.join(__dirname, 'template', 'client'), path.join(projectRoot, 'client'));
  console.log('✅ Frontend (client) ready!');


  await copy(path.join(__dirname, 'template', 'server'), path.join(projectRoot, 'server'));
  console.log('✅ Backend (server) ready!');

  console.log(`\n🎉 All Done! Now:\n`);
  console.log(`cd ${response.projectName}`);
  console.log(`cd client && npm install`);
  console.log(`cd server && npm install`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
