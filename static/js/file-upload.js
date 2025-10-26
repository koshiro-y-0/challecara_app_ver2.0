// File Upload System with Drag & Drop

class FileUploader {
    constructor(options = {}) {
        this.options = {
            maxSize: options.maxSize || 10 * 1024 * 1024, // 10MB
            allowedTypes: options.allowedTypes || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
            allowedExtensions: options.allowedExtensions || ['.pdf', '.doc', '.docx', '.txt'],
            onSuccess: options.onSuccess || null,
            onError: options.onError || null,
            ...options
        };

        this.uploadedFiles = [];
    }

    /**
     * ドラッグ&ドロップエリアを初期化
     */
    initDropZone(element) {
        const dropZone = element;

        // ドラッグイベントのデフォルト動作を防止
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // ドラッグオーバー時のスタイル変更
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('drag-over');
            });
        });

        // ファイルドロップ時の処理
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });

        // クリックでファイル選択
        dropZone.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = this.options.allowedExtensions.join(',');
            input.multiple = true;

            input.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });

            input.click();
        });
    }

    /**
     * ファイル処理
     */
    handleFiles(files) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.uploadFile(file);
            }
        });
    }

    /**
     * ファイルバリデーション
     */
    validateFile(file) {
        // サイズチェック
        if (file.size > this.options.maxSize) {
            const sizeMB = (this.options.maxSize / (1024 * 1024)).toFixed(0);
            showError(`ファイルサイズが大きすぎます。${sizeMB}MB以下のファイルを選択してください。`);
            return false;
        }

        // ファイル形式チェック
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!this.options.allowedExtensions.includes(fileExtension)) {
            showError(`このファイル形式はサポートされていません。\n対応形式: ${this.options.allowedExtensions.join(', ')}`);
            return false;
        }

        return true;
    }

    /**
     * ファイルアップロード（模擬）
     */
    uploadFile(file) {
        const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const fileInfo = {
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        };

        // プレビュー要素を作成
        const previewElement = this.createPreview(fileInfo);
        const container = document.getElementById('uploadedFilesContainer');
        if (container) {
            container.appendChild(previewElement);
        }

        // プログレスバーをシミュレート（実際のアップロードでは進捗を更新）
        this.simulateUpload(fileId, (progress) => {
            const progressBar = document.getElementById(`progress-${fileId}`);
            const progressText = document.getElementById(`progress-text-${fileId}`);

            if (progressBar && progressText) {
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;

                if (progress === 100) {
                    setTimeout(() => {
                        progressBar.parentElement.classList.add('hidden');
                        const successIcon = document.getElementById(`success-${fileId}`);
                        if (successIcon) {
                            successIcon.classList.remove('hidden');
                        }
                    }, 500);

                    this.uploadedFiles.push(fileInfo);
                    if (this.options.onSuccess) {
                        this.options.onSuccess(fileInfo);
                    }
                    showSuccess(`${file.name} をアップロードしました`);
                }
            }
        });
    }

    /**
     * プレビュー要素を作成
     */
    createPreview(fileInfo) {
        const div = document.createElement('div');
        div.className = 'file-preview bg-white p-4 rounded-lg border border-slate-200 flex items-center gap-3';
        div.id = `file-${fileInfo.id}`;

        const fileIcon = this.getFileIcon(fileInfo.name);
        const fileSize = this.formatFileSize(fileInfo.size);

        div.innerHTML = `
            <div class="flex-shrink-0">
                <i data-lucide="${fileIcon}" class="w-10 h-10 text-indigo-600"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">${fileInfo.name}</p>
                <p class="text-xs text-slate-500">${fileSize}</p>
                <div class="mt-2">
                    <div class="progress-bar-container">
                        <div id="progress-${fileInfo.id}" class="progress-bar bg-indigo-600" style="width: 0%"></div>
                    </div>
                    <p id="progress-text-${fileInfo.id}" class="text-xs text-slate-500 mt-1">0%</p>
                </div>
                <div id="success-${fileInfo.id}" class="hidden mt-2 flex items-center text-emerald-600 text-sm">
                    <i data-lucide="check-circle" class="w-4 h-4 mr-1"></i>
                    <span>アップロード完了</span>
                </div>
            </div>
            <button onclick="window.fileUploader.removeFile('${fileInfo.id}')" class="flex-shrink-0 text-slate-400 hover:text-red-600 transition-colors">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
        `;

        // アイコンを初期化
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 0);

        return div;
    }

    /**
     * ファイルアイコンを取得
     */
    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': 'file-text',
            'doc': 'file-text',
            'docx': 'file-text',
            'txt': 'file-text',
            'jpg': 'image',
            'jpeg': 'image',
            'png': 'image',
            'gif': 'image'
        };
        return iconMap[ext] || 'file';
    }

    /**
     * ファイルサイズをフォーマット
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * アップロード進捗をシミュレート
     */
    simulateUpload(fileId, callback) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            callback(Math.round(progress));
        }, 200);
    }

    /**
     * ファイルを削除
     */
    removeFile(fileId) {
        const element = document.getElementById(`file-${fileId}`);
        if (element) {
            element.remove();
            this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
            showInfo('ファイルを削除しました');
        }
    }

    /**
     * アップロード済みファイルを取得
     */
    getUploadedFiles() {
        return this.uploadedFiles;
    }
}

// グローバルインスタンスを作成
window.fileUploader = new FileUploader();

// 初期化関数
function initFileUpload() {
    const dropZone = document.getElementById('fileDropZone');
    if (dropZone) {
        window.fileUploader.initDropZone(dropZone);
    }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', initFileUpload);
