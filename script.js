/* =====================================================
   PennyTrack — script.js
   Expense Tracker Core Logic + Navigation + Validation
   ===================================================== */

'use strict';

/* =====================================================
   DATA
   ===================================================== */

let expenses = [];

let nextId = 6;

/* =====================================================
   DOM REFERENCES
   ===================================================== */

// Form
const nameInput   = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const nameError   = document.getElementById('name-error');
const amountError = document.getElementById('amount-error');
const addBtn      = document.getElementById('btn-add');
const expenseList = document.getElementById('expense-list');
const emptyState  = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const totalAmount = document.getElementById('total-amount');

// Navigation
const navLinks = {
  dashboard: document.getElementById('nav-dashboard'),
  expenses:  document.getElementById('nav-expenses'),
  reports:   document.getElementById('nav-reports'),
  settings:  document.getElementById('nav-settings'),
};

// Views
const views = {
  dashboard: document.getElementById('view-dashboard'),
  expenses:  document.getElementById('view-expenses'),
  reports:   document.getElementById('view-reports'),
  settings:  document.getElementById('view-settings'),
};

// Mobile
const mobileMenuBtn    = document.getElementById('mobile-menu-btn');
const sidebar          = document.getElementById('sidebar');
const mobileOverlay    = document.getElementById('mobile-overlay');

/* =====================================================
   NAVIGATION
   ===================================================== */

let currentView = 'dashboard';

function switchView(viewName) {
  // Deactivate all nav links
  Object.values(navLinks).forEach(link => link.classList.remove('active'));

  // Hide all views
  Object.values(views).forEach(view => {
    view.style.display = 'none';
  });

  // Activate selected nav link
  if (navLinks[viewName]) {
    navLinks[viewName].classList.add('active');
  }

  // Show selected view
  if (views[viewName]) {
    views[viewName].style.display = 'block';
  }

  currentView = viewName;

  // Close mobile sidebar on navigation
  closeMobileSidebar();
}

function initNavigation() {
  Object.entries(navLinks).forEach(([viewName, link]) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      switchView(viewName);
    });
  });

  // Show dashboard by default
  switchView('dashboard');
}

/* =====================================================
   MOBILE SIDEBAR
   ===================================================== */

function openMobileSidebar() {
  sidebar.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  sidebar.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  mobileMenuBtn.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  mobileOverlay.addEventListener('click', closeMobileSidebar);

  // Close sidebar on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeMobileSidebar();
    }
  });
}

/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

function formatCurrency(amount) {
  return '₦ ' + amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateObj) {
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric'
  });
}

function getIconForExpense(name) {
  const n = name.toLowerCase();

  if (n.includes('food') || n.includes('grocer') || n.includes('eat') || n.includes('snack') || n.includes('meal')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>`;
  }
  if (n.includes('transport') || n.includes('bus') || n.includes('train') || n.includes('taxi') || n.includes('uber') || n.includes('ride') || n.includes('fuel') || n.includes('petrol')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect>
              <path d="M4 11h16"></path>
              <path d="M12 3v8"></path>
              <path d="M8 19l-2 3"></path>
              <path d="M18 22l-2-3"></path>
              <path d="M8 15h.01"></path>
              <path d="M16 15h.01"></path>
            </svg>`;
  }
  if (n.includes('data') || n.includes('internet') || n.includes('wifi') || n.includes('sub') || n.includes('airtime') || n.includes('phone')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>`;
  }
  if (n.includes('electric') || n.includes('light') || n.includes('power') || n.includes('energy') || n.includes('bill') || n.includes('nepa') || n.includes('ikedc') || n.includes('ekedc')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>`;
  }
  if (n.includes('house') || n.includes('supply') || n.includes('supplies') || n.includes('shop') || n.includes('market')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>`;
  }
  if (n.includes('health') || n.includes('hospital') || n.includes('doctor') || n.includes('pharma') || n.includes('medical') || n.includes('clinic')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>`;
  }
  if (n.includes('rent') || n.includes('home') || n.includes('apartment') || n.includes('accommodation')) {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`;
  }

  // Default: receipt icon
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>`;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* =====================================================
   REAL-TIME VALIDATION
   ===================================================== */

function isNameValid() {
  return nameInput.value.trim().length > 0;
}

function isAmountValid() {
  const val = parseFloat(amountInput.value);
  return amountInput.value.trim() !== '' && !isNaN(val) && val > 0;
}

function updateSubmitButton() {
  addBtn.disabled = !(isNameValid() && isAmountValid());
}

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('error');
  errorEl.textContent = message;
  errorEl.classList.add('visible');
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove('error');
  errorEl.textContent = '';
  errorEl.classList.remove('visible');
}

function clearAllErrors() {
  clearError(nameInput, nameError);
  clearError(amountInput, amountError);
}

// Real-time validation
function initRealTimeValidation() {
  // Name field validation
  nameInput.addEventListener('input', function () {
    if (isNameValid()) clearError(nameInput, nameError);
    updateSubmitButton();
  });
  nameInput.addEventListener('blur', function () {
    if (nameInput.value.length > 0 && !isNameValid()) {
      showError(nameInput, nameError, '⚠ Expense name cannot be empty.');
    }
  });

  // Amount field validation
  amountInput.addEventListener('input', function () {
    if (isAmountValid()) clearError(amountInput, amountError);
    updateSubmitButton();
  });
  amountInput.addEventListener('blur', function () {
    const val = amountInput.value.trim();
    if (val !== '' && !isAmountValid()) {
      showError(amountInput, amountError, '⚠ Enter a valid positive amount.');
    }
  });
}

// Search functionality
function initSearch() {
  if (!searchInput) return;
  searchInput.addEventListener('input', function () {
    renderExpenses();
  });
}

// Helper to get date group label
function getDateGroupLabel(dateObj) {
  const today = new Date();
  const diff = (today - dateObj) / (1000 * 60 * 60 * 24);
  if (diff < 1 && today.toDateString() === dateObj.toDateString()) return 'Today';
  if (diff < 2 && new Date(today.setDate(today.getDate() - 1)).toDateString() === dateObj.toDateString()) return 'Yesterday';
  return formatDate(dateObj);
}

/* =====================================================
   EXPENSE LOGIC
   ===================================================== */

function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalAmount.textContent = formatCurrency(total);
}

function createExpenseElement(expense) {
  const item = document.createElement('div');
  item.classList.add('expense-item');
  item.dataset.id = expense.id;

  item.innerHTML = `
    <div class="expense-item__icon-wrapper">
      ${getIconForExpense(expense.name)}
    </div>
    <div class="expense-item__details">
      <div class="expense-item__name">${escapeHTML(expense.name)}</div>
      <div class="expense-item__date">${formatDate(expense.date)}</div>
    </div>
    <div class="expense-item__amount">${formatCurrency(expense.amount)}</div>
    <button
      class="btn-delete"
      aria-label="Delete ${escapeHTML(expense.name)}"
      onclick="deleteExpense(${expense.id})"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  `;

  return item;
}

function renderExpenses() {
  expenseList.innerHTML = '';

  // Apply search filter if any
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const filtered = expenses.filter(exp => {
    const nameMatch = exp.name.toLowerCase().includes(query);
    const dateMatch = formatDate(exp.date).toLowerCase().includes(query);
    return query === '' || nameMatch || dateMatch;
  });

  if (filtered.length === 0) {
    // Determine which empty message to show
    if (expenses.length === 0) {
      emptyState.textContent = 'No expenses recorded yet. Start tracking your spending.';
    } else {
      emptyState.textContent = 'No matching expenses found.';
    }
    emptyState.style.display = 'block';
    expenseList.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  expenseList.style.display = 'block';

  // Group expenses by date label (Today, Yesterday, Earlier)
  const groups = {};
  filtered.forEach(exp => {
    const label = getDateGroupLabel(exp.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(exp);
  });

  // Sort groups: Today, Yesterday, then others descending
  const order = ['Today', 'Yesterday'];
  const sortedLabels = Object.keys(groups).sort((a, b) => {
    const idxA = order.indexOf(a);
    const idxB = order.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    // For older dates, compare actual dates
    return new Date(b) - new Date(a);
  });

  sortedLabels.forEach(label => {
    // Create group heading
    const heading = document.createElement('h3');
    heading.className = 'date-group-label';
    heading.textContent = label;
    expenseList.appendChild(heading);
    // Append each expense under this group
    groups[label].forEach(expense => {
      expenseList.appendChild(createExpenseElement(expense));
    });
  });
}

function addExpense() {
  if (!isNameValid() || !isAmountValid()) return;

  const name   = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Capture current date
  const now = new Date();
  expenses.push({ id: nextId++, name, amount, date: now });

  renderExpenses();
  updateTotal();

  nameInput.value   = '';
  amountInput.value = '';
  clearAllErrors();
  updateSubmitButton();
  nameInput.focus();
}

// Exposed globally for inline onclick handlers
window.deleteExpense = function (id) {
  expenses = expenses.filter(e => e.id !== id);
  renderExpenses();
  updateTotal();
};

/* =====================================================
   FORM SUBMIT EVENT
   ===================================================== */

function initFormEvents() {
  addBtn.addEventListener('click', addExpense);

  nameInput.addEventListener('keydown',   e => { if (e.key === 'Enter') amountInput.focus(); });
  amountInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !addBtn.disabled) addExpense(); });
}

/* =====================================================
   INITIALISE APPLICATION
   ===================================================== */// Initialize application
(function init() {
  initNavigation();
  initMobileMenu();
  initRealTimeValidation();
  initFormEvents();
  initSearch();
  updateTotal();
  renderExpenses();
  updateSubmitButton(); // start disabled since both fields are empty
})();
