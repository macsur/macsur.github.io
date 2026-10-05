/**
 * 🌟 ✦ 量子礼花 · 猜你喜欢 ✦ 彩蛋专属数据
 * 包含：6 个固定精选友情链接 + 3 个来自 VPNGate 严格筛选的 L2TP/IPsec 优质节点
 */

export interface EasterEggItem {
  id: number;
  text: string;
  url: string | null;
  isReal: boolean;
  label: string;
  delay: string;
  floatDelay: string;
  color: string;
  border: string;
  glow: string;
}

export const EASTER_EGG_ITEMS: EasterEggItem[] = [
  {
    "id": 1,
    "text": "kejilion.sh",
    "url": "https://kejilion.sh",
    "isReal": false,
    "label": "科技Lion · kejilion.sh",
    "delay": "0.04s",
    "floatDelay": "0s",
    "color": "from-cyan-500/20 to-blue-600/10",
    "border": "border-cyan-500/40",
    "glow": "shadow-cyan-500/20"
  },
  {
    "id": 2,
    "text": "apple.com",
    "url": "https://apple.com",
    "isReal": false,
    "label": "苹果官网 · apple.com",
    "delay": "0.10s",
    "floatDelay": "1.2s",
    "color": "from-violet-500/20 to-indigo-600/10",
    "border": "border-violet-500/40",
    "glow": "shadow-violet-500/20"
  },
  {
    "id": 3,
    "text": "sina.com.cn",
    "url": "https://sina.com.cn",
    "isReal": false,
    "label": "新浪网 · sina.com.cn",
    "delay": "0.16s",
    "floatDelay": "0.6s",
    "color": "from-indigo-500/20 to-purple-600/10",
    "border": "border-indigo-500/40",
    "glow": "shadow-indigo-500/20"
  },
  {
    "id": 4,
    "text": "x.zttz.eu.org",
    "url": "https://x.zttz.eu.org",
    "isReal": false,
    "label": "Linux生态 · x.zttz.eu.org",
    "delay": "0.22s",
    "floatDelay": "1.8s",
    "color": "from-sky-500/20 to-cyan-600/10",
    "border": "border-sky-500/40",
    "glow": "shadow-sky-500/20"
  },
  {
    "id": 5,
    "text": "bbs.pcbeta.com",
    "url": "https://bbs.pcbeta.com",
    "isReal": false,
    "label": "远景论坛 · bbs.pcbeta.com",
    "delay": "0.28s",
    "floatDelay": "0.9s",
    "color": "from-teal-500/20 to-emerald-600/10",
    "border": "border-teal-500/40",
    "glow": "shadow-teal-500/20"
  },
  {
    "id": 6,
    "text": "feishu.cn",
    "url": "https://feishu.cn",
    "isReal": false,
    "label": "飞书 · feishu.cn",
    "delay": "0.34s",
    "floatDelay": "2.1s",
    "color": "from-blue-500/20 to-cyan-600/10",
    "border": "border-blue-500/40",
    "glow": "shadow-blue-500/20"
  },
  {
    "id": 7,
    "text": "73.231.88.34",
    "url": null,
    "isReal": true,
    "label": "[US] L2TP/IPsec 节点 (8 Sessions)",
    "delay": "0.40s",
    "floatDelay": "1.5s",
    "color": "from-rose-500/25 to-red-600/10",
    "border": "border-rose-400/60",
    "glow": "shadow-rose-500/30"
  },
  {
    "id": 8,
    "text": "136.85.57.165",
    "url": null,
    "isReal": true,
    "label": "[US] L2TP/IPsec 节点 (30 Sessions)",
    "delay": "0.46s",
    "floatDelay": "0.3s",
    "color": "from-amber-500/25 to-orange-600/10",
    "border": "border-amber-400/60",
    "glow": "shadow-amber-500/30"
  },
  {
    "id": 9,
    "text": "27.130.34.23",
    "url": null,
    "isReal": true,
    "label": "[TH] L2TP/IPsec 节点 (0 Sessions)",
    "delay": "0.52s",
    "floatDelay": "2.4s",
    "color": "from-emerald-500/25 to-teal-600/10",
    "border": "border-emerald-400/60",
    "glow": "shadow-emerald-500/30"
  }
];
