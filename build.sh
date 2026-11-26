#!/bin/sh
# Builds the release packages from a git ref (default: HEAD) into dist/:
#   youtube-fresh-feed-<version>.zip          Chrome: unzip and "Load unpacked"
#   youtube-fresh-feed-<version>-firefox.zip  Firefox: upload to addons.mozilla.org for signing
#   firefox/                                  the same unpacked, for about:debugging and ./sign-firefox.sh
# Usage: ./build.sh [ref]
set -eu
cd "$(dirname "$0")"
ref=${1:-HEAD}
files="manifest.json content.js content.css i18n.js popup.html popup.js popup.css _locales icons LICENSE"
version=$(git show "$ref:manifest.json" | node -p 'JSON.parse(require("fs").readFileSync(0, "utf8")).version')

rm -rf dist && mkdir -p dist/firefox
git archive --format=zip --prefix=youtube-fresh-feed/ -o "dist/youtube-fresh-feed-$version.zip" "$ref" $files

# Firefox needs an add-on ID and the data collection declaration; manifest.json must sit at the top of the ZIP
git archive "$ref" $files | tar -x -C dist/firefox
node -e '
  const fs = require("fs"), file = process.argv[1], m = JSON.parse(fs.readFileSync(file, "utf8"));
  m.browser_specific_settings = { gecko: {
    id: "youtube-fresh-feed@comax424.github.io",
    strict_min_version: "142.0",
    data_collection_permissions: { required: ["none"] },
  } };
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + "\n");
' dist/firefox/manifest.json
(cd dist/firefox && zip -qrX "../youtube-fresh-feed-$version-firefox.zip" .)

ls -l dist/*.zip
