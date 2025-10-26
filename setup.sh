#!/bin/bash

# Challenge Cara App Ver 2.0 Setup Script

echo "=== Challenge Cara App Ver 2.0 セットアップ ==="
echo ""

# 1. 仮想環境の作成
echo "1. 仮想環境を作成中..."
python -m venv venv

# 2. 仮想環境のアクティベート
echo "2. 仮想環境をアクティベート中..."
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# 3. 依存関係のインストール
echo "3. 依存関係をインストール中..."
pip install --upgrade pip
pip install -r requirements.txt

# 4. データベースのマイグレーション
echo "4. データベースのマイグレーション中..."
python manage.py makemigrations
python manage.py migrate

echo ""
echo "=== セットアップ完了! ==="
echo ""
echo "サーバーを起動するには以下のコマンドを実行してください:"
echo "  python manage.py runserver"
echo "または"
echo "  npm run dev"
echo ""
echo "ブラウザで http://localhost:8000 にアクセスしてください。"
