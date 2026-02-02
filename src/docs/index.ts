import type { PretrainedOptions } from '@huggingface/transformers'
import type { EmbeddingsInterface } from '@langchain/core/embeddings'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from '@huggingface/transformers'
import { connect } from '@lancedb/lancedb'
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'
import { LanceDB } from '@langchain/community/vectorstores/lancedb'

const __dirname = dirname(fileURLToPath(import.meta.url))
type VectorStoreName = 'uniapp'

export async function loadVectorStore(vectorName: VectorStoreName, _embeddings?: EmbeddingsInterface) {
  const vectorMap = {
    uniapp: {
      dir: join(__dirname, '../../', 'vectorStore'),
      tableName: 'uniapp_docs',
    },
  }

  const vectorDir = vectorMap[vectorName].dir

  const db = await connect(vectorDir)
  const table = await db.openTable(vectorMap[vectorName].tableName)

  env.version = 'master'
  env.remoteHost = 'https://www.modelscope.cn/models'
  const embeddings = _embeddings ?? new HuggingFaceTransformersEmbeddings({
    model: 'onnx-community/Qwen3-Embedding-0.6B-ONNX',
    pretrainedOptions: {
      dtype: 'int8',
      device: 'cpu',
    } as PretrainedOptions,
  })

  return new LanceDB(embeddings, {
    table,
    uri: vectorDir,
    tableName: vectorMap[vectorName].tableName,
  })
}
