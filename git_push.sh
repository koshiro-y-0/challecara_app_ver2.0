#!/bin/bash

# Githubにプッシュするスクリプト

echo "=== Challenge Cara App Ver 2.0 を Githubにプッシュ ==="
echo ""

# 1. Gitリポジトリを初期化
echo "1. Gitリポジトリを初期化中..."
git init

# 2. すべてのファイルを追加
echo "2. ファイルをステージング中..."
git add .

# 3. 初回コミット
echo "3. コミット作成中..."
git commit -m "feat: Django プロジェクト Ver 2.0 初期セットアップ

- Djangoプロジェクト構造を追加
- npm scriptsでサーバー起動可能に
- テンプレートと静的ファイルを整理
- README とセットアップスクリプトを追加"

# 4. リモートリポジトリを追加
echo "4. リモートリポジトリを設定中..."
git remote add origin https://github.com/koshiro-y-0/challecara_app_ver2.0.git

# 5. mainブランチを作成してプッシュ
echo "5. Githubにプッシュ中..."
git branch -M main
git push -u origin main

echo ""
echo "=== 完了! ==="
echo ""
echo "リポジトリURL: https://github.com/koshiro-y-0/challecara_app_ver2.0"
