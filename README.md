# UniAPP MCP

> 访问 [uni-helper/skills](https://github.com/uni-helper/skills) 获取 `skills`

使用 `MCP + RAG` 方案来查询 uniapp 文档。

## 安装
> 由于向量数据库及模型文件较大，npx 安装耗时较长，建议全局安装。

```bash
pnpm i @uni-helper/mcp -g
```

## 配置 MCP 服务器
```json
{
  "mcpServers": {
    "uni-doc": {
      "command": "uni-mcp"
    }
  }
}
```
