export CHROME_PATH='/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
npx @marp-team/marp-cli@latest -I . --o . --html
npx @marp-team/marp-cli@latest -I . --o pdf/ --pdf --allow-local-files --pdf-outlines --pdf-outlines.pages=false --html