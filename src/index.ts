#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createMcpServer } from './server'

async function main() {
  const server = await createMcpServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch(console.error)
