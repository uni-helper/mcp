import { expect, it } from 'vitest'
import { loadVectorStore } from '../src/docs'

it('should load vector store', async () => {
  const vectorStore = await loadVectorStore('uniapp')
  const result = await vectorStore.similaritySearch('路由跳转传参', 1)
  expect(result[0].pageContent).toBeDefined()
})
