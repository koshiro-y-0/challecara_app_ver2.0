# インストールガイド

## 前提条件

- Python 3.8以上
- Git
- Node.js (オプション、npm run devを使用する場合)

## セットアップ手順

### 方法1: 自動セットアップスクリプトを使用

#### Windows

```bash
setup.bat
```

#### macOS/Linux

```bash
chmod +x setup.sh
./setup.sh
```

### 方法2: 手動セットアップ

#### 1. リポジトリのクローン

```bash
git clone https://github.com/koshiro-y-0/challecara_app_ver2.0.git
cd challecara_app_ver2.0
```

#### 2. 仮想環境の作成とアクティベート

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. 依存関係のインストール

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 4. データベースのマイグレーション

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 5. 管理者ユーザーの作成（オプション）

```bash
python manage.py createsuperuser
```

#### 6. 開発サーバーの起動

**方法A: Djangoコマンドで起動**
```bash
python manage.py runserver
```

**方法B: npm scriptsで起動**
```bash
npm run dev
```

#### 7. ブラウザでアクセス

- メインページ: http://localhost:8000
- 管理画面: http://localhost:8000/admin

## Githubへのプッシュ手順

### 新規リポジトリの場合

```bash
# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "feat: Django プロジェクト Ver 2.0 初期セットアップ

- Djangoプロジェクト構造を追加
- npm scriptsでサーバー起動可能に
- テンプレートと静的ファイルを整理
- README とセットアップスクリプトを追加"

# リモートリポジトリを追加
git remote add origin https://github.com/koshiro-y-0/challecara_app_ver2.0.git

# mainブランチを作成してプッシュ
git branch -M main
git push -u origin main
```

### 既存リポジトリの場合

```bash
# すべてのファイルを追加
git add .

# コミット
git commit -m "feat: プロジェクト更新"

# プッシュ
git push
```

## トラブルシューティング

### Python が見つからない場合

- Pythonがインストールされているか確認: `python --version` または `python3 --version`
- Pythonのパスが環境変数に追加されているか確認

### pip のインストールエラー

```bash
python -m pip install --upgrade pip
```

### データベースマイグレーションエラー

```bash
# マイグレーションファイルを削除して再作成
python manage.py makemigrations --empty main
python manage.py migrate
```

### ポートが既に使用されている

```bash
# 別のポートで起動
python manage.py runserver 8080
```
