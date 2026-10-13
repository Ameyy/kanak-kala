/**
 * Kanak Jewellery - Core E-Commerce & Atelier Engine
 * Adheres strictly to:
 * - 3-color palette: Parchment (#F6F1E8), Royal Emerald (#08372A), Gold (#E3B43C)
 * - NO POPUPS / NO MODALS / NO OVERLAYS (Full-page navigation only: PDP -> Cart -> Checkout -> Confirmation)
 * - Dedicated Cart, Checkout, Order Confirmation, and Contact pages
 * - Multi-currency conversion (INR, USD, GBP, AED)
 * - Real artisan jewellery items
 */

(function () {
  'use strict';

  // Currency Exchange Matrix (Base: INR)
  const CURRENCIES = {
    INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
    USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
    GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' },
    AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' }
  };

  let activeCurrency = 'INR';

  // Authentic Jewellery Designs
  const PRODUCTS = [
    {
      id: 'masoli-karnaful',
      name: 'Masoli Karnaful',
      marathiSubtitle: 'मसोळी कर्णफुल',
      url: 'masoli-karnaful.html',
      category: 'earrings',
      priceINR: 34500,
      image: 'assets/images/masoli-karnaful-earrings.jpg',
      badge: 'Popular',
      purity: 'Gold Finish & Minakari',
      craftsmanship: 'Green Enamel & Pearl Fringe',
      description: 'Traditional Maharashtrian fish-motif ear cuffs with green enamel, pearl fringe, and red stone accents.',
      specs: {
        'Finish': 'Traditional Gold Polish',
        'Stones & Pearls': 'Red Stones & Fine Pearls',
        'Fitting': 'Comfortable Ear-Cuff (Clip-On)',
        'Weight': 'Lightweight (approx. 14.8g pair)'
      }
    },
    {
      id: 'peshwai-ruby-nath',
      name: 'Peshwai Ruby Nath',
      marathiSubtitle: 'पेशवाई नथ',
      url: 'peshwai-ruby-nath.html',
      category: 'naths',
      priceINR: 18500,
      image: 'assets/images/peshwai-ruby-gold-nath.jpg',
      badge: 'Classic',
      purity: 'Rich Gold Finish',
      craftsmanship: 'Teardrop Red Stone & Gold Beads',
      description: 'Classic Maharashtrian clip-on nath with a teardrop red stone and delicate gold-finish beads.',
      specs: {
        'Finish': 'Rich Yellow Gold Polish',
        'Stones & Beads': 'Teardrop Red Stone & Green Beads',
        'Closure': 'Easy Clip-On (No Piercing Needed)',
        'Weight': 'Lightweight (approx. 6.4g)'
      }
    },
    {
      id: 'vat-purnima-bangles',
      name: 'Vat Purnima Bangle Set',
      marathiSubtitle: 'वटपौर्णिमा विशेष तोडे',
      url: 'vat-purnima-bangles.html',
      category: 'bangles',
      priceINR: 88000,
      image: 'assets/images/vat-purnima-heritage-bangles.jpg',
      badge: 'Bridal Set',
      purity: 'Gold Finish & Pearls',
      craftsmanship: 'Laxmi Motifs & Pearl Pichodi',
      description: 'Complete six-piece bridal bangle set with Laxmi coin bangles, pearl Pichodi, and festive gemstone bangles.',
      specs: {
        'Pieces': 'Set of 6 Bangles',
        'Finish': 'Traditional Gold Polish',
        'Pearls': 'Hand-Strung Pearls',
        'Sizes': '2.2, 2.4, 2.6, 2.8'
      }
    },
    {
      id: 'emerald-leaf-nath',
      name: 'Panna Ratna Vruksha Nath',
      marathiSubtitle: 'पाचू नथ',
      url: 'emerald-leaf-nath.html',
      category: 'naths',
      priceINR: 21200,
      image: 'assets/images/emerald-kundan-leaf-nath.jpg',
      badge: 'Bestseller',
      purity: 'Matte Gold Finish',
      craftsmanship: 'Green Leaf Stones & Pearl Drop',
      description: 'Leaf-design clip-on nath with bright green stones and a delicate pearl drop.',
      specs: {
        'Finish': 'Matte Gold Finish',
        'Stones': 'Teardrop Green Stones',
        'Pearl': 'Lustrous Pearl Drop',
        'Weight': 'Lightweight (approx. 5.1g)'
      }
    },
    {
      id: 'antique-padmarag-nath',
      name: 'Padmarag Mukta Chhatra Nath',
      marathiSubtitle: 'पद्मराग मुक्ता नथ',
      url: 'antique-padmarag-nath.html',
      category: 'naths',
      priceINR: 16800,
      image: 'assets/images/antique-padmarag-mukta-nath.jpg',
      badge: 'Heritage',
      purity: 'Antique Gold Finish',
      craftsmanship: 'Seed Pearl Halo & Red Center Stone',
      description: 'Round antique-finish nath with a red cabochon stone center and delicate white pearl border.',
      specs: {
        'Finish': 'Antique Gold Polish',
        'Stones': 'Red Center Stone & White Pearls',
        'Closure': 'Gentle Wire Clip-On',
        'Weight': 'Lightweight (approx. 4.8g)'
      }
    }
  ];

  // State Management
  let cart = [];
  let wishlist = [];
  let currentCategory = 'all';
  let currentSort = 'featured';

  // Storage Keys
  const CART_KEY = 'kanak_jewellery_cart';
  const WISH_KEY = 'kanak_jewellery_wishlist';
  const CURR_KEY = 'kanak_jewellery_curr';

  function loadPersistedData() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) cart = JSON.parse(savedCart);
      const savedWish = localStorage.getItem(WISH_KEY);
      if (savedWish) wishlist = JSON.parse(savedWish);
      const savedCurr = localStorage.getItem(CURR_KEY);
      if (savedCurr && CURRENCIES[savedCurr]) activeCurrency = savedCurr;
    } catch (e) {
      console.error('Storage access error', e);
    }
  }

  function savePersistedData() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
      localStorage.setItem(CURR_KEY, activeCurrency);
    } catch (e) {
      console.error('Storage save error', e);
    }
  }

  // Price Conversion Formatter
  function formatPrice(amountINR) {
    const config = CURRENCIES[activeCurrency];
    const converted = amountINR * config.rate;
    if (activeCurrency === 'INR') {
      return config.symbol + Math.round(converted).toLocaleString('en-IN');
    }
    return config.symbol + Math.round(converted).toLocaleString('en-US');
  }

  // Toast Notification (Minimal, non-blocking toast, auto-fading)
  let toastTimer = null;
  function showToast(htmlMessage) {
    const toast = document.getElementById('toastNotification');
    const msgElem = document.getElementById('toastMessage');
    if (!toast || !msgElem) return;

    msgElem.innerHTML = htmlMessage;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Update Header Badges
  function updateBadges() {
    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#bagCountBadge');
    badges.forEach(b => {
      b.textContent = totalCartCount;
    });

    document.querySelectorAll('.fp-bag-count').forEach(b => {
      b.textContent = totalCartCount;
    });

    const wishBadges = document.querySelectorAll('#wishlistCountBadge');
    wishBadges.forEach(wb => {
      wb.textContent = wishlist.length;
      wb.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
    });
  }

  // Render Products Grid (for index.html)
  function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    let filtered = PRODUCTS.filter(p => {
      if (currentCategory === 'all') return true;
      return p.category === currentCategory;
    });

    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.priceINR - b.priceINR);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.priceINR - a.priceINR);
    } else if (currentSort === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    productGrid.innerHTML = filtered.map(item => {
      const isSaved = wishlist.includes(item.id);
      return `
        <article class="product-card" data-category="${item.category}">
          <div class="card-image-wrap">
            <a href="${item.url}" class="card-img-link" aria-label="View ${item.name}">
              <img src="${item.image}" alt="${item.name} - ${item.craftsmanship}" class="card-img" loading="lazy">
            </a>
            <span class="card-badge">${item.badge}</span>
            <button class="card-wish-btn ${isSaved ? 'saved' : ''}" onclick="event.preventDefault(); window.kanakApp.toggleWishlist('${item.id}')" aria-label="Save ${item.name} to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div class="card-body">
            <span class="card-purity-label">${item.purity}</span>
            <h3 class="card-title">
              <a href="${item.url}">${item.name}</a>
            </h3>
            <div class="card-marathi-name">${item.marathiSubtitle}</div>
            <p class="card-craft-desc">${item.craftsmanship}</p>
            <div class="card-price-row">
              <span class="card-price">${formatPrice(item.priceINR)}</span>
              <span class="card-tax-hint">Insured Shipping</span>
            </div>
            <div class="card-actions">
              <button class="card-btn-add" onclick="window.kanakApp.addToBag('${item.id}', 1)">Add to Bag</button>
              <a href="${item.url}" class="card-btn-view">View Piece →</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
    refreshScrollMotion();
  }

  // Calculate Bag Subtotal
  function getBagSubtotalINR() {
    return cart.reduce((total, entry) => {
      const prod = PRODUCTS.find(p => p.id === entry.id);
      return total + (prod ? prod.priceINR * entry.quantity : 0);
    }, 0);
  }

  // Add to Shopping Bag (NO POPUPS: updates badge, shows link toast)
  function addToBag(id, quantity = 1) {
    const existing = cart.find(c => c.id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id, quantity });
    }
    savePersistedData();
    updateBadges();

    const product = PRODUCTS.find(p => p.id === id);
    const prodName = product ? product.name : 'Piece';
    showToast(`Added <strong>${prodName}</strong> to your bag. <a href="cart.html" style="color:var(--c-10);text-decoration:underline;margin-left:8px;font-weight:600;">View Bag →</a>`);

    // If currently on cart page, re-render immediately
    if (document.getElementById('cartContentContainer')) {
      renderCartPage();
    }
  }

  // Update Cart Quantity
  function updateCartItemQty(id, newQty) {
    if (newQty <= 0) {
      removeCartItem(id);
      return;
    }
    const item = cart.find(c => c.id === id);
    if (item) {
      item.quantity = newQty;
      savePersistedData();
      updateBadges();
      if (document.getElementById('cartContentContainer')) {
        renderCartPage();
      }
    }
  }

  // Remove from Bag
  function removeCartItem(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    cart = cart.filter(c => c.id !== id);
    savePersistedData();
    updateBadges();
    showToast(`Removed ${prod ? prod.name : 'item'} from your bag`);
    if (document.getElementById('cartContentContainer')) {
      renderCartPage();
    }
  }

  // Toggle Wishlist
  function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    const prod = PRODUCTS.find(p => p.id === id);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast(`Removed ${prod ? prod.name : 'item'} from saved list`);
    } else {
      wishlist.push(id);
      showToast(`Saved ${prod ? prod.name : 'item'} to your wishlist`);
    }
    savePersistedData();
    updateBadges();
    renderProducts();
  }

  // Dedicated Cart Page Renderer (for cart.html)
  function renderCartPage() {
    const container = document.getElementById('cartContentContainer');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <h2 class="cart-empty-title">Your shopping bag is empty.</h2>
          <p style="color: var(--c-text-muted); margin-bottom: 28px; font-size: 0.95rem;">
            Explore our curated heirloom Maharashtrian naths, karnaful ear-cuffs, and bridal bangles.
          </p>
          <a href="index.html#maisons" class="btn-pill btn-pill-primary">
            Explore Handcrafted Collections →
          </a>
        </div>
      `;
      return;
    }

    const subtotalINR = getBagSubtotalINR();
    const formattedSubtotal = formatPrice(subtotalINR);

    const itemsRowsHtml = cart.map(entry => {
      const prod = PRODUCTS.find(p => p.id === entry.id);
      if (!prod) return '';
      const lineTotal = formatPrice(prod.priceINR * entry.quantity);
      const unitPrice = formatPrice(prod.priceINR);

      return `
        <tr class="cart-row">
          <td>
            <div class="cart-prod-cell">
              <a href="${prod.url}">
                <img src="${prod.image}" alt="${prod.name}" class="cart-prod-thumb">
              </a>
              <div>
                <h3 class="cart-prod-name">
                  <a href="${prod.url}">${prod.name}</a>
                </h3>
                <div class="cart-prod-meta">${prod.marathiSubtitle} • ${prod.purity}</div>
                <button class="cart-remove-link" onclick="window.kanakApp.removeCartItem('${prod.id}')" aria-label="Remove ${prod.name}">
                  Remove piece
                </button>
              </div>
            </div>
          </td>
          <td class="cart-price-cell">
            ${unitPrice}
          </td>
          <td>
            <div class="qty-stepper" style="margin: 0;">
              <button class="qty-btn" onclick="window.kanakApp.updateCartItemQty('${prod.id}', ${entry.quantity - 1})" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${entry.quantity}</span>
              <button class="qty-btn" onclick="window.kanakApp.updateCartItemQty('${prod.id}', ${entry.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td class="cart-total-cell">
            ${lineTotal}
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="cart-grid-layout">
        <div>
          <table class="cart-items-table">
            <thead>
              <tr>
                <th>Piece</th>
                <th>Price</th>
                <th>Quantity</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRowsHtml}
            </tbody>
          </table>

          <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            <a href="index.html#maisons" class="btn-pill btn-pill-outline" style="padding: 10px 22px; font-size: 0.82rem;">
              ← Continue Shopping
            </a>
            <button onclick="window.kanakApp.orderViaWhatsApp()" class="btn-pill btn-pill-outline" style="padding: 10px 22px; font-size: 0.82rem;">
              Inquire via WhatsApp Concierge →
            </button>
          </div>
        </div>

        <div>
          <div class="cart-summary-card">
            <h2 class="cart-summary-title">Summary</h2>
            
            <div class="cart-calc-row">
              <span>Items Subtotal</span>
              <span>${formattedSubtotal}</span>
            </div>
            <div class="cart-calc-row muted">
              <span>Insured Transit</span>
              <span style="color: var(--c-30); font-weight: 600;">Complimentary</span>
            </div>
            <div class="cart-calc-row muted">
              <span>Quality Checked</span>
              <span>Included</span>
            </div>
            
            <div class="cart-calc-row total">
              <span>Estimated Total</span>
              <span>${formattedSubtotal}</span>
            </div>

            <a href="checkout.html" class="btn-pill btn-pill-primary btn-block" style="text-align: center; text-decoration: none; padding: 16px; font-size: 0.9rem;">
              Proceed to Checkout →
            </a>

            <div style="margin-top: 18px; font-size: 0.78rem; color: var(--c-text-muted); line-height: 1.5; text-align: center;">
              🔒 Premium Gold Polish • Safe Transit Packing • Quality Inspected
            </div>
          </div>
        </div>
      </div>
    `;
    refreshScrollMotion();
  }

  // Dedicated Checkout Page Renderer (for checkout.html)
  function renderCheckoutPage() {
    const reviewItemsContainer = document.getElementById('checkoutReviewItems');
    const reviewSubtotalElem = document.getElementById('checkoutReviewSubtotal');
    const reviewTotalElem = document.getElementById('checkoutReviewTotal');
    if (!reviewItemsContainer || !reviewSubtotalElem || !reviewTotalElem) return;

    if (cart.length === 0) {
      reviewItemsContainer.innerHTML = `
        <div style="padding: 24px 0; text-align: center; color: var(--c-text-muted);">
          <p>Your bag is currently empty.</p>
          <a href="index.html#maisons" class="btn-pill btn-pill-primary" style="margin-top: 14px; font-size: 0.82rem; padding: 10px 20px;">
            Select Jewellery Pieces →
          </a>
        </div>
      `;
      reviewSubtotalElem.textContent = formatPrice(0);
      reviewTotalElem.textContent = formatPrice(0);
      return;
    }

    const subtotalINR = getBagSubtotalINR();
    const formattedTotal = formatPrice(subtotalINR);

    reviewItemsContainer.innerHTML = cart.map(entry => {
      const prod = PRODUCTS.find(p => p.id === entry.id);
      if (!prod) return '';
      return `
        <div style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--c-border);">
          <img src="${prod.image}" alt="${prod.name}" style="width: 54px; height: 54px; object-fit: cover; border: 1px solid var(--c-border);">
          <div style="flex: 1;">
            <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--c-30); margin: 0 0 2px;">${prod.name}</h4>
            <div style="font-size: 0.76rem; color: var(--c-text-muted);">Qty: ${entry.quantity} × ${formatPrice(prod.priceINR)}</div>
          </div>
          <span style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--c-30); font-weight: 600;">
            ${formatPrice(prod.priceINR * entry.quantity)}
          </span>
        </div>
      `;
    }).join('');

    reviewSubtotalElem.textContent = formattedTotal;
    reviewTotalElem.textContent = formattedTotal;

    // Payment radio click interactions
    document.querySelectorAll('.payment-radio-box').forEach(box => {
      box.addEventListener('click', () => {
        document.querySelectorAll('.payment-radio-box').forEach(b => b.classList.remove('active'));
        box.classList.add('active');
        const radio = box.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
    refreshScrollMotion();
  }

  // Full Checkout Submission Handler
  function handleFullCheckout(e) {
    if (e && e.preventDefault) e.preventDefault();

    if (cart.length === 0) {
      showToast('Please add items to your shopping bag before checking out.');
      return;
    }

    const orderNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `KNK-${orderNum}`;

    // Clear cart in state & localStorage
    cart = [];
    savePersistedData();
    updateBadges();

    // Redirect cleanly to order confirmation page
    window.location.href = `order-confirmation.html?id=${orderId}`;
  }

  // Direct WhatsApp Bag Order
  function orderViaWhatsApp() {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }

    let itemsText = cart.map(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return `• ${p ? p.name : item.id} (Qty: ${item.quantity}) - ₹${p ? (p.priceINR * item.quantity).toLocaleString('en-IN') : 0}`;
    }).join('%0A');

    const total = getBagSubtotalINR();
    const message = `Namaskar Kanak Jewellery! I would like to place an order for the following handcrafted pieces:%0A%0A${itemsText}%0A%0ATotal Order Value: ₹${total.toLocaleString('en-IN')}%0A%0APlease confirm availability and share payment guidance.`;
    const phone = '919152284091';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  function orderSingleWhatsApp(id) {
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;
    const message = `Namaskar Kanak Jewellery! I am interested in inquiring about:%0A• ${prod.name} (${prod.purity})%0APrice: ₹${prod.priceINR.toLocaleString('en-IN')}%0A%0APlease share details regarding customization, sizing, and delivery schedule.`;
    const phone = '919152284091';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }

  function subscribeNewsletter() {
    showToast('Thank you for subscribing to Letters from the Atelier.');
  }

  // Testimonials Carousel Motion
  function scrollTestimonials(direction) {
    const grid = document.querySelector('.testimonial-cards-grid');
    if (grid) {
      const card = grid.querySelector('.testimonial-card');
      const step = card ? (card.offsetWidth + 24) * direction : 360 * direction;
      grid.scrollBy({ left: step, behavior: 'smooth' });
    }
  }

  // Full Page Editorial Menu System (Global Scope)
  function openFullMenu() {
    const fullPageMenu = document.getElementById('fullPageMenu');
    if (!fullPageMenu) return;
    fullPageMenu.scrollTop = 0;
    fullPageMenu.classList.add('is-open');
    fullPageMenu.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    const bagCount = fullPageMenu.querySelector('.fp-bag-count');
    if (bagCount && typeof cart !== 'undefined') {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      bagCount.textContent = total;
    }
  }

  function closeFullMenu() {
    const fullPageMenu = document.getElementById('fullPageMenu');
    if (!fullPageMenu) return;
    fullPageMenu.classList.remove('is-open');
    fullPageMenu.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
  }

  window.openFullMenu = openFullMenu;
  window.closeFullMenu = closeFullMenu;

  // Safe Event Listeners
  function initEventListeners() {
    // Currency Selector
    const currencySelect = document.getElementById('currencySelect');
    if (currencySelect) {
      currencySelect.value = activeCurrency;
      currencySelect.addEventListener('change', (e) => {
        activeCurrency = e.target.value;
        savePersistedData();
        renderProducts();
        if (document.getElementById('cartContentContainer')) renderCartPage();
        if (document.getElementById('checkoutReviewItems')) renderCheckoutPage();
        showToast(`Currency updated to ${CURRENCIES[activeCurrency].label}`);
      });
    }

    // Delegated click handling for full page menu & links across the whole document
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('#menuToggleBtn, .menu-trigger-btn, #mobileMenuBtn, [data-action="open-menu"]');
      if (openBtn) {
        e.preventDefault();
        openFullMenu();
        return;
      }
      const closeBtn = e.target.closest('#fpMenuCloseBtn, .fp-menu-close-btn, [data-action="close-menu"]');
      if (closeBtn) {
        e.preventDefault();
        closeFullMenu();
        return;
      }
      // If clicking inside menu links, close the menu and allow navigation
      const menuLink = e.target.closest('#fullPageMenu a');
      if (menuLink) {
        closeFullMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const fullPageMenu = document.getElementById('fullPageMenu');
        if (fullPageMenu && fullPageMenu.classList.contains('is-open')) {
          closeFullMenu();
        }
      }
    });

    // Hash navigation listener to complete intro and scroll smoothly
    window.addEventListener('hashchange', () => {
      if (document.body.classList.contains('intro-active')) {
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-complete');
        const stage = document.getElementById('logo3dStage');
        if (stage) stage.style.display = 'none';
      }
    });

    // Category filter buttons (on index.html if present)
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          currentCategory = btn.dataset.category;
          renderProducts();
        });
      });
    }

    // Header Links with data-filter
    document.querySelectorAll('[data-filter]').forEach(link => {
      link.addEventListener('click', () => {
        const filterVal = link.dataset.filter;
        currentCategory = filterVal;
        filterBtns.forEach(b => {
          if (b.dataset.category === filterVal) {
            b.classList.add('active');
            b.setAttribute('aria-selected', 'true');
          } else {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          }
        });
        renderProducts();
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }

    // Bespoke Form
    const bespokeForm = document.getElementById('bespokeForm');
    if (bespokeForm) {
      bespokeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('bespokeName');
        const name = nameInput ? nameInput.value : 'Patron';
        showToast(`Thank you, ${name}. Your bespoke consultation request has been recorded.`);
        e.target.reset();
      });
    }
  }

  // Instagram Proofs Filter (All, Reels, Posts)
  function filterInstaProofs(type, btnElement) {
    const cards = document.querySelectorAll('.insta-proof-card');
    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      if (type === 'all' || cardType === type) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    const buttons = document.querySelectorAll('.insta-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
      btnElement.classList.add('active');
    } else {
      const matchBtn = Array.from(buttons).find(b => {
        if (type === 'all' && b.textContent.includes('All')) return true;
        if (type === 'reel' && b.textContent.includes('Reels')) return true;
        if (type === 'post' && b.textContent.includes('Patron')) return true;
        return false;
      });
      if (matchBtn) matchBtn.classList.add('active');
    }
  }

  // Sticky Header Motion Transition
  function initStickyHeaderMotion() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Comprehensive Selectors for Repeatable Scroll Reveal across All Pages
  const SCROLL_REVEAL_SELECTORS = [
    // Homepage Hero & Stats
    '.hero-editorial-content',
    '.hero-editorial-visual',
    '.hero-editorial-actions',
    '.hero-trust-strip',
    '.stat-item',
    '.jharokha-frame-wrap',
    '.jharokha-caption',
    
    // Heirloom Collections
    '.maisons-header',
    '.maison-col',
    '.maisons-cta-wrap',
    
    // Heritage Karigari Atelier Spotlight
    '.atelier-header',
    '.atelier-featured-col',
    '.stagger-card',
    
    // Bestsellers Clientele
    '.clientele-header',
    '.editorial-card',
    '.clientele-section .btn-pill',
    
    // Testimonials
    '.testimonials-section .testimonials-title',
    '.testimonials-section > div:first-child',
    '.testimonial-card',
    '.testimonial-nav-arrows',
    
    // Newsletter
    '.newsletter-box',
    
    // Instagram Social Proofs
    '.insta-section-top',
    '.insta-profile-hub',
    '.insta-highlight-bubble',
    '.insta-tabs-group',
    '.insta-proof-card',
    '.insta-bottom-cta-wrap',
    
    // PDP Elements
    '.breadcrumb-nav',
    '.pdp-gallery',
    '.pdp-info',
    '.pdp-description',
    '.pdp-actions-row',
    '.pdp-specs-box',
    '.pdp-trust-pills',
    '.pdp-accordion-group',
    '.related-header',
    '.product-card',
    '.pdp-proof-card',
    '.pdp-service-strip',
    
    // Cart Page
    '.cart-header',
    '.cart-layout',
    '.cart-items-card',
    '.cart-summary-card',
    '.cart-empty-box',
    
    // Checkout Page
    '.checkout-header',
    '.checkout-section-block',
    '.checkout-review-card',
    
    // Contact Page
    '.contact-header',
    '.contact-form-col',
    '.contact-details-col',
    
    // Order Confirmation
    '.confirm-card',
    
    // Site Footer
    '.site-footer .footer-brand-col',
    '.site-footer .footer-col',
    '.site-footer .footer-bottom',
    
    // Explicit Reveal Markers
    '.reveal-on-scroll'
  ].join(', ');

  let scrollRevealObserver = null;

  function refreshScrollMotion() {
    if (!scrollRevealObserver || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll(SCROLL_REVEAL_SELECTORS);
    elements.forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
      scrollRevealObserver.observe(el);
    });
  }

  // Repeatable Bidirectional Scroll Reveal System
  // Triggers when scrolling DOWN and when scrolling UP, never unobserves, repeatable on every scroll
  function initScrollMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(SCROLL_REVEAL_SELECTORS).forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const targets = document.querySelectorAll(SCROLL_REVEAL_SELECTORS);
    targets.forEach(el => {
      el.classList.add('reveal-on-scroll');
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    // Bidirectional, repeatable scroll reveal observer
    // Triggers when scrolling DOWN and when scrolling UP!
    // Never unobserves — repeatable whenever you scroll!
    scrollRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // When scrolling away (above or below), remove is-revealed so it reveals again next time!
          entry.target.classList.remove('is-revealed');
        }
      });
    }, {
      rootMargin: '20px 0px -10px 0px',
      threshold: 0.01
    });

    targets.forEach(el => scrollRevealObserver.observe(el));
  }

  // Interactive Stat Counter Animation for Jharokha Section (Repeatable on Scroll)
  function initStatCounterMotion() {
    const section = document.querySelector('.arch-stats-section');
    if (!section || !('IntersectionObserver' in window)) return;

    let isAnimating = false;
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!hasAnimated && !isAnimating) {
            hasAnimated = true;
            animateNumbers();
          }
        } else {
          // Reset so that whenever user scrolls away and returns, it animates again!
          hasAnimated = false;
        }
      });
    }, { threshold: 0.15 });

    observer.observe(section);

    function animateNumbers() {
      isAnimating = true;
      const statNums = section.querySelectorAll('.stat-num[data-target]');
      const duration = 1400;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        statNums.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const currentVal = (target * ease).toFixed(decimals);
          el.innerHTML = `${currentVal}<em>${suffix}</em>`;
        });

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          isAnimating = false;
          statNums.forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const suffix = el.getAttribute('data-suffix') || '';
            const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
            el.innerHTML = `${target.toFixed(decimals)}<em>${suffix}</em>`;
          });
        }
      }

      requestAnimationFrame(update);
    }
  }

  // 3D Logo Preloader & Smooth Entrance Transition
  function init3DLogoScroll() {
    const stage = document.getElementById('logo3dStage');
    const anchor = document.getElementById('logo3dAnchor');
    const card = document.getElementById('logo3dCard');
    const backdrop = document.getElementById('logo3dBackdrop');
    const hint = document.getElementById('logo3dScrollHint');
    const brandLogoImg = document.querySelector('.site-header .brand-logo-img');
    if (!stage || !anchor || !card || !backdrop || !brandLogoImg) return;

    // Check if user navigated with an anchor hash or reloaded mid-page
    if (window.location.hash || (window.scrollY || 0) > 40) {
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
      document.documentElement.classList.add('intro-complete');
      document.body.classList.add('intro-complete');
      stage.style.display = 'none';
      brandLogoImg.style.opacity = '1';
      return;
    }

    // Set preloader mode: blank screen with ONLY center logo
    document.documentElement.classList.add('intro-active');
    document.body.classList.add('intro-active');
    document.documentElement.classList.remove('intro-complete');
    document.body.classList.remove('intro-complete');
    document.body.style.setProperty('--intro-progress', '0');
    document.body.style.setProperty('--brand-docked-opacity', '0');
    window.scrollTo(0, 0);

    const getMetrics = () => {
      const isMobile = window.innerWidth <= 768;
      const startWidth = isMobile ? 220 : 340;
      const startHeight = Math.round(startWidth * (114 / 426));
      return { isMobile, startWidth, startHeight };
    };

    let metrics = getMetrics();
    anchor.style.width = `${metrics.startWidth}px`;
    anchor.style.height = `${metrics.startHeight}px`;

    let mouseTiltX = 0;
    let mouseTiltY = 0;
    let targetMouseTiltX = 0;
    let targetMouseTiltY = 0;
    let isTransitioning = false;
    let isCompleted = false;

    // Subtle 3D mouse parallax tilt at rest
    function onMouseMove(e) {
      if (isTransitioning || isCompleted) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetMouseTiltY = ((e.clientX - cx) / cx) * 8;
      targetMouseTiltX = -((e.clientY - cy) / cy) * 8;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Center logo at screen center
    function positionAtCenter() {
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      mouseTiltX += (targetMouseTiltX - mouseTiltX) * 0.1;
      mouseTiltY += (targetMouseTiltY - mouseTiltY) * 0.1;
      anchor.style.transform = `translate3d(${startX}px, ${startY}px, 0) translate(-50%, -50%) scale(1)`;
      card.style.transform = `perspective(1000px) rotateX(${mouseTiltX.toFixed(2)}deg) rotateY(${mouseTiltY.toFixed(2)}deg) translateZ(25px)`;
    }
    positionAtCenter();

    // Idle loop for gentle 3D tilt before entrance
    let idleRafId = null;
    function idleLoop() {
      if (!isTransitioning && !isCompleted) {
        positionAtCenter();
        idleRafId = requestAnimationFrame(idleLoop);
      }
    }
    idleRafId = requestAnimationFrame(idleLoop);

    // Easing curve: smooth luxury quartic out for silk-smooth deceleration
    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    // Smooth Entrance Choreography
    function enterAtelier() {
      if (isTransitioning || isCompleted) return;
      isTransitioning = true;
      if (stage) stage.style.pointerEvents = 'none';
      if (idleRafId) cancelAnimationFrame(idleRafId);
      window.scrollTo(0, 0);

      // Lock starting metrics and target navbar logo location
      metrics = getMetrics();
      const targetRect = brandLogoImg.getBoundingClientRect();
      const startX = window.innerWidth / 2;
      const startY = window.innerHeight / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const targetScale = targetRect.height / metrics.startHeight;

      const duration = 950; // ms
      let startTime = null;

      function step(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progressRaw = Math.min(1, elapsed / duration);
        const p = easeOutQuart(progressRaw);

        // Interpolate position and scale
        const curCenterX = startX + (targetCenterX - startX) * p;
        const curCenterY = startY + (targetCenterY - startY) * p;
        const curScale = 1 + (targetScale - 1) * p;

        // Smoothly decay tilt to 0
        const rotX = (1 - p) * mouseTiltX;
        const rotY = (1 - p) * mouseTiltY;
        const tz = (1 - p) * 25;

        anchor.style.transform = `translate3d(${curCenterX.toFixed(2)}px, ${curCenterY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${curScale.toFixed(4)})`;
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px)`;

        // Update overall intro progress (drives header, announcement, hero fade-in)
        document.body.style.setProperty('--intro-progress', p.toFixed(4));
        backdrop.style.opacity = Math.max(0, 1 - p * 1.15).toFixed(4);
        if (hint) hint.style.opacity = Math.max(0, 1 - p * 3).toFixed(4);

        // Seamless Docking Coordination: Cross-fade from p = 0.72 to 1.0
        // Floating logo and navbar logo overlap at identical coordinates and smoothly exchange opacities
        if (p < 0.72) {
          anchor.style.opacity = '1';
          brandLogoImg.style.opacity = '0';
          document.body.style.setProperty('--brand-docked-opacity', '0');
        } else {
          const dockP = (p - 0.72) / 0.28;
          const floatingOpacity = Math.max(0, 1 - dockP);
          const dockedOpacity = Math.min(1, dockP);
          anchor.style.opacity = floatingOpacity.toFixed(3);
          brandLogoImg.style.opacity = dockedOpacity.toFixed(3);
          document.body.style.setProperty('--brand-docked-opacity', dockedOpacity.toFixed(3));
        }

        if (progressRaw < 1) {
          requestAnimationFrame(step);
        } else {
          // Transition complete: finalize permanent state
          isCompleted = true;
          isTransitioning = false;
          document.documentElement.classList.remove('intro-active');
          document.body.classList.remove('intro-active');
          document.documentElement.classList.add('intro-complete');
          document.body.classList.add('intro-complete');
          document.documentElement.style.overflow = '';
          document.documentElement.style.height = '';
          document.body.style.overflow = '';
          document.body.style.height = '';
          document.body.style.removeProperty('--intro-progress');
          document.body.style.removeProperty('--brand-docked-opacity');

          stage.style.display = 'none';
          anchor.style.display = 'none';
          brandLogoImg.style.opacity = '1';

          // Trigger repeatable scroll reveal on newly revealed hero elements
          if (typeof refreshScrollMotion === 'function') {
            refreshScrollMotion();
          }

          cleanupListeners();
        }
      }

      requestAnimationFrame(step);
    }

    // Trigger gestures
    function onWheel(e) {
      if (isCompleted || isTransitioning) return;
      if (e.deltaY > 0 || Math.abs(e.deltaY) > 5) {
        e.preventDefault();
        enterAtelier();
      }
    }

    let touchStartY = 0;
    function onTouchStart(e) {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    }
    function onTouchMove(e) {
      if (isCompleted || isTransitioning) return;
      if (e.touches && e.touches[0]) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 10) {
          e.preventDefault();
          enterAtelier();
        }
      }
    }

    function onKeyDown(e) {
      if (isCompleted || isTransitioning) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        enterAtelier();
      }
    }

    function onClick() {
      if (!isCompleted && !isTransitioning) {
        enterAtelier();
      }
    }

    function onWindowScroll() {
      if (isCompleted) return;
      if (!isTransitioning) {
        window.scrollTo(0, 0);
        enterAtelier();
      }
    }

    function cleanupListeners() {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onWindowScroll);
      stage.removeEventListener('click', onClick);
      if (hint) hint.removeEventListener('click', onClick);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    stage.addEventListener('click', onClick);
    if (hint) hint.addEventListener('click', onClick);

    function onResize() {
      if (!isCompleted && !isTransitioning) {
        metrics = getMetrics();
        anchor.style.width = `${metrics.startWidth}px`;
        anchor.style.height = `${metrics.startHeight}px`;
        positionAtCenter();
      }
    }
    window.addEventListener('resize', onResize, { passive: true });
  }

  // App Initialization
  function init() {
    loadPersistedData();
    renderProducts();
    updateBadges();
    initEventListeners();
    initStickyHeaderMotion();
    initScrollMotion();
    initStatCounterMotion();
    init3DLogoScroll();
  }

  function toggleAccordion(btn) {
    const item = btn.closest('.pdp-accordion-item');
    if (!item) return;
    item.classList.toggle('open');
  }

  // Global namespace for inline handlers
  window.kanakApp = {
    openMenu: openFullMenu,
    closeMenu: closeFullMenu,
    addToBag,
    removeCartItem,
    updateCartItemQty,
    toggleWishlist,
    renderCartPage,
    renderCheckoutPage,
    handleFullCheckout,
    orderViaWhatsApp,
    orderSingleWhatsApp,
    subscribeNewsletter,
    filterInstaProofs,
    scrollTestimonials,
    toggleAccordion,
    enterAtelier: () => {
      const hint = document.getElementById('logo3dScrollHint');
      if (hint) hint.click();
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
