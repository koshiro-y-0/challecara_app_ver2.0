// Document Filter & Search functionality

class DocumentFilter {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.documentRows = document.querySelectorAll('.document-row');
        this.resultCount = document.getElementById('resultCount');
        this.clearFiltersBtn = document.getElementById('clearFilters');
        this.noResults = document.getElementById('noResults');
        this.documentTableBody = document.getElementById('documentTableBody');

        this.currentFilter = 'all';
        this.currentSearch = '';
        this.currentSort = 'date-desc';

        this.init();
    }

    init() {
        // 検索入力のイベントリスナー
        this.searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // フィルターボタンのイベントリスナー
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.getAttribute('data-type');
                this.applyFilters();
            });
        });

        // ソートセレクトのイベントリスナー
        this.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applySort();
        });

        // フィルタークリアボタンのイベントリスナー
        this.clearFiltersBtn.addEventListener('click', () => {
            this.resetFilters();
        });

        // 初期スタイル設定
        this.updateFilterButtonStyles();
    }

    applyFilters() {
        let visibleCount = 0;

        this.documentRows.forEach(row => {
            const title = row.getAttribute('data-title').toLowerCase();
            const type = row.getAttribute('data-type');

            // 検索条件のチェック
            const matchesSearch = title.includes(this.currentSearch);

            // フィルター条件のチェック
            const matchesFilter = this.currentFilter === 'all' || type === this.currentFilter;

            // 両方の条件を満たす場合のみ表示
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // 結果カウントの更新
        this.resultCount.textContent = visibleCount;

        // 結果が0件の場合の表示
        if (visibleCount === 0) {
            this.noResults.classList.remove('hidden');
            this.documentTableBody.style.display = 'none';
        } else {
            this.noResults.classList.add('hidden');
            this.documentTableBody.style.display = '';
        }

        // クリアボタンの表示/非表示
        if (this.currentSearch !== '' || this.currentFilter !== 'all') {
            this.clearFiltersBtn.classList.remove('hidden');
        } else {
            this.clearFiltersBtn.classList.add('hidden');
        }

        // ソートを再適用
        this.applySort();
    }

    applySort() {
        const rowsArray = Array.from(this.documentRows);

        rowsArray.sort((a, b) => {
            const aDate = new Date(a.getAttribute('data-date'));
            const bDate = new Date(b.getAttribute('data-date'));
            const aTitle = a.getAttribute('data-title');
            const bTitle = b.getAttribute('data-title');

            switch (this.currentSort) {
                case 'date-desc':
                    return bDate - aDate;
                case 'date-asc':
                    return aDate - bDate;
                case 'title-asc':
                    return aTitle.localeCompare(bTitle);
                case 'title-desc':
                    return bTitle.localeCompare(aTitle);
                default:
                    return 0;
            }
        });

        // 並び替えた順序でDOMに再配置
        rowsArray.forEach(row => {
            this.documentTableBody.appendChild(row);
        });
    }

    resetFilters() {
        // 検索入力をクリア
        this.searchInput.value = '';
        this.currentSearch = '';

        // フィルターを「すべて」に戻す
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-type') === 'all') {
                btn.classList.add('active');
            }
        });
        this.currentFilter = 'all';

        // ソートをデフォルトに戻す
        this.sortSelect.value = 'date-desc';
        this.currentSort = 'date-desc';

        // フィルターを適用
        this.applyFilters();

        // スタイルを更新
        this.updateFilterButtonStyles();
    }

    updateFilterButtonStyles() {
        this.filterButtons.forEach(btn => {
            if (btn.classList.contains('active')) {
                btn.classList.add('bg-indigo-600', 'text-white');
                btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-300');
            } else {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-300');
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DocumentFilter();

    // Lucideアイコンの初期化
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
