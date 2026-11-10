(function () {
  "use strict";

  var KEY = "utp_v4", OLDKEY = "utp_v3", SKEY = "utp_user_v4", OLDSKEY = "utp_user_v3", VERSION = 4;

  /* ================= иконки ================= */
  var ICONS = {
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    box: '<path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7"/>',
    map: '<path d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3zM9 4v13M15 7v13"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.2 3.2 0 010 7M18 14.5c2 .8 3 2.6 3 5.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21a2 2 0 004 0"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 1.8-2.5 4"/><path d="M12 17h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M13.5 6.5l4 4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    download: '<path d="M12 4v11M8 11l4 4 4-4M5 20h14"/>',
    upload: '<path d="M12 20V9M8 13l4-4 4 4M5 4h14"/>',
    print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z"/>',
    building: '<path d="M4 21V5l8-3v19M12 21h8V9l-8-3M7 8h2M7 12h2M7 16h2M16 12h1M16 16h1"/>',
    pipe: '<path d="M3 9h12a4 4 0 014 4v8M3 15h8"/><path d="M3 6v6M21 15v6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>'
  };
  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"' + (cls ? ' class="' + cls + '"' : "") + ">" + (ICONS[name] || ICONS.grid) + "</svg>";
  }

  /* ================= каталог труб ================= */
  function buildCatalog() {
    var OBS = [[102, [4, 5.6, 6.2]], [114, [5.2, 6.2, 7.3]], [127, [5.6, 6.5, 7.9]], [140, [6.2, 7.1, 8.5]],
      [146, [6.5, 7.7, 9.5]], [168, [6.5, 8, 9.5]], [178, [6.9, 8.5, 10.2]], [194, [7.6, 9.5, 11.1]],
      [219, [8, 10.7, 12.7]], [245, [8.9, 11.5, 13.8]], [273, [9.5, 12.5, 15.1]], [299, [10, 13, 16]],
      [324, [10.5, 13.5, 16.5]], [340, [11, 14, 17.5]], [351, [11.5, 14.5, 18]], [377, [12, 15, 18.5]], [426, [12.5, 15.5, 19]]];
    var BUR = [[60, [5, 7]], [73, [5.5, 7, 9]], [89, [6.5, 8, 11]], [102, [7, 9, 11]], [114, [7, 9, 11]], [127, [7, 9, 11]], [140, [8, 10, 12]]];
    var NKT = [[60, [5]], [73, [5.5, 7]], [89, [6.5, 8]], [102, [6.5, 7]], [114, [7, 8]]];
    var out = [], n = 0;
    [["Обсадная", OBS, "ГОСТ 632-80"], ["Бурильная", BUR, "ГОСТ 631-75"], ["НКТ", NKT, "ГОСТ 633-80"]].forEach(function (g) {
      g[1].forEach(function (row) {
        row[1].forEach(function (w) {
          out.push({
            id: g[0] + "-" + row[0] + "-" + w,
            type: g[0], d: row[0], w: w,
            kind: "Труба", unit: "m",
            nomen: "Н-" + String(++n).padStart(4, "0"),
            label: g[0] + " Ø" + row[0] + "×" + w,
            kgm: Math.round(0.02466 * w * (row[0] - w) * 100) / 100,
            kgUnit: 0,
            gost: g[2]
          });
        });
      });
    });
    return out;
  }

  /* ================= сотрудники ================= */
  var EMPLOYEES = [
    ["Иванов И.П.", "1001", "Кладовщик"], ["Петров А.С.", "1002", "Начальник участка"], ["Сидоров В.Н.", "1003", "Кладовщик"],
    ["Смирнов Д.М.", "1004", "Кладовщик"], ["Кузнецов Е.В.", "1005", "Мастер"], ["Попов К.А.", "1006", "Кладовщик"],
    ["Соколов М.С.", "1007", "Кладовщик"], ["Михайлов Н.Д.", "1008", "Мастер"], ["Новиков П.К.", "1009", "Кладовщик"],
    ["Фёдоров С.В.", "1010", "Кладовщик"], ["Морозов Р.А.", "1011", "Кладовщик"], ["Волков Г.О.", "1012", "Мастер"],
    ["Алексеев Л.М.", "1013", "Кладовщик"], ["Лебедев Т.Е.", "1014", "Кладовщик"], ["Семёнов Ю.Н.", "1015", "Кладовщик"],
    ["Егоров И.В.", "1016", "Кладовщик"], ["Павлов А.Н.", "1017", "Кладовщик"], ["Козлов В.С.", "1018", "Мастер"],
    ["Степанов Д.К.", "1019", "Кладовщик"], ["Николаев Е.А.", "1020", "Кладовщик"], ["Орлов М.В.", "1021", "Кладовщик"],
    ["Андреев Н.С.", "1022", "Кладовщик"], ["Макаров П.А.", "1023", "Кладовщик"], ["Никитин Р.К.", "1024", "Кладовщик"],
    ["Захаров С.Н.", "1025", "Кладовщик"], ["Зайцев О.Д.", "1026", "Кладовщик"], ["Соловьёв Г.В.", "1027", "Кладовщик"],
    ["Борисов Л.А.", "1028", "Кладовщик"], ["Яковлев Т.С.", "1029", "Кладовщик"], ["Григорьев Ю.М.", "1030", "Кладовщик"]
  ];

  /* ================= права ================= */
  var PERM_GROUPS = [
    { group: "Просмотр", items: [["dash.view", "Главная"], ["reg.view", "Реестр операций"], ["stock.view", "Остатки"], ["map.view", "Схема склада"], ["rep.view", "Отчёты"], ["search.view", "Поиск"]] },
    { group: "Операции", items: [["op.create", "Создавать операции"], ["op.edit", "Изменять операции"], ["op.delete", "Удалять операции"], ["data.export", "Экспорт и импорт"]] },
    { group: "Администрирование", items: [["adm.users", "Пользователи и права"], ["adm.refs", "Оргединицы и территории"], ["adm.catalog", "Каталог труб"], ["adm.audit", "Журнал и проверки"]] }
  ];
  var ALL_PERMS = [];
  PERM_GROUPS.forEach(function (g) { g.items.forEach(function (i) { ALL_PERMS.push(i[0]); }); });

  var ROLE_PRESETS = {
    admin: ALL_PERMS.slice(),
    manager: ["dash.view", "reg.view", "stock.view", "map.view", "rep.view", "search.view", "op.edit", "data.export", "adm.audit"],
    keeper: ["dash.view", "reg.view", "stock.view", "map.view", "rep.view", "search.view", "op.create", "op.edit", "data.export"],
    viewer: ["dash.view", "reg.view", "stock.view", "map.view", "rep.view", "search.view"]
  };
  var ROLE_LABELS = { admin: "Администратор", manager: "Начальник участка", keeper: "Кладовщик", viewer: "Наблюдатель" };
  var ROLE_BADGE = { admin: "bad", manager: "info", keeper: "ok", viewer: "muted" };

  /* ================= данные ================= */
  function cellCode(zone, i) {
    if (zone.type === "shop") return "Ц-" + (i + 1);
    if (zone.type === "pvc") return "ПВХ-" + (i + 1);
    return "Я" + String(i + 1).padStart(2, "0");
  }

  function seed() {
    var units = [
      { id: "u_cbt", code: "ЦБТ", name: "Центральная база труб" },
      { id: "u_cot", code: "ЦОТ", name: "Отдел труб" },
      { id: "u_cnkt", code: "ЦНКТ", name: "Цех насосно-компрессорных труб" },
      { id: "u_cprr", code: "ЦПРР", name: "Цех подготовки и ремонта труб" }
    ];
    var territories = [{ id: "t_by", name: "Белый Яр" }];
    var zones = [];
    for (var r = 1; r <= 5; r++) {
      zones.push({ id: "z_s" + r, territoryId: "t_by", name: "Стеллаж " + r, type: "rack", cells: 10, capacity: 120 });
    }
    zones.push({ id: "z_pvc", territoryId: "t_by", name: "Автокрановая площадка временного хранения ПВХ", type: "pvc", cells: 6, capacity: 200 });
    zones.push({ id: "z_shop", territoryId: "t_by", name: "Цех", type: "shop", cells: 4, capacity: 400 });

    var users = EMPLOYEES.map(function (e, i) {
      return {
        id: "e" + (i + 1), fio: e[0], tab: e[1], pos: e[2],
        role: i === 1 ? "manager" : (e[2] === "Мастер" ? "manager" : "keeper"),
        orgUnitId: units[i % units.length].id,
        perms: null, active: true
      };
    });
    users.push({ id: "e99", fio: "Руководитель", tab: "9999", pos: "Начальник участка", role: "admin", orgUnitId: "u_cbt", perms: null, active: true });
    users[0].role = "admin";

    var cat = buildCatalog();
    var ops = [
      { id: "o1", date: "2026-10-28", type: "in", orgUnitId: "u_cbt", sizeId: "Обсадная-168-8", meters: 1440, qty: 120, status: "raw", from: [], to: [{ zoneId: "z_s1", cell: "Я01" }, { zoneId: "z_s1", cell: "Я02" }], plant: "ТМК", note: "Поступление с завода", user: "Иванов И.П.", created: "2026-10-28T09:15:00" },
      { id: "o2", date: "2026-11-01", type: "in", orgUnitId: "u_cbt", sizeId: "НКТ-89-6.5", meters: 600, qty: 50, status: "raw", from: [], to: [{ zoneId: "z_s2", cell: "Я03" }], plant: "СинТЗ", note: "Поступление с завода", user: "Петров А.С.", created: "2026-11-01T10:40:00" },
      { id: "o3", date: "2026-11-03", type: "to_shop", orgUnitId: "u_cbt", sizeId: "Обсадная-168-8", meters: 240, qty: 20, status: "raw", from: [{ zoneId: "z_s1", cell: "Я01" }], to: [{ zoneId: "z_shop", cell: "Ц-1" }], plant: "ТМК", note: "Подача на подготовку", user: "Иванов И.П.", created: "2026-11-03T08:20:00" },
      { id: "o4", date: "2026-11-05", type: "from_shop", orgUnitId: "u_cbt", sizeId: "Обсадная-168-8", meters: 240, qty: 20, status: "prepared", from: [{ zoneId: "z_shop", cell: "Ц-1" }], to: [{ zoneId: "z_s1", cell: "Я01" }], plant: "ТМК", note: "Возврат подготовленной", user: "Иванов И.П.", created: "2026-11-05T14:05:00" },
      { id: "o5", date: "2026-11-06", type: "ship", orgUnitId: "u_cbt", sizeId: "Обсадная-168-8", meters: 120, qty: 10, status: "prepared", from: [{ zoneId: "z_s1", cell: "Я01" }], to: [], plant: "ТМК", note: "Отгрузка в ЦПРР", user: "Сидоров В.Н.", created: "2026-11-06T11:30:00" },
      { id: "o6", date: "2026-11-07", type: "in", orgUnitId: "u_cot", sizeId: "Бурильная-127-9", meters: 360, qty: 30, status: "raw", from: [], to: [{ zoneId: "z_s3", cell: "Я05" }, { zoneId: "z_s3", cell: "Я06" }], plant: "ВТЗ", note: "Поступление с завода", user: "Смирнов Д.М.", created: "2026-11-07T09:50:00" },
      { id: "o7", date: "2026-11-08", type: "move", orgUnitId: "u_cbt", sizeId: "Обсадная-168-8", meters: 240, qty: 20, status: "raw", from: [{ zoneId: "z_s1", cell: "Я02" }], to: [{ zoneId: "z_s2", cell: "Я07" }], plant: "", note: "Перестановка для удобства отгрузки", user: "Иванов И.П.", created: "2026-11-08T16:10:00" },
      { id: "o8", date: "2026-11-09", type: "in", orgUnitId: "u_cnkt", sizeId: "НКТ-73-5.5", meters: 480, qty: 40, status: "raw", from: [], to: [{ zoneId: "z_pvc", cell: "ПВХ-1" }, { zoneId: "z_pvc", cell: "ПВХ-2" }], plant: "ПНТЗ", note: "Временное хранение ПВХ", user: "Кузнецов Е.В.", created: "2026-11-09T12:00:00" }
    ];

    ops.forEach(function (o) {
      var s = cat.filter(function (x) { return x.id === o.sizeId; })[0];
      o.nomen = s ? s.nomen : "";
    });

    return {
      meta: { org: "ПАО «Сургутнефтегаз»", version: VERSION, created: todayISO() },
      settings: { cellCapacity: 120, demo: true },
      orgUnits: units,
      territories: territories,
      zones: zones,
      catalog: cat,
      users: users,
      ops: ops,
      notifications: [],
      audit: [{ id: "a0", ts: new Date().toISOString(), user: "Система", action: "Инициализация базы", details: "Демонстрационные данные v3" }]
    };
  }

  /* ================= хранилище ================= */
  function migrate(d) {
    if (!d.settings) d.settings = {};
    if (!d.settings.cellCapacity) d.settings.cellCapacity = 120;
    (d.catalog || []).forEach(function (s, i) {
      if (!s.kind) s.kind = "Труба";
      if (!s.unit) s.unit = s.kind === "Труба" ? "m" : "pcs";
      if (!s.nomen) s.nomen = "Н-" + String(i + 1).padStart(4, "0");
      if (s.kgUnit == null) s.kgUnit = 0;
      if (!s.label) s.label = s.type + " Ø" + s.d + "×" + s.w;
    });
    (d.ops || []).forEach(function (o) {
      if (!o.nomen) {
        var s = (d.catalog || []).filter(function (x) { return x.id === o.sizeId; })[0];
        o.nomen = s ? s.nomen : "";
      }
    });
    if (d.meta) d.meta.version = VERSION;
    return d;
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && d.catalog && d.ops && d.users) return migrate(d);
      }
    } catch (e) {}
    try {
      var oldRaw = localStorage.getItem(OLDKEY);
      if (oldRaw) {
        var old = JSON.parse(oldRaw);
        if (old && old.catalog && old.ops && old.users) {
          migrate(old);
          try { localStorage.setItem(KEY, JSON.stringify(old)); } catch (e3) {}
          return old;
        }
      }
    } catch (e2) {}
    var s = seed();
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e4) {}
    return s;
  }
  var store = load();
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  var session = null;
  try {
    var st = sessionStorage.getItem(SKEY) || sessionStorage.getItem(OLDSKEY);
    if (st) session = store.users.filter(function (u) { return u.tab === st && u.active !== false; })[0] || null;
  } catch (e) {}

  /* ================= утилиты ================= */
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var nf = new Intl.NumberFormat("ru-RU");
  var nf1 = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  function fmtInt(n) { return nf.format(Math.round(n || 0)); }
  function fmt1(n) { return nf1.format(n || 0); }
  function fmtLen(m) {
    m = Math.round(m || 0);
    if (m < 1000) return fmtInt(m) + " м";
    var km = Math.floor(m / 1000), rest = m % 1000;
    return fmtInt(km) + " км" + (rest ? " " + fmtInt(rest) + " м" : "");
  }
  function fmtTon(kg) {
    var t = (kg || 0) / 1000;
    return (t >= 100 ? fmtInt(t) : fmt1(t)) + " т";
  }
  function todayISO() {
    var d = new Date(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    var p = iso.split("-");
    return p.length === 3 ? p[2] + "." + p[1] + "." + p[0] : iso;
  }
  function fmtDateTime(ts) {
    var d = new Date(ts);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("ru-RU") + " " + d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }
  function uid(p) { return p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }
  function byId(arr, id) { return arr.filter(function (x) { return x.id === id; })[0] || null; }
  function sizeById(id) { return byId(store.catalog, id); }
  function itemWeight(s, meters, qty) {
    if (!s) return 0;
    return s.unit === "pcs" ? (s.kgUnit || 0) * (qty || 0) : (s.kgm || 0) * (meters || 0);
  }
  function isPipe(s) { return !!s && s.unit !== "pcs"; }
  function massLabel(s) {
    if (!s) return "";
    return s.unit === "pcs" ? ((s.kgUnit || 0) + " кг/шт") : ((s.kgm || 0) + " кг/м");
  }
  function unitById(id) { return byId(store.orgUnits, id); }
  function terrById(id) { return byId(store.territories, id); }
  function zoneById(id) { return byId(store.zones, id); }
  function cellsOf(zoneId) {
    var z = zoneById(zoneId);
    if (!z) return [];
    var out = [];
    for (var i = 0; i < z.cells; i++) out.push(cellCode(z, i));
    return out;
  }
  function zoneTypeLabel(t) {
    return t === "rack" ? "Стеллаж" : t === "pvc" ? "Площадка ПВХ" : t === "shop" ? "Цех" : "Зона";
  }
  function unitLabel(u) { return u ? u.code + " (" + u.name + ")" : "—"; }
  function sizeLabel(id) { var s = sizeById(id); return s ? s.label : id; }
  function statusLabel(s) { return s === "prepared" ? "Подготовленная" : "Не подготовленная"; }
  function statusBadge(s) { return s === "prepared" ? '<span class="badge ok">Готова</span>' : '<span class="badge warn">Не готова</span>'; }

  var toastTimer = null;
  function toast(msg, kind) {
    var t = el("toast");
    t.textContent = msg;
    t.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = "toast"; }, 2800);
  }

  /* ================= права ================= */
  function permsOf(u) {
    if (!u) return [];
    if (u.role === "admin") return ALL_PERMS.slice();
    return (u.perms ? u.perms : ROLE_PRESETS[u.role]) || [];
  }
  function can(p) {
    if (!session) return false;
    if (session.role === "admin") return true;
    return permsOf(session).indexOf(p) !== -1;
  }

  /* ================= состояние ================= */
  var state = {
    route: "dashboard",
    period: { from: "", to: "" },
    reg: { from: "", to: "", type: "", unit: "", status: "", q: "" },
    page: 1,
    map: { territoryId: "t_by", unitId: "", d: "" },
    stock: { unit: "", status: "", q: "" },
    search: "",
    adminTab: "users",
    profileTab: "activity"
  };
  var PAGE_SIZE = 20;

  /* ================= уведомления и журнал ================= */
  function notify(title, text, kind) {
    store.notifications.unshift({
      id: uid("n"), ts: new Date().toISOString(), title: title, text: text || "",
      kind: kind || "info", read: false, to: null
    });
    if (store.notifications.length > 120) store.notifications.length = 120;
    persist();
    paintBell();
  }
  function logAction(action, details) {
    store.audit.unshift({
      id: uid("a"), ts: new Date().toISOString(),
      user: session ? session.fio : "Система", action: action, details: details || ""
    });
    if (store.audit.length > 400) store.audit.length = 400;
    persist();
  }
  function unreadCount() { return store.notifications.filter(function (n) { return !n.read; }).length; }
  function paintBell() {
    var n = unreadCount(), d = el("bellDot");
    if (!d) return;
    d.textContent = n > 9 ? "9+" : String(n);
    d.className = "dot-badge" + (n ? " on" : "");
    var nav = document.querySelector('[data-nav="notifications"] .pill');
    if (nav) nav.textContent = n;
  }

  /* ================= вычисления ================= */
  function opSigns(op) {
    var out = [];
    var srcStatus = op.type === "from_shop" ? "prepared" : op.status;
    var dstStatus = op.type === "to_shop" ? "prepared" : (op.type === "from_shop" ? "prepared" : op.status);
    (op.from || []).forEach(function (c) {
      out.push({ zoneId: c.zoneId, cell: c.cell, sizeId: op.sizeId, status: srcStatus, meters: -op.meters, qty: -op.qty });
    });
    (op.to || []).forEach(function (c) {
      out.push({ zoneId: c.zoneId, cell: c.cell, sizeId: op.sizeId, status: dstStatus, meters: op.meters, qty: op.qty });
    });
    return out;
  }
  function share(n, cells) { return cells && cells.length ? n / cells.length : 0; }
  function balanceMap(filter) {
    var map = {};
    function add(k, meters, qty) {
      if (!map[k]) map[k] = { meters: 0, qty: 0 };
      map[k].meters += meters; map[k].qty += qty;
    }
    store.ops.forEach(function (op) {
      if (filter && !filter(op)) return;
      var src = op.from || [], dst = op.to || [];
      var srcShare = share(op.meters, src), srcQty = share(op.qty, src);
      var dstShare = share(op.meters, dst), dstQty = share(op.qty, dst);
      (op.from || []).forEach(function (c) {
        add(op.orgUnitId + "|" + c.zoneId + "|" + c.cell + "|" + op.sizeId + "|" + (op.type === "from_shop" ? "prepared" : op.status), -srcShare, -srcQty);
      });
      (op.to || []).forEach(function (c) {
        add(op.orgUnitId + "|" + c.zoneId + "|" + c.cell + "|" + op.sizeId + "|" + (op.type === "to_shop" ? "prepared" : op.status), dstShare, dstQty);
      });
    });
    return map;
  }
  function stockList() {
    var map = balanceMap();
    var rows = {};
    Object.keys(map).forEach(function (k) {
      var b = map[k];
      if (b.meters <= 0.001 && b.qty <= 0.001) return;
      var p = k.split("|");
      var z = zoneById(p[1]);
      if (!z) return;
      var key = p[0] + "|" + z.id + "|" + p[2] + "|" + p[3] + "|" + p[4];
      rows[key] = { orgUnitId: p[0], zoneId: z.id, territoryId: z.territoryId, cell: p[2], sizeId: p[3], status: p[4], meters: b.meters, qty: b.qty };
    });
    return Object.keys(rows).map(function (k) { return rows[k]; });
  }
  function totals(rows) {
    var t = { meters: 0, qty: 0, kg: 0 };
    rows.forEach(function (r) {
      var s = sizeById(r.sizeId);
      t.meters += r.meters; t.qty += r.qty; t.kg += itemWeight(s, r.meters, r.qty);
    });
    return t;
  }
  function avgLength(t) { return t.qty > 0 ? t.meters / t.qty : 0; }
  function occupancyCell(map, zoneId, cell) { return map[zoneId + "|" + cell] || 0; }
  function occupancyMap(filter) {
    var out = {};
    var map = balanceMap(filter);
    Object.keys(map).forEach(function (k) {
      var p = k.split("|");
      var key = p[0] + "|" + p[1];
      out[key] = (out[key] || 0) + map[k].meters;
    });
    return out;
  }
  function fillClass(pct) {
    if (pct >= 80) return "high";
    if (pct >= 40) return "mid";
    if (pct > 0) return "low";
    return "";
  }
  function opsFiltered() {
    var f = state.reg, q = f.q.trim().toLowerCase();
    return store.ops.filter(function (o) {
      if (f.from && o.date < f.from) return false;
      if (f.to && o.date > f.to) return false;
      if (f.type && o.type !== f.type) return false;
      if (f.unit && o.orgUnitId !== f.unit) return false;
      if (f.status && o.status !== f.status) return false;
      if (q) {
        var hay = [o.date, fmtDate(o.date), typeLabel(o.type), sizeLabel(o.sizeId), o.plant, o.user, o.note,
          unitById(o.orgUnitId) ? unitById(o.orgUnitId).code : "", addrText(o.from), addrText(o.to)].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.created < b.created ? 1 : -1); });
  }
  function typeLabel(t) {
    return { in: "Приход", move: "Перемещение", to_shop: "В цех", from_shop: "Из цеха", ship: "Отгрузка", writeoff: "Списание" }[t] || t;
  }
  function typeBadge(t) {
    var m = { in: "ok", move: "info", to_shop: "warn", from_shop: "info", ship: "bad", writeoff: "muted" };
    return '<span class="badge ' + (m[t] || "muted") + '">' + typeLabel(t) + "</span>";
  }
  function addrText(cells) {
    if (!cells || !cells.length) return "—";
    return cells.map(function (c) {
      var z = zoneById(c.zoneId);
      return (z ? z.name : "?") + " / " + c.cell;
    }).join(", ");
  }
  function addrChips(cells) {
    if (!cells || !cells.length) return '<span class="muted">—</span>';
    return cells.map(function (c) {
      var z = zoneById(c.zoneId);
      var t = z ? z.name.replace("Автокрановая площадка временного хранения ", "Площадка ") : "?";
      return '<span class="cell-addr">' + esc(t) + " · " + esc(c.cell) + "</span>";
    }).join("");
  }

  /* ================= вход ================= */
  function fillLogin() {
    var sel = el("loginUser");
    if (!sel) return;
    var list = store.users.filter(function (u) { return u.active !== false; })
      .sort(function (a, b) { return a.fio.localeCompare(b.fio, "ru"); });
    sel.innerHTML = '<option value="">— выберите сотрудника —</option>' + list.map(function (u) {
      return '<option value="' + esc(u.tab) + '">' + esc(u.fio) + " · " + esc(ROLE_LABELS[u.role] || "") + "</option>";
    }).join("");
  }
  function doLogin(e) {
    if (e) e.preventDefault();
    var tab = el("loginUser").value, pass = el("loginPass").value.trim();
    var err = el("loginErr");
    var u = store.users.filter(function (x) { return x.tab === tab; })[0];
    if (!u) { err.textContent = "Сотрудник не выбран"; return; }
    if (u.active === false) { err.textContent = "Доступ сотрудника отключён"; return; }
    if (!pass || pass !== u.tab) {
      err.textContent = "Неверный табельный номер";
      var box = document.querySelector(".login-box");
      box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
      return;
    }
    session = u;
    try { sessionStorage.setItem(SKEY, u.tab); } catch (e2) {}
    el("loginErr").textContent = "";
    el("loginPass").value = "";
    showApp();
  }
  function logout() {
    session = null;
    try { sessionStorage.removeItem(SKEY); sessionStorage.removeItem(OLDSKEY); } catch (e) {}
    el("shell").classList.add("hidden");
    el("loginScreen").classList.remove("hidden");
    el("loginScreen").style.display = "grid";
  }
  function initials(fio) {
    var p = fio.split(" ");
    return (p[0] ? p[0][0] : "") + (p[1] ? p[1][0] : "");
  }
  function showApp() {
    el("loginScreen").style.display = "none";
    el("shell").classList.remove("hidden");
    el("ava").textContent = initials(session.fio);
    el("ucName").textContent = session.fio;
    el("ucRole").textContent = ROLE_LABELS[session.role] || "";
    el("menuName").textContent = session.fio;
    el("menuMeta").textContent = (ROLE_LABELS[session.role] || "") + " · " + (unitById(session.orgUnitId) ? unitById(session.orgUnitId).code : "");
    el("sbFootText").textContent = "Локальная база · " + (unitById(session.orgUnitId) ? unitById(session.orgUnitId).code : "") + " · v3";
    paintBell();
    go("dashboard");
  }

  /* ================= навигация ================= */
  var NAV = [
    { group: "Участок", items: [
      { route: "dashboard", title: "Главная", icon: "grid", perm: "dash.view" },
      { route: "registry", title: "Реестр операций", icon: "list", perm: "reg.view" },
      { route: "stock", title: "Остатки", icon: "box", perm: "stock.view" },
      { route: "map", title: "Схема склада", icon: "map", perm: "map.view" },
      { route: "reports", title: "Отчёты", icon: "chart", perm: "rep.view" },
      { route: "search", title: "Поиск", icon: "search", perm: "search.view" }
    ]},
    { group: "Личное", items: [
      { route: "profile", title: "Профиль", icon: "user" },
      { route: "notifications", title: "Уведомления", icon: "bell", badge: true }
    ]},
    { group: "Администрирование", items: [
      { route: "admin-users", title: "Пользователи", icon: "users", perm: "adm.users" },
      { route: "admin-refs", title: "Оргединицы и территории", icon: "building", perm: "adm.refs" },
      { route: "admin-catalog", title: "Каталог труб", icon: "pipe", perm: "adm.catalog" },
      { route: "admin-audit", title: "Журнал действий", icon: "shield", perm: "adm.audit" },
      { route: "checks", title: "Проверки данных", icon: "check", perm: "adm.audit" }
    ]},
    { group: "Справка", items: [{ route: "help", title: "Инструкция", icon: "help" }] }
  ];
  var TITLES = {
    dashboard: ["Главная", "Сводка по складу и движению труб"],
    registry: ["Реестр операций", "Все движения труб"],
    stock: ["Остатки", "Метры, тонны и адреса хранения"],
    map: ["Схема склада", "Заполненность ячеек"],
    reports: ["Отчёты", "Сводки за период"],
    search: ["Поиск", "По всей системе"],
    profile: ["Профиль", "Доступ и активность"],
    notifications: ["Уведомления", "События системы"],
    "admin-users": ["Пользователи", "Роли, права, доступ"],
    "admin-refs": ["Оргединицы и территории", "Структура хранения"],
    "admin-catalog": ["Каталог труб", "Типоразмеры и масса"],
    "admin-audit": ["Журнал действий", "Кто и что менял"],
    checks: ["Проверки данных", "Контроль целостности"],
    help: ["Инструкция", "Правила работы"]
  };

  function navHtml() {
    var unread = unreadCount();
    return NAV.map(function (g) {
      var items = g.items.filter(function (i) { return !i.perm || can(i.perm); });
      if (!items.length) return "";
      return '<div class="nav-group">' + esc(g.group) + "</div>" + items.map(function (i) {
        var active = state.route === i.route ? " active" : "";
        var pill = i.badge && unread ? '<span class="pill">' + unread + "</span>" : "";
        return '<button class="nav-item' + active + '" data-nav="' + i.route + '">' + icon(i.icon) + "<span>" + esc(i.title) + "</span>" + pill + "</button>";
      }).join("");
    }).join("");
  }
  function paintNav() { el("nav").innerHTML = navHtml(); }

  function go(route) {
    var item = null;
    NAV.forEach(function (g) { g.items.forEach(function (i) { if (i.route === route) item = i; }); });
    if (item && item.perm && !can(item.perm)) { toast("Нет доступа к разделу", "err"); return; }
    state.route = route;
    state.page = 1;
    closePanels();
    paintNav();
    var t = TITLES[route] || ["", ""];
    el("pageTitle").textContent = t[0];
    el("pageCrumb").textContent = t[1];
    render();
    el("view").classList.remove("enter"); void el("view").offsetWidth; el("view").classList.add("enter");
    if (window.innerWidth <= 960) closeSidebar();
  }

  function render() {
    var r = state.route, html = "";
    if (r === "dashboard") html = viewDashboard();
    else if (r === "registry") html = viewRegistry();
    else if (r === "stock") html = viewStock();
    else if (r === "map") html = viewMap();
    else if (r === "reports") html = viewReports();
    else if (r === "search") html = viewSearch();
    else if (r === "profile") html = viewProfile();
    else if (r === "notifications") html = viewNotifications();
    else if (r === "admin-users") html = viewAdminUsers();
    else if (r === "admin-refs") html = viewAdminRefs();
    else if (r === "admin-catalog") html = viewAdminCatalog();
    else if (r === "admin-audit") html = viewAdminAudit();
    else if (r === "checks") html = viewChecks();
    else if (r === "help") html = viewHelp();
    el("view").innerHTML = html;
    afterRender();
  }
  function refreshCurrent() {
    if (state.route === "registry") refreshRegistry();
    else if (state.route === "stock") refreshStock();
    else if (state.route === "search") refreshSearch();
    else if (state.route === "map") refreshMap();
    else render();
  }
  function refreshMap() {
    var tmp = document.createElement("div");
    tmp.innerHTML = viewMap();
    var layout = tmp.querySelector(".map-layout");
    var cur = document.querySelector(".map-layout");
    if (layout && cur) cur.parentNode.replaceChild(layout, cur);
    var nb = tmp.querySelectorAll(".toolbar .badge");
    var cb = document.querySelectorAll(".toolbar .badge");
    for (var i = 0; i < nb.length && i < cb.length; i++) cb[i].parentNode.replaceChild(nb[i], cb[i]);
  }

  /* ================= модальные окна ================= */
  function openModal(html, cls) {
    el("modalRoot").innerHTML = '<div class="modal-back" data-close="1"><div class="modal ' + (cls || "") + '" role="dialog">' + html + "</div></div>";
  }
  function closeModal() { el("modalRoot").innerHTML = ""; }

  /* ================= расчёты для экранов ================= */
  function capacityOf(z) { return z.capacity || store.settings.cellCapacity || 120; }
  function capacityTotal() {
    var s = 0;
    store.zones.forEach(function (z) { s += z.cells * capacityOf(z); });
    return s;
  }
  function occupiedTotal(filter) {
    var m = occupancyMap(filter), s = 0;
    Object.keys(m).forEach(function (k) { s += Math.max(0, m[k]); });
    return s;
  }
  function pct(a, b) { return b > 0 ? Math.round(a / b * 100) : 0; }
  function kpiCard(cls, ic, title, value, sub) {
    return '<div class="kpi ' + cls + '"><div class="top"><span class="ico">' + icon(ic) + "</span>" + esc(title) + "</div>" +
      "<b>" + value + "</b><div class=\"sub\">" + esc(sub) + "</div></div>";
  }

  /* ================= главная ================= */
  function viewDashboard() {
    var rows = stockList();
    var all = totals(rows);
    var prep = totals(rows.filter(function (r) { return r.status === "prepared"; }));
    var raw = totals(rows.filter(function (r) { return r.status !== "prepared"; }));
    var cap = capacityTotal(), occ = occupiedTotal();
    var byUnit = store.orgUnits.map(function (u) {
      return { u: u, t: totals(rows.filter(function (r) { return r.orgUnitId === u.id; })) };
    }).sort(function (a, b) { return b.t.meters - a.t.meters; });
    var maxM = 0;
    byUnit.forEach(function (x) { if (x.t.meters > maxM) maxM = x.t.meters; });
    var bars = byUnit.map(function (x) {
      var w = maxM ? (x.t.meters / maxM * 100).toFixed(1) : 0;
      return '<div class="bar-row"><span title="' + esc(unitLabel(x.u)) + '">' + esc(x.u.code) + "</span>" +
        '<div class="bar-track"><i class="bar-fill" data-w="' + w + '"></i></div>' +
        "<b>" + fmtLen(x.t.meters) + " · " + fmtTon(x.t.kg) + "</b></div>";
    }).join("");

    var totalM = prep.meters + raw.meters;
    var prepPct = pct(prep.meters, totalM);
    var R = 52, C = 2 * Math.PI * R;
    var dash = (C * (totalM ? prep.meters / totalM : 0)).toFixed(1) + " " + C.toFixed(1);
    var donut = '<div class="donut-wrap"><svg class="donut" viewBox="0 0 120 120">' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="#eef2f8" stroke-width="14"></circle>' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="#16a34a" stroke-width="14" stroke-linecap="round" transform="rotate(-90 60 60)" stroke-dasharray="' + dash + '"></circle>' +
      '<text x="60" y="57" text-anchor="middle" font-size="21" font-weight="700" fill="#0d1b2a">' + prepPct + '%</text>' +
      '<text x="60" y="74" text-anchor="middle" font-size="8.5" fill="#64748b">подготовлено</text></svg>' +
      '<div class="donut-legend"><div><i style="background:#16a34a"></i>Подготовленная — <b>' + fmtLen(prep.meters) + "</b></div>" +
      '<div><i style="background:#f59e0b"></i>Не подготовленная — <b>' + fmtLen(raw.meters) + "</b></div>" +
      '<div><i style="background:#e2e8f2"></i>Всего — <b>' + fmtLen(totalM) + "</b></div></div></div>";

    var recent = store.ops.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.created < b.created ? 1 : -1);
    }).slice(0, 6);

    var recentRows = recent.map(function (o) {
      var s = sizeById(o.sizeId);
      return "<tr><td>" + fmtDate(o.date) + "</td><td>" + typeBadge(o.type) + "</td><td>" +
        esc((unitById(o.orgUnitId) || {}).code || "—") + "</td><td>" + esc(s ? s.label : o.sizeId) +
        '<div class="sub">' + esc(addrText(o.to.length ? o.to : o.from)) + "</div></td>" +
        '<td class="num">' + fmtLen(o.meters) + "</td></tr>";
    }).join("");

    var occPct = pct(occ, cap);
    return '<div class="grid kpis">' +
      kpiCard("", "pipe", "Всего в наличии", fmtLen(all.meters), fmtInt(all.qty) + " труб · " + fmtTon(all.kg)) +
      kpiCard("cyan", "box", "Вес металла", fmtTon(all.kg), "по массе 1 п.м. ГОСТ") +
      kpiCard("violet", "chart", "Средняя длина", all.qty ? fmt1(avgLength(all)) + " м" : "—", "метров на одну трубу") +
      kpiCard("green", "check", "Подготовлено", prepPct + "%", fmtLen(prep.meters) + " готовы к отгрузке") +
      "</div>" +
      '<div class="cols-2 mt16"><div class="card"><div class="card-head"><div><h3>Остатки по оргединицам</h3><div class="sub">метраж и вес на текущий момент</div></div>' +
      '<button class="btn ghost sm right" data-nav="stock">Подробнее</button></div><div class="card-body"><div class="bars">' +
      (bars || '<div class="empty">Пока нет остатков</div>') + "</div></div></div>" +
      '<div class="card"><div class="card-head"><div><h3>Подготовка труб</h3><div class="sub">доля готовой продукции</div></div></div><div class="card-body">' + donut + "</div></div></div>" +
      '<div class="cols-2 mt16"><div class="card"><div class="card-head"><div><h3>Последние операции</h3><div class="sub">движение за последние дни</div></div>' +
      '<button class="btn ghost sm right" data-nav="registry">Весь реестр</button></div><div class="table-wrap"><table class="tbl"><thead><tr><th>Дата</th><th>Операция</th><th>Орг. ед.</th><th>Труба</th><th class="num">Метров</th></tr></thead><tbody>' +
      (recentRows || '<tr><td colspan="5"><div class="empty">Операций пока нет</div></td></tr>') + "</tbody></table></div></div>" +
      '<div class="card"><div class="card-head"><h3>Быстрые действия</h3></div><div class="card-body">' +
      '<div style="display:grid;gap:10px">' +
      (can("op.create") ? '<button class="btn primary block" data-action="new-op">' + icon("plus") + "Новая операция</button>" : "") +
      '<button class="btn ghost block" data-nav="map">' + icon("map") + "Открыть схему склада</button>" +
      '<button class="btn ghost block" data-nav="reports">' + icon("chart") + "Сформировать отчёт</button>" +
      "</div>" +
      '<div class="section-title"><h2>Заполненность</h2><span class="badge ' + (occPct > 80 ? "bad" : occPct > 50 ? "warn" : "ok") + '">' + occPct + "%</span></div>" +
      '<div class="progress"><i style="width:' + Math.min(100, occPct) + '%"></i></div>' +
      '<p class="hint" style="margin-top:8px">' + fmtLen(occ) + " из " + fmtLen(cap) + " · свободно " + fmtLen(Math.max(0, cap - occ)) + "</p>" +
      "</div></div></div>";
  }

  /* ================= реестр ================= */
  function unitOptions(sel, emptyLabel) {
    return '<option value="">' + esc(emptyLabel || "Все оргединицы") + "</option>" + store.orgUnits.map(function (u) {
      return '<option value="' + u.id + '"' + (u.id === sel ? " selected" : "") + ">" + esc(unitLabel(u)) + "</option>";
    }).join("");
  }
  function statusOptions(sel) {
    return '<option value="">Все статусы</option><option value="raw"' + (sel === "raw" ? " selected" : "") + ">Не подготовленная</option><option value=\"prepared\"" + (sel === "prepared" ? " selected" : "") + ">Подготовленная</option>";
  }
  function typeOptions(sel) {
    return '<option value="">Все операции</option>' + ["in", "move", "to_shop", "from_shop", "ship", "writeoff"].map(function (t) {
      return '<option value="' + t + '"' + (t === sel ? " selected" : "") + ">" + typeLabel(t) + "</option>";
    }).join("");
  }
  function regRow(o) {
    var s = sizeById(o.sizeId);
    var kg = itemWeight(s, o.meters, o.qty);
    return "<tr><td>" + fmtDate(o.date) + "</td><td>" + typeBadge(o.type) + "</td><td>" +
      esc((unitById(o.orgUnitId) || {}).code || "—") + "</td><td><span class=\"strong\">" + esc(s ? s.label : o.sizeId) +
      '</span><div class="sub">' + (s && s.nomen ? '<span class="nomen">' + esc(s.nomen) + "</span> " : "") + esc(s ? (s.gost || "") : "") + "</div></td>" +
      '<td class="num">' + fmtLen(o.meters) + '<div class="sub">' + fmt1(kg / 1000) + " т</div></td>" +
      '<td class="num">' + fmtInt(o.qty) + "</td>" +
      "<td>" + statusBadge(o.status) + "</td>" +
      "<td>" + addrChips(o.from) + "</td><td>" + addrChips(o.to) + "</td>" +
      "<td>" + esc(o.user) + "</td>" +
      '<td><div class="actions">' +
      (can("op.edit") ? '<button class="btn ghost sm" data-action="edit-op" data-id="' + o.id + '">' + icon("edit") + "</button>" : "") +
      (can("op.delete") ? '<button class="btn danger sm" data-action="del-op" data-id="' + o.id + '">' + icon("trash") + "</button>" : "") +
      "</div></td></tr>";
  }
  function pagerHtml(pages) {
    if (pages <= 1) return "";
    var out = '<button data-page="' + (state.page - 1) + '"' + (state.page <= 1 ? " disabled" : "") + ">‹</button>";
    for (var i = 1; i <= pages; i++) {
      if (pages > 9 && i > 3 && i < pages - 2 && Math.abs(i - state.page) > 1) {
        if (i === 4) out += "<span>…</span>";
        continue;
      }
      out += '<button data-page="' + i + '"' + (i === state.page ? ' class="on"' : "") + ">" + i + "</button>";
    }
    out += '<button data-page="' + (state.page + 1) + '"' + (state.page >= pages ? " disabled" : "") + ">›</button>";
    return out;
  }
  function viewRegistry() {
    var ops = opsFiltered();
    var pages = Math.max(1, Math.ceil(ops.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var slice = ops.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    var f = state.reg;
    return '<div class="toolbar no-print">' +
      '<div class="search-inline">' + icon("search") + '<input data-reg="q" value="' + esc(f.q) + '" placeholder="Труба, ячейка, сотрудник"></div>' +
      '<select data-reg="unit" style="max-width:220px">' + unitOptions(f.unit) + "</select>" +
      '<select data-reg="type" style="max-width:170px">' + typeOptions(f.type) + "</select>" +
      '<select data-reg="status" style="max-width:190px">' + statusOptions(f.status) + "</select>" +
      '<input type="date" data-reg="from" value="' + esc(f.from) + '" title="С даты">' +
      '<input type="date" data-reg="to" value="' + esc(f.to) + '" title="По дату">' +
      '<div class="grow"></div>' +
      (can("op.create") ? '<button class="btn primary" data-action="new-op">' + icon("plus") + "Операция</button>" : "") +
      "</div>" +
      '<div class="card"><div class="card-head"><div><h3>Все операции</h3><div class="sub">найдено <b id="regCount">' + ops.length + "</b></div></div></div>" +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Дата</th><th>Операция</th><th>Орг. ед.</th><th>Труба</th><th class="num">Метров</th><th class="num">Штук</th><th>Статус</th><th>Откуда</th><th>Куда</th><th>Кто</th><th></th></tr></thead>' +
      '<tbody id="regBody">' + (slice.length ? slice.map(regRow).join("") : '<tr><td colspan="11"><div class="empty">' + icon("search") + "<b>Ничего не найдено</b>Измените фильтры или добавьте операцию</div></td></tr>") + "</tbody></table></div>" +
      '<div class="pager" id="regPager">' + pagerHtml(pages) + "</div></div>";
  }
  function refreshRegistry() {
    var body = el("regBody");
    if (!body) return;
    var ops = opsFiltered();
    var pages = Math.max(1, Math.ceil(ops.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var slice = ops.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    body.innerHTML = slice.length ? slice.map(regRow).join("") : '<tr><td colspan="11"><div class="empty"><b>Ничего не найдено</b>Измените фильтры</div></td></tr>';
    var c = el("regCount"); if (c) c.textContent = ops.length;
    var p = el("regPager"); if (p) p.innerHTML = pagerHtml(pages);
  }

  /* ================= операция: форма ================= */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function draftFromOp(op) {
    var d = clone(op);
    d.fromZone = op.from && op.from[0] ? op.from[0].zoneId : "";
    d.fromCells = (op.from || []).map(function (c) { return c.cell; });
    d.toZone = op.to && op.to[0] ? op.to[0].zoneId : "";
    d.toCells = (op.to || []).map(function (c) { return c.cell; });
    return d;
  }
  function newDraft() {
    var firstRack = store.zones.filter(function (z) { return z.type !== "shop"; })[0];
    return {
      id: "", date: todayISO(), type: "in", orgUnitId: session.orgUnitId || store.orgUnits[0].id,
      sizeId: "", meters: 0, qty: 0, status: "raw", fromZone: "", fromCells: [], toZone: firstRack ? firstRack.id : "", toCells: [],
      plant: "", note: ""
    };
  }
  function zonesFor(type, dir) {
    var shop = [];
    var other = [];
    store.zones.forEach(function (z) { (z.type === "shop" ? shop : other).push(z); });
    if (dir === "to") return type === "to_shop" ? shop : other;
    if (dir === "from") return type === "from_shop" ? shop : other;
    return shop.concat(other);
  }
  function zoneOptions(sel, type, dir) {
    var list = zonesFor(type, dir);
    return '<option value="">— выберите зону —</option>' + list.map(function (z) {
      var t = terrById(z.territoryId);
      return '<option value="' + z.id + '"' + (z.id === sel ? " selected" : "") + ">" + esc((t ? t.name + " · " : "") + z.name) + " · " + zoneTypeLabel(z.type) + "</option>";
    }).join("");
  }
  function nomenHtml(item) {
    if (!item) return '<span class="hint">Выберите позицию</span>';
    if (!item.nomen) return '<span class="badge bad">не задан — заполните каталог</span>';
    return '<span class="nomen">' + esc(item.nomen) + "</span>";
  }
  function cellsPick(zoneId, selected, which) {
    if (!zoneId) return '<div class="hint">Сначала выберите зону</div>';
    var zone = zoneById(zoneId);
    if (!zone) return "";
    var cap = capacityOf(zone);
    var occ = occupancyMap();
    var d = state.opDraft;
    var item = sizeById(d.sizeId);
    var bal = which === "from" && item ? balanceMap(function (o) { return o.id !== d.id; }) : null;
    var srcStatus = d.type === "from_shop" ? "prepared" : d.status;
    return '<div class="cells-pick">' + cellsOf(zoneId).map(function (c) {
      var used = Math.max(0, occupancyCell(occ, zoneId, c));
      var p = pct(used, cap);
      var cls = p >= 80 ? "high" : p >= 40 ? "mid" : used > 0 ? "low" : "";
      var info;
      if (which === "from" && bal && item) {
        var b = bal[d.orgUnitId + "|" + zoneId + "|" + c + "|" + d.sizeId + "|" + srcStatus];
        info = fmtLen(b && b.meters > 0 ? b.meters : 0) + " к выдаче";
      } else {
        info = fmtLen(used) + " / " + fmtLen(cap) + " · " + p + "%";
      }
      return '<button type="button" class="cell-chip ' + cls + (selected.indexOf(c) > -1 ? " on" : "") + '" data-cellpick="' + which + '" data-cell="' + esc(c) + '" title="' + esc(zone.name + " · " + c + " · занято " + fmtLen(used) + " из " + fmtLen(cap)) + '">' +
        "<b>" + esc(c) + "</b><span>" + esc(info) + "</span></button>";
    }).join("") + "</div>";
  }
  function cellsHint(which) {
    var d = state.opDraft;
    if (!d) return "";
    var zoneId = which === "from" ? d.fromZone : d.toZone;
    var cells = which === "from" ? d.fromCells : d.toCells;
    if (!zoneId || !cells.length) return "";
    var zone = zoneById(zoneId);
    if (!zone) return "";
    if (which === "to") {
      var occ = occupancyMap(), used = 0;
      cells.forEach(function (c) { used += Math.max(0, occupancyCell(occ, zoneId, c)); });
      var cap = capacityOf(zone) * cells.length;
      var free = Math.max(0, cap - used);
      var after = used + (Number(d.meters) || 0);
      var over = after > cap;
      return '<span class="hint' + (over ? " warn" : "") + '">Занято ' + fmtLen(used) + " из " + fmtLen(cap) + " · свободно " + fmtLen(free) + (over ? " · не хватит места" : "") + "</span>";
    }
    var item = sizeById(d.sizeId);
    if (!item) return "";
    var srcStatus = d.type === "from_shop" ? "prepared" : d.status;
    var bal = balanceMap(function (o) { return o.id !== d.id; });
    var avail = 0;
    cells.forEach(function (c) {
      var b = bal[d.orgUnitId + "|" + zoneId + "|" + c + "|" + d.sizeId + "|" + srcStatus];
      if (b && b.meters > 0) avail += b.meters;
    });
    var need = Number(d.meters) || 0;
    return '<span class="hint' + (need > avail ? " warn" : "") + '">Доступно к выдаче: ' + fmtLen(avail) + (need > avail ? " · недостаточно" : "") + "</span>";
  }
  function refreshOpHints() {
    var f = el("opFromHint");
    if (f) f.innerHTML = cellsHint("from");
    var t = el("opToHint");
    if (t) t.innerHTML = cellsHint("to");
  }
  function refreshOpCells() {
    var d = state.opDraft;
    var f = el("opFromCells");
    if (f) f.innerHTML = cellsPick(d.fromZone, d.fromCells, "from");
    var t = el("opToCells");
    if (t) t.innerHTML = cellsPick(d.toZone, d.toCells, "to");
    refreshOpHints();
    var n = el("opNomen");
    if (n) n.innerHTML = nomenHtml(sizeById(d.sizeId));
  }
  function sizeOptions(sel) {
    var groups = {};
    store.catalog.forEach(function (s) {
      var g = s.kind === "Труба" ? (s.type || "Труба") : (s.kind || "Прочее");
      (groups[g] = groups[g] || []).push(s);
    });
    return '<option value="">— выберите позицию —</option>' + Object.keys(groups).map(function (t) {
      return '<optgroup label="' + esc(t) + '">' + groups[t].map(function (s) {
        return '<option value="' + s.id + '"' + (s.id === sel ? " selected" : "") + ">" + esc(s.label) + (s.nomen ? " · " + esc(s.nomen) : "") + " · " + massLabel(s) + "</option>";
      }).join("") + "</optgroup>";
    }).join("");
  }
  function opSummaryHtml(d) {
    var s = sizeById(d.sizeId);
    var kg = itemWeight(s, d.meters, d.qty);
    var avg = isPipe(s) && d.qty > 0 ? d.meters / d.qty : 0;
    return '<div class="op-sum"><div><span>Вес партии</span><b>' + fmtTon(kg) + "</b></div>" +
      '<div><span>' + (isPipe(s) ? "Средняя длина" : "Масса за шт.") + '</span><b>' + (isPipe(s) ? (avg ? fmt1(avg) + " м" : "—") : (s ? fmt1(s.kgUnit || 0) + " кг" : "—")) + "</b></div>" +
      '<div><span>' + (isPipe(s) ? "Труб" : "Штук") + '</span><b>' + fmtInt(d.qty) + "</b></div></div>";
  }
  function statusBlock(d) {
    if (d.type === "move" || d.type === "writeoff") {
      return '<label class="field"><span>Состояние трубы</span><select id="opStatus"><option value="raw"' + (d.status === "raw" ? " selected" : "") + ">Не подготовленная</option><option value=\"prepared\"" + (d.status === "prepared" ? " selected" : "") + ">Подготовленная</option></select></label>";
    }
    var txt = d.type === "in" ? "Приход принимается как не подготовленная труба" :
      d.type === "to_shop" ? "В цех уходит не подготовленная, выходит подготовленная" :
      d.type === "from_shop" ? "Возврат из цеха — подготовленная труба" :
      "Отгрузка — только подготовленная труба";
    return '<div class="note-line">' + esc(txt) + "</div>";
  }
  function renderOpModal() {
    var d = state.opDraft;
    var title = d.id ? "Изменить операцию" : "Новая операция";
    var types = [["in", "Приход"], ["move", "Перемещение"], ["to_shop", "В цех"], ["from_shop", "Из цеха"], ["ship", "Отгрузка"], ["writeoff", "Списание"]];
    var seg = '<div class="seg" style="width:100%">' + types.map(function (t) {
      return '<button type="button" data-optype="' + t[0] + '" class="' + (d.type === t[0] ? "on" : "") + '">' + t[1] + "</button>";
    }).join("") + "</div>";

    var fromBlock = d.type === "in" ? "" :
      '<div class="op-section"><div class="op-section-title">Откуда</div><div class="row">' +
      '<label class="field"><span>Зона</span><select id="opFromZone">' + zoneOptions(d.fromZone, d.type, "from") + "</select></label>" +
      '<div class="field"><span>Ячейки (можно несколько)</span><div id="opFromCells">' + cellsPick(d.fromZone, d.fromCells, "from") + '</div><div id="opFromHint">' + cellsHint("from") + "</div></div>" +
      "</div></div>";

    var toBlock = (d.type === "ship" || d.type === "writeoff") ? "" :
      '<div class="op-section"><div class="op-section-title">Куда</div><div class="row">' +
      '<label class="field"><span>Зона</span><select id="opToZone">' + zoneOptions(d.toZone, d.type, "to") + "</select></label>" +
      '<div class="field"><span>Ячейки (можно несколько)</span><div id="opToCells">' + cellsPick(d.toZone, d.toCells, "to") + '</div><div id="opToHint">' + cellsHint("to") + "</div></div>" +
      "</div></div>";

    openModal(
      '<div class="modal-head"><div><h3>' + title + '</h3><p>Позиция, метраж, вес и адреса хранения</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body">' +
      '<div class="field"><span>Тип операции</span>' + seg + "</div>" +
      '<div class="row"><label class="field"><span>Дата</span><input type="date" id="opDate" value="' + esc(d.date) + '"></label>' +
      '<label class="field"><span>Оргединица</span><select id="opUnit">' + unitOptions(d.orgUnitId, "— выберите —") + "</select></label></div>" +
      '<label class="field"><span>Позиция</span><select id="opSize">' + sizeOptions(d.sizeId) + "</select></label>" +
      '<div class="row"><div class="field"><span>Номенклатурный номер</span><div id="opNomen">' + nomenHtml(sizeById(d.sizeId)) + '</div></div>' +
      '<div class="field"><span>Единица учёта</span><div class="hint" id="opUnitInfo">' + (sizeById(d.sizeId) ? (isPipe(sizeById(d.sizeId)) ? "метры" : "штуки") : "—") + "</div></div></div>" +
      '<div class="row3"><label class="field"><span id="opMetersLabel">' + (isPipe(sizeById(d.sizeId)) ? "Метров" : "Метров (необязательно)") + '</span><input type="number" id="opMeters" min="0" step="1" value="' + (d.meters || "") + '"></label>' +
      '<label class="field"><span id="opQtyLabel">' + (isPipe(sizeById(d.sizeId)) ? "Штук" : "Штук (обязательно)") + '</span><input type="number" id="opQty" min="0" step="1" value="' + (d.qty || "") + '"></label>' +
      '<div class="field"><span>Расчёт</span><div id="opSummary">' + opSummaryHtml(d) + "</div></div></div>" +
      statusBlock(d) + fromBlock + toBlock +
      '<div class="row"><label class="field"><span>Завод</span><input type="text" id="opPlant" value="' + esc(d.plant) + '" placeholder="ТМК, ВТЗ, СинТЗ…"></label>' +
      '<label class="field"><span>Примечание</span><input type="text" id="opNote" value="' + esc(d.note) + '" placeholder="Комментарий"></label></div>' +
      "</div>" +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button>' +
      '<button class="btn primary" data-action="save-op">' + icon("check") + "Сохранить</button></div>"
    );
  }
  function openOperation(id) {
    if (id) {
      var op = store.ops.filter(function (o) { return o.id === id; })[0];
      if (!op) return;
      state.opDraft = draftFromOp(op);
    } else {
      state.opDraft = newDraft();
    }
    renderOpModal();
  }
  function syncDraftFromDom() {
    var d = state.opDraft;
    if (!d) return;
    var map = { opDate: "date", opUnit: "orgUnitId", opSize: "sizeId", opMeters: "meters", opQty: "qty", opPlant: "plant", opNote: "note", opStatus: "status" };
    Object.keys(map).forEach(function (id) {
      var e = el(id);
      if (!e) return;
      var v = e.value;
      if (id === "opMeters" || id === "opQty") v = Number(v) || 0;
      d[map[id]] = v;
    });
  }
  function saveOperation() {
    syncDraftFromDom();
    var d = state.opDraft;
    if (!d.orgUnitId) return toast("Выберите оргединицу", "err");
    if (!d.date) return toast("Укажите дату", "err");
    if (!d.sizeId) return toast("Выберите позицию", "err");
    var item = sizeById(d.sizeId);
    if (!item) return toast("Позиция не найдена", "err");
    if (!item.nomen) return toast("У позиции не задан номенклатурный номер — заполните каталог", "err");
    if (isPipe(item)) {
      if (!(d.meters > 0)) return toast("Укажите метраж больше нуля", "err");
    } else {
      d.meters = 0;
    }
    if (!(d.qty > 0)) return toast("Укажите количество", "err");
    if (d.type !== "in" && !d.fromCells.length) return toast("Выберите ячейки, откуда уходит позиция", "err");
    if ((d.type === "move" || d.type === "to_shop" || d.type === "from_shop") && !d.toCells.length) return toast("Выберите ячейки, куда приходит позиция", "err");
    if (d.type === "in" && !d.toCells.length) return toast("Выберите ячейки для размещения", "err");

    var srcStatus = d.type === "from_shop" ? "prepared" : d.status;
    if (d.type !== "in") {
      var bal = balanceMap(function (o) { return o.id !== d.id; });
      var haveM = 0, haveQ = 0;
      d.fromCells.forEach(function (c) {
        var b = bal[d.orgUnitId + "|" + d.fromZone + "|" + c + "|" + d.sizeId + "|" + srcStatus];
        if (b) { if (b.meters > 0) haveM += b.meters; if (b.qty > 0) haveQ += b.qty; }
      });
      if (isPipe(item) ? (haveM + 0.01 < d.meters) : (haveQ + 0.01 < d.qty)) {
        return toast("Недостаточно: доступно " + (isPipe(item) ? fmtLen(haveM) : fmtInt(haveQ) + " шт."), "err");
      }
    }

    var op = {
      id: d.id || uid("op"),
      date: d.date, type: d.type, orgUnitId: d.orgUnitId, sizeId: d.sizeId, nomen: item.nomen,
      meters: Math.round(d.meters), qty: Math.round(d.qty), status: d.status,
      from: d.type === "in" ? [] : d.fromCells.map(function (c) { return { zoneId: d.fromZone, cell: c }; }),
      to: (d.type === "ship" || d.type === "writeoff") ? [] : d.toCells.map(function (c) { return { zoneId: d.toZone, cell: c }; }),
      plant: d.plant, note: d.note, user: d.user || session.fio,
      created: d.created || new Date().toISOString()
    };
    if (d.id) {
      var i = store.ops.findIndex(function (o) { return o.id === d.id; });
      if (i > -1) store.ops[i] = op;
      logAction("Изменена операция", typeLabel(op.type) + " · " + sizeLabel(op.sizeId) + " · " + fmtLen(op.meters));
      notify("Операция изменена", session.fio + ": " + typeLabel(op.type) + ", " + sizeLabel(op.sizeId) + ", " + fmtLen(op.meters), "info");
    } else {
      store.ops.unshift(op);
      logAction("Создана операция", typeLabel(op.type) + " · " + sizeLabel(op.sizeId) + " · " + fmtLen(op.meters));
      notify("Новая операция", session.fio + ": " + typeLabel(op.type) + ", " + sizeLabel(op.sizeId) + ", " + fmtLen(op.meters), "ok");
    }
    persist();
    closeModal();
    toast(d.id ? "Операция сохранена" : "Операция добавлена", "ok");
    refreshCurrent();
  }
  function askDeleteOp(id) {
    var op = store.ops.filter(function (o) { return o.id === id; })[0];
    if (!op) return;
    openModal('<div class="modal-head"><div><h3>Удалить операцию?</h3><p>' + esc(typeLabel(op.type) + " · " + sizeLabel(op.sizeId) + " · " + fmtLen(op.meters)) + '</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><p class="muted">Действие нельзя отменить. Остатки будут пересчитаны.</p></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button>' +
      '<button class="btn danger" data-action="confirm-del" data-id="' + id + '">Удалить</button></div>', "sm");
  }
  function deleteOp(id) {
    var op = store.ops.filter(function (o) { return o.id === id; })[0];
    if (!op) return;
    store.ops = store.ops.filter(function (o) { return o.id !== id; });
    logAction("Удалена операция", typeLabel(op.type) + " · " + sizeLabel(op.sizeId) + " · " + fmtLen(op.meters));
    notify("Операция удалена", session.fio + ": " + typeLabel(op.type) + ", " + sizeLabel(op.sizeId), "bad");
    persist();
    closeModal();
    toast("Операция удалена", "ok");
    refreshCurrent();
  }

  /* ================= остатки ================= */
  function stockFiltered() {
    var rows = stockList(), f = state.stock, q = f.q.trim().toLowerCase();
    return rows.filter(function (r) {
      if (f.unit && r.orgUnitId !== f.unit) return false;
      if (f.status && r.status !== f.status) return false;
      if (q) {
        var z = zoneById(r.zoneId), s = sizeById(r.sizeId);
        var hay = [sizeLabel(r.sizeId), s ? (s.nomen || "") : "", (unitById(r.orgUnitId) || {}).code, r.cell, z ? z.name : ""].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }
  function stockGroups(rows) {
    var groups = {};
    rows.forEach(function (r) {
      var k = r.orgUnitId + "|" + r.sizeId + "|" + r.status;
      if (!groups[k]) groups[k] = { orgUnitId: r.orgUnitId, sizeId: r.sizeId, status: r.status, meters: 0, qty: 0, cells: [] };
      groups[k].meters += r.meters; groups[k].qty += r.qty;
      groups[k].cells.push({ zone: zoneById(r.zoneId), cell: r.cell, meters: r.meters });
    });
    return Object.keys(groups).map(function (k) { return groups[k]; }).sort(function (a, b) {
      var ua = (unitById(a.orgUnitId) || {}).code || "", ub = (unitById(b.orgUnitId) || {}).code || "";
      return ua === ub ? (sizeLabel(a.sizeId) < sizeLabel(b.sizeId) ? -1 : 1) : (ua < ub ? -1 : 1);
    });
  }
  function stockKpisHtml(rows, list) {
    var t = totals(rows);
    return '<div class="grid kpis" style="margin-bottom:16px">' +
      kpiCard("", "pipe", "Метраж на складе", fmtLen(t.meters), fmtInt(t.qty) + " шт") +
      kpiCard("cyan", "box", "Вес", fmtTon(t.kg), "расчёт по каталогу") +
      kpiCard("violet", "chart", "Средняя длина", t.qty ? fmt1(avgLength(t)) + " м" : "—", "по всем позициям") +
      kpiCard("green", "check", "Позиций", fmtInt(list.length), "строк в остатках") +
      "</div>";
  }
  function stockBodyHtml(list) {
    var body = list.map(function (g) {
      var s = sizeById(g.sizeId);
      var cells = g.cells.sort(function (a, b) { return b.meters - a.meters; }).map(function (c) {
        return '<span class="cell-addr">' + esc(c.zone ? c.zone.name.replace("Автокрановая площадка временного хранения ", "") : "?") + " · " + esc(c.cell) + " · " + fmtLen(c.meters) + "</span>";
      }).join("");
      return "<tr><td>" + esc((unitById(g.orgUnitId) || {}).code || "—") + "</td><td><span class=\"strong\">" + esc(s ? s.label : g.sizeId) +
        '</span><div class="sub">' + (s ? '<span class="nomen">' + esc(s.nomen || "—") + "</span> · " + massLabel(s) : "") + "</div></td><td>" + statusBadge(g.status) +
        '</td><td class="num">' + fmtLen(g.meters) + '</td><td class="num">' + fmt1(itemWeight(s, g.meters, g.qty) / 1000) + " т</td>" +
        '<td class="num">' + fmtInt(g.qty) + '</td><td class="num">' + (g.qty ? fmt1(g.meters / g.qty) + " м" : "—") + "</td>" +
        "<td>" + cells + "</td></tr>";
    }).join("");
    return body || '<tr><td colspan="8"><div class="empty">' + icon("box") + '<b>Остатков нет</b>Добавьте приход</div></td></tr>';
  }
  function viewStock() {
    var rows = stockFiltered();
    var list = stockGroups(rows);
    var f = state.stock;
    return '<div id="stockKpis">' + stockKpisHtml(rows, list) + "</div>" +
      '<div class="toolbar no-print"><div class="search-inline">' + icon("search") + '<input data-stock="q" value="' + esc(f.q) + '" placeholder="Позиция, номенклатурник, ячейка"></div>' +
      '<select data-stock="unit" style="max-width:230px">' + unitOptions(f.unit) + "</select>" +
      '<select data-stock="status" style="max-width:200px">' + statusOptions(f.status) + "</select>" +
      '<div class="grow"></div><button class="btn ghost" data-action="export">' + icon("download") + "Экспорт JSON</button></div>" +
      '<div class="card"><div class="card-head"><div><h3>Остатки по адресам</h3><div class="sub">каждая строка — позиция, статус и ячейки</div></div></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Орг. ед.</th><th>Позиция</th><th>Статус</th><th class="num">Метров</th><th class="num">Тонн</th><th class="num">Штук</th><th class="num">Ср. длина</th><th>Где лежит</th></tr></thead><tbody id="stockBody">' +
      stockBodyHtml(list) + "</tbody></table></div></div>";
  }
  function refreshStock() {
    var rows = stockFiltered();
    var list = stockGroups(rows);
    var k = el("stockKpis"); if (k) k.innerHTML = stockKpisHtml(rows, list);
    var b = el("stockBody"); if (b) b.innerHTML = stockBodyHtml(list);
  }

  /* ================= карта: данные ячейки ================= */
  function mapFilter() {
    var diam = state.map.d;
    return function (op) {
      if (state.map.unitId && op.orgUnitId !== state.map.unitId) return false;
      if (diam) {
        var s = sizeById(op.sizeId);
        if (!s || String(s.d) !== String(diam)) return false;
      }
      return true;
    };
  }
  function mapRows() {
    var diam = state.map.d;
    return stockList().filter(function (r) {
      var s = sizeById(r.sizeId);
      if (state.map.unitId && r.orgUnitId !== state.map.unitId) return false;
      if (diam && (!s || String(s.d) !== String(diam))) return false;
      return true;
    });
  }
  function cellContents(zoneId, cell) {
    return mapRows().filter(function (r) { return r.zoneId === zoneId && r.cell === cell; });
  }
  function mapDetailHtml(zoneId, cell) {
    var z = zoneById(zoneId);
    var rows = cellContents(zoneId, cell);
    var used = rows.reduce(function (s, r) { return s + r.meters; }, 0);
    var cap = z ? capacityOf(z) : 0;
    var body = rows.length ? rows.map(function (r) {
      var s = sizeById(r.sizeId);
      return '<div style="display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px dashed var(--line2)">' +
        "<span>" + esc(sizeLabel(r.sizeId)) + ' <span class="nomen">' + esc(s ? (s.nomen || "—") : "—") + "</span>" +
        '<div class="hint">' + statusLabel(r.status) + " · " + fmtInt(r.qty) + " шт · " + fmtTon(itemWeight(s, r.meters, r.qty)) + "</div></span>" +
        "<b>" + fmtLen(r.meters) + "</b></div>";
    }).join("") : '<div class="muted">Пусто</div>';
    return '<div class="cell-detail"><h4>' + esc((z ? z.name : "") + " · " + cell) + "</h4>" +
      '<div class="hint">Занято ' + fmtLen(used) + " из " + fmtLen(cap) + " · " + pct(used, cap) + "%</div>" + body + "</div>";
  }
  function mapTipHtml(zoneId, cell) {
    var z = zoneById(zoneId);
    var rows = cellContents(zoneId, cell);
    var used = rows.reduce(function (s, r) { return s + r.meters; }, 0);
    var cap = z ? capacityOf(z) : 0;
    var items = rows.slice(0, 5).map(function (r) {
      var s = sizeById(r.sizeId);
      return '<div class="t-row"><span>' + esc(sizeLabel(r.sizeId)) + " · " + statusLabel(r.status) + "</span><b>" + fmtLen(r.meters) + "</b></div>" +
        '<div class="t-row t-muted"><span>' + esc(s ? (s.nomen || "—") : "—") + "</span><span>" + fmtInt(r.qty) + " шт</span></div>";
    }).join("");
    return "<b>" + esc((z ? z.name : "") + " · " + cell) + "</b>" +
      '<div class="t-row t-muted"><span>Занято ' + fmtLen(used) + " из " + fmtLen(cap) + "</span><b>" + pct(used, cap) + "%</b></div>" +
      (items || '<div class="t-row t-muted">Пусто</div>');
  }
  function selectMapCell(zoneId, cell) {
    state.map.sel = { zoneId: zoneId, cell: cell };
    document.querySelectorAll(".map-cell.sel").forEach(function (x) { x.classList.remove("sel"); });
    var btn = document.querySelector('.map-cell[data-zone="' + zoneId + '"][data-cell="' + cell + '"]');
    if (btn) btn.classList.add("sel");
    var d = el("mapDetail");
    if (d) d.innerHTML = mapDetailHtml(zoneId, cell);
  }

  /* ================= схема склада ================= */
  function viewMap() {
    var territory = terrById(state.map.territoryId) || store.territories[0];
    var zones = store.zones.filter(function (z) { return z.territoryId === (territory ? territory.id : ""); });
    var diam = state.map.d;
    var mf = mapFilter();
    var occ = occupancyMap(mf);
    var rows = mapRows();
    var t = totals(rows);
    var dSet = {};
    store.catalog.forEach(function (s) { if (isPipe(s) && s.d) dSet[s.d] = 1; });
    var diams = Object.keys(dSet).map(Number).sort(function (a, b) { return a - b; });

    var grid = zones.map(function (z) {
      var cells = cellsOf(z.id);
      var cap = capacityOf(z);
      var zoneM = 0;
      cells.forEach(function (c) { zoneM += Math.max(0, occupancyCell(occ, z.id, c)); });
      var zp = pct(zoneM, cap * cells.length);
      var cellHtml = cells.map(function (c) {
        var m = Math.max(0, occupancyCell(occ, z.id, c));
        var p = pct(m, cap);
        var cls = fillClass(p);
        if (z.type === "pvc" && !m) cls = "pvc";
        if (z.type === "shop" && !m) cls = "shop";
        var isSel = state.map.sel && state.map.sel.zoneId === z.id && state.map.sel.cell === c;
        return '<button type="button" class="map-cell ' + cls + (p >= 80 ? " full" : "") + (isSel ? " sel" : "") + '" data-cellmap="1" data-zone="' + z.id + '" data-cell="' + esc(c) + '" aria-label="' + esc(z.name + " · " + c + " · " + fmtLen(m) + " из " + fmtLen(cap)) + '">' +
          '<span class="code">' + esc(c) + '</span><span class="m">' + (m ? fmtLen(m) : "0") + "</span>" +
          '<span class="fillbar"><i style="width:' + Math.min(100, p) + '%"></i></span>' +
          (p >= 80 ? '<span class="full-tag">заполнено</span>' : "") + "</button>";
      }).join("");
      return '<div class="card" style="margin-bottom:14px"><div class="card-head"><div><h3>' + esc(z.name) + '</h3><div class="sub">' +
        zoneTypeLabel(z.type) + " · " + cells.length + " ячеек · " + fmtLen(cap) + " на ячейку</div></div>" +
        '<span class="badge ' + (zp > 80 ? "bad" : zp > 40 ? "warn" : "ok") + ' right">' + zp + "% занято</span></div>" +
        '<div class="card-body"><div class="map-grid">' + cellHtml + "</div></div></div>";
    }).join("");

    var topCells = [];
    Object.keys(occ).forEach(function (k) {
      if (occ[k] > 0) topCells.push({ k: k, m: occ[k] });
    });
    topCells.sort(function (a, b) { return b.m - a.m; });
    var sel = state.map.sel;
    var selHtml = '<div id="mapDetail">' + (sel ? mapDetailHtml(sel.zoneId, sel.cell) : '<div class="hint">Нажмите на ячейку, чтобы увидеть, что внутри</div>') + "</div>";

    return '<div class="toolbar no-print">' +
      '<select data-map="territory" style="max-width:200px">' + store.territories.map(function (x) {
        return '<option value="' + x.id + '"' + (territory && x.id === territory.id ? " selected" : "") + ">" + esc(x.name) + "</option>";
      }).join("") + "</select>" +
      '<select data-map="unit" style="max-width:230px">' + unitOptions(state.map.unitId) + "</select>" +
      '<select data-map="d" style="max-width:170px"><option value="">Все диаметры</option>' + diams.map(function (d) {
        return '<option value="' + d + '"' + (String(d) === String(diam) ? " selected" : "") + ">Ø" + d + "</option>";
      }).join("") + "</select>" +
      '<div class="grow"></div><span class="badge info">' + fmtLen(t.meters) + " · " + fmtTon(t.kg) + "</span></div>" +
      '<div class="map-layout"><div id="mapZones">' + (grid || '<div class="empty">Нет зон на территории</div>') +
      '<div class="legend"><span><i style="background:#f8fafd;border-color:#dfe7f2"></i>пусто</span>' +
      '<span><i style="background:#dcfce7;border-color:#a7e3bd"></i>до 40%</span>' +
      '<span><i style="background:#fef3c7;border-color:#f5cf7c"></i>40–80%</span>' +
      '<span><i style="background:#ffe4e6;border-color:#f9b4c0"></i>заполнено</span>' +
      '<span><i style="background:#f3e8ff;border-color:#d8b4fe"></i>ПВХ</span>' +
      '<span><i style="background:#dbeafe;border-color:#bfdbfe"></i>цех</span></div></div>' +
      '<div class="map-side"><div class="card"><div class="card-head"><h3>Сводка</h3></div><div class="card-body">' +
      '<div class="stat"><span>Метраж</span><b>' + fmtLen(t.meters) + "</b></div>" +
      '<div class="stat"><span>Вес</span><b>' + fmtTon(t.kg) + "</b></div>" +
      '<div class="stat"><span>Труб</span><b>' + fmtInt(t.qty) + "</b></div>" +
      '<div class="stat"><span>Средняя длина</span><b>' + (t.qty ? fmt1(avgLength(t)) + " м" : "—") + "</b></div>" +
      '<div class="stat"><span>Занято ячеек</span><b>' + fmtInt(topCells.length) + "</b></div>" +
      selHtml + "</div></div>" +
      '<div class="card" style="margin-top:14px"><div class="card-head"><h3>Самые заполненные</h3></div><div class="card-body">' +
      (topCells.slice(0, 6).map(function (x) {
        var p = x.k.split("|"), z = zoneById(p[0]);
        return '<div class="stat"><span>' + esc((z ? z.name.replace("Автокрановая площадка временного хранения ", "") : "?") + " · " + p[1]) + "</span><b>" + fmtLen(x.m) + "</b></div>";
      }).join("") || '<div class="muted">Пусто</div>') + "</div></div></div></div>";
  }

  /* ================= отчёты ================= */
  function opsInPeriod() {
    var p = state.period;
    return store.ops.filter(function (o) {
      if (p.from && o.date < p.from) return false;
      if (p.to && o.date > p.to) return false;
      return true;
    });
  }
  function viewReports() {
    var ops = opsInPeriod();
    var t = { in: { c: 0, m: 0, kg: 0 }, ship: { c: 0, m: 0, kg: 0 }, move: { c: 0, m: 0, kg: 0 }, to_shop: { c: 0, m: 0, kg: 0 }, from_shop: { c: 0, m: 0, kg: 0 }, writeoff: { c: 0, m: 0, kg: 0 } };
    ops.forEach(function (o) {
      var s = sizeById(o.sizeId), b = t[o.type];
      if (!b) return;
      b.c++; b.m += o.meters; b.kg += itemWeight(s, o.meters, o.qty);
    });
    var rows = stockList();
    var all = totals(rows);
    var byUnit = store.orgUnits.map(function (u) {
      return { u: u, t: totals(rows.filter(function (r) { return r.orgUnitId === u.id; })) };
    });
    var bySize = {};
    rows.forEach(function (r) {
      if (!bySize[r.sizeId]) bySize[r.sizeId] = { m: 0, q: 0, kg: 0 };
      var s = sizeById(r.sizeId);
      bySize[r.sizeId].m += r.meters; bySize[r.sizeId].q += r.qty; bySize[r.sizeId].kg += itemWeight(s, r.meters, r.qty);
    });
    var sizeList = Object.keys(bySize).map(function (k) { return { id: k, m: bySize[k].m, q: bySize[k].q, kg: bySize[k].kg }; })
      .sort(function (a, b) { return b.m - a.m; }).slice(0, 15);

    var shopMeters = rows.filter(function (r) { return (zoneById(r.zoneId) || {}).type === "shop"; }).reduce(function (s, r) { return s + r.meters; }, 0);
    var zones = store.zones.map(function (z) {
      var m = rows.filter(function (r) { return r.zoneId === z.id; }).reduce(function (s, r) { return s + r.meters; }, 0);
      return { z: z, m: m, p: pct(m, z.cells * capacityOf(z)) };
    });

    var users = {};
    ops.forEach(function (o) { users[o.user] = (users[o.user] || 0) + 1; });
    var userList = Object.keys(users).map(function (k) { return { fio: k, n: users[k] }; }).sort(function (a, b) { return b.n - a.n; });

    var moveTable = ["in", "ship", "to_shop", "from_shop", "move", "writeoff"].map(function (k) {
      return "<tr><td>" + typeBadge(k) + '</td><td class="num">' + t[k].c + '</td><td class="num">' + fmtLen(t[k].m) + '</td><td class="num">' + fmtTon(t[k].kg) + "</td></tr>";
    }).join("");

    var unitRows = byUnit.map(function (x) {
      return "<tr><td><b>" + esc(x.u.code) + "</b><div class=\"sub\">" + esc(x.u.name) + '</div></td><td class="num">' + fmtLen(x.t.meters) +
        '</td><td class="num">' + fmtTon(x.t.kg) + '</td><td class="num">' + fmtInt(x.t.qty) + '</td><td class="num">' + (x.t.qty ? fmt1(avgLength(x.t)) + " м" : "—") + "</td></tr>";
    }).join("");

    var sizeRows = sizeList.map(function (x) {
      var s = sizeById(x.id);
      return "<tr><td>" + esc(s ? s.label : x.id) + '<div class="sub">' + esc(s ? s.gost : "") + '</div></td><td class="num">' + fmtLen(x.m) +
        '</td><td class="num">' + fmtTon(x.kg) + '</td><td class="num">' + fmtInt(x.q) + '</td></tr>';
    }).join("");

    var zoneRows = zones.map(function (x) {
      return "<tr><td>" + esc(x.z.name) + '<div class="sub">' + zoneTypeLabel(x.z.type) + '</div></td><td class="num">' + fmtLen(x.m) +
        '</td><td class="num">' + fmtLen(x.z.cells * capacityOf(x.z)) + '</td><td><span class="badge ' + (x.p > 80 ? "bad" : x.p > 40 ? "warn" : "ok") + '">' + x.p + "%</span></td></tr>";
    }).join("");

    var userRows = userList.map(function (x) { return "<tr><td>" + esc(x.fio) + '</td><td class="num">' + x.n + "</td></tr>"; }).join("");

    return '<div class="toolbar no-print">' +
      '<label class="hint">Период</label><input type="date" data-rep="from" value="' + esc(state.period.from) + '">' +
      '<input type="date" data-rep="to" value="' + esc(state.period.to) + '">' +
      '<div class="grow"></div><button class="btn ghost" data-action="print">' + icon("print") + "Печать</button></div>" +
      '<div class="grid kpis" style="margin-bottom:16px">' +
      kpiCard("green", "arrow", "Приход за период", fmtLen(t.in.m), t.in.c + " операций · " + fmtTon(t.in.kg)) +
      kpiCard("amber", "arrow", "Отгружено", fmtLen(t.ship.m), t.ship.c + " операций · " + fmtTon(t.ship.kg)) +
      kpiCard("violet", "pipe", "На складе сейчас", fmtLen(all.meters), fmtTon(all.kg)) +
      kpiCard("cyan", "check", "В цехе", fmtLen(shopMeters), "подготовка в работе") + "</div>" +
      '<div class="cols-2"><div class="card"><div class="card-head"><h3>Движение по типам операций</h3></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Операция</th><th class="num">Кол-во</th><th class="num">Метров</th><th class="num">Тонн</th></tr></thead><tbody>' + moveTable + "</tbody></table></div></div>" +
      '<div class="card"><div class="card-head"><h3>Цикл подготовки</h3></div><div class="card-body">' +
      '<div class="stat"><span>Подано в цех</span><b>' + fmtLen(t.to_shop.m) + "</b></div>" +
      '<div class="stat"><span>Возвращено из цеха</span><b>' + fmtLen(t.from_shop.m) + "</b></div>" +
      '<div class="stat"><span>Отгружено</span><b>' + fmtLen(t.ship.m) + "</b></div>" +
      '<div class="stat"><span>Остаток в цехе</span><b>' + fmtLen(shopMeters) + "</b></div>" +
      '<p class="hint" style="margin-top:10px">Разница «подано − возвращено − отгружено» показывает трубу, которая ещё в работе.</p>' +
      "</div></div></div>" +
      '<div class="card mt16"><div class="card-head"><h3>Остатки по оргединицам</h3></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Оргединица</th><th class="num">Метров</th><th class="num">Тонн</th><th class="num">Штук</th><th class="num">Ср. длина</th></tr></thead><tbody>' +
      (unitRows || '<tr><td colspan="5" class="muted">Нет данных</td></tr>') + "</tbody></table></div></div>" +
      '<div class="cols-2 mt16"><div class="card"><div class="card-head"><h3>Топ типоразмеров</h3></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Труба</th><th class="num">Метров</th><th class="num">Тонн</th><th class="num">Штук</th></tr></thead><tbody>' +
      (sizeRows || '<tr><td colspan="4" class="muted">Нет данных</td></tr>') + "</tbody></table></div></div>" +
      '<div class="card"><div class="card-head"><h3>Активность сотрудников</h3></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Сотрудник</th><th class="num">Операций</th></tr></thead><tbody>' +
      (userRows || '<tr><td colspan="2" class="muted">Нет данных</td></tr>') + "</tbody></table></div></div></div>" +
      '<div class="card mt16"><div class="card-head"><h3>Заполненность зон</h3></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Зона</th><th class="num">Занято</th><th class="num">Ёмкость</th><th>Заполнение</th></tr></thead><tbody>' + zoneRows + "</tbody></table></div></div>";
  }

  /* ================= поиск ================= */
  function searchResultsHtml() {
    var q = state.search.trim().toLowerCase();
    if (!q) {
      return '<div class="card"><div class="card-body"><div class="empty">' + icon("search") +
        "<b>Введите запрос</b>Позиция, номенклатурник, ячейка, оргединица, сотрудник или примечание</div></div></div>";
    }
    var ops = store.ops.filter(function (o) {
      var s = sizeById(o.sizeId);
      return [o.date, fmtDate(o.date), typeLabel(o.type), sizeLabel(o.sizeId), s ? (s.nomen || "") : "", o.plant, o.user, o.note,
        (unitById(o.orgUnitId) || {}).code, addrText(o.from), addrText(o.to)].join(" ").toLowerCase().indexOf(q) > -1;
    }).slice(0, 20);
    var stock = stockList().filter(function (r) {
      var z = zoneById(r.zoneId), s = sizeById(r.sizeId);
      return [sizeLabel(r.sizeId), s ? (s.nomen || "") : "", (unitById(r.orgUnitId) || {}).code, r.cell, z ? z.name : "", statusLabel(r.status)].join(" ").toLowerCase().indexOf(q) > -1;
    }).slice(0, 20);
    var users = store.users.filter(function (u) {
      return [u.fio, u.tab, u.pos, ROLE_LABELS[u.role], (unitById(u.orgUnitId) || {}).code].join(" ").toLowerCase().indexOf(q) > -1;
    }).slice(0, 10);

    function block(title, inner, empty) {
      return '<div class="card" style="margin-bottom:16px"><div class="card-head"><h3>' + title + '</h3></div><div class="card-body">' + (inner || '<div class="muted">' + empty + "</div>") + "</div></div>";
    }
    var opsHtml = ops.map(function (o) {
      var s = sizeById(o.sizeId);
      return '<div class="stat"><span>' + fmtDate(o.date) + " · " + esc(o.user) + " · " + esc(sizeLabel(o.sizeId)) + (s && s.nomen ? ' <span class="nomen">' + esc(s.nomen) + "</span>" : "") + '</span><b>' + fmtLen(o.meters) + "</b></div>";
    }).join("");
    var stockHtml = stock.map(function (r) {
      var s = sizeById(r.sizeId);
      return '<div class="stat"><span>' + esc(sizeLabel(r.sizeId)) + (s && s.nomen ? ' <span class="nomen">' + esc(s.nomen) + "</span>" : "") + " · " + esc(r.cell) + " · " + statusLabel(r.status) + '</span><b>' + fmtLen(r.meters) + "</b></div>";
    }).join("");
    var usersHtml = users.map(function (u) {
      return '<div class="stat"><span>' + esc(u.fio) + " · таб. " + esc(u.tab) + '</span><b>' + esc(ROLE_LABELS[u.role]) + "</b></div>";
    }).join("");
    return block("Операции", opsHtml, "Совпадений нет") + block("Остатки", stockHtml, "Совпадений нет") + block("Сотрудники", usersHtml, "Совпадений нет");
  }
  function viewSearch() {
    return '<div class="toolbar"><div class="search-inline" style="flex:1">' + icon("search") +
      '<input id="searchMain" value="' + esc(state.search) + '" placeholder="Позиция, номенклатурник, ячейка, сотрудник"></div></div>' +
      '<div id="searchResults">' + searchResultsHtml() + "</div>";
  }
  function refreshSearch() {
    var r = el("searchResults");
    if (r) r.innerHTML = searchResultsHtml();
  }

  /* ================= проверки ================= */
  function viewChecks() {
    var issues = [];
    var balances = balanceMap();
    var neg = 0;
    Object.keys(balances).forEach(function (k) { if (balances[k].meters < -0.01) neg++; });
    if (neg) issues.push({ level: "bad", title: "Отрицательные остатки", text: neg + " позиций ушли в минус — проверьте операции", count: neg });

    var badOps = store.ops.filter(function (o) { return !(o.meters > 0) || !(o.qty > 0); });
    if (badOps.length) issues.push({ level: "warn", title: "Операции без метража или штук", text: badOps.length + " операций с нулевыми значениями", count: badOps.length });

    var over = 0;
    store.zones.forEach(function (z) {
      var cells = cellsOf(z.id);
      var occ = occupancyMap();
      cells.forEach(function (c) { if (occupancyCell(occ, z.id, c) > capacityOf(z) + 0.01) over++; });
    });
    if (over) issues.push({ level: "warn", title: "Переполненные ячейки", text: over + " ячеек заполнены выше ёмкости", count: over });

    var unknownSize = store.ops.filter(function (o) { return !sizeById(o.sizeId); });
    if (unknownSize.length) issues.push({ level: "bad", title: "Неизвестные типоразмеры", text: unknownSize.length + " операций ссылаются на удалённую трубу", count: unknownSize.length });

    var badZones = store.ops.filter(function (o) {
      return (o.from || []).concat(o.to || []).some(function (c) { return !zoneById(c.zoneId); });
    });
    if (badZones.length) issues.push({ level: "bad", title: "Удалённые зоны", text: badZones.length + " операций ссылаются на несуществующие зоны", count: badZones.length });

    var codes = {}, dup = 0;
    store.orgUnits.forEach(function (u) { if (codes[u.code]) dup++; codes[u.code] = 1; });
    if (dup) issues.push({ level: "warn", title: "Повторяющиеся коды оргединиц", text: dup + " дублей кодов", count: dup });

    var odd = 0;
    var rows = stockList();
    rows.forEach(function (r) {
      if (r.qty > 0) {
        var avg = r.meters / r.qty;
        if (avg < 4 || avg > 13.5) odd++;
      }
    });
    if (odd) issues.push({ level: "warn", title: "Подозрительная средняя длина", text: odd + " позиций с длиной вне 4–13,5 м", count: odd });

    var emptyZones = store.zones.filter(function (z) { return !(z.cells > 0); });
    if (emptyZones.length) issues.push({ level: "warn", title: "Зоны без ячеек", text: emptyZones.length + " зон не имеют ячеек", count: emptyZones.length });

    var ok = issues.length === 0;
    return '<div class="grid kpis" style="margin-bottom:16px">' +
      kpiCard(ok ? "green" : "amber", "shield", "Состояние данных", ok ? "Норма" : String(issues.length), ok ? "ошибок не найдено" : "замечаний") +
      kpiCard("", "pipe", "Операций", fmtInt(store.ops.length), "в базе") +
      kpiCard("cyan", "box", "Позиций остатка", fmtInt(rows.length), "строк") +
      kpiCard("violet", "users", "Пользователей", fmtInt(store.users.length), "активных и не очень") + "</div>" +
      '<div class="card"><div class="card-head"><h3>Результаты контроля</h3></div><div class="card-body">' +
      (ok ? '<div class="empty">' + icon("check") + "<b>Всё сходится</b>Отрицательных остатков и битых ссылок нет</div>" :
        issues.map(function (i) {
          return '<div class="audit-item"><span class="badge ' + i.level + '">' + (i.level === "bad" ? "ошибка" : "внимание") + "</span><div><b>" + esc(i.title) + "</b><div class=\"hint\">" + esc(i.text) + "</div></div></div>";
        }).join("")) + "</div></div>";
  }

  /* ================= инструкция ================= */
  function viewHelp() {
    return '<div class="card"><div class="card-body" style="max-width:900px">' +
      "<h2 style=\"font-size:22px;margin-bottom:10px\">Как устроен учёт</h2>" +
      '<p class="muted">Система ведёт постилажный учёт труб: метры, вес, адреса хранения и стадию подготовки. Данные хранятся в браузере, на сервер ничего не отправляется.</p>' +
      '<div class="section-title"><h2>Жизненный цикл трубы</h2></div>' +
      '<div style="display:grid;gap:8px">' +
      ["Завод — приход, труба ложится на стеллаж как <b>не подготовленная</b>",
        "Цех — подача на подготовку: со стеллажа уходит неподготовленная, из цеха выходит <b>подготовленная</b>",
        "Стеллаж — возврат подготовленной трубы на хранение",
        "Погрузка — подготовленная труба отгружается на машину",
        "Отгрузка — расход в структурное подразделение"].map(function (t, i) {
          return '<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 12px;background:#f7fafe;border:1px solid var(--line2);border-radius:12px"><span class="badge info">' + (i + 1) + "</span><span>" + t + "</span></div>";
        }).join("") + "</div>" +
      '<div class="section-title"><h2>Метры и вес</h2></div>' +
      "<p>Вес считается автоматически: <b>метры × масса 1 п.м.</b> Масса берётся из каталога по ГОСТ 632-80, 631-75 и 633-80. Средняя длина = метры ÷ штуки.</p>" +
      '<div class="section-title"><h2>Ячейки</h2></div>' +
      "<p>Одна операция может занимать несколько ячеек — отметьте их chips-кнопками. Остаток распределяется между ячейками поровну. Цвет ячейки на схеме показывает заполненность: зелёный до 40%, оранжевый 40–80%, красный — заполнено.</p>" +
      '<div class="section-title"><h2>Роли</h2></div>' +
      '<p><b>Администратор</b> — всё, включая пользователей и справочники. <b>Начальник участка</b> — просмотр, отчёты, редактирование. <b>Кладовщик</b> — операции и просмотр. <b>Наблюдатель</b> — только просмотр.</p>' +
      '<p class="hint" style="margin-top:10px">Права выдаются индивидуально в разделе «Пользователи»: можно разрешить конкретному сотруднику создавать операции или смотреть журнал.</p>' +
      "</div></div>";
  }

  /* ================= админ: пользователи ================= */
  function viewAdminUsers() {
    var list = store.users.slice().sort(function (a, b) { return a.fio.localeCompare(b.fio, "ru"); });
    var rows = list.map(function (u) {
      return "<tr><td><b>" + esc(u.fio) + "</b><div class=\"sub\">" + esc(u.pos || "") + '</div></td><td class="mono">' + esc(u.tab) + "</td>" +
        "<td><span class=\"badge " + ROLE_BADGE[u.role] + '">' + esc(ROLE_LABELS[u.role]) + "</span></td>" +
        "<td>" + esc((unitById(u.orgUnitId) || {}).code || "—") + "</td>" +
        '<td class="num">' + permsOf(u).length + " из " + ALL_PERMS.length + "</td>" +
        "<td>" + (u.active === false ? '<span class="badge muted">Отключён</span>' : '<span class="badge ok">Активен</span>') + "</td>" +
        '<td><div class="actions"><button class="btn ghost sm" data-action="edit-user" data-id="' + u.id + '">' + icon("edit") + "</button>" +
        (u.id !== session.id ? '<button class="btn danger sm" data-action="del-user" data-id="' + u.id + '">' + icon("trash") + "</button>" : "") + "</div></td></tr>";
    }).join("");
    return '<div class="toolbar no-print"><div class="grow"></div><button class="btn primary" data-action="add-user">' + icon("plus") + "Добавить сотрудника</button></div>" +
      '<div class="card"><div class="card-head"><div><h3>Пользователи</h3><div class="sub">роли и индивидуальные права</div></div></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Сотрудник</th><th>Табельный</th><th>Роль</th><th>Орг. ед.</th><th class="num">Права</th><th>Доступ</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div></div>";
  }
  function roleOptions(sel) {
    return Object.keys(ROLE_LABELS).map(function (r) {
      return '<option value="' + r + '"' + (r === sel ? " selected" : "") + ">" + ROLE_LABELS[r] + "</option>";
    }).join("");
  }
  function userUnitOptions(sel) {
    return store.orgUnits.map(function (u) {
      return '<option value="' + u.id + '"' + (u.id === sel ? " selected" : "") + ">" + esc(unitLabel(u)) + "</option>";
    }).join("");
  }
  function permGridHtml(u) {
    var has = permsOf(u);
    return PERM_GROUPS.map(function (g) {
      return '<div style="margin-top:10px"><div class="hint" style="font-weight:700;color:#475569">' + esc(g.group) + '</div><div class="perm-grid">' +
        g.items.map(function (i) {
          return '<label><input type="checkbox" data-perm="' + i[0] + '"' + (has.indexOf(i[0]) > -1 ? " checked" : "") + ">" + esc(i[1]) + "</label>";
        }).join("") + "</div></div>";
    }).join("");
  }
  function userModal(id) {
    var u = id ? byId(store.users, id) : { id: "", fio: "", tab: "", pos: "", role: "keeper", orgUnitId: store.orgUnits[0].id, perms: null, active: true };
    openModal('<div class="modal-head"><div><h3>' + (id ? "Изменить сотрудника" : "Новый сотрудник") + '</h3><p>Доступ и полномочия</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><div class="row"><label class="field"><span>ФИО</span><input id="uFio" value="' + esc(u.fio) + '" placeholder="Иванов И.П."></label>' +
      '<label class="field"><span>Табельный номер</span><input id="uTab" value="' + esc(u.tab) + '" inputmode="numeric" maxlength="8" placeholder="1001"></label></div>' +
      '<div class="row"><label class="field"><span>Должность</span><input id="uPos" value="' + esc(u.pos || "") + '" placeholder="Кладовщик"></label>' +
      '<label class="field"><span>Оргединица</span><select id="uUnit">' + userUnitOptions(u.orgUnitId) + "</select></label></div>" +
      '<div class="row"><label class="field"><span>Роль</span><select id="uRole">' + roleOptions(u.role) + "</select></label>" +
      '<label class="field"><span>Доступ</span><select id="uActive"><option value="1"' + (u.active !== false ? " selected" : "") + '>Активен</option><option value="0"' + (u.active === false ? " selected" : "") + ">Отключён</option></select></label></div>" +
      '<div class="field"><span>Права</span><div id="uPerms">' + permGridHtml(u) + "</div><p class=\"hint\">Для роли «Администратор» права выдаются полностью автоматически.</p></div></div>" +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn primary" data-action="save-user" data-id="' + esc(u.id) + '">Сохранить</button></div>');
  }
  function saveUser() {
    var fio = el("uFio").value.trim(), tab = el("uTab").value.trim();
    if (fio.length < 3) return toast("Укажите ФИО", "err");
    if (!/^\d{4,8}$/.test(tab)) return toast("Табельный — 4–8 цифр", "err");
    var id = document.querySelector('[data-action="save-user"]').getAttribute("data-id");
    var dup = store.users.filter(function (u) { return u.tab === tab && u.id !== id; })[0];
    if (dup) return toast("Такой табельный уже есть у " + dup.fio, "err");
    var perms = [];
    document.querySelectorAll("#uPerms input[data-perm]").forEach(function (c) { if (c.checked) perms.push(c.getAttribute("data-perm")); });
    var u = {
      id: id || uid("u"), fio: fio, tab: tab, pos: el("uPos").value.trim(),
      role: el("uRole").value, orgUnitId: el("uUnit").value,
      perms: perms, active: el("uActive").value === "1"
    };
    if (id) {
      var i = store.users.findIndex(function (x) { return x.id === id; });
      store.users[i] = u;
      logAction("Изменён пользователь", u.fio + " · " + ROLE_LABELS[u.role]);
      notify("Права обновлены", u.fio + " — роль " + ROLE_LABELS[u.role], "info");
    } else {
      store.users.push(u);
      logAction("Добавлен пользователь", u.fio + " · " + ROLE_LABELS[u.role]);
      notify("Новый пользователь", u.fio + " добавлен с ролью " + ROLE_LABELS[u.role], "ok");
    }
    persist();
    if (u.id === session.id) {
      session = u;
      try { sessionStorage.setItem(SKEY, u.tab); } catch (e) {}
    }
    closeModal();
    toast("Сохранено", "ok");
    render();
  }
  function delUser(id) {
    var u = byId(store.users, id);
    if (!u) return;
    if (u.id === session.id) return toast("Нельзя удалить себя", "err");
    var used = store.ops.some(function (o) { return o.user === u.fio; });
    if (used) {
      u.active = false;
      persist();
      logAction("Отключён пользователь", u.fio);
      closeModal();
      toast("Сотрудник отключён: у него есть операции", "ok");
      render();
      return;
    }
    store.users = store.users.filter(function (x) { return x.id !== id; });
    persist();
    logAction("Удалён пользователь", u.fio);
    closeModal();
    toast("Сотрудник удалён", "ok");
    render();
  }
  function askDeleteUser(id) {
    var u = byId(store.users, id);
    if (!u) return;
    openModal('<div class="modal-head"><div><h3>Удалить сотрудника?</h3><p>' + esc(u.fio) + " · таб. " + esc(u.tab) + '</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><p class="muted">Если у сотрудника есть операции, доступ будет отключён, а история сохранится.</p></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn danger" data-action="confirm-del-user" data-id="' + id + '">Удалить</button></div>', "sm");
  }

  /* ================= админ: оргединицы и территории ================= */
  function viewAdminRefs() {
    var unitRows = store.orgUnits.map(function (u) {
      var zonesM = stockList().filter(function (r) { return r.orgUnitId === u.id; }).reduce(function (s, r) { return s + r.meters; }, 0);
      return "<tr><td><b>" + esc(u.code) + "</b></td><td>" + esc(u.name) + '</td><td class="num">' + fmtLen(zonesM) + "</td>" +
        '<td><div class="actions"><button class="btn ghost sm" data-action="edit-unit" data-id="' + u.id + '">' + icon("edit") + "</button>" +
        '<button class="btn danger sm" data-action="del-unit" data-id="' + u.id + '">' + icon("trash") + "</button></div></td></tr>";
    }).join("");

    var terrBlocks = store.territories.map(function (t) {
      var zones = store.zones.filter(function (z) { return z.territoryId === t.id; });
      var rows = zones.map(function (z) {
        var cap = z.cells * capacityOf(z);
        var m = stockList().filter(function (r) { return r.zoneId === z.id; }).reduce(function (s, r) { return s + r.meters; }, 0);
        return "<tr><td><b>" + esc(z.name) + '</b><div class="sub">' + zoneTypeLabel(z.type) + '</div></td><td class="num">' + z.cells + '</td><td class="num">' + fmtLen(capacityOf(z)) + '</td>' +
          '<td class="num">' + fmtLen(m) + " / " + fmtLen(cap) + "</td>" +
          '<td><div class="actions"><button class="btn ghost sm" data-action="edit-zone" data-id="' + z.id + '">' + icon("edit") + "</button>" +
          '<button class="btn danger sm" data-action="del-zone" data-id="' + z.id + '">' + icon("trash") + "</button></div></td></tr>";
      }).join("");
      return '<div class="card" style="margin-bottom:16px"><div class="card-head"><div><h3>' + esc(t.name) + '</h3><div class="sub">' + zones.length + ' зон</div></div>' +
        '<button class="btn ghost sm right" data-action="add-zone" data-id="' + t.id + '">' + icon("plus") + "Зона</button></div>" +
        '<div class="table-wrap"><table class="tbl"><thead><tr><th>Зона</th><th class="num">Ячеек</th><th class="num">На ячейку</th><th class="num">Занято</th><th></th></tr></thead><tbody>' + (rows || '<tr><td colspan="5" class="muted">Зон нет</td></tr>') + "</tbody></table></div></div>";
    }).join("");

    return '<div class="toolbar no-print"><div class="grow"></div><button class="btn ghost" data-action="add-unit">' + icon("plus") + "Оргединица</button>" +
      '<button class="btn primary" data-action="add-territory">' + icon("plus") + "Территория</button></div>" +
      '<div class="card" style="margin-bottom:16px"><div class="card-head"><div><h3>Оргединицы</h3><div class="sub">код и расшифровка в скобках</div></div></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Код</th><th>Расшифровка</th><th class="num">Остаток</th><th></th></tr></thead><tbody>' + unitRows + "</tbody></table></div></div>" +
      terrBlocks;
  }
  function unitModal(id) {
    var u = id ? byId(store.orgUnits, id) : { code: "", name: "" };
    openModal('<div class="modal-head"><div><h3>' + (id ? "Изменить оргединицу" : "Новая оргединица") + '</h3><p>Отображается как «Код (расшифровка)»</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><div class="row"><label class="field"><span>Код</span><input id="unCode" value="' + esc(u.code) + '" maxlength="12" placeholder="ЦБТ"></label>' +
      '<label class="field"><span>Расшифровка</span><input id="unName" value="' + esc(u.name) + '" placeholder="Центральная база труб"></label></div></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn primary" data-action="save-unit" data-id="' + esc(id || "") + '">Сохранить</button></div>', "sm");
  }
  function saveUnit() {
    var code = el("unCode").value.trim(), name = el("unName").value.trim();
    if (!code) return toast("Укажите код", "err");
    var id = document.querySelector('[data-action="save-unit"]').getAttribute("data-id");
    var dup = store.orgUnits.filter(function (u) { return u.code === code && u.id !== id; })[0];
    if (dup) return toast("Код уже используется", "err");
    if (id) {
      var u = byId(store.orgUnits, id); u.code = code; u.name = name;
      logAction("Изменена оргединица", code);
    } else {
      store.orgUnits.push({ id: uid("u"), code: code, name: name });
      logAction("Добавлена оргединица", code);
    }
    persist(); closeModal(); toast("Сохранено", "ok"); render();
  }
  function delUnit(id) {
    var used = store.ops.some(function (o) { return o.orgUnitId === id; });
    if (used) return toast("Оргединица используется в операциях", "err");
    store.orgUnits = store.orgUnits.filter(function (u) { return u.id !== id; });
    store.users.forEach(function (u) { if (u.orgUnitId === id) u.orgUnitId = (store.orgUnits[0] || {}).id; });
    persist(); logAction("Удалена оргединица", id); toast("Удалено", "ok"); render();
  }
  function territoryModal() {
    openModal('<div class="modal-head"><div><h3>Новая территория</h3><p>Например, Белый Яр или промзона</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><label class="field"><span>Название</span><input id="tName" placeholder="Название территории"></label></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn primary" data-action="save-territory">Создать</button></div>', "sm");
  }
  function saveTerritory() {
    var name = el("tName").value.trim();
    if (!name) return toast("Укажите название", "err");
    store.territories.push({ id: uid("t"), name: name });
    persist(); logAction("Добавлена территория", name); closeModal(); toast("Территория добавлена", "ok"); render();
  }
  function zoneModal(id, territoryId) {
    var z = id ? byId(store.zones, id) : { name: "", type: "rack", cells: 10, capacity: store.settings.cellCapacity || 120, territoryId: territoryId };
    openModal('<div class="modal-head"><div><h3>' + (id ? "Изменить зону" : "Новая зона") + '</h3><p>Стеллаж, площадка ПВХ или цех</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body"><label class="field"><span>Название</span><input id="zName" value="' + esc(z.name) + '" placeholder="Стеллаж 6"></label>' +
      '<div class="row"><label class="field"><span>Тип</span><select id="zType"><option value="rack"' + (z.type === "rack" ? " selected" : "") + '>Стеллаж</option>' +
      '<option value="pvc"' + (z.type === "pvc" ? " selected" : "") + '>Площадка ПВХ</option><option value="shop"' + (z.type === "shop" ? " selected" : "") + ">Цех</option></select></label>" +
      '<label class="field"><span>Территория</span><select id="zTerr">' + store.territories.map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === z.territoryId ? " selected" : "") + ">" + esc(t.name) + "</option>";
      }).join("") + "</select></label></div>" +
      '<div class="row"><label class="field"><span>Ячеек</span><input type="number" id="zCells" min="1" max="60" value="' + z.cells + '"></label>' +
      '<label class="field"><span>Метров на ячейку</span><input type="number" id="zCap" min="10" step="10" value="' + capacityOf(z) + '"></label></div></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn primary" data-action="save-zone" data-id="' + esc(id || "") + '">Сохранить</button></div>');
  }
  function saveZone() {
    var name = el("zName").value.trim();
    if (!name) return toast("Укажите название зоны", "err");
    var cells = Number(el("zCells").value), cap = Number(el("zCap").value);
    if (!(cells > 0)) return toast("Ячеек должно быть больше нуля", "err");
    var id = document.querySelector('[data-action="save-zone"]').getAttribute("data-id");
    var z = id ? byId(store.zones, id) : { id: uid("z") };
    z.name = name; z.type = el("zType").value; z.territoryId = el("zTerr").value; z.cells = cells; z.capacity = cap;
    if (!id) store.zones.push(z);
    persist(); logAction(id ? "Изменена зона" : "Добавлена зона", name + " · " + cells + " ячеек"); closeModal(); toast("Сохранено", "ok"); render();
  }
  function delZone(id) {
    var used = store.ops.some(function (o) {
      return (o.from || []).concat(o.to || []).some(function (c) { return c.zoneId === id; });
    });
    if (used) return toast("Зона используется в операциях", "err");
    store.zones = store.zones.filter(function (z) { return z.id !== id; });
    persist(); logAction("Удалена зона", id); toast("Удалено", "ok"); render();
  }

  /* ================= админ: каталог ================= */
  function viewAdminCatalog() {
    var rows = store.catalog.map(function (s) {
      var pipe = isPipe(s);
      return "<tr><td><b>" + esc(s.label) + '</b><div class="sub"><span class="nomen">' + esc(s.nomen || "—") + "</span> · " + esc(s.kind || "Труба") + "</div></td>" +
        "<td>" + esc(s.gost || "—") + "</td>" +
        '<td class="num">' + (pipe ? s.d : "—") + '</td><td class="num">' + (pipe ? s.w : "—") + '</td>' +
        '<td class="num">' + (pipe ? s.kgm : (s.kgUnit || 0)) + " " + (pipe ? "кг/м" : "кг/шт") + "</td>" +
        '<td><div class="actions"><button class="btn ghost sm" data-action="edit-size" data-id="' + esc(s.id) + '">' + icon("edit") + "</button>" +
        '<button class="btn danger sm" data-action="del-size" data-id="' + esc(s.id) + '">' + icon("trash") + "</button></div></td></tr>";
    }).join("");
    return '<div class="toolbar no-print"><span class="badge info">' + store.catalog.length + " позиций</span><div class=\"grow\"></div>" +
      '<button class="btn primary" data-action="add-size">' + icon("plus") + "Добавить позицию</button></div>" +
      '<div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Позиция</th><th>ГОСТ / стандарт</th><th class="num">Ø, мм</th><th class="num">Стенка, мм</th><th class="num">Масса</th><th></th></tr></thead><tbody>' + rows + "</tbody></table></div></div>";
  }
  function sizeModal(id) {
    var s = id ? sizeById(id) : { kind: "Труба", type: "Обсадная", d: 168, w: 8, gost: "ГОСТ 632-80", unit: "m", kgUnit: 0, nomen: "" };
    var kinds = ["Труба", "ПВХ", "Металлопрокат", "Запчасти", "Прочее"];
    var pipe = s.unit !== "pcs";
    openModal('<div class="modal-head"><div><h3>' + (id ? "Изменить позицию" : "Новая позиция") + '</h3><p>Трубы и другие изделия</p></div><button class="x" data-action="close-modal">×</button></div>' +
      '<div class="modal-body">' +
      '<div class="row"><label class="field"><span>Номенклатурный номер *</span><input id="sNomen" value="' + esc(s.nomen || "") + '" placeholder="Н-0001"></label>' +
      '<label class="field"><span>Тип изделия</span><select id="sKind">' + kinds.map(function (k) {
        return '<option' + (k === (s.kind || "Труба") ? " selected" : "") + ">" + k + "</option>";
      }).join("") + "</select></label></div>" +
      '<div class="row"><label class="field"><span>Наименование</span><input id="sLabel" value="' + esc(s.label || "") + '" placeholder="Обсадная Ø168×8"></label>' +
      '<label class="field"><span>Единица учёта</span><select id="sUnit"><option value="m"' + (pipe ? " selected" : "") + '>метр</option><option value="pcs"' + (!pipe ? " selected" : "") + ">штука</option></select></label></div>" +
      '<div id="sPipeFields" class="' + (pipe ? "" : "hidden") + '"><div class="row3"><label class="field"><span>Вид трубы</span><select id="sType">' +
      ["Обсадная", "Бурильная", "НКТ", "Иное"].map(function (t) { return "<option" + (t === (s.type || "Обсадная") ? " selected" : "") + ">" + t + "</option>"; }).join("") +
      '</select></label><label class="field"><span>Диаметр, мм</span><input type="number" id="sD" value="' + (s.d || 168) + '"></label>' +
      '<label class="field"><span>Стенка, мм</span><input type="number" id="sW" step="0.1" value="' + (s.w || 8) + '"></label></div>' +
      '<label class="field"><span>ГОСТ</span><input id="sGost" value="' + esc(s.gost || "") + '"></label></div>' +
      '<div id="sPcsFields" class="' + (pipe ? "hidden" : "") + '"><label class="field"><span>Масса за штуку, кг</span><input type="number" id="sKgUnit" step="0.01" value="' + (s.kgUnit || 0) + '"></label></div>' +
      '<div class="note-line" id="sPreview"></div></div>' +
      '<div class="modal-foot"><button class="btn ghost" data-action="close-modal">Отмена</button><button class="btn primary" data-action="save-size" data-id="' + esc(id || "") + '">Сохранить</button></div>');
    updateSizePreview();
  }
  function updateSizePreview() {
    var p = el("sPreview");
    if (!p) return;
    var unit = el("sUnit") ? el("sUnit").value : "m";
    if (unit === "pcs") {
      var kgU = Number(el("sKgUnit") && el("sKgUnit").value) || 0;
      p.innerHTML = "Учёт в штуках. Масса: <b>" + fmt1(kgU) + " кг/шт</b>";
      return;
    }
    var d = Number(el("sD") && el("sD").value), w = Number(el("sW") && el("sW").value);
    var kgm = d > w && w > 0 ? Math.round(0.02466 * w * (d - w) * 100) / 100 : 0;
    p.innerHTML = "Масса: <b>" + kgm + " кг/м</b> · вес 1 км: <b>" + fmt1(kgm) + " т</b>";
  }
  function saveSize() {
    var nomen = el("sNomen").value.trim();
    if (!nomen) return toast("Номенклатурный номер обязателен", "err");
    var unit = el("sUnit").value;
    var kind = el("sKind").value;
    var label = el("sLabel").value.trim();
    var id = document.querySelector('[data-action="save-size"]').getAttribute("data-id");
    var type = el("sType") ? el("sType").value : kind;
    var d = unit === "m" ? Number(el("sD").value) : 0;
    var w = unit === "m" ? Number(el("sW").value) : 0;
    if (unit === "m" && (!(d > 0) || !(w > 0) || w >= d)) return toast("Проверьте диаметр и стенку", "err");
    if (!label) label = unit === "m" ? (type + " Ø" + d + "×" + w) : kind;
    var s = {
      id: id || (unit === "m" ? (type + "-" + d + "-" + w) : ("I-" + Date.now().toString(36))),
      kind: kind, type: type, unit: unit,
      nomen: nomen,
      label: label,
      d: d, w: w,
      kgm: unit === "m" ? Math.round(0.02466 * w * (d - w) * 100) / 100 : 0,
      kgUnit: unit === "pcs" ? (Number(el("sKgUnit").value) || 0) : 0,
      gost: el("sGost") ? el("sGost").value.trim() : ""
    };
    if (id) {
      var i = store.catalog.findIndex(function (x) { return x.id === id; });
      store.catalog[i] = s;
    } else {
      if (sizeById(s.id)) return toast("Такая позиция уже есть", "err");
      store.catalog.push(s);
    }
    persist(); logAction(id ? "Изменена позиция каталога" : "Добавлена позиция каталога", s.label + " · " + nomen); closeModal(); toast("Сохранено", "ok"); render();
  }
  function delSize(id) {
    var used = store.ops.some(function (o) { return o.sizeId === id; });
    if (used) return toast("Типоразмер используется в операциях", "err");
    store.catalog = store.catalog.filter(function (s) { return s.id !== id; });
    persist(); logAction("Удалён типоразмер", id); toast("Удалено", "ok"); render();
  }

  /* ================= админ: журнал ================= */
  function viewAdminAudit() {
    var rows = store.audit.map(function (a) {
      return '<div class="audit-item"><time>' + fmtDateTime(a.ts) + '</time><div><span class="who">' + esc(a.user) + "</span> — " + esc(a.action) +
        (a.details ? '<div class="hint">' + esc(a.details) + "</div>" : "") + "</div></div>";
    }).join("");
    return '<div class="card"><div class="card-head"><div><h3>Журнал действий</h3><div class="sub">последние ' + store.audit.length + " записей</div></div>" +
      '<button class="btn ghost sm right" data-action="export">' + icon("download") + 'Экспорт</button></div><div class="card-body">' + rows + "</div></div>";
  }

  /* ================= профиль ================= */
  function viewProfile() {
    var myOps = store.ops.filter(function (o) { return o.user === session.fio; });
    var meters = myOps.reduce(function (s, o) { return s + o.meters; }, 0);
    var perms = permsOf(session);
    var labels = {};
    PERM_GROUPS.forEach(function (g) { g.items.forEach(function (i) { labels[i[0]] = i[1]; }); });
    var recent = myOps.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 6);
    return '<div class="profile-grid"><div class="card profile-card"><div class="big-ava">' + esc(initials(session.fio)) + "</div>" +
      "<h3>" + esc(session.fio) + '</h3><div class="role"><span class="badge ' + ROLE_BADGE[session.role] + '">' + esc(ROLE_LABELS[session.role]) + "</span></div>" +
      '<p class="hint" style="margin-top:10px">' + esc(session.pos || "Сотрудник") + "<br>Табельный " + esc(session.tab) + "<br>" + esc(unitLabel(unitById(session.orgUnitId))) + "</p>" +
      '<div class="stat-row"><div><b>' + myOps.length + "</b><span>операций</span></div><div><b>" + fmtLen(meters) + "</b><span>метров</span></div><div><b>" + perms.length + "</b><span>прав</span></div></div></div>" +
      '<div><div class="card" style="margin-bottom:16px"><div class="card-head"><h3>Мои полномочия</h3></div><div class="card-body"><div class="perm-list">' +
      perms.map(function (p) { return '<span class="chip sm on">' + esc(labels[p] || p) + "</span>"; }).join("") + "</div></div></div>" +
      '<div class="card"><div class="card-head"><h3>Мои последние операции</h3><button class="btn ghost sm right" data-nav="registry">Реестр</button></div>' +
      '<div class="table-wrap"><table class="tbl"><thead><tr><th>Дата</th><th>Операция</th><th>Труба</th><th class="num">Метров</th></tr></thead><tbody>' +
      (recent.map(function (o) {
        return "<tr><td>" + fmtDate(o.date) + "</td><td>" + typeBadge(o.type) + "</td><td>" + esc(sizeLabel(o.sizeId)) + '</td><td class="num">' + fmtLen(o.meters) + "</td></tr>";
      }).join("") || '<tr><td colspan="4" class="muted">Операций пока нет</td></tr>') + "</tbody></table></div></div></div></div>";
  }

  /* ================= уведомления ================= */
  function notifIcon(kind) {
    return kind === "ok" ? "check" : kind === "bad" ? "trash" : kind === "warn" ? "bell" : "bell";
  }
  function notifItem(n) {
    return '<div class="notif' + (n.read ? "" : " unread") + '" data-notif="' + n.id + '"><span class="ni">' + icon(notifIcon(n.kind)) + "</span>" +
      "<div><b>" + esc(n.title) + "</b><p>" + esc(n.text) + "</p></div><time>" + fmtDateTime(n.ts) + "</time></div>";
  }
  function viewNotifications() {
    var list = store.notifications;
    return '<div class="toolbar no-print"><div class="grow"></div><button class="btn ghost" data-action="mark-all-read">Прочитать все</button></div>' +
      '<div class="card"><div class="card-head"><div><h3>Уведомления</h3><div class="sub" id="notifCount">непрочитанных: ' + unreadCount() + "</div></div></div>" +
      '<div class="card-body" style="padding:0">' + (list.length ? list.map(notifItem).join("") : '<div class="empty">' + icon("bell") + "<b>Пока тихо</b>Здесь появятся события системы</div>") + "</div></div>";
  }
  function paintNotifPanel() {
    var list = store.notifications.slice(0, 20);
    el("notifList").innerHTML = list.length ? list.map(notifItem).join("") : '<div class="empty">' + icon("bell") + "<b>Уведомлений нет</b></div>";
  }

  /* ================= экспорт / импорт ================= */
  function exportData() {
    var blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "uchet-trub-" + todayISO() + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("Файл выгружен", "ok");
  }
  function importData() {
    var inp = document.createElement("input");
    inp.type = "file"; inp.accept = ".json,application/json";
    inp.onchange = function () {
      var f = inp.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (!d.meta || !d.ops || !d.users || !d.catalog) throw new Error("bad");
          store = d;
          session = session ? (store.users.filter(function (x) { return x.tab === session.tab && x.active !== false; })[0] || null) : null;
          persist();
          logAction("Импорт базы", f.name);
          notify("База восстановлена", "Импортирован файл " + f.name, "info");
          closeModal();
          if (session) showApp(); else logout();
          toast("Данные импортированы", "ok");
        } catch (e) { toast("Некорректный файл", "err"); }
      };
      r.readAsText(f);
    };
    inp.click();
  }

  /* ================= панели ================= */
  function closePanels() {
    var np = el("notifPanel"), um = el("userMenu");
    if (np) np.classList.remove("open");
    if (um) um.classList.remove("open");
  }
  function togglePanel(id) {
    var p = el(id), isOpen = p.classList.contains("open");
    closePanels();
    if (!isOpen) p.classList.add("open");
  }
  function openSidebar() { el("sidebar").classList.add("open"); el("scrim").classList.add("on"); }
  function closeSidebar() { el("sidebar").classList.remove("open"); el("scrim").classList.remove("on"); }

  /* ================= события ================= */
  function bindEvents() {
    el("loginForm").addEventListener("submit", doLogin);
    var gs = el("globalSearch");
    if (gs) gs.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { state.search = this.value.trim(); go("search"); }
    });
    el("sbClose").addEventListener("click", closeSidebar);
    el("scrim").addEventListener("click", closeSidebar);
    el("hamburger").addEventListener("click", openSidebar);
    el("bellBtn").addEventListener("click", function () { paintNotifPanel(); togglePanel("notifPanel"); });
    el("userChip").addEventListener("click", function () { togglePanel("userMenu"); });
    el("readAllBtn").addEventListener("click", markAllRead);

    document.addEventListener("click", function (e) {
      var t = e.target;
      var close = t.closest("[data-close]");
      if (close && !t.closest(".modal")) { closeModal(); return; }
      var notif = t.closest("[data-notif]");
      if (notif) { markRead(notif.getAttribute("data-notif")); return; }
      if (!t.closest(".panel") && !t.closest("#bellBtn")) { var np = el("notifPanel"); if (np) np.classList.remove("open"); }
      if (!t.closest(".menu") && !t.closest("#userChip")) { var um = el("userMenu"); if (um) um.classList.remove("open"); }

      var navBtn = t.closest("[data-nav]");
      if (navBtn) { go(navBtn.getAttribute("data-nav")); return; }
      var mapCell = t.closest("[data-cellmap]");
      if (mapCell) { selectMapCell(mapCell.getAttribute("data-zone"), mapCell.getAttribute("data-cell")); return; }
      var pageBtn = t.closest("[data-page]");
      if (pageBtn && !pageBtn.disabled) { state.page = Number(pageBtn.getAttribute("data-page")); refreshRegistry(); return; }
      var typeBtn = t.closest("[data-optype]");
      if (typeBtn) { changeOpType(typeBtn.getAttribute("data-optype")); return; }
      var cellBtn = t.closest("[data-cellpick]");
      if (cellBtn) { toggleCell(cellBtn); return; }
      var act = t.closest("[data-action]");
      if (act) { handleAction(act); return; }
      var menuBtn = t.closest("#userMenu [data-action]");
      if (menuBtn) handleAction(menuBtn);
    });

    document.addEventListener("mouseover", function (e) {
      var c = e.target.closest("[data-cellmap]");
      if (!c) return;
      var tip = el("mapTip");
      if (!tip) return;
      tip.innerHTML = mapTipHtml(c.getAttribute("data-zone"), c.getAttribute("data-cell"));
      tip.classList.add("on");
    });
    document.addEventListener("mousemove", function (e) {
      var tip = el("mapTip");
      if (!tip || !tip.classList.contains("on")) return;
      var x = Math.min(window.innerWidth - 320, e.clientX + 16);
      var y = Math.min(window.innerHeight - 170, e.clientY + 16);
      tip.style.left = Math.max(8, x) + "px";
      tip.style.top = Math.max(8, y) + "px";
    });
    document.addEventListener("mouseout", function (e) {
      var c = e.target.closest("[data-cellmap]");
      if (!c) return;
      if (e.relatedTarget && c.contains(e.relatedTarget)) return;
      var tip = el("mapTip");
      if (tip) tip.classList.remove("on");
    });

    document.addEventListener("change", function (e) {
      var t = e.target;
      if (t.matches("[data-reg]")) {
        state.reg[t.getAttribute("data-reg")] = t.value;
        state.page = 1;
        refreshRegistry();
      }
      if (t.matches("[data-stock]")) { state.stock[t.getAttribute("data-stock")] = t.value; refreshStock(); }
      if (t.matches("[data-map]")) { state.map[t.getAttribute("data-map")] = t.value; state.map.sel = null; refreshMap(); }
      if (t.matches("[data-rep]")) { state.period[t.getAttribute("data-rep")] = t.value; render(); }
      if (t.id === "opFromZone" || t.id === "opToZone") {
        syncDraftFromDom();
        if (t.id === "opFromZone") { state.opDraft.fromZone = t.value; state.opDraft.fromCells = []; }
        else { state.opDraft.toZone = t.value; state.opDraft.toCells = []; }
        renderOpModal();
      }
      if (t.id === "opSize" || t.id === "opStatus") {
        syncDraftFromDom();
        var sum = el("opSummary"); if (sum) sum.innerHTML = opSummaryHtml(state.opDraft);
        var it = sizeById(state.opDraft.sizeId);
        var ml = el("opMetersLabel"); if (ml) ml.textContent = isPipe(it) ? "Метров" : "Метров (необязательно)";
        var ql = el("opQtyLabel"); if (ql) ql.textContent = isPipe(it) ? "Штук" : "Штук (обязательно)";
        var ui = el("opUnitInfo"); if (ui) ui.textContent = it ? (isPipe(it) ? "метры" : "штуки") : "—";
        refreshOpCells();
      } else if (t.id === "opMeters" || t.id === "opQty") {
        syncDraftFromDom();
        var sum2 = el("opSummary"); if (sum2) sum2.innerHTML = opSummaryHtml(state.opDraft);
        refreshOpHints();
      }
      if (t.id === "uRole") {
        var preset = ROLE_PRESETS[t.value] || [];
        document.querySelectorAll("#uPerms input[data-perm]").forEach(function (c) {
          c.checked = t.value === "admin" || preset.indexOf(c.getAttribute("data-perm")) > -1;
        });
      }
      if (t.id === "sD" || t.id === "sW" || t.id === "sKgUnit") updateSizePreview();
      if (t.id === "sUnit" || t.id === "sKind") {
        var unitSel = el("sUnit").value;
        var pf = el("sPipeFields"), cf = el("sPcsFields");
        if (pf) pf.classList.toggle("hidden", unitSel === "pcs");
        if (cf) cf.classList.toggle("hidden", unitSel !== "pcs");
        updateSizePreview();
      }
    });

    document.addEventListener("input", function (e) {
      var t = e.target;
      if (t.id === "opMeters" || t.id === "opQty") {
        if (t.id === "opMeters") {
          var mm = Number(t.value) || 0, qq = el("opQty");
          var curItem = sizeById(state.opDraft.sizeId);
          if (isPipe(curItem) && qq && (!qq.value || Number(qq.value) === 0) && mm > 0) qq.value = Math.round(mm / 12);
        }
        syncDraftFromDom();
        var sumEl = el("opSummary");
        if (sumEl) sumEl.innerHTML = opSummaryHtml(state.opDraft);
        refreshOpHints();
      }
      if (t.matches('[data-reg="q"]')) {
        state.reg.q = t.value;
        clearTimeout(bindEvents._qt);
        bindEvents._qt = setTimeout(function () { state.page = 1; refreshRegistry(); }, 220);
      }
      if (t.matches('[data-stock="q"]')) {
        state.stock.q = t.value;
        clearTimeout(bindEvents._st);
        bindEvents._st = setTimeout(refreshStock, 220);
      }
      if (t.id === "searchMain") {
        state.search = t.value;
        clearTimeout(bindEvents._sr);
        bindEvents._sr = setTimeout(refreshSearch, 250);
      }
    });
  }

  function changeOpType(type) {
    syncDraftFromDom();
    var d = state.opDraft;
    d.type = type;
    d.fromCells = []; d.toCells = [];
    d.fromZone = ""; d.toZone = "";
    if (type === "from_shop") {
      var shop = store.zones.filter(function (z) { return z.type === "shop"; })[0];
      if (shop) d.fromZone = shop.id;
    }
    if (type === "to_shop") {
      var sh = store.zones.filter(function (z) { return z.type === "shop"; })[0];
      if (sh) d.toZone = sh.id;
    }
    if (type === "in" || type === "to_shop") d.status = "raw";
    if (type === "from_shop" || type === "ship") d.status = "prepared";
    renderOpModal();
  }
  function toggleCell(btn) {
    var which = btn.getAttribute("data-cellpick"), cell = btn.getAttribute("data-cell");
    var d = state.opDraft;
    var arr = which === "from" ? d.fromCells : d.toCells;
    var i = arr.indexOf(cell);
    if (i > -1) arr.splice(i, 1); else arr.push(cell);
    btn.classList.toggle("on");
    refreshOpHints();
  }

  function handleAction(btn) {
    var a = btn.getAttribute("data-action");
    var id = btn.getAttribute("data-id");
    if (a === "new-op") return openOperation();
    if (a === "edit-op") return openOperation(id);
    if (a === "del-op") return askDeleteOp(id);
    if (a === "confirm-del") return deleteOp(id);
    if (a === "close-modal") return closeModal();
    if (a === "save-op") return saveOperation();
    if (a === "print") return window.print();
    if (a === "export") return exportData();
    if (a === "add-user") return userModal();
    if (a === "edit-user") return userModal(id);
    if (a === "save-user") return saveUser();
    if (a === "del-user") return askDeleteUser(id);
    if (a === "confirm-del-user") return delUser(id);
    if (a === "add-unit") return unitModal();
    if (a === "edit-unit") return unitModal(id);
    if (a === "save-unit") return saveUnit();
    if (a === "del-unit") return delUnit(id);
    if (a === "add-territory") return territoryModal();
    if (a === "save-territory") return saveTerritory();
    if (a === "add-zone") return zoneModal("", id);
    if (a === "edit-zone") return zoneModal(id);
    if (a === "save-zone") return saveZone();
    if (a === "del-zone") return delZone(id);
    if (a === "add-size") return sizeModal();
    if (a === "edit-size") return sizeModal(id);
    if (a === "save-size") return saveSize();
    if (a === "del-size") return delSize(id);
    if (a === "mark-all-read") return markAllRead();
    if (a === "profile") return go("profile");
    if (a === "notifications") return go("notifications");
    if (a === "help") return go("help");
    if (a === "logout") return logout();
  }

  function markRead(id) {
    var n = store.notifications.filter(function (x) { return x.id === id; })[0];
    if (!n) return;
    n.read = true;
    persist();
    paintBell();
    var item = document.querySelector('[data-notif="' + id + '"]');
    if (item) item.classList.remove("unread");
    var cnt = el("notifCount");
    if (cnt) cnt.textContent = "непрочитанных: " + unreadCount();
    paintNotifPanel();
  }
  function markAllRead() {
    store.notifications.forEach(function (n) { n.read = true; });
    persist(); paintBell(); paintNotifPanel();
    document.querySelectorAll("[data-notif]").forEach(function (x) { x.classList.remove("unread"); });
    var cnt = el("notifCount");
    if (cnt) cnt.textContent = "непрочитанных: 0";
    toast("Все уведомления прочитаны", "ok");
  }

  function afterRender() {
    var bars = document.querySelectorAll(".bar-fill[data-w]");
    bars.forEach(function (b) {
      b.style.width = "0%";
      setTimeout(function () { b.style.width = b.getAttribute("data-w") + "%"; }, 30);
    });
    var gs = el("globalSearch");
    if (gs) gs.value = state.route === "search" ? state.search : "";
  }

  /* ================= старт ================= */
  function init() {
    fillLogin();
    bindEvents();
    if (session) {
      showApp();
    } else {
      el("loginScreen").style.display = "grid";
    }
  }

  init();
})();
