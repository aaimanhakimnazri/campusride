/* ==========================================================
   Student Ride Booking System - shared logic
   Contains: sample datasets, simulated authentication (with
   admin role), booking storage (localStorage), navbar/footer.
   ========================================================== */
const SRBS = {};

(function () {
  'use strict';

  /* ---------- Storage keys ---------- */
  const KEY_USER = 'srbs_user';
  const KEY_BOOK = 'srbs_bookings';
  const KEY_ACC = 'srbs_accounts';

  /* ---------- Hardcoded admin account (no database needed) ---------- */
  const ADMIN = { username: 'admin', password: 'admin123', name: 'Administrator', role: 'admin' };

  /* ---------- Safe localStorage helpers ---------- */
  const store = {
    get(k, fallback) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };

  /* ---------- Dataset 1: Rides (dates are relative to today) ----------
     Pickup points include the 5 Kolej Kediaman: TAR, TR, THO, DO, TDM */
  const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
  const R = (id, off, time, from, to, driver, type, seats, price) =>
    ({ id, date: day(off), time, from, to, driver, type, seats, price });

  SRBS.rides = [
    R(1, 1, '07:30', "Kolej Tun Abdul Razak (TR)", "Kota Bharu Bus Terminal", 'Hafiz Jamil', 'Carpool', 3, 10),
    R(2, 1, '08:15', "Machang Town", "Kolej Tunku Abdul Rahman (TAR)", 'Nurul Huda', 'Carpool', 2, 4),
    R(3, 1, '17:00', "Kolej Tun Hussein Onn (THO)", "KB Mall", 'Aiman Daud', 'Carpool', 3, 10),
    R(4, 2, '06:45', "Kolej Dato' Onn (DO)", "Sultan Ismail Petra Airport", 'Hafiz Jamil', 'Carpool', 3, 18),
    R(5, 2, '09:00', "Kolej Tunku Abdul Rahman (TAR)", "Kota Bharu Bus Terminal", 'Campus Shuttle', 'Shuttle', 20, 6),
    R(6, 2, '13:30', "Kota Bharu Bus Terminal", "Kolej Tun Dr. Mahathir (TDM)", 'Campus Shuttle', 'Shuttle', 20, 6),
    R(7, 3, '07:50', "Machang Town", "Kolej Tun Abdul Razak (TR)", 'Farid Azman', 'Motorbike', 1, 3),
    R(8, 3, '18:30', "Kolej Tun Dr. Mahathir (TDM)", "Kelantan Trade Centre", 'Aiman Daud', 'Carpool', 2, 11),
    R(9, 4, '08:00', "Sultan Ismail Petra Airport", "Kolej Dato' Onn (DO)", 'Nurul Huda', 'Carpool', 3, 18),
    R(10, 5, '16:45', "Kolej Tun Hussein Onn (THO)", "Machang Town", 'Farid Azman', 'Motorbike', 1, 3),
    R(11, 6, '07:30', "Kolej Tun Dr. Mahathir (TDM)", "Kota Bharu Bus Terminal", 'Campus Shuttle', 'Shuttle', 20, 6),
    R(12, 7, '10:00', "Kota Bharu Bus Terminal", "Kolej Tunku Abdul Rahman (TAR)", 'Hafiz Jamil', 'Carpool', 3, 10),
    /* past rides (used by booking history) */
    R(101, -3, '07:30', "Kolej Tun Abdul Razak (TR)", "Kota Bharu Bus Terminal", 'Hafiz Jamil', 'Carpool', 3, 10),
    R(102, -6, '17:00', "Kolej Tun Hussein Onn (THO)", "KB Mall", 'Aiman Daud', 'Carpool', 3, 10),
    R(103, -9, '06:45', "Kolej Dato' Onn (DO)", "Sultan Ismail Petra Airport", 'Nurul Huda', 'Carpool', 3, 18),
    R(104, -12, '09:00', "Kolej Tunku Abdul Rahman (TAR)", "Kota Bharu Bus Terminal", 'Campus Shuttle', 'Shuttle', 20, 6)
  ];

  /* ---------- Dataset 2: Drivers ---------- */
  SRBS.drivers = [
    { name: 'Hafiz Jamil', vehicle: 'Perodua Myvi (White)', plate: 'DCA 4521', rating: 4.9, trips: 128, type: 'Carpool' },
    { name: 'Nurul Huda', vehicle: 'Proton Saga (Silver)', plate: 'DBM 1180', rating: 4.8, trips: 96, type: 'Carpool' },
    { name: 'Aiman Daud', vehicle: 'Perodua Axia (Red)', plate: 'DCS 7733', rating: 4.7, trips: 74, type: 'Carpool' },
    { name: 'Farid Azman', vehicle: 'Lambretta X250 (Black)', plate: 'DKR 2096', rating: 4.6, trips: 211, type: 'Motorbike' },
    { name: 'Campus Shuttle', vehicle: 'Toyota Coaster (Bus)', plate: 'DM 5510 A', rating: 4.5, trips: 540, type: 'Shuttle' }
  ];

  /* ---------- Dataset 3: Bookings (seeded on first visit) ---------- */
  const seedBookings = () => [
    { id: 1, rideId: 101, seats: 1, status: 'Completed' },
    { id: 2, rideId: 102, seats: 2, status: 'Completed' },
    { id: 3, rideId: 103, seats: 1, status: 'Completed' },
    { id: 4, rideId: 104, seats: 1, status: 'Cancelled' },
    { id: 5, rideId: 1, seats: 1, status: 'Confirmed' },
    { id: 6, rideId: 5, seats: 1, status: 'Confirmed' }
  ];

  SRBS.getBookings = () => {
    let b = store.get(KEY_BOOK, null);
    if (!b) { b = seedBookings(); store.set(KEY_BOOK, b); }
    return b;
  };
  SRBS.saveBookings = b => store.set(KEY_BOOK, b);
  SRBS.rideById = id => SRBS.rides.find(r => r.id === id);
  SRBS.resetData = () => store.del(KEY_BOOK);

  /* Seats left on a ride = capacity minus seats already booked */
  SRBS.seatsLeft = ride => {
    const taken = SRBS.getBookings()
      .filter(b => b.rideId === ride.id && b.status !== 'Cancelled')
      .reduce((s, b) => s + b.seats, 0);
    return ride.seats - taken;
  };

  /* ---------- Formatters ---------- */
  SRBS.fmtDate = d => d.toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' });
  SRBS.rm = n => 'RM ' + Number(n).toFixed(2);
  SRBS.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Simulated authentication ---------- */
  SRBS.login = (username, password) => {
    username = username.trim();
    if (!username || !password) return { ok: false, msg: 'Enter both your username and password.' };
    let account = null;
    if (username === ADMIN.username && password === ADMIN.password) account = ADMIN;
    else account = store.get(KEY_ACC, []).find(a => a.username === username && a.password === password);
    if (!account) return { ok: false, msg: 'Invalid username or password. Check your details or create a new account.' };
    store.set(KEY_USER, { username: account.username, name: account.name, role: account.role || 'user' });
    return { ok: true };
  };

  SRBS.register = (name, username, password) => {
    name = name.trim(); username = username.trim();
    if (name.length < 2) return { ok: false, msg: 'Enter your full name.' };
    if (!/^[A-Za-z0-9_]{4,}$/.test(username)) return { ok: false, msg: 'Username needs 4+ letters, numbers or underscores.' };
    if (password.length < 6) return { ok: false, msg: 'Password needs at least 6 characters.' };
    const accounts = store.get(KEY_ACC, []);
    if (username === ADMIN.username || accounts.some(a => a.username === username))
      return { ok: false, msg: 'That username is taken. Choose another one.' };
    accounts.push({ name, username, password });
    store.set(KEY_ACC, accounts);
    return { ok: true };
  };

  SRBS.user = () => store.get(KEY_USER, null);
  SRBS.logout = () => { store.del(KEY_USER); location.href = 'index.html'; };

  /* Redirect to login if no active session */
  SRBS.requireLogin = () => {
    if (!SRBS.user()) { location.replace('index.html'); return false; }
    return true;
  };

  /* All registered student accounts (used by the admin page) */
  SRBS.accounts = () => store.get(KEY_ACC, []);
  SRBS.resetAccounts = () => store.del(KEY_ACC);
  SRBS.isAdmin = () => { const u = SRBS.user(); return !!u && u.role === 'admin'; };

  /* Only admins may stay on the page; others are sent away */
  SRBS.requireAdmin = () => {
    if (!SRBS.user()) { location.replace('index.html'); return false; }
    if (!SRBS.isAdmin()) { location.replace('dashboard.html'); return false; }
    return true;
  };

  /* ---------- Toast message ---------- */
  SRBS.toast = (msg) => {
    let box = document.getElementById('toast-box');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toast-box';
      box.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(box);
    }
    const el = document.createElement('div');
    el.className = 'toast align-items-center text-bg-dark border-0';
    el.setAttribute('role', 'status');
    el.innerHTML = '<div class="d-flex"><div class="toast-body">' + SRBS.esc(msg) +
      '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>';
    box.appendChild(el);
    new bootstrap.Toast(el, { delay: 3500 }).show();
  };

  /* ---------- Shared navbar + footer ---------- */
  const PAGES = [
    ['dashboard.html', 'Dashboard'],
    ['rides.html', 'Find Rides'],
    ['bookings.html', 'My Bookings'],
    ['drivers.html', 'Drivers']
  ];

  SRBS.layout = (active) => {
    const u = SRBS.user();
    // The Admin link only appears for admin accounts
    const pages = SRBS.isAdmin() ? PAGES.concat([['admin.html', 'Admin']]) : PAGES;
    const links = pages.map(p =>
      '<li class="nav-item"><a class="nav-link' + (p[0] === active ? ' active" aria-current="page' : '') +
      '" href="' + p[0] + '">' + p[1] + '</a></li>').join('');

    document.getElementById('app-nav').innerHTML =
      '<nav class="navbar navbar-expand-lg navbar-dark app-nav sticky-top"><div class="container">' +
      '<a class="navbar-brand" href="dashboard.html"><span class="brand-dot"></span>CampusRide</a>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>' +
      '<div class="collapse navbar-collapse" id="navMenu"><ul class="navbar-nav me-auto">' + links + '</ul>' +
      '<span class="navbar-text me-3 text-white-50">Hi, ' + SRBS.esc(u ? u.name.split(' ')[0] : '') + '</span>' +
      '<button class="btn btn-lantern btn-sm" id="logoutBtn">Log out</button></div></div></nav>';
    document.getElementById('logoutBtn').addEventListener('click', SRBS.logout);

    document.getElementById('app-footer').innerHTML =
      '<footer class="app-footer"><div class="container"><div class="row g-4">' +
      '<div class="col-md-5"><h3 class="brand-font">CampusRide</h3><p>A student ride booking prototype for getting between UiTM Kampus Machang, Kota Bharu and the airport.</p></div>' +
      '<div class="col-6 col-md-3"><h3>Pages</h3><ul>' + pages.map(p => '<li><a href="' + p[0] + '">' + p[1] + '</a></li>').join('') + '</ul></div>' +
      '<div class="col-6 col-md-4"><h3>About this project</h3><ul><li>IMS566 Individual Project</li><li>Built with Bootstrap 5 and Chart.js</li><li>Demo data only. No real bookings are made.</li></ul></div>' +
      '</div><hr class="border-secondary mt-4"><div class="small">&copy; ' + new Date().getFullYear() + ' CampusRide. Student project, UiTM Kelantan, Kampus Machang.</div></div></footer>';
  };
})();