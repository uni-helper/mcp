import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { LanceDB } from '@langchain/community/vectorstores/lancedb'
import { OllamaEmbeddings } from '@langchain/ollama'
import { MarkdownTextSplitter } from '@langchain/textsplitters'
import consola from 'consola'
import { WebToMarkdownLoader } from './MDfromWebLoader.ts'

async function main() {
  const embeddings = new OllamaEmbeddings({
    model: 'qwen3-embedding:0.6b',
    baseUrl: 'http://localhost:11434',
  })

  consola.start('加载文档')
  const contentSelector = '.content__default'
  const webLoader = new WebToMarkdownLoader(
    'https://uniapp.dcloud.net.cn/sitemap.xml',
    {
      selector: contentSelector,
    },
  )

  const allDocs = await webLoader.load()
  consola.success('文档加载完成')

  const splitter = new MarkdownTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 300,
  })

  const vectorDir = join(process.cwd(), 'vectorStore')

  if (!existsSync(vectorDir)) {
    mkdirSync(vectorDir, { recursive: true })
  }

  const vectorStore = await LanceDB.fromDocuments([], embeddings, {
    uri: vectorDir,
    tableName: 'uniapp_docs',
    mode: 'overwrite',
  })

  const BATCH_SIZE = 10
  for (let i = 0; i < allDocs.length; i += BATCH_SIZE) {
    const batch = allDocs.slice(i, i + BATCH_SIZE)
    const docsToAdd: typeof allDocs = []
    for (const doc of batch) {
      if (doc.pageContent.length >= 4000) {
        const splitDocs = await splitter.splitDocuments([doc])
        docsToAdd.push(...splitDocs)
      }
      else {
        docsToAdd.push(doc)
      }
    }
    consola.info(`处理批次 ${Math.min(i + BATCH_SIZE, allDocs.length)}/${allDocs.length}`)
    await vectorStore.addDocuments(docsToAdd)
  }
  consola.success('向量数据库保存完成')
}
main()
