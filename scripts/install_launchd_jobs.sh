#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCHD_DIR="$HOME/Library/LaunchAgents"
mkdir -p "$LAUNCHD_DIR"

DIGEST_PLIST="$LAUNCHD_DIR/org.macsur.dailynews.digest.plist"
BROADCAST_PLIST="$LAUNCHD_DIR/org.macsur.dailynews.broadcast.plist"

cat > "$DIGEST_PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>org.macsur.dailynews.digest</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${REPO_DIR}/scripts/run_daily_digest_and_push.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>6</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>${REPO_DIR}/logs/dailynews_digest.out.log</string>
  <key>StandardErrorPath</key><string>${REPO_DIR}/logs/dailynews_digest.err.log</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
PLIST

cat > "$BROADCAST_PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>org.macsur.dailynews.broadcast</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${REPO_DIR}/scripts/run_morning_broadcast.sh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key><integer>7</integer>
    <key>Minute</key><integer>0</integer>
  </dict>
  <key>StandardOutPath</key><string>${REPO_DIR}/logs/dailynews_broadcast.out.log</string>
  <key>StandardErrorPath</key><string>${REPO_DIR}/logs/dailynews_broadcast.err.log</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
PLIST

mkdir -p "${REPO_DIR}/logs"

# (Re)load
launchctl unload "$DIGEST_PLIST" 2>/dev/null || true
launchctl unload "$BROADCAST_PLIST" 2>/dev/null || true
launchctl load "$DIGEST_PLIST"
launchctl load "$BROADCAST_PLIST"

echo "Installed launchd jobs:" 
echo "- org.macsur.dailynews.digest (06:00)"
echo "- org.macsur.dailynews.broadcast (07:00)"
