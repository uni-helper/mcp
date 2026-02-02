import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import which from 'which'

if (process.env.CI) {
  process.exit(0)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function linkGlobal() {
  const resolvedOrNull = await which('uni-mcp', { nothrow: true })
  const rootDir = join(__dirname, '..')
  consola.start('正在安装 @uni-helper/mcp')

  if (resolvedOrNull) {
    try {
      execSync('npm unlink -g uni-mcp', {
        cwd: rootDir,
        stdio: 'ignore',
        shell: true,
      })
    }
    catch (err) {
      consola.error('清除旧链接失败:', err.message)
      process.exit(1)
    }
  }

  try {
    execSync('npm link -y --ignore-scripts', {
      cwd: rootDir,
      stdio: 'ignore',
      shell: true,
    })
    consola.success('安装成功')
    consola.info(`MCP 配置示例：
{
  "mcpServers": {
    "uni-doc": {
      "command": "uni-mcp"
    }
  }
}`)
  }
  catch (err) {
    consola.error('全局链接失败:', err.message)
    process.exit(1)
  }
}

linkGlobal()
