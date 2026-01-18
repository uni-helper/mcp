#!/usr/bin/env node

import { Command } from 'commander'
import { version } from '../package.json'
import { mcp } from './mcp'
import { skills } from './skills'

async function main() {
  const program = new Command()
    .name('@uni-helper/ai-tools')
    .description('provide ai development experience for uniapp')
    .version(
      version || '1.0.0',
      '-v, --version',
      'display the version number',
    )
  program
    .addCommand(mcp)
    .addCommand(skills)

  program.parse()
}

main()
