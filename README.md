# Challenge Cara App Ver 2.0

Challenge Cara アプリケーションへようこそ！

## 概要

このプロジェクトは、再就職支援を目的とした革新的なWebアプリケーションです。

---

## 🚀 クイックスタート（サーバー起動まで）

### 方法1: npm run devで起動

```bash
# 1. プロジェクトディレクトリに移動
cd challecara_app_ver2

# 2. 仮想環境をアクティベート
# Windowsの場合
venv\Scripts\activate

# 3. 依存関係をインストール
pip install -r requirements.txt

# 4. データベースのマイグレーション
npm run migrate

# 5. npm run devでサーバー起動
npm run dev
```

### 方法2: Djangoコマンドで起動

```bash
# 1. プロジェクトディレクトリに移動
cd challecara_app_ver2

# 2. 仮想環境をアクティベート
venv\Scripts\activate

# 3. 依存関係をインストール
pip install -r requirements.txt

# 4. データベースのマイグレーション
python manage.py migrate

# 5. Djangoサーバーを起動
python manage.py runserver
```

### ブラウザでアクセス
- メインページ: http://localhost:8000
- 管理画面: http://localhost:8000/admin

---

## 技術スタック

- **Backend**: Python 3.8+ with Django 4.2 LTS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: SQLite (開発環境), PostgreSQL/MySQL (本番環境)
- **Development Tools**: ESLint, Prettier, Black, Flake8
- **Testing**: pytest, pytest-django

### ローカル環境での起動方法

#### 1. リポジトリのクローン

```bash
git clone https://github.com/koshiro-y-0/challecara_app_ver2.0.git
cd challecara_app_ver2.0
```

#### 2. 仮想環境の作成（推奨）

```bash
# Windowsの場合
python -m venv venv
venv\Scripts\activate

# macOS/Linuxの場合
python3 -m venv venv
source venv/bin/activate
```

#### 3. 依存関係のインストール

```bash
# Python依存関係のインストール
pip install -r requirements.txt

# フロントエンド開発ツールのインストール (任意)
npm install
```

#### 4. データベースのマイグレーション

```bash
# マイグレーションファイルを作成
python manage.py makemigrations

# データベースに適用
python manage.py migrate

# 管理者ユーザーの作成（任意）
python manage.py createsuperuser
```

#### 5. 開発サーバーの起動

```bash
python manage.py runserver
```

開発サーバーは **[http://localhost:8000](http://localhost:8000)** で起動します。

ブラウザで `http://localhost:8000` にアクセスしてアプリケーションを確認できます。

管理画面は `http://localhost:8000/admin` からアクセスできます。

#### 6. 開発サーバーの停止

```
Ctrl + C でサーバーを停止できます
```

## 開発環境のセットアップ

### 前提条件

- Python 3.8 以上
- pip (Python package manager)
- Node.js 14.0.0 以上 (開発ツール用)

### 環境変数の設定

```bash
# .env.exampleをコピーして.envファイルを作成（任意）
cp .env.example .env

# .envファイルを編集して適切な値を設定
# DEBUG=True
# DJANGO_SECRET_KEY=your-secret-key-here
# ALLOWED_HOSTS=localhost,127.0.0.1
```

## 利用可能なスクリプト

### npm scripts

- `npm run dev` または `npm start` - 開発サーバーを起動
- `npm run migrate` - データベースマイグレーションを実行
- `npm run makemigrations` - マイグレーションファイルを作成
- `npm run createsuperuser` - 管理者ユーザーを作成
- `npm run collectstatic` - 静的ファイルを収集

### Django管理コマンド

- `python manage.py runserver` - 開発サーバーを起動
- `python manage.py makemigrations` - マイグレーションファイルを作成
- `python manage.py migrate` - データベースマイグレーションを実行
- `python manage.py createsuperuser` - 管理者ユーザーを作成
- `python manage.py collectstatic` - 静的ファイルを収集

### テストとコード品質

- `pytest` - テストを実行
- `pytest --cov=main` - カバレッジ付きでテスト実行
- `flake8 .` - コードスタイルをチェック
- `black .` - コードフォーマットを実行

### JavaScript (任意)

- `npm run lint:js` - JavaScriptのコードチェック
- `npm run format` - コードフォーマット
- `npm run serve` - 静的ファイルサーバーを起動

## プロジェクト構造

```
challecara_app_ver2/
├── manage.py           # Djangoコマンドラインツール
├── requirements.txt    # Python依存関係
├── package.json        # npm scripts設定
├── .gitignore         # Git無視ファイル
├── config/            # プロジェクト設定
│   ├── __init__.py
│   ├── settings.py    # Django設定
│   ├── urls.py        # ルートURLconf
│   ├── wsgi.py        # WSGI設定
│   └── asgi.py        # ASGI設定
├── main/              # メインアプリケーション
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py      # データモデル
│   ├── views.py       # ビュー関数
│   ├── urls.py        # URLルーティング
│   ├── admin.py       # 管理サイト設定
│   └── migrations/    # データベースマイグレーション
├── templates/         # HTMLテンプレート
│   ├── base.html
│   ├── home.html
│   ├── documents.html
│   ├── document_detail.html
│   ├── document_edit.html
│   ├── settings.html
│   └── feature-demo.html
├── static/            # 静的ファイル
│   ├── css/
│   │   ├── base.css
│   │   └── style.css
│   └── js/
│       ├── app.js
│       ├── character-counter.js
│       ├── document-filter.js
│       ├── file-upload.js
│       └── toast.js
├── db.sqlite3         # SQLiteデータベース（開発環境）
└── README.md
```

## URL エンドポイント

- `GET /` - ホームページ
- `GET /documents/` - 書類一覧ページ
- `GET /documents/<id>/` - 書類詳細ページ
- `GET /documents/<id>/edit/` - 書類編集ページ
- `POST /documents/<id>/edit/` - 書類更新処理
- `GET /settings/` - 設定ページ
- `GET /feature-demo/` - 機能デモページ
- `GET /admin/` - 管理画面

## 開発ガイドライン

### コードスタイル

- Python: PEP 8に従い、Blackでフォーマット
- JavaScript: ESLintの設定に従う
- CSS: BEMメソドロジーを推奨

### テスト

```bash
# 全てのテストを実行
pytest

# カバレッジレポート付きでテスト実行
pytest --cov=main

# Djangoのテストランナーを使う場合
python manage.py test
```

## 貢献

このプロジェクトへの貢献を歓迎します。プルリクエストを送信する前に、以下を確認してください：

1. `flake8 .` でPythonコードスタイルをチェック
2. `black .` でコードフォーマットを実行
3. `pytest` でテストが通ることを確認
4. 新機能には適切なテストを追加

## 注意事項

- **app.py は削除してください**: このプロジェクトは Flask から Django に移行しました。古い `app.py` ファイルが残っている場合は手動で削除してください。
- **ポート番号の変更**: Flask は 5000番ポート、Django は 8000番ポートをデフォルトで使用します。
- **静的ファイル**: 本番環境では `python manage.py collectstatic` を実行して静的ファイルを収集してください。

## ライセンス

MIT