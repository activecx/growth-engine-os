# ==========================================
# TopK Agent OS — Sync Local → Google Drive
# Run this after making changes to push back
# to the single source of truth.
# ==========================================
$src = "C:\Users\USER\.topk-dev\dashboard"
$dest = "G:\My Drive\Zaid Claw\topk-agent-os\03-dashboard"

Write-Host "Syncing changes to Google Drive..." -ForegroundColor Green

# Sync src folder
robocopy "$src\src" "$dest\src" /E /MT:8 /MIR /NJH /NJS /XD node_modules .next

# Sync public folder
robocopy "$src\public" "$dest\public" /E /MT:8 /MIR /NJH /NJS /XD node_modules .next

# Sync data folder
if (Test-Path "$src\data") {
    robocopy "$src\data" "$dest\data" /E /MT:8 /MIR /NJH /NJS
}

# Sync key config files
copy "$src\package.json" "$dest\package.json" -Force
copy "$src\next.config.ts" "$dest\next.config.ts" -Force
copy "$src\tsconfig.json" "$dest\tsconfig.json" -Force
copy "$src\postcss.config.mjs" "$dest\postcss.config.mjs" -Force
copy "$src\eslint.config.mjs" "$dest\eslint.config.mjs" -Force
copy "$src\.env.local" "$dest\.env.local" -Force

Write-Host "`nDone! Source of truth updated at:" -ForegroundColor Green
Write-Host $dest -ForegroundColor Cyan
