#!/bin/bash
# MacSur 文档站启动脚本

echo "=== MacSur 文档站 ==="
echo "源目录: $(pwd)"
echo "启动服务: http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

cd "$(dirname "$0")"
docsify serve . --open false
