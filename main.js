// Booksy - Main JavaScript File
// Global utilities and shared functionality

// Global variables
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Check login status
    await checkAuthStatus();

    // Initialize common features
    initializeNavigation();
    initializeAlerts();
    initializeAnimations();

    console.log('Booksy app initialized successfully! 🚀');
}

// Authentication utilities
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/profile');
        if (response.ok) {
            currentUser = await response.json();
            updateNavigation(true);
            return true;
        } else {
            currentUser = null;
            updateNavigation(false);
            return false;
        }
    } catch (error) {
        console.log('User not authenticated');
        currentUser = null;
        updateNavigation(false);
        return false;
    }
}

function updateNavigation(isLoggedIn) {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');

    if (loginLink && registerLink && logoutLink) {
        if (isLoggedIn) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'inline-block';
            logoutLink.textContent = `Logout (${currentUser.name})`;
        } else {
            loginLink.style.display = 'inline-block';
            registerLink.style.display = 'inline-block';
            logoutLink.style.display = 'none';
        }
    }
}

// Navigation utilities
function initializeNavigation() {
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle (if needed)
    addMobileMenuSupport();
}

function addMobileMenuSupport() {
    const header = document.querySelector('header');
    if (!header) return;

    // Add mobile menu toggle for very small screens
    if (window.innerWidth <= 480) {
        let mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (!mobileMenuToggle) {
            mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.id = 'mobileMenuToggle';
            mobileMenuToggle.innerHTML = '☰';
            mobileMenuToggle.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 10px;
            `;

            header.querySelector('.header-container').appendChild(mobileMenuToggle);

            mobileMenuToggle.addEventListener('click', function() {
                const navbar = document.querySelector('.navbar');
                navbar.style.display = navbar.style.display === 'none' ? 'flex' : 'none';
            });
        }
    }
}

// Alert system
function initializeAlerts() {
    // Global alert container
    if (!document.getElementById('globalAlertContainer')) {
        const container = document.createElement('div');
        container.id = 'globalAlertContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
}

function showGlobalAlert(message, type = 'info', duration = 5000) {
    const container = document.getElementById('globalAlertContainer');
    if (!container) return;

    const alertId = 'alert_' + Date.now();
    const alertTypes = {
        success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        warning: { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
        info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const styles = alertTypes[type] || alertTypes.info;

    const alert = document.createElement('div');
    alert.id = alertId;
    alert.style.cssText = `
        background-color: ${styles.bg};
        color: ${styles.color};
        border: 1px solid ${styles.border};
        border-radius: 8px;
        padding: 15px 20px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
        position: relative;
        font-weight: 600;
    `;

    alert.innerHTML = `
        ${message}
        <span style="position: absolute; top: 5px; right: 10px; font-size: 18px; cursor: pointer;">&times;</span>
    `;

    // Add click to close
    alert.addEventListener('click', () => {
        alert.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => alert.remove(), 300);
    });

    container.appendChild(alert);

    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            if (document.getElementById(alertId)) {
                alert.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => alert.remove(), 300);
            }
        }, duration);
    }
}

// Animation utilities
function initializeAnimations() {
    // Add CSS animations if not already present
    if (!document.getElementById('booksyAnimations')) {
        const style = document.createElement('style');
        style.id = 'booksyAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }

            @keyframes fadeInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }

            .pulse-hover:hover {
                animation: pulse 0.3s ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Add intersection observer for fade-in animations
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate
        document.querySelectorAll('.book-card, .category-card, .info-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString, options = {}) {
    const date = new Date(dateString);
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
    };
    return date.toLocaleDateString('en-IN', defaultOptions);
}

function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Global logout function
async function logout() {
    try {
        showGlobalAlert('Logging out...', 'info', 2000);
        await fetch('/api/logout', { method: 'POST' });
        localStorage.removeItem('user');
        currentUser = null;
        updateNavigation(false);
        showGlobalAlert('✅ Logged out successfully!', 'success');

        // Redirect to home after logout
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        console.error('Logout error:', error);
        showGlobalAlert('❌ Logout failed', 'error');
    }
}

// Global contact seller function
function contactSeller(bookTitle, sellerName, phone, contactInfo) {
    const message = `Hi ${sellerName}! I'm interested in your book "${bookTitle}". Could you please provide more details?`;

    // Try WhatsApp first if phone is available
    if (phone && phone.trim() !== '' && phone !== 'undefined') {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length >= 10) {
            const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            showGlobalAlert(`📱 Opening WhatsApp to contact ${sellerName}`, 'success');
            return;
        }
    }

    // Fallback to generic contact method
    let alertMessage = `Contact ${sellerName} for "${bookTitle}"\n\n`;
    alertMessage += `Message: ${message}\n\n`;

    if (contactInfo && contactInfo.trim() !== '' && contactInfo !== 'undefined') {
        alertMessage += `Contact Info: ${contactInfo}\n\n`;
    }

    alertMessage += `💡 Tip: For best results, mention Booksy when contacting the seller!`;

    alert(alertMessage);
}

// Performance monitoring
function trackPageLoad() {
    if (window.performance) {
        window.addEventListener('load', () => {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`📊 Page loaded in ${loadTime}ms`);

            // Track slow loads (over 3 seconds)
            if (loadTime > 3000) {
                console.warn('⚠️ Slow page load detected');
            }
        });
    }
}

// Initialize performance tracking
trackPageLoad();

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration would go here
        console.log('📱 Service Worker support detected');
    });
}

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In production, you might want to send this to an error tracking service
});

// Export utilities for other scripts
window.Booksy = {
    checkAuthStatus,
    showGlobalAlert,
    formatCurrency,
    formatDate,
    getRelativeTime,
    validateEmail,
    validatePhone,
    debounce,
    throttle,
    contactSeller,
    logout,
    currentUser: () => currentUser
};

console.log('📚 Booksy utilities loaded successfully!');
