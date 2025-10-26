// Character Counter System

class CharacterCounter {
    constructor(textarea, options = {}) {
        this.textarea = textarea;
        this.options = {
            target: options.target || 400,
            min: options.min || 0,
            max: options.max || null,
            showProgress: options.showProgress !== false,
            showPercentage: options.showPercentage !== false,
            ...options
        };

        this.counterElement = null;
        this.progressBarElement = null;
        this.init();
    }

    init() {
        // カウンター表示要素を作成
        this.createCounter();

        // イベントリスナーを設定
        this.textarea.addEventListener('input', () => this.update());

        // 初期値を設定
        this.update();
    }

    createCounter() {
        const wrapper = document.createElement('div');
        wrapper.className = 'mt-2 space-y-2';

        // カウンター表示
        const counterDiv = document.createElement('div');
        counterDiv.className = 'flex justify-between items-center text-sm';

        this.counterElement = document.createElement('span');
        this.counterElement.className = 'char-counter font-medium';

        const targetInfo = document.createElement('span');
        targetInfo.className = 'text-slate-500 text-xs';
        targetInfo.textContent = `目標: ${this.options.target}文字`;

        counterDiv.appendChild(this.counterElement);
        counterDiv.appendChild(targetInfo);

        wrapper.appendChild(counterDiv);

        // プログレスバー
        if (this.options.showProgress) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-bar-container';

            this.progressBarElement = document.createElement('div');
            this.progressBarElement.className = 'progress-bar';
            this.progressBarElement.style.width = '0%';

            progressContainer.appendChild(this.progressBarElement);
            wrapper.appendChild(progressContainer);
        }

        // テキストエリアの後に挿入
        this.textarea.parentNode.insertBefore(wrapper, this.textarea.nextSibling);
    }

    update() {
        const text = this.textarea.value;
        const count = this.countCharacters(text);
        const target = this.options.target;
        const percentage = Math.min((count / target) * 100, 100);

        // カウンター表示を更新
        let displayText = `${count}文字`;

        if (this.options.showPercentage) {
            displayText += ` (${Math.round(percentage)}%)`;
        }

        if (this.options.max && count > this.options.max) {
            displayText += ` / ${this.options.max}文字を超過`;
        }

        this.counterElement.textContent = displayText;

        // 色の変更
        this.updateColor(count, target);

        // プログレスバーの更新
        if (this.progressBarElement) {
            this.progressBarElement.style.width = `${percentage}%`;
            this.updateProgressColor(count, target);
        }
    }

    countCharacters(text) {
        // 改行を除外して文字数をカウント（必要に応じて変更可能）
        return text.length;
    }

    updateColor(count, target) {
        // 既存のクラスを削除
        this.counterElement.classList.remove('text-success', 'text-warning', 'text-danger', 'text-slate-600');

        if (this.options.max && count > this.options.max) {
            // 最大文字数を超過
            this.counterElement.classList.add('text-danger');
        } else if (count >= target * 0.9 && count <= target * 1.1) {
            // 目標の90%〜110%（適切な範囲）
            this.counterElement.classList.add('text-success');
        } else if (count >= target * 0.7 && count < target * 0.9) {
            // 目標の70%〜90%（もう少し）
            this.counterElement.classList.add('text-warning');
        } else if (count > target * 1.1) {
            // 目標の110%以上（多すぎ）
            this.counterElement.classList.add('text-warning');
        } else {
            // その他（不足）
            this.counterElement.classList.add('text-slate-600');
        }
    }

    updateProgressColor(count, target) {
        if (!this.progressBarElement) return;

        // 既存のクラスを削除
        this.progressBarElement.classList.remove('bg-success', 'bg-warning', 'bg-danger');

        if (this.options.max && count > this.options.max) {
            this.progressBarElement.classList.add('bg-danger');
        } else if (count >= target * 0.9 && count <= target * 1.1) {
            this.progressBarElement.classList.add('bg-success');
        } else if (count >= target * 0.7 || count > target * 1.1) {
            this.progressBarElement.classList.add('bg-warning');
        } else {
            this.progressBarElement.style.backgroundColor = '#94a3b8'; // slate-400
        }
    }

    // 目標値を動的に変更
    setTarget(newTarget) {
        this.options.target = newTarget;
        const targetInfo = this.counterElement.parentNode.querySelector('.text-slate-500');
        if (targetInfo) {
            targetInfo.textContent = `目標: ${newTarget}文字`;
        }
        this.update();
    }

    // 最大値を動的に変更
    setMax(newMax) {
        this.options.max = newMax;
        this.update();
    }
}

// 自動初期化用の関数
function initCharacterCounters() {
    document.querySelectorAll('[data-char-counter]').forEach(textarea => {
        const target = parseInt(textarea.getAttribute('data-target')) || 400;
        const max = parseInt(textarea.getAttribute('data-max')) || null;
        const showProgress = textarea.getAttribute('data-show-progress') !== 'false';
        const showPercentage = textarea.getAttribute('data-show-percentage') !== 'false';

        new CharacterCounter(textarea, {
            target,
            max,
            showProgress,
            showPercentage
        });
    });
}

// DOMContentLoaded時に自動初期化
document.addEventListener('DOMContentLoaded', initCharacterCounters);

// グローバルに公開
window.CharacterCounter = CharacterCounter;
window.initCharacterCounters = initCharacterCounters;
