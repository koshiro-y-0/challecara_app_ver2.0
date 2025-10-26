// Toast Notification System

class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = [];
        this.init();
    }

    init() {
        // トースト通知用のコンテナを作成
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.className = 'fixed top-4 right-4 z-50 space-y-3';
        document.body.appendChild(this.container);
    }

    /**
     * トースト通知を表示
     * @param {string} message - 表示するメッセージ
     * @param {string} type - 通知タイプ ('success', 'error', 'warning', 'info')
     * @param {number} duration - 表示時間（ミリ秒、デフォルト3000）
     */
    show(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // アニメーション開始
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 10);

        // 自動削除
        setTimeout(() => {
            this.remove(toast);
        }, duration);

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} flex items-start gap-3 p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 ease-out max-w-md`;

        // タイプ別のスタイルとアイコン
        const config = this.getConfig(type);
        toast.classList.add(config.bgClass, config.textClass, config.borderClass);

        toast.innerHTML = `
            <div class="flex-shrink-0">
                <i data-lucide="${config.icon}" class="w-5 h-5"></i>
            </div>
            <div class="flex-1">
                <p class="font-semibold text-sm">${message}</p>
            </div>
            <button class="flex-shrink-0 hover:opacity-70 transition-opacity" onclick="window.toastManager.remove(this.closest('.toast'))">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        `;

        // アイコンを初期化
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 0);

        return toast;
    }

    getConfig(type) {
        const configs = {
            success: {
                icon: 'check-circle',
                bgClass: 'bg-emerald-50',
                textClass: 'text-emerald-800',
                borderClass: 'border-l-4 border-emerald-500'
            },
            error: {
                icon: 'alert-circle',
                bgClass: 'bg-red-50',
                textClass: 'text-red-800',
                borderClass: 'border-l-4 border-red-500'
            },
            warning: {
                icon: 'alert-triangle',
                bgClass: 'bg-amber-50',
                textClass: 'text-amber-800',
                borderClass: 'border-l-4 border-amber-500'
            },
            info: {
                icon: 'info',
                bgClass: 'bg-blue-50',
                textClass: 'text-blue-800',
                borderClass: 'border-l-4 border-blue-500'
            }
        };

        return configs[type] || configs.info;
    }

    remove(toast) {
        if (!toast) return;

        // フェードアウトアニメーション
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');

        // DOM から削除
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }

    // 便利なショートカットメソッド
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    // すべてのトースト通知をクリア
    clearAll() {
        this.toasts.forEach(toast => this.remove(toast));
    }
}

// グローバルインスタンスを作成
window.toastManager = new ToastManager();

// ショートカット関数をグローバルに公開
window.showToast = (message, type, duration) => window.toastManager.show(message, type, duration);
window.showSuccess = (message, duration) => window.toastManager.success(message, duration);
window.showError = (message, duration) => window.toastManager.error(message, duration);
window.showWarning = (message, duration) => window.toastManager.warning(message, duration);
window.showInfo = (message, duration) => window.toastManager.info(message, duration);
