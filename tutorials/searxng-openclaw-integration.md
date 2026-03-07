# SearXNG 对接 Openclaw 教程
> 适用于：科技lion脚本（kejilion.sh）安装的 SearXNG + Nginx 环境

---

## 前置条件

- 已通过科技lion脚本安装 SearXNG（Docker 容器运行）
- 已绑定域名并配置 SSL（如 `https://s.136222.xyz`）
- 已 SSH 登录服务器

---

## 第一步：确认 SearXNG 正常运行

```bash
# 查看容器状态和端口映射
docker ps | grep searxng

# 直接测试后端是否响应（8029 替换为实际宿主机端口）
curl -I http://127.0.0.1:8029
```

预期：返回 `HTTP/1.1 200 OK`

---

## 第二步：修改 settings.yml 配置

配置文件路径：`/home/docker/searxng/settings.yml`

### 2.1 设置正确的域名和语言

```bash
# 确认 base_url 已设置为你的域名
grep "base_url\|default_locale\|formats" /home/docker/searxng/settings.yml | head -10
```

关键配置应为：
```yaml
server:
  base_url: "https://s.136222.xyz"   # 你的域名

ui:
  default_locale: "zh-Hans"          # 中文界面（注意不是 zh）

search:
  formats:
    - html
    - json                           # 必须启用 json 格式
```

### 2.2 启用 JSON 格式（对接 Openclaw 必须）

```bash
# 添加 json 格式支持
sed -i '/formats:/,/^[^ ]/{ /- html/a\    - json
}' /home/docker/searxng/settings.yml

# 验证
grep -A4 "formats:" /home/docker/searxng/settings.yml
```

### 2.3 设置默认语言为中文

```bash
sed -i 's/default_locale: ""/default_locale: "zh-Hans"/' /home/docker/searxng/settings.yml
```

> ⚠️ **注意**：语言代码必须是 `zh-Hans`，不能写 `zh`，否则容器会报错崩溃。

### 2.4 重启容器使配置生效

```bash
docker restart searxng && sleep 8 && curl -I https://s.136222.xyz
```

预期：返回 `HTTP/2 200`

---

## 第三步：验证 JSON 接口可用

```bash
curl -s "https://s.136222.xyz/search?q=测试&format=json" | python3 -m json.tool | head -20
```

预期：返回包含 `query`、`results` 字段的 JSON 数据

---

## 第四步：添加 Nginx Token 验证（可选但推荐）

保护 API 接口，仅允许携带 Token 的客户端调用。

### 4.1 找到 Nginx 配置文件

```bash
find / -name "*.conf" 2>/dev/null | xargs grep -l "你的域名关键字" 2>/dev/null
# 通常路径为：/home/web/conf.d/s.136222.xyz.conf
```

### 4.2 备份原始配置

```bash
cp /home/web/conf.d/s.136222.xyz.conf /home/web/conf.d/s.136222.xyz.conf.bak
```

### 4.3 在配置文件顶部添加 map 块

在 `upstream` 块**之前**插入以下内容（修改 `YOUR_TOKEN` 为自定义值）：

```nginx
map "$arg_format:$http_authorization" $api_access {
    ~^json:Bearer\ YOUR_TOKEN    1;   # json格式 + 正确Token → 允许
    ~^json:                      0;   # json格式 + 无Token   → 拒绝
    default                      1;   # 浏览器访问（html）   → 允许
}
```

### 4.4 在 `location /` 块开头添加验证

```nginx
location / {
    if ($api_access = 0) {
        return 403 '{"error":"Unauthorized","message":"API key required"}';
    }
    # ... 其余 proxy 配置保持不变
}
```

### 4.5 测试配置并重载 Nginx

```bash
# 科技lion的 Nginx 在 Docker 容器中，容器名为 nginx
docker exec nginx nginx -t && docker exec nginx nginx -s reload
```

### 4.6 验证 Token 是否生效

```bash
# ❌ 无 Token → 返回 403
curl -s "https://s.136222.xyz/search?q=test&format=json"

# ✅ 带 Token → 返回正常数据
curl -s "https://s.136222.xyz/search?q=test&format=json" \
  -H "Authorization: Bearer YOUR_TOKEN"

# ✅ 浏览器访问不受影响
curl -I "https://s.136222.xyz"
```

---

## 对接 Openclaw 的完整信息

| 项目 | 值 |
|------|-----|
| 接口地址 | `https://s.136222.xyz/search` |
| 请求方式 | `GET` |
| 参数 | `?q={搜索词}&format=json&language=zh-CN` |
| 请求头 | `Authorization: Bearer YOUR_TOKEN` |

**示例调用：**
```bash
curl "https://s.136222.xyz/search?q=人工智能&format=json&language=zh-CN" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| HTTP 500 | `settings.yml` 中 `default_locale: "zh"` 格式错误 | 改为 `"zh-Hans"` |
| HTTP 502 | Nginx 代理端口与容器端口不匹配 | 确认容器端口映射后检查 `nginx.conf` 的 `proxy_pass` |
| JSON 返回 403 | `formats` 中未启用 `json` | 在 `settings.yml` 的 `formats` 中添加 `- json` |
| nginx 命令找不到 | 科技lion的 Nginx 在 Docker 中 | 使用 `docker exec nginx nginx -s reload` |
