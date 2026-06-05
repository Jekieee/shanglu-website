# 将 F:\剧本杀\上路\上路-website 推送到 GitHub Pages
# 用法：在 PowerShell 中运行 .\deploy.ps1

$src = "F:\剧本杀\上路\上路-website"
$deploy = Join-Path $env:TEMP "shanglu-deploy"

if (-not (Test-Path $src)) {
    Write-Error "找不到网站目录: $src"
    exit 1
}

if (Test-Path $deploy) { Remove-Item -Recurse -Force $deploy }
New-Item -ItemType Directory -Force -Path $deploy | Out-Null
Copy-Item -Path "$src\*" -Destination $deploy -Recurse -Force

if (-not (Test-Path "$deploy\.nojekyll")) {
    "" | Out-File -FilePath "$deploy\.nojekyll" -Encoding ascii
}

Set-Location $deploy

if (-not (Test-Path .git)) {
    git init
    git remote add origin https://github.com/Jekieee/shanglu-website.git
    git branch -M main
}

git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Update shanglu website"
    git push -u origin main
    Write-Host "已推送到 GitHub，Pages 约 1-2 分钟后生效。" -ForegroundColor Green
} else {
    Write-Host "没有需要提交的更改。" -ForegroundColor Yellow
}

Write-Host "访问: https://jekieee.github.io/shanglu-website/"
