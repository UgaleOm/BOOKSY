// Sample Data
const sampleBooks = [
  {
    "id": 1,
    "title": "NCERT Physics Class 12",
    "author": "NCERT",
    "price": 150,
    "original_price": 285,
    "condition": "Good",
    "category": "textbooks",
    "description": "Great condition, minimal highlighting. Original textbook with all chapters intact.",
    "seller": "Rahul Kumar",
    "location": "Delhi",
    "phone": "9876543210",
    "listed": "2025-10-05"
  },
  {
    "id": 2,
    "title": "JEE Advanced Mathematics",
    "author": "Cengage Learning",
    "price": 800,
    "original_price": 1500,
    "condition": "Excellent",
    "category": "jee-preparation",
    "description": "Complete set with solutions. All 5 books included in excellent condition.",
    "seller": "Priya Singh",
    "location": "Mumbai",
    "phone": "9123456789",
    "listed": "2025-10-04"
  },
  {
    "id": 3,
    "title": "Harry Potter Series",
    "author": "J.K. Rowling",
    "price": 700,
    "original_price": 1400,
    "condition": "Good",
    "category": "novels",
    "description": "Complete 7-book collection in paperback. Well-maintained books.",
    "seller": "Amit Sharma",
    "location": "Bangalore",
    "phone": "9234567890",
    "listed": "2025-10-03"
  },
  {
    "id": 4,
    "title": "Data Structures and Algorithms",
    "author": "Thomas H. Cormen",
    "price": 600,
    "original_price": 950,
    "condition": "Fair",
    "category": "technical",
    "description": "Classic computer science textbook with comprehensive examples.",
    "seller": "Neha Gupta",
    "location": "Pune",
    "phone": "9345678901",
    "listed": "2025-10-02"
  },
  {
    "id": 5,
    "title": "UPSC General Studies",
    "author": "Arihant Publications",
    "price": 400,
    "original_price": 750,
    "condition": "Good",
    "category": "competitive",
    "description": "Complete UPSC preparation guide with current affairs updates.",
    "seller": "Vikash Kumar",
    "location": "Chennai",
    "phone": "9456789012",
    "listed": "2025-10-01"
  },
  {
    "id": 6,
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 120,
    "original_price": 250,
    "condition": "Excellent",
    "category": "novels",
    "description": "Inspirational novel in excellent condition. English translation.",
    "seller": "Sneha Patel",
    "location": "Ahmedabad",
    "phone": "9567890123",
    "listed": "2025-09-30"
  },
  {
    "id": 7,
    "title": "NCERT Chemistry Class 12",
    "author": "NCERT",
    "price": 140,
    "original_price": 275,
    "condition": "Good",
    "category": "12th-class",
    "description": "Chemistry textbook with important formulas highlighted.",
    "seller": "Arjun Reddy",
    "location": "Hyderabad",
    "phone": "9678901234",
    "listed": "2025-09-29"
  },
  {
    "id": 8,
    "title": "Organic Chemistry Morrison Boyd",
    "author": "Morrison Boyd",
    "price": 450,
    "original_price": 850,
    "condition": "Fair",
    "category": "jee-preparation",
    "description": "Classic organic chemistry book. Some highlighting and notes.",
    "seller": "Kavya Iyer",
    "location": "Kochi",
    "phone": "9789012345",
    "listed": "2025-09-28"
  }
];

const categories = [
  {
    "id": "novels",
    "name": "Novels & Fiction",
    "icon": "📚",
    "description": "Discover amazing novels, fiction, and literature books"
  },
  {
    "id": "textbooks",
    "name": "Textbooks",
    "icon": "📖",
    "description": "Academic textbooks for all subjects and classes"
  },
  {
    "id": "12th-class",
    "name": "12th Class",
    "icon": "🎓",
    "description": "12th standard textbooks for all subjects and boards"
  },
  {
    "id": "jee-preparation",
    "name": "JEE Preparation",
    "icon": "🔬",
    "description": "JEE Main and Advanced preparation books"
  },
  {
    "id": "competitive",
    "name": "Competitive Exams",
    "icon": "🎯",
    "description": "Books for UPSC, SSC, Banking, and other competitive exams"
  },
  {
    "id": "technical",
    "name": "Science & Technology",
    "icon": "💻",
    "description": "Technical books, programming guides, and science textbooks"
  }
];

const demoAccount = {
  "email": "demo@booksy.com",
  "password": "demo123",
  "name": "Demo User",
  "phone": "9876543210",
  "location": "New Delhi"
};

// Application State
let currentUser = null;
let allBooks = [...sampleBooks];
let filteredBooks = [...sampleBooks];
let currentCategory = '';

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const authLink = document.getElementById('auth-link');
const navProfile = document.querySelector('.nav__profile');
const navAuth = document.querySelector('.nav__auth');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkAuthStatus();
});

function initializeApp() {
    renderCategories();
    renderFeaturedBooks();
    renderAllBooks();
    setupCategoryFilters();
    showPage('home');
}

function setupEventListeners() {
    // Navigation
    document.addEventListener('click', handleNavigation);
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', toggleMobileMenu);
    
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    searchBtn?.addEventListener('click', performSearch);
    searchInput?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filters
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    categoryFilter?.addEventListener('change', applyFilters);
    conditionFilter?.addEventListener('change', applyFilters);
    sortFilter?.addEventListener('change', applyFilters);
    
    // Forms
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const sellForm = document.getElementById('sell-form');
    const contactForm = document.getElementById('contact-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    loginForm?.addEventListener('submit', handleLogin);
    registerForm?.addEventListener('submit', handleRegister);
    sellForm?.addEventListener('submit', handleSellBook);
    contactForm?.addEventListener('submit', handleContact);
    logoutBtn?.addEventListener('click', handleLogout);
    
    // Modal
    const modal = document.getElementById('book-modal');
    const modalClose = document.querySelector('.modal__close');
    
    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    });
}

function handleNavigation(e) {
    const target = e.target.closest('[data-page]');
    if (target) {
        e.preventDefault();
        const page = target.getAttribute('data-page');
        showPage(page);
        
        // Close mobile menu if open
        navMenu?.classList.remove('active');
    }
}

function toggleMobileMenu() {
    navMenu?.classList.toggle('active');
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Handle special pages
    if (pageName === 'buy') {
        renderAllBooks();
    } else if (pageName === 'profile' && !currentUser) {
        showPage('login');
        return;
    } else if (pageName === 'profile' && currentUser) {
        renderProfile();
    } else if (pageName === 'sell' && !currentUser) {
        showPage('login');
        return;
    }
}

function renderCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category__card" data-category="${category.id}">
            <div class="category__icon">${category.icon}</div>
            <h3 class="category__name">${category.name}</h3>
            <p class="category__description">${category.description}</p>
        </div>
    `).join('');
    
    // Add click handlers for categories
    categoriesGrid.addEventListener('click', function(e) {
        const categoryCard = e.target.closest('.category__card');
        if (categoryCard) {
            const categoryId = categoryCard.getAttribute('data-category');
            filterByCategory(categoryId);
            showPage('buy');
        }
    });
}

function renderFeaturedBooks() {
    const featuredContainer = document.getElementById('featured-books');
    if (!featuredContainer) return;
    
    const featuredBooks = allBooks.slice(0, 4);
    featuredContainer.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
}

function renderAllBooks() {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;
    
    booksGrid.innerHTML = filteredBooks.map(book => createBookCard(book)).join('');
}

function createBookCard(book) {
    const savings = book.original_price ? Math.round(((book.original_price - book.price) / book.original_price) * 100) : 0;
    
    return `
        <div class="book__card" data-book-id="${book.id}">
            <div class="book__content">
                <h3 class="book__title">${book.title}</h3>
                <p class="book__author">by ${book.author}</p>
                <div class="book__price">
                    <span class="book__current-price">₹${book.price}</span>
                    ${book.original_price ? `<span class="book__original-price">₹${book.original_price}</span>` : ''}
                    ${savings > 0 ? `<span class="book__savings">${savings}% off</span>` : ''}
                </div>
                <div class="book__condition">${book.condition}</div>
                <p class="book__seller">📍 ${book.location} • ${book.seller}</p>
                <div class="book__actions">
                    <button class="btn btn--primary btn--sm" onclick="showBookDetails(${book.id})">View Details</button>
                    <button class="btn btn--accent btn--sm" onclick="contactSeller('${book.phone}', '${book.title}')">Contact Seller</button>
                </div>
            </div>
        </div>
    `;
}

function setupCategoryFilters() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;
    
    categoryFilter.innerHTML = '<option value="">All Categories</option>' + 
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

function filterByCategory(categoryId) {
    currentCategory = categoryId;
    applyFilters();
    
    // Update category filter dropdown
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = categoryId;
    }
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput?.value.toLowerCase() || '';
    
    filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
    
    applyCategoryAndConditionFilters();
    applySorting();
    renderAllBooks();
}

function applyFilters() {
    // Start with all books
    filteredBooks = [...allBooks];
    
    // Apply search if there's a query
    const searchInput = document.getElementById('search-input');
    const query = searchInput?.value.toLowerCase() || '';
    if (query) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.description.toLowerCase().includes(query)
        );
    }
    
    applyCategoryAndConditionFilters();
    applySorting();
    renderAllBooks();
}

function applyCategoryAndConditionFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const conditionFilter = document.getElementById('condition-filter');
    
    const selectedCategory = categoryFilter?.value || currentCategory;
    const selectedCondition = conditionFilter?.value;
    
    if (selectedCategory) {
        filteredBooks = filteredBooks.filter(book => book.category === selectedCategory);
    }
    
    if (selectedCondition) {
        filteredBooks = filteredBooks.filter(book => book.condition === selectedCondition);
    }
}

function applySorting() {
    const sortFilter = document.getElementById('sort-filter');
    const sortBy = sortFilter?.value || 'latest';
    
    switch (sortBy) {
        case 'price-low':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case 'latest':
        default:
            filteredBooks.sort((a, b) => new Date(b.listed) - new Date(a.listed));
            break;
    }
}

function showBookDetails(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');
    
    const savings = book.original_price ? Math.round(((book.original_price - book.price) / book.original_price) * 100) : 0;
    
    modalBody.innerHTML = `
        <div class="book__details">
            <h3 class="book__title">${book.title}</h3>
            <p class="book__author">by ${book.author}</p>
            <div class="book__price">
                <span class="book__current-price">₹${book.price}</span>
                ${book.original_price ? `<span class="book__original-price">₹${book.original_price}</span>` : ''}
                ${savings > 0 ? `<span class="book__savings">(${savings}% off)</span>` : ''}
            </div>
            <div class="book__condition">Condition: ${book.condition}</div>
            <div class="book__category">Category: ${categories.find(c => c.id === book.category)?.name || book.category}</div>
            <div class="book__description">
                <h4>Description</h4>
                <p>${book.description}</p>
            </div>
            <div class="book__seller-info">
                <h4>Seller Information</h4>
                <p><strong>Name:</strong> ${book.seller}</p>
                <p><strong>Location:</strong> ${book.location}</p>
                <p><strong>Listed:</strong> ${formatDate(book.listed)}</p>
            </div>
            <div class="book__actions">
                <button class="btn btn--accent btn--full-width" onclick="contactSeller('${book.phone}', '${book.title}')">
                    Contact Seller via WhatsApp
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('book-modal');
    modal?.classList.add('hidden');
}

function contactSeller(phone, bookTitle) {
    const message = encodeURIComponent(`Hi! I'm interested in buying "${bookTitle}" that you listed on Booksy. Is it still available?`);
    const whatsappUrl = `https://wa.me/91${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Check demo account
    if (email === demoAccount.email && password === demoAccount.password) {
        currentUser = demoAccount;
        updateAuthUI();
        showPage('profile');
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials. Use demo account: demo@booksy.com / demo123', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate registration
    currentUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location')
    };
    
    updateAuthUI();
    showPage('profile');
    showNotification('Registration successful!', 'success');
}

function handleLogout() {
    currentUser = null;
    updateAuthUI();
    showPage('home');
    showNotification('Logged out successfully!', 'success');
}

function updateAuthUI() {
    if (currentUser) {
        authLink.textContent = 'Profile';
        authLink.setAttribute('data-page', 'profile');
        navAuth.classList.add('hidden');
        navProfile.classList.remove('hidden');
    } else {
        authLink.textContent = 'Login';
        authLink.setAttribute('data-page', 'login');
        navAuth.classList.remove('hidden');
        navProfile.classList.add('hidden');
    }
}

function checkAuthStatus() {
    // In a real app, this would check localStorage or session
    updateAuthUI();
}

function renderProfile() {
    const profileDetails = document.getElementById('profile-details');
    const myBooks = document.getElementById('my-books');
    
    if (!currentUser || !profileDetails || !myBooks) return;
    
    profileDetails.innerHTML = `
        <div class="profile__item">
            <strong>Name:</strong> ${currentUser.name}
        </div>
        <div class="profile__item">
            <strong>Email:</strong> ${currentUser.email}
        </div>
        <div class="profile__item">
            <strong>Phone:</strong> ${currentUser.phone}
        </div>
        <div class="profile__item">
            <strong>Location:</strong> ${currentUser.location}
        </div>
    `;
    
    // Show user's books (demo: show first 2 books as user's books)
    const userBooks = allBooks.slice(0, 2);
    myBooks.innerHTML = userBooks.length > 0 ? 
        userBooks.map(book => `
            <div class="my-book__item">
                <h4>${book.title}</h4>
                <p>Price: ₹${book.price} • Condition: ${book.condition}</p>
                <p>Listed: ${formatDate(book.listed)}</p>
            </div>
        `).join('') : 
        '<p>You haven\'t listed any books yet.</p>';
}

function handleSellBook(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showNotification('Please login to sell books!', 'error');
        showPage('login');
        return;
    }
    
    const formData = new FormData(e.target);
    
    // Validate required fields
    const requiredFields = ['title', 'author', 'price', 'category', 'condition', 'description', 'seller', 'location', 'phone'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }
    
    // Create new book entry
    const newBook = {
        id: allBooks.length + 1,
        title: formData.get('title'),
        author: formData.get('author'),
        price: parseInt(formData.get('price')),
        original_price: formData.get('original_price') ? parseInt(formData.get('original_price')) : null,
        condition: formData.get('condition'),
        category: formData.get('category'),
        description: formData.get('description'),
        seller: formData.get('seller'),
        location: formData.get('location'),
        phone: formData.get('phone'),
        listed: new Date().toISOString().split('T')[0]
    };
    
    // Add to books array
    allBooks.unshift(newBook);
    filteredBooks = [...allBooks];
    
    // Reset form
    e.target.reset();
    
    showNotification('Book listed successfully!', 'success');
    showPage('buy');
}

function handleContact(e) {
    e.preventDefault();
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    e.target.reset();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Initialize category options for sell form
document.addEventListener('DOMContentLoaded', function() {
    const sellCategorySelect = document.querySelector('#sell-form select[name="category"]');
    if (sellCategorySelect) {
        sellCategorySelect.innerHTML = '<option value="">Select Category</option>' + 
            categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    }
});

// Handle book card clicks for mobile
document.addEventListener('click', function(e) {
    const bookCard = e.target.closest('.book__card');
    if (bookCard && !e.target.closest('button')) {
        const bookId = parseInt(bookCard.getAttribute('data-book-id'));
        showBookDetails(bookId);
    }
});

// Smooth scrolling for internal navigation
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});