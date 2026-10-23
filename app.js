document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const screenTitles = { home: 'Executive Summary', orders: 'POS / Orders', inventory: 'Inventory', expenses: 'Expenses', staff: 'Staff & Salary' };
  const screens = document.querySelectorAll('.screen');
  const navItems = document.querySelectorAll('.nav-item');
  const titleEl = document.getElementById('screen-title');

  function showScreen(name) {
    screens.forEach((s) => s.classList.toggle('active', s.dataset.screen === name));
    navItems.forEach((n) => n.classList.toggle('active', n.dataset.nav === name));
    if (titleEl) titleEl.textContent = screenTitles[name] || name;
    if (window.lucide) window.lucide.createIcons();
  }
  navItems.forEach((item) => item.addEventListener('click', () => showScreen(item.dataset.nav)));
  // Quick navigation links
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); showScreen(el.dataset.go); });
  });

  const timeEl = document.getElementById('current-time');
  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    if (timeEl) timeEl.textContent = `${h}:${m}`;
  }
  updateTime(); setInterval(updateTime, 30000);

  const qsBtn = document.getElementById('quick-stats-btn');
  if (qsBtn) qsBtn.addEventListener('click', () => alert('Quick Stats coming soon'));

  // POS logic
  const menuData = {"restaurant_name":"The Royal Dhamrai Restaurant","contact":{"phones":["01722-347072","01965-890812"],"address":"Area-Dhulivita Bus Stand, opposite ACME Gate No: 5, Dhamrai, Dhaka"},"menu":[{"category":"Appetizers & Snacks","items":[{"name":"French Fries","price":99},{"name":"Chicken Fry (1pc)","price":99},{"name":"Potato Wedges (10pcs)","price":120},{"name":"KFC Style Chicken Fry (1pc)","price":110},{"name":"Wonton (6pcs)","price":150},{"name":"Chicken Spring Roll (6pcs)","price":150},{"name":"Nachos","price":150},{"name":"Meat Box","price":180},{"name":"Student Meat Box","price":120},{"name":"Chicken Shawarma","price":160}]},{"category":"Royal Burgers","items":[{"name":"Chicken Burger","price":140},{"name":"Naga Burger","price":180},{"name":"BBQ Burger","price":180},{"name":"Double Delight Burger","price":250},{"name":"Mini Burger","price":99},{"name":"The Royal Special Burger","price":350},{"name":"Beef Cheeses Burger","price":280}]},{"category":"Premium Pizza","items":[{"name":"4 Season Pizza","variants":[{"size":"8\"","price":320},{"size":"10\"","price":450},{"size":"12\"","price":600}]},{"name":"Cheese Overload Pizza","variants":[{"size":"8\"","price":400},{"size":"10\"","price":530},{"size":"12\"","price":700}]},{"name":"Mexican Pizza","variants":[{"size":"8\"","price":300},{"size":"10\"","price":450},{"size":"12\"","price":550}]},{"name":"BBQ Pizza","variants":[{"size":"8\"","price":450},{"size":"10\"","price":550},{"size":"12\"","price":660}]},{"name":"Dhamrai Special Pizza","variants":[{"size":"8\"","price":500},{"size":"10\"","price":660},{"size":"12\"","price":800}]},{"name":"Margarita Pizza","variants":[{"size":"8\"","price":250},{"size":"10\"","price":400},{"size":"12\"","price":450}]}]},{"category":"Noodles & Pasta","items":[{"name":"Chicken Pasta","price":160},{"name":"Cheese & Chicken Pasta","price":220},{"name":"Naga Pasta","price":180},{"name":"White Sauce Pasta","price":150},{"name":"BBQ Pasta","price":200},{"name":"Oven Baked Pasta","price":180},{"name":"Chicken Noodles","variants":[{"portion":"1:1","price":120},{"portion":"1:2","price":200}]},{"name":"Vegetable Noodles","variants":[{"portion":"1:1","price":99},{"portion":"1:2","price":170}]},{"name":"Egg Noodles","variants":[{"portion":"1:1","price":99},{"portion":"1:2","price":170}]},{"name":"Thai Noodles","portion":"1:3","price":350},{"name":"Mixed Noodles","portion":"1:3","price":320}]},{"category":"Soup & Crispy Chicken","items":[{"name":"Thai Soup","portion":"1:1","price":140},{"name":"Corn Soup","portion":"1:1","price":120},{"name":"Royal Special Soup","portion":"1:1","price":160},{"name":"Thai Chicken Fry (8pcs)","price":420},{"name":"Bangkok Chicken Fry (8pcs)","price":450},{"name":"Spring Chicken Fry (8pcs)","price":350},{"name":"Naga Wings","price":200},{"name":"BBQ Wings","price":220}]},{"category":"Royal Set Menus","items":[{"name":"Set 1: Royal Delight","description":"Royal Fried Rice, Vegetable, 1pc Chicken Fry, Salad","price":189},{"name":"Set 2: Classic Combo","description":"Fried Rice, Vegetable, 2pcs Chicken Fry, Chicken Masala, Soft Drinks","price":350},{"name":"Set 3: Tandoori Feast","description":"Fried Rice, Vegetable, Tandoori Chicken, Soft Drinks, Water","price":380},{"name":"Set 4: Chili Fusion","description":"Fried Rice, Vegetable, Chicken Chili Onion, Water","price":220},{"name":"Set 5: Prawn Special","description":"Fried Rice, Vegetable, Prawn Masala, Soft Drinks","price":260},{"name":"Set 6: Traditional Khichuri","description":"Bhuna Khichuri, Chicken Masala, Salad, Achar, Water","price":170}]},{"category":"Rice & Curry Specials","items":[{"name":"Egg Fried Rice","portion":"1:3","price":280},{"name":"Chicken Fried Rice","portion":"1:3","price":320},{"name":"The Royal Signature Fried Rice","portion":"1:3","price":380},{"name":"Chicken Masala","price":350},{"name":"Chicken Chili Onion","price":320},{"name":"Foyel Chicken","price":400},{"name":"Prawn Masala","price":390},{"name":"Garlic Mushroom Prawn","price":390},{"name":"Chicken Sizzling","price":320},{"name":"Beef/Prawn Sizzling","price":380}]},{"category":"Tandoori & Nan","items":[{"name":"Butter Nan","price":50},{"name":"Garlic Nan","price":80},{"name":"Tandoori Chicken","price":130}]},{"category":"Beverages","items":[{"name":"Hot Coffee","price":80},{"name":"Cold Coffee","price":120},{"name":"Black Coffee","price":60},{"name":"Lassi","price":100},{"name":"Milk Shake","price":150},{"name":"Oreo Shake","price":140},{"name":"Ocean Blue","price":120},{"name":"Fresh Fruit Juice","variants":[{"type":"Regular","price":120},{"type":"Special","price":150}]},{"name":"Soft Drinks","price":25},{"name":"Mineral Water","price":20}]}]};

  const categories = [
    'All',
    'Appetizers & Snacks',
    'Royal Burgers',
    'Premium Pizza',
    'Noodles & Pasta',
    'Soup & Crispy Chicken',
    'Royal Set Menus',
    'Rice & Curry Specials',
    'Tandoori & Nan',
    'Beverages',
  ];

  // Flatten menu into selectable items
  let idCounter = 1;
  const menuItems = [];
  menuData.menu.forEach(cat => {
    cat.items.forEach(it => {
      if (it.variants) {
        it.variants.forEach(v => {
          const label = v.size || v.portion || v.type;
          menuItems.push({ id: idCounter++, name: `${it.name} (${label})`, price: v.price, category: cat.category, desc: it.description || '' });
        });
      } else {
        const suffix = it.portion ? ` (${it.portion})` : '';
        menuItems.push({ id: idCounter++, name: `${it.name}${suffix}`, price: it.price, category: cat.category, desc: it.description || '' });
      }
    });
  });

  const catEmoji = {
    'Appetizers & Snacks': '🍟',
    'Royal Burgers': '🍔',
    'Premium Pizza': '🍕',
    'Noodles & Pasta': '🍜',
    'Soup & Crispy Chicken': '🍗',
    'Royal Set Menus': '🍱',
    'Rice & Curry Specials': '🍚',
    'Tandoori & Nan': '🫓',
    'Beverages': '🥤',
  };
  function itemEmoji(name) {
    const n = name.toLowerCase();
    if (n.includes('pizza')) return '🍕';
    if (n.includes('burger')) return '🍔';
    if (n.includes('coffee')) return '☕';
    if (n.includes('noodle') || n.includes('pasta')) return '🍜';
    if (n.includes('rice')) return '🍚';
    if (n.includes('soup')) return '🥣';
    if (n.includes('fries') || n.includes('wedges')) return '🍟';
    if (n.includes('water')) return '💧';
    if (n.includes('juice') || n.includes('shake') || n.includes('lassi')) return '🥤';
    if (n.includes('chicken') || n.includes('wings')) return '🍗';
    if (n.includes('nan') || n.includes('tandoori')) return '🫓';
    return '🍽️';
  }

  const cart = {};
  const menuGrid = document.getElementById('menu-grid');
  const cartItemsEl = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  const discountEl = document.getElementById('discount');

  function renderPills() {
    const container = document.getElementById('category-pills');
    container.innerHTML = '';
    categories.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'pill' + (c === 'All' ? ' active' : '');
      btn.dataset.cat = c;
      btn.textContent = (catEmoji[c] ? catEmoji[c] + ' ' : '') + c;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(c);
      });
      container.appendChild(btn);
    });
  }

  function renderMenu(cat) {
    menuGrid.innerHTML = '';
    const groups = cat === 'All' ? categories.slice(1) : [cat];
    groups.forEach(g => {
      const items = menuItems.filter(m => m.category === g);
      if (!items.length) return;
      const header = document.createElement('h3');
      header.className = 'cat-header';
      header.textContent = (catEmoji[g] ? catEmoji[g] + ' ' : '') + g;
      menuGrid.appendChild(header);
      const grid = document.createElement('div');
      grid.className = 'menu-grid-inner';
      items.forEach(m => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `<span class="emoji">${itemEmoji(m.name)}</span><span class="name">${m.name}</span><div class="menu-card-footer"><span class="price">৳${m.price}</span><button class="add-btn" data-id="${m.id}" aria-label="Add ${m.name} to order">+</button></div>`;
        card.querySelector('.add-btn').addEventListener('click', (e) => { e.stopPropagation(); addToCart(m.id); });
        grid.appendChild(card);
      });
      menuGrid.appendChild(grid);
    });
  }

  function addToCart(id) {
    if (!cart[id]) cart[id] = { ...menuItems.find(m => m.id === id), qty: 0 };
    cart[id].qty += 1;
    renderCart();
  }

  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    renderCart();
  }

  function removeItem(id) { delete cart[id]; renderCart(); }

  function renderCart() {
    cartItemsEl.innerHTML = '';
    Object.values(cart).forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div>
          <div class="ci-name">${item.name}</div>
          <div class="ci-price">$${item.price.toFixed(2)} x ${item.qty}</div>
        </div>
        <div class="qty-ctrl">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          <button class="remove-btn" data-action="rem" data-id="${item.id}">✕</button>
        </div>`;
      cartItemsEl.appendChild(row);
    });

    cartItemsEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = +btn.dataset.id;
        if (btn.dataset.action === 'inc') changeQty(id, 1);
        else if (btn.dataset.action === 'dec') changeQty(id, -1);
        else if (btn.dataset.action === 'rem') removeItem(id);
      });
    });

    updateTotals();
  }

  function updateTotals() {
    const subtotal = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
    const discount = parseFloat(discountEl.value) || 0;
    const tax = (subtotal - discount) * 0.05;
    const total = subtotal - discount + tax;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  discountEl.addEventListener('input', updateTotals);

  document.getElementById('clear-cart').addEventListener('click', () => {
    Object.keys(cart).forEach(k => delete cart[k]);
    renderCart();
  });

  document.getElementById('print-kot').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) return alert('Cart is empty');
    alert('KOT printed!'); showToast('KOT Sent to Kitchen');
  });
  document.getElementById('complete-payment').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) return alert('Cart is empty');
    alert('Payment completed!'); showToast('Order Placed!');
    Object.keys(cart).forEach(k => delete cart[k]);
    renderCart();
  });

  // category pills
  renderPills();
  renderMenu('All');
  renderCart();
});

  // Inventory logic
  const inventory = [
    { name: 'Raw Chicken', stock: 50, unit: 'kg' },
    { name: 'Beef', stock: 20, unit: 'kg' },
    { name: 'Prawns', stock: 15, unit: 'kg' },
    { name: 'Eggs', stock: 200, unit: 'pcs' },
    { name: 'Mozzarella Cheese', stock: 20, unit: 'kg' },
    { name: 'Milk', stock: 30, unit: 'ltr' },
    { name: 'Butter', stock: 10, unit: 'kg' },
    { name: 'Ice Cream/Whipped Cream', stock: 5, unit: 'kg' },
    { name: 'Rice', stock: 100, unit: 'kg' },
    { name: 'Flour/Atta', stock: 50, unit: 'kg' },
    { name: 'Pasta/Noodles', stock: 30, unit: 'kg' },
    { name: 'Burger Buns', stock: 100, unit: 'pcs' },
    { name: 'Pizza Dough Base', stock: 50, unit: 'pcs' },
    { name: 'Potatoes', stock: 40, unit: 'kg' },
    { name: 'Vegetables', stock: 25, unit: 'kg' },
    { name: 'Naga Chillies', stock: 2, unit: 'kg' },
    { name: 'Mushrooms', stock: 5, unit: 'kg' },
    { name: 'Salad greens', stock: 10, unit: 'kg' },
    { name: 'Lemons', stock: 50, unit: 'pcs' },
    { name: 'Soft Drink Cans/Bottles', stock: 200, unit: 'pcs' },
    { name: 'Mineral Water 500ml', stock: 200, unit: 'pcs' },
    { name: 'Coffee Beans/Powder', stock: 5, unit: 'kg' },
    { name: 'Syrup/Flavors', stock: 10, unit: 'bottles' },
  ];
  const LOW_THRESHOLD = {};
  inventory.forEach(i => LOW_THRESHOLD[i.name] = 10);

  function renderInventory() {
    const tbody = document.getElementById('inv-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    inventory.forEach(item => {
      const low = item.stock <= (LOW_THRESHOLD[item.name] || 0);
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.name}</td><td>${item.stock}</td><td>${item.unit}</td><td><span class="badge ${low ? 'low' : 'in'}">${low ? 'Low Stock' : 'In Stock'}</span></td>`;
      tbody.appendChild(tr);
    });
  }

  const modal = document.getElementById('stock-modal');
  const stockItemSel = document.getElementById('stock-item');
  function populateStockSelect() {
    stockItemSel.innerHTML = '';
    inventory.forEach(i => {
      const opt = document.createElement('option');
      opt.value = i.name; opt.textContent = i.name;
      stockItemSel.appendChild(opt);
    });
  }
  document.getElementById('add-stock-btn').addEventListener('click', () => {
    populateStockSelect();
    document.getElementById('stock-amount').value = '';
    modal.classList.remove('hidden');
  });
  document.getElementById('stock-cancel').addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('stock-save').addEventListener('click', () => {
    const name = stockItemSel.value;
    const amt = parseFloat(document.getElementById('stock-amount').value) || 0;
    const item = inventory.find(i => i.name === name);
    if (item) item.stock += amt;
    modal.classList.add('hidden');
    renderInventory(); showToast('Stock Updated!');
  });

  document.getElementById('deduct-btn').addEventListener('click', () => {
    const recipe = { 'Raw Chicken': 0.15, 'Burger Buns': 1 };
    Object.keys(recipe).forEach(name => {
      const item = inventory.find(i => i.name === name);
      if (item) item.stock = Math.max(0, item.stock - recipe[name]);
    });
    renderInventory();
    alert('Deducted: 0.15 kg Raw Chicken, 1 Burger Bun');
    showToast('Stock Updated!');
  });

  renderInventory();

  // Expense logic
  const salesToday = 1280.00;
  let expenses = [];
  function renderExpenses() {
    const list = document.getElementById('exp-list');
    list.innerHTML = '';
    expenses.forEach(e => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${e.cat} - ${e.note || ''}</span><span>-$${e.amount.toFixed(2)} <small style="color:#94a3b8">${e.date}</small></span>`;
      list.appendChild(li);
    });
    const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
    document.getElementById('sum-expenses').textContent = `$${totalExp.toFixed(2)}`;
    document.getElementById('sum-profit').textContent = `$${(salesToday - totalExp).toFixed(2)}`;
  }
  document.getElementById('exp-add').addEventListener('click', () => {
    const cat = document.getElementById('exp-cat').value;
    const amt = parseFloat(document.getElementById('exp-amount').value);
    const note = document.getElementById('exp-note').value.trim();
    if (!amt || amt <= 0) return alert('Enter valid amount');
    expenses.unshift({ cat, amount: amt, note, date: new Date().toLocaleDateString() });
    document.getElementById('exp-amount').value = '';
    document.getElementById('exp-note').value = '';
    renderExpenses(); showToast('Expense added');
  });

  const cashModal = document.getElementById('cashout-modal');
  document.getElementById('cashout-btn').addEventListener('click', () => cashModal.classList.remove('hidden'));
  document.getElementById('cashout-cancel').addEventListener('click', () => cashModal.classList.add('hidden'));
  document.getElementById('cashout-confirm').addEventListener('click', () => { cashModal.classList.add('hidden'); alert('Closing registered'); });

  renderExpenses();

  // Staff logic
  const staff = [
    { id: 1, name: 'Rahim Uddin', role: 'Manager', status: 'Present', base: 30000, advance: 5000 },
    { id: 2, name: 'Karim Mia', role: 'Chef', status: 'Present', base: 25000, advance: 2000 },
    { id: 3, name: 'Sumi Akter', role: 'Waiter', status: 'Shift', base: 15000, advance: 0 },
    { id: 4, name: 'Hasan Ali', role: 'Waiter', status: 'Absent', base: 15000, advance: 1000 },
  ];
  function renderStaff() {
    const list = document.getElementById('staff-list');
    list.innerHTML = '';
    staff.forEach(s => {
      const card = document.createElement('div');
      card.className = 'staff-card';
      card.innerHTML = `
        <div class="staff-row">
          <div><div class="staff-name">${s.name}</div><div class="staff-role">${s.role}</div></div>
          <span class="badge ${s.status.toLowerCase()}">${s.status}</span>
        </div>
        <div class="staff-actions">
          <button class="btn-secondary" data-act="att" data-id="${s.id}">Mark Attendance</button>
          <button class="btn-primary" data-act="adv" data-id="${s.id}">Give Advance</button>
        </div>`;
      list.appendChild(card);
    });
    list.querySelectorAll('[data-act]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = +btn.dataset.id;
        const s = staff.find(x => x.id === id);
        if (btn.dataset.act === 'att') {
          const states = ['Present', 'Absent', 'Shift'];
          s.status = states[(states.indexOf(s.status) + 1) % states.length];
          showToast('Attendance updated');
        } else {
          const amt = parseFloat(prompt('Advance amount?') || '0');
          if (amt > 0) { s.advance += amt; showToast('Advance recorded'); }
        }
        renderStaff();
        renderLedger();
      });
    });
    renderLedger();
  }
  function renderLedger() {
    const tbody = document.getElementById('ledger-tbody');
    tbody.innerHTML = '';
    staff.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.name}</td><td>$${s.base}</td><td>$${s.advance}</td><td>$${s.base - s.advance}</td>`;
      tbody.appendChild(tr);
    });
  }
  renderStaff();

  // Toast helper
  window.showToast = function(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2200);
  };

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
