# [WIP]UniAPP AI Tools

## 安装

```bash
pnpm add @uni-helper/ai-tools -D
```

## 配置

## 配置 MCP 服务器
```json
{
  "mcpServers": {
    "uni": {
      "url": "http://localhost:2515/mcp"
    }
  }
}
```

## 注意如果使用pnpm，请在`pnpm-workspace.yaml`中添加如下配置：
确保能正确构建`@uni-helper/ai-tools`插件
```yaml
onlyBuiltDependencies:
  - hnswlib-node
  - '@uni-helper/ai-tools'
```
