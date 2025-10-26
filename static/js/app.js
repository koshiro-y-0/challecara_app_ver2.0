// Challenge Cara App - Main JavaScript File

class ChallegeCaraApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('Challenge Cara App initialized!');
        this.setupEventListeners();
        this.testAPI();
    }

    setupEventListeners() {
        // Get Started Button
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', this.handleGetStarted.bind(this));
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Add scroll effect to header
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleGetStarted() {
        alert('チャレンジを開始する準備ができました！\n\nこの機能は開発中です。');

        // Example API call
        this.makeAPIRequest('/api/status')
            .then(data => {
                console.log('API Status:', data);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }

    handleNavClick(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '#2c3e50';
        }
    }

    async makeAPIRequest(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async testAPI() {
        try {
            const helloResponse = await this.makeAPIRequest('/api/hello');
            console.log('Hello API Response:', helloResponse);

            const statusResponse = await this.makeAPIRequest('/api/status');
            console.log('Status API Response:', statusResponse);
        } catch (error) {
            console.error('API test failed:', error);
        }
    }

    // Utility methods
    showNotification(message, type = 'info') {
        // Simple notification system (can be enhanced later)
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.challecaraApp = new ChallegeCaraApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChallegeCaraApp;
}