#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHD_DIR="$HOME/Library/LaunchAgents"
mkdir -p "$LAUNCHD_DIR"
mkdir -p "${REPO_DIR}/logs"

DIGEST_PLIST="$LAUNCHD_DIR/org.macsur.morningdigest.generate0500.plist"
SEND_PLIST="$LAUNCHD_DIR/org.macsur.morningdigest.send0900.plist"

cat > "$DIGEST_PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>org.macsur.morningdigest.generate0500</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${REPO_DIR}/scripts/run_morning_digest_0500_and_push.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>5</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>${REPO_DIR}/logs/morningdigest_generate0500.out.log</string>
  <key>StandardErrorPath</key><string>${REPO_DIR}/logs/morningdigest_generate0500.err.log</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
PLIST

cat > "$SEND_PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>org.macsur.morningdigest.send0900</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${REPO_DIR}/scripts/send_telegram_digest_0900.sh</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>TG_BOT_TOKEN</key><string>${TG_BOT_TOKEN:-}</string>
    <key>TG_CHAT_ID</key><string>${TG_CHAT_ID:-}</string>
  </dict>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>9</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>${REPO_DIR}/logs/morningdigest_send0900.out.log</string>
  <key>StandardErrorPath</key><string>${REPO_DIR}/logs/morningdigest_send0900.err.log</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
PLIST

launchctl unload "$DIGEST_PLIST" 2>/dev/null || true
launchctl unload "$SEND_PLIST" 2>/dev/null || true
launchctl load "$DIGEST_PLIST"
launchctl load "$SEND_PLIST"

echo "Installed launchd jobs:"
echo "- org.macsur.morningdigest.generate0500 (05:00)"
echo "- org.macsur.morningdigest.send0900 (09:00)"

echo "NOTE: This installer embeds TG_BOT_TOKEN/TG_CHAT_ID from current environment into the plist."
echo "If you prefer not to store token in plist, we can switch to a keychain-based loader."
