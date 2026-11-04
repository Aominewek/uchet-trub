(function () {
  "use strict";

  var KEY = "utp_v2", SKEY = "utp_user";

  /* ================= справочные данные ================= */
  var REFS = {
    territories: ["Т1","Т2","Т3","Т4","Т5","Т6","Т7","Т8","Т9","Т10","Цех"],
    racks: ["С1","С2","С3","С4","С5"],
    cells: ["Я01","Я02","Я03","Я04","Я05","Я06","Я07","Я08","Я09","Я10"],
    plants: ["ТМК","ВТЗ","СинТЗ","ПНТЗ","ЧТПЗ","Северский трубный","ОМК","Иной"],
    cranes: ["Кран 1","Кран 2","Кран 3","Кран 4","Кран 5","Кран 6","Кран 7","Кран 8","Кран 9","Кран 10"],
    types: ["Приход","Расход","Перемещение","Подача в цех","Возврат из цеха"]
  };

  var EMPLOYEES = [
    ["Иванов И.П.","1001"],["Петров А.С.","1002"],["Сидоров В.Н.","1003"],["Смирнов Д.М.","1004"],
    ["Кузнецов Е.В.","1005"],["Попов К.А.","1006"],["Соколов М.С.","1007"],["Михайлов Н.Д.","1008"],
    ["Новиков П.К.","1009"],["Фёдоров С.В.","1010"],["Морозов Р.А.","1011"],["Волков Г.О.","1012"],
    ["Алексеев Л.М.","1013"],["Лебедев Т.Е.","1014"],["Семёнов Ю.Н.","1015"],["Егоров И.В.","1016"],
    ["Павлов А.Н.","1017"],["Козлов В.С.","1018"],["Степанов Д.К.","1019"],["Николаев Е.А.","1020"],
    ["Орлов М.В.","1021"],["Андреев Н.С.","1022"],["Макаров П.А.","1023"],["Никитин Р.К.","1024"],
    ["Захаров С.Н.","1025"],["Зайцев О.Д.","1026"],["Соловьёв Г.В.","1027"],["Борисов Л.А.","1028"],
    ["Яковлев Т.С.","1029"],["Григорьев Ю.М.","1030"],["Романов И.А.","1031"],["Воробьёв А.В.","1032"],
    ["Сергеев В.К.","1033"],["Костин Д.С.","1034"],["Давыдов Е.Н.","1035"],["Кириллов М.А.","1036"],
    ["Гусев Н.В.","1037"],["Котов П.С.","1038"],["Максимов Р.М.","1039"],["Титов С.К.","1040"],
    ["Куликов О.В.","1041"],["Жуков Г.С.","1042"],["Васильев Л.Д.","1043"],["Терентьев Т.А.","1044"],
    ["Трофимов Ю.П.","1045"],["Фролов И.С.","1046"],["Антонов А.М.","1047"],["Гордеев В.Д.","1048"],
    ["Беляев Д.Н.","1049"],["Романов Е.К.","1050"]
  ];

  function buildCatalog() {
    var OBS = [[102,[4,5.6,6.2]],[114,[5.2,6.2,7.3]],[127,[5.6,6.5,7.9]],[140,[6.2,7.1,8.5]],
      [146,[6.5,7.7,9.5]],[168,[6.5,8,9.5]],[178,[6.9,8.5,10.2]],[194,[7.6,9.5,11.1]],
      [219,[8,10.7,12.7]],[245,[8.9,11.5,13.8]],[273,[9.5,12.5,15.1]],[299,[10,13,16]],
      [324,[10.5,13.5,16.5]],[340,[11,14,17.5]],[351,[11.5,14.5,18]],[377,[12,15,18.5]],[426,[12.5,15.5,19]]];
    var BUR = [[60,[5,7]],[73,[5.5,7,9]],[89,[6.5,8,11]],[102,[7,9,11]],[114,[7,9,11]],[127,[7,9,11]],[140,[8,10,12]]];
    var NKT = [[60,[5]],[73,[5.5,7]],[89,[6.5,8]],[102,[6.5,7]],[114,[7,8]]];
    var out = [];
    [["Обсадная",OBS,"ГОСТ 632-80"],["Бурильная",BUR,"ГОСТ 631-75"],["НКТ",NKT,"ГОСТ 633-80"]].forEach(function (g) {
      g[1].forEach(function (row) {
        row[1].forEach(function (w) {
          out.push({
            id: g[0] + "-" + row[0] + "-" + w,
            type: g[0], size: g[0] + " Ø" + row[0] + "×" + w,
            d: row[0], w: w,
            mass: Math.round(0.02466 * w * (row[0] - w) * 100) / 100,
            gost: g[2]
          });
        });
      });
    });
    return out;
  }

  function seed() {
    var employees = EMPLOYEES.map(function (e, i) {
      return { id: "e" + (i + 1), fio: e[0], tab: e[1], pos: "Кладовщик", role: "Кладовщик", active: true };
    });
    employees.push({ id: "e99", fio: "Руководитель", tab: "9999", pos: "Начальник участка", role: "Руководитель", active: true });
    return {
      meta: { org: "ПАО «Сургутнефтегаз»", version: 2, created: "2026-01-05" },
      refs: JSON.parse(JSON.stringify(REFS)),
      employees: employees,
      catalog: buildCatalog(),
      ops: [
        { id: "o1", date: "2026-01-15", type: "Приход", size: "Обсадная Ø146×7.7", plant: "ТМК", qty: 120, ft: "", fr: "", fc: "", tt: "Т1", tr: "С1", tc: "Я01", crane: "Кран 1", emp: "Иванов И.П.", note: "Пример: поступление" },
        { id: "o2", date: "2026-01-18", type: "Перемещение", size: "Обсадная Ø146×7.7", plant: "ТМК", qty: 40, ft: "Т1", fr: "С1", fc: "Я01", tt: "Т1", tr: "С2", tc: "Я02", crane: "Кран 2", emp: "Иванов И.П.", note: "Пример: перестановка" },
        { id: "o3", date: "2026-01-20", type: "Расход", size: "Обсадная Ø146×7.7", plant: "ТМК", qty: 25, ft: "Т1", fr: "С2", fc: "Я02", tt: "", tr: "", tc: "", crane: "Кран 2", emp: "Петров А.С.", note: "Пример: выдача" },
        { id: "o4", date: "2026-01-22", type: "Приход", size: "НКТ Ø89×6.5", plant: "СинТЗ", qty: 300, ft: "", fr: "", fc: "", tt: "Т3", tr: "С1", tc: "Я05", crane: "Кран 3", emp: "Петров А.С.", note: "Пример: поступление" },
        { id: "o5", date: "2026-01-25", type: "Подача в цех", size: "Бурильная Ø127×9", plant: "ВТЗ", qty: 12, ft: "Т3", fr: "С1", fc: "Я05", tt: "Цех", tr: "", tc: "", crane: "Кран 4", emp: "Сидоров В.Н.", note: "Пример: подача" }
      ]
    };
  }

  /* ================= хранилище ================= */
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && d.ops && d.catalog && d.employees) return d;
      }
    } catch (e) {}
    var s = seed();
    save(s);
    return s;
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }
  var store = load();
  function persist() { save(store); }

  var session = null;
  try {
    var t = sessionStorage.getItem(SKEY);
    if (t) session = store.employees.filter(function (e) { return e.tab === t; })[0] || null;
  } catch (e) {}

  /* ================= утилиты ================= */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var nf = new Intl.NumberFormat("ru-RU");
  var nf2 = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function fmtInt(n) { return nf.format(Math.round(n || 0)); }
  function fmtNum(n) { return nf2.format(n || 0); }
  function todayISO() {
    var d = new Date(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    var p = iso.split("-");
    return p[2] + "." + p[1] + "." + p[0];
  }
  function uid() { return "op" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function catBySize(size) {
    return store.catalog.filter(function (c) { return c.size === size; })[0] || null;
  }
  function massOf(op) {
    var c = catBySize(op.size);
    return c ? c.mass : 0;
  }
  function addrKey(t, r, c) {
    if (!t) return "";
    if (t === "Цех") return "Цех";
    return t + "/" + r + "/" + c;
  }
  function opMassT(op) { return massOf(op) * op.qty / 1000; }

  var toastTimer = null;
  function toast(msg, isErr) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.className = "toast show" + (isErr ? " err" : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "toast"; }, 2600);
  }

  /* ================= состояние ================= */
  var state = {
    route: "dashboard",
    period: { from: "2026-01-01", to: todayISO() },
    reg: { from: "2026-01-01", to: todayISO(), type: "", q: "" },
    page: 1,
    mapTerritory: "Т1",
    search: "",
    refTab: "catalog"
  };
  var PAGE_SIZE = 25;

  /* ================= вычисления ================= */
  function opsInPeriod() {
    return store.ops.filter(function (o) {
      return (!state.period.from || o.date >= state.period.from) && (!state.period.to || o.date <= state.period.to);
    });
  }
  function filteredOps() {
    var f = state.reg, q = f.q.trim().toLowerCase();
    return store.ops.filter(function (o) {
      if (f.from && o.date < f.from) return false;
      if (f.to && o.date > f.to) return false;
      if (f.type && o.type !== f.type) return false;
      if (q) {
        var hay = [o.date, fmtDate(o.date), o.type, o.size, o.plant, o.emp, o.crane, o.note,
          addrKey(o.ft, o.fr, o.fc), addrKey(o.tt, o.tr, o.tc)].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  }
  function balances() {
    var map = {};
    function add(k, q, m) {
      if (!k) return;
      if (!map[k]) map[k] = { qty: 0, mass: 0 };
      map[k].qty += q; map[k].mass += m;
    }
    store.ops.forEach(function (o) {
      var m = opMassT(o);
      if (o.type !== "Приход") add(addrKey(o.ft, o.fr, o.fc), -o.qty, -m);
      if (o.type !== "Расход") add(addrKey(o.tt, o.tr, o.tc), o.qty, m);
    });
    return map;
  }
  function stockTotals() {
    var b = balances(), q = 0, m = 0;
    Object.keys(b).forEach(function (k) { q += b[k].qty; m += b[k].mass; });
    return { qty: q, mass: m };
  }
  function addrList() {
    var out = [];
    store.refs.territories.forEach(function (t) {
      if (t === "Цех") { out.push({ code: "Цех", t: t, r: "", c: "" }); return; }
      store.refs.racks.forEach(function (r) {
        store.refs.cells.forEach(function (c) { out.push({ code: t + "/" + r + "/" + c, t: t, r: r, c: c }); });
      });
    });
    return out;
  }

  /* ================= маршрутизация ================= */
  var ROUTES = {
    dashboard: { title: "Главная", crumb: "Обзор участка", icon: "grid" },
    registry: { title: "Реестр операций", crumb: "Все движения труб", icon: "list" },
    stock: { title: "Остатки", crumb: "Сколько и где лежит", icon: "box" },
    map: { title: "Схема склада", crumb: "Адресное хранение", icon: "map" },
    reports: { title: "Отчёты", crumb: "Сводки за период", icon: "chart" },
    search: { title: "Поиск", crumb: "По всем операциям", icon: "search" },
    checks: { title: "Проверки", crumb: "Контроль данных", icon: "check", admin: true },
    refs: { title: "Справочники", crumb: "НСИ участка", icon: "book", admin: true },
    staff: { title: "Сотрудники", crumb: "Доступ и роли", icon: "users", admin: true },
    help: { title: "Инструкция", crumb: "Правила работы", icon: "help" }
  };
  var ICONS = {
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    box: '<path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7"/>',
    map: '<path d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3zM9 4v13M15 7v13"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    book: '<path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 01-2-2V5zM7 3v18"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.2 3.2 0 010 7M18 14.5c2 .8 3 2.6 3 5.5"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 1.8-2.5 4"/><path d="M12 17h.01"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || ICONS.grid) + "</svg>";
  }
  function isAdmin() { return session && session.role === "Руководитель"; }

  function navHtml() {
    var main = ["dashboard", "registry", "stock", "map", "reports", "search"];
    var admin = ["checks", "refs", "staff"];
    function item(r) {
      var meta = ROUTES[r];
      if (meta.admin && !isAdmin()) return "";
      var active = state.route === r ? " active" : "";
      return '<button class="nav-item' + active + '" type="button" data-nav="' + r + '"' + (active ? ' aria-current="page"' : "") + ">" +
        icon(meta.icon) + "<span>" + meta.title + "</span></button>";
    }
    document.getElementById("navMain").innerHTML = main.map(item).join("") + item("help");
    document.getElementById("navAdmin").innerHTML = isAdmin()
      ? '<div class="sb-label">Контроль и НСИ</div>' + admin.map(item).join("")
      : "";
  }

  /* ================= вход ================= */
  function fillLogin() {
    var sel = document.getElementById("loginUser");
    var list = store.employees.filter(function (e) { return e.active !== false; })
      .sort(function (a, b) { return a.fio.localeCompare(b.fio, "ru"); });
    sel.innerHTML = '<option value="">— выберите сотрудника —</option>' + list.map(function (e) {
      return '<option value="' + esc(e.tab) + '">' + esc(e.fio) + " · " + esc(e.pos) + "</option>";
    }).join("");
  }

  document.getElementById("loginForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var sel = document.getElementById("loginUser");
    var tab = document.getElementById("loginTab").value.trim();
    var err = document.getElementById("loginError");
    var emp = store.employees.filter(function (e) { return e.tab === sel.value; })[0];
    if (!sel.value || !tab) {
      err.textContent = "Выберите сотрудника и введите табельный номер.";
      err.classList.remove("hidden");
      return;
    }
    if (!emp || emp.tab !== tab || emp.active === false) {
      err.textContent = "Неверный табельный номер. Проверьте данные или обратитесь к ответственному за НСИ.";
      err.classList.remove("hidden");
      return;
    }
    session = emp;
    try { sessionStorage.setItem(SKEY, emp.tab); } catch (e) {}
    err.classList.add("hidden");
    document.getElementById("loginTab").value = "";
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    enterApp();
  });

  function enterApp() {
    document.getElementById("userName").textContent = session.fio;
    document.getElementById("userRole").textContent = session.role + " · таб. " + session.tab;
    document.getElementById("userAvatar").textContent = session.fio.split(" ")[0].slice(0, 1) + (session.fio.split(" ")[1] || "").slice(0, 1);
    if (!ROUTES[state.route] || (ROUTES[state.route].admin && !isAdmin())) state.route = "dashboard";
    render();
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    session = null;
    try { sessionStorage.removeItem(SKEY); } catch (e) {}
    document.getElementById("app").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
    fillLogin();
  });

  /* ================= рендер ================= */
  function navigate(route) {
    if (!ROUTES[route]) route = "dashboard";
    if (ROUTES[route].admin && !isAdmin()) route = "dashboard";
    state.route = route;
    state.page = 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render() {
    if (!ROUTES[state.route] || (ROUTES[state.route].admin && !isAdmin())) state.route = "dashboard";
    var meta = ROUTES[state.route];
    document.getElementById("pageTitle").textContent = meta.title;
    document.getElementById("pageCrumb").textContent = meta.crumb;
    navHtml();
    var host = document.getElementById("view");
    host.innerHTML = views[state.route]();
    bind[state.route] && bind[state.route](host);
  }

  function kpi(label, value, sub, accent) {
    return '<div class="kpi' + (accent ? " accent" : "") + '"><div class="label">' + label + '</div>' +
      '<div class="value">' + value + "</div>" + (sub ? '<div class="sub">' + sub + "</div>" : "") + "</div>";
  }

  var views = {}, bind = {};

  /* ---------- главная ---------- */
  views.dashboard = function () {
    var ops = opsInPeriod();
    var inQty = 0, outQty = 0;
    ops.forEach(function (o) { if (o.type === "Приход") inQty += o.qty; if (o.type === "Расход") outQty += o.qty; });
    var tot = stockTotals();
    var recent = store.ops.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 8);
    var bySize = {};
    store.ops.forEach(function (o) { bySize[o.size] = (bySize[o.size] || 0) + o.qty * (o.type === "Приход" ? 1 : o.type === "Расход" ? -1 : 0); });
    var topSizes = Object.keys(bySize).filter(function (k) { return bySize[k] > 0; })
      .sort(function (a, b) { return bySize[b] - bySize[a]; }).slice(0, 6);
    var max = topSizes.length ? bySize[topSizes[0]] : 1;

    return '<div class="page-head"><div><h2>Обзор участка</h2><p>Показатели считаются по реестру операций. Период можно изменить — все цифры пересчитаются.</p></div><div class="spacer"></div>' +
      '<div class="filters"><div class="field"><label for="dFrom">Период с</label><input class="input" type="date" id="dFrom" value="' + state.period.from + '"></div>' +
      '<div class="field"><label for="dTo">по</label><input class="input" type="date" id="dTo" value="' + state.period.to + '"></div>' +
      '<button class="btn btn-primary btn-sm" type="button" data-action="apply-period">Применить</button></div></div>' +

      '<div class="grid kpis">' +
      kpi("Операций за период", fmtInt(ops.length), "в реестре всего " + fmtInt(store.ops.length), true) +
      kpi("Приход, шт", fmtInt(inQty), "за выбранный период") +
      kpi("Расход, шт", fmtInt(outQty), "за выбранный период") +
      kpi("Остаток на складе, шт", fmtInt(tot.qty), "по всем адресам") +
      kpi("Масса на складе, т", fmtNum(tot.mass), "расчёт по ГОСТ") +
      "</div>" +

      '<div class="two-col">' +
      '<div class="card"><div class="card-head"><h3>Последние операции</h3><div class="spacer"></div><button class="btn btn-ghost btn-sm" type="button" data-nav="registry">Весь реестр</button></div>' +
      '<div class="card-body tight"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Операция</th><th>Типоразмер</th><th class="num">Кол-во</th><th>Адрес</th></tr></thead><tbody>' +
      (recent.length ? recent.map(function (o) {
        var place = o.type === "Приход" ? addrKey(o.tt, o.tr, o.tc) : o.type === "Расход" ? addrKey(o.ft, o.fr, o.fc) : addrKey(o.ft, o.fr, o.fc) + " → " + addrKey(o.tt, o.tr, o.tc);
        return "<tr><td>" + fmtDate(o.date) + "</td><td>" + tagType(o.type) + "</td><td>" + esc(o.size) + '</td><td class="num">' + fmtInt(o.qty) + "</td><td>" + esc(place || "—") + "</td></tr>";
      }).join("") : '<tr><td colspan="5" class="empty">Операций пока нет — начните с кнопки «+ Операция»</td></tr>') +
      "</tbody></table></div></div></div>" +

      '<div class="card"><div class="card-head"><h3>Остаток по номенклатуре</h3><div class="spacer"></div><span class="chip gray">топ-6</span></div><div class="card-body">' +
      (topSizes.length ? '<div class="bars">' + topSizes.map(function (s) {
        return '<div class="bar-row"><div title="' + esc(s) + '">' + esc(s) + '</div><div class="bar-track"><div class="bar-fill" style="width:' + Math.max(3, Math.round(bySize[s] / max * 100)) + '%"></div></div><div class="val">' + fmtInt(bySize[s]) + " шт</div></div>";
      }).join("") + "</div>" : '<p class="muted">Нет данных за период.</p>') +
      "</div></div></div>" +

      '<div class="note" style="margin-top:14px">Быстрый старт: «+ Операция» → выберите тип, трубу и адрес. Остатки и отчёты обновятся автоматически. Перед сдачей смены откройте «Проверки».</div>';
  };

  bind.dashboard = function (host) {
    var btn = host.querySelector('[data-action="apply-period"]');
    btn && btn.addEventListener("click", function () {
      var f = host.querySelector("#dFrom").value, t = host.querySelector("#dTo").value;
      if (f && t && f > t) { toast("Дата начала позже даты окончания", true); return; }
      state.period.from = f; state.period.to = t; render();
    });
  };

  function tagType(t) {
    var cls = t === "Приход" ? "tag-in" : t === "Расход" ? "tag-out" : "tag-move";
    return '<span class="tag ' + cls + '">' + esc(t) + "</span>";
  }

  /* ---------- реестр ---------- */
  views.registry = function () {
    var rows = filteredOps();
    var pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var slice = rows.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    var totalQty = rows.reduce(function (s, o) { return s + o.qty; }, 0);
    var totalMass = rows.reduce(function (s, o) { return s + opMassT(o); }, 0);

    return '<div class="page-head"><div><h2>Реестр операций</h2><p>Единственный источник данных: приход, расход, перемещение, подача в цех, возврат. Каждая строка подписывается сотрудником.</p></div><div class="spacer"></div>' +
      '<button class="btn btn-primary" type="button" data-action="add">+ Операция</button></div>' +

      '<div class="card" style="margin-bottom:14px"><div class="card-body"><div class="filters">' +
      '<div class="field"><label for="rFrom">С даты</label><input class="input" type="date" id="rFrom" value="' + state.reg.from + '"></div>' +
      '<div class="field"><label for="rTo">По дату</label><input class="input" type="date" id="rTo" value="' + state.reg.to + '"></div>' +
      '<div class="field"><label for="rType">Операция</label><select class="input" id="rType"><option value="">Все типы</option>' +
      store.refs.types.map(function (t) { return '<option' + (state.reg.type === t ? " selected" : "") + ">" + esc(t) + "</option>"; }).join("") + "</select></div>" +
      '<div class="field grow"><label for="rQ">Поиск</label><input class="input" id="rQ" placeholder="фамилия, завод, адрес, типоразмер…" value="' + esc(state.reg.q) + '"></div>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-action="reset">Сбросить</button>' +
      '</div></div></div>' +

      '<div class="card"><div class="card-head"><h3>Операции</h3><div class="spacer"></div>' +
      '<span class="chip">' + fmtInt(rows.length) + ' строк</span><span class="chip gray">' + fmtInt(totalQty) + " шт · " + fmtNum(totalMass) + " т</span></div>" +
      '<div class="card-body tight"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Операция</th><th>Типоразмер</th><th class="num">Кол-во</th><th class="num">Масса, т</th><th>Откуда</th><th>Куда</th><th>Кран</th><th>Сотрудник</th><th></th></tr></thead><tbody>' +
      (slice.length ? slice.map(rowOp).join("") : '<tr><td colspan="10" class="empty">Ничего не найдено. Измените фильтры или добавьте операцию.</td></tr>') +
      "</tbody></table></div>" +
      '<div class="pager"><span>Стр. ' + state.page + " из " + pages + '</span><div class="spacer"></div>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-action="prev"' + (state.page <= 1 ? " disabled" : "") + ">Назад</button>" +
      '<button class="btn btn-ghost btn-sm" type="button" data-action="next"' + (state.page >= pages ? " disabled" : "") + ">Вперёд</button>" +
      "</div></div></div>";
  };

  function rowOp(o) {
    var from = addrKey(o.ft, o.fr, o.fc) || "—";
    var to = addrKey(o.tt, o.tr, o.tc) || "—";
    return "<tr><td>" + fmtDate(o.date) + "</td><td>" + tagType(o.type) + "</td><td>" + esc(o.size) +
      '</td><td class="num">' + fmtInt(o.qty) + '</td><td class="num">' + fmtNum(opMassT(o)) + "</td><td>" + esc(from) + "</td><td>" + esc(to) +
      "</td><td>" + esc(o.crane || "—") + "</td><td>" + esc(o.emp || "—") + "</td>" +
      '<td class="table-actions"><button class="btn btn-ghost btn-sm" type="button" data-op="' + o.id + '">Изменить</button>' +
      (isAdmin() ? '<button class="btn btn-danger btn-sm" type="button" data-del="' + o.id + '">Удалить</button>' : "") + "</td></tr>";
  }

  bind.registry = function (host) {
    function apply() {
      state.reg.from = host.querySelector("#rFrom").value;
      state.reg.to = host.querySelector("#rTo").value;
      state.reg.type = host.querySelector("#rType").value;
      state.reg.q = host.querySelector("#rQ").value;
      state.page = 1; render();
    }
    ["#rFrom", "#rTo", "#rType"].forEach(function (s) { host.querySelector(s).addEventListener("change", apply); });
    var q = host.querySelector("#rQ");
    var tmr = null;
    q.addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(apply, 220); });
    host.querySelector('[data-action="reset"]').addEventListener("click", function () {
      state.reg = { from: "2026-01-01", to: todayISO(), type: "", q: "" }; state.page = 1; render();
    });
    host.querySelector('[data-action="add"]').addEventListener("click", function () { openOpModal(null); });
    var prev = host.querySelector('[data-action="prev"]'), next = host.querySelector('[data-action="next"]');
    prev && prev.addEventListener("click", function () { if (state.page > 1) { state.page--; render(); } });
    next && next.addEventListener("click", function () { state.page++; render(); });
  };

  /* ---------- остатки ---------- */
  views.stock = function () {
    var b = balances();
    var rows = addrList().map(function (a) {
      var v = b[a.code] || { qty: 0, mass: 0 };
      return { code: a.code, t: a.t, r: a.r, c: a.c, qty: v.qty, mass: v.mass };
    }).filter(function (r) { return r.qty !== 0 || r.t === "Т1"; });
    var tot = stockTotals();
    var bySize = {};
    store.ops.forEach(function (o) {
      var sign = o.type === "Приход" ? 1 : o.type === "Расход" ? -1 : 0;
      if (!sign) return;
      bySize[o.size] = (bySize[o.size] || 0) + o.qty * sign;
    });
    var sizes = Object.keys(bySize).sort(function (a, b2) { return bySize[b2] - bySize[a]; });

    return '<div class="page-head"><div><h2>Остатки по адресам</h2><p>Считается из реестра: приход и приёмка «+», выдача и отправка «−». Перемещения внутри склада остаток не меняют.</p></div></div>' +
      '<div class="grid kpis" style="grid-template-columns:repeat(3,minmax(0,1fr))">' +
      kpi("Всего на складе, шт", fmtInt(tot.qty), "по всем адресам") +
      kpi("Масса, т", fmtNum(tot.mass), "по массе 1 м") +
      kpi("Адресов с трубами", fmtInt(rows.filter(function (r) { return r.qty > 0; }).length), "из " + addrList().length) + "</div>" +

      '<div class="two-col">' +
      '<div class="card"><div class="card-head"><h3>По адресам</h3><div class="spacer"></div><span class="chip gray">' + fmtInt(rows.length) + ' строк</span></div>' +
      '<div class="card-body tight"><div class="table-wrap" style="max-height:520px"><table class="table"><thead><tr><th>Адрес</th><th class="num">Остаток, шт</th><th class="num">Масса, т</th><th>Статус</th></tr></thead><tbody>' +
      rows.sort(function (a, c) { return c.qty - a.qty; }).map(function (r) {
        var st = r.qty < 0 ? '<span class="tag tag-out">Отрицательный</span>' : r.qty === 0 ? '<span class="tag tag-gray">Пусто</span>' : '<span class="tag tag-in">Норма</span>';
        return "<tr><td>" + esc(r.code) + '</td><td class="num">' + fmtInt(r.qty) + '</td><td class="num">' + fmtNum(r.mass) + "</td><td>" + st + "</td></tr>";
      }).join("") + "</tbody></table></div></div></div>" +

      '<div class="card"><div class="card-head"><h3>По номенклатуре</h3></div><div class="card-body tight"><div class="table-wrap" style="max-height:520px"><table class="table"><thead><tr><th>Типоразмер</th><th class="num">Остаток, шт</th><th class="num">Масса, т</th></tr></thead><tbody>' +
      (sizes.length ? sizes.map(function (s) {
        var c = catBySize(s), m = c ? bySize[s] * c.mass / 1000 : 0;
        return "<tr><td>" + esc(s) + '</td><td class="num">' + fmtInt(bySize[s]) + '</td><td class="num">' + fmtNum(m) + "</td></tr>";
      }).join("") : '<tr><td colspan="3" class="empty">Нет остатков</td></tr>') +
      "</tbody></table></div></div></div></div>";
  };

  /* ---------- схема ---------- */
  views.map = function () {
    var b = balances();
    var tabs = store.refs.territories.map(function (t) {
      return '<button class="tab' + (state.mapTerritory === t ? " active" : "") + '" type="button" data-terr="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");
    var body = "";
    if (state.mapTerritory === "Цех") {
      var v = b["Цех"] || { qty: 0, mass: 0 };
      body = '<div class="map-grid" style="grid-template-columns:repeat(2,minmax(140px,1fr))">' +
        '<div class="cell-box ' + cellClass(v.qty) + '"><span class="code">Цех</span><span class="qty">' + fmtInt(v.qty) + '</span><span class="unit">шт · ' + fmtNum(v.mass) + " т</span></div></div>";
    } else {
      var boxes = "";
      store.refs.cells.forEach(function (c) {
        store.refs.racks.forEach(function (r) {
          var code = state.mapTerritory + "/" + r + "/" + c;
          var qty = (b[code] || {}).qty || 0;
          boxes += '<div class="cell-box ' + cellClass(qty) + '" title="' + esc(code) + '"><span class="code">' + r + " · " + c + '</span><span class="qty">' + fmtInt(qty) + '</span><span class="unit">шт</span></div>';
        });
      });
      body = '<div class="map-grid">' + boxes + "</div>";
    }
    var tot = stockTotals();
    return '<div class="page-head"><div><h2>Схема адресного хранения</h2><p>Живая карта: в каждой ячейке — фактический остаток по данным реестра. Нажмите на территорию, чтобы переключиться.</p></div></div>' +
      '<div class="card"><div class="card-head"><h3>Территория ' + esc(state.mapTerritory) + '</h3><div class="spacer"></div><span class="chip">' + fmtInt(tot.qty) + " шт всего · " + fmtNum(tot.mass) + ' т</span></div>' +
      '<div class="card-body"><div class="tabs">' + tabs + "</div>" + body +
      '<div class="legend"><span><i style="background:#fbfcfd;border:1px solid #d7dee8"></i>пусто</span><span><i style="background:#eaf6ee;border:1px solid #bfe3cb"></i>до 50 шт</span><span><i style="background:#fff8e1;border:1px solid #f0dc9a"></i>50–200 шт</span><span><i style="background:#e8f0fb;border:1px solid #bcd2ef"></i>более 200 шт</span></div>' +
      "</div></div>";
  };
  function cellClass(q) { return q <= 0 ? "zero" : q <= 50 ? "low" : q <= 200 ? "mid" : "high"; }
  bind.map = function (host) {
    host.querySelectorAll("[data-terr]").forEach(function (b) {
      b.addEventListener("click", function () { state.mapTerritory = b.getAttribute("data-terr"); render(); });
    });
  };

  /* ---------- отчёты ---------- */
  views.reports = function () {
    var ops = opsInPeriod();
    var byType = store.refs.types.map(function (t) {
      var list = ops.filter(function (o) { return o.type === t; });
      return { t: t, n: list.length, q: list.reduce(function (s, o) { return s + o.qty; }, 0), m: list.reduce(function (s, o) { return s + opMassT(o); }, 0) };
    });
    var byTerr = store.refs.territories.map(function (t) {
      var n = 0;
      ops.forEach(function (o) { if (addrKey(o.tt, o.tr, o.tc).indexOf(t) === 0) n += o.qty; });
      return { t: t, q: n };
    }).sort(function (a, b) { return b.q - a.q; });
    var maxTerr = byTerr.length ? Math.max.apply(null, byTerr.map(function (x) { return x.q; })) || 1 : 1;
    var byPlant = store.refs.plants.map(function (p) {
      var list = ops.filter(function (o) { return o.plant === p && o.type === "Приход"; });
      return { p: p, n: list.length, q: list.reduce(function (s, o) { return s + o.qty; }, 0) };
    }).sort(function (a, b) { return b.q - a.q; });
    var byEmp = {};
    ops.forEach(function (o) { byEmp[o.emp] = (byEmp[o.emp] || 0) + 1; });
    var emps = Object.keys(byEmp).sort(function (a, b) { return byEmp[b] - byEmp[a]; });
    var bySize = {};
    ops.forEach(function (o) { bySize[o.size] = (bySize[o.size] || 0) + o.qty; });
    var sizes = Object.keys(bySize).sort(function (a, b) { return bySize[b] - bySize[a]; }).slice(0, 15);

    return '<div class="page-head"><div><h2>Отчёты за период</h2><p>Сводки строятся по реестру. Период задаётся здесь и на «Главной» — это одни и те же значения.</p></div><div class="spacer"></div>' +
      '<div class="filters"><div class="field"><label for="pFrom">с</label><input class="input" type="date" id="pFrom" value="' + state.period.from + '"></div>' +
      '<div class="field"><label for="pTo">по</label><input class="input" type="date" id="pTo" value="' + state.period.to + '"></div>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-action="print">Печать</button></div></div>' +

      '<div class="two-col">' +
      '<div class="card"><div class="card-head"><h3>1. Операции по типам</h3></div><div class="card-body tight"><table class="table"><thead><tr><th>Тип</th><th class="num">Операций</th><th class="num">Кол-во, шт</th><th class="num">Масса, т</th></tr></thead><tbody>' +
      byType.map(function (r) {
        return "<tr><td>" + tagType(r.t) + '</td><td class="num">' + fmtInt(r.n) + '</td><td class="num">' + fmtInt(r.q) + '</td><td class="num">' + fmtNum(r.m) + "</td></tr>";
      }).join("") + "</tbody></table></div></div>" +

      '<div class="card"><div class="card-head"><h3>2. Приход по территориям</h3></div><div class="card-body"><div class="bars">' +
      byTerr.map(function (r) {
        return '<div class="bar-row"><div>' + esc(r.t) + '</div><div class="bar-track"><div class="bar-fill" style="width:' + Math.max(2, Math.round(r.q / maxTerr * 100)) + '%"></div></div><div class="val">' + fmtInt(r.q) + " шт</div></div>";
      }).join("") + "</div></div></div></div>" +

      '<div class="two-col" style="margin-top:14px">' +
      '<div class="card"><div class="card-head"><h3>3. Поставщики</h3></div><div class="card-body tight"><table class="table"><thead><tr><th>Завод</th><th class="num">Поставок</th><th class="num">Кол-во, шт</th></tr></thead><tbody>' +
      byPlant.map(function (r) { return "<tr><td>" + esc(r.p) + '</td><td class="num">' + fmtInt(r.n) + '</td><td class="num">' + fmtInt(r.q) + "</td></tr>"; }).join("") +
      "</tbody></table></div></div>" +

      '<div class="card"><div class="card-head"><h3>4. Активность сотрудников</h3></div><div class="card-body tight"><table class="table"><thead><tr><th>Сотрудник</th><th class="num">Операций</th></tr></thead><tbody>' +
      (emps.length ? emps.map(function (e) { return "<tr><td>" + esc(e) + '</td><td class="num">' + fmtInt(byEmp[e]) + "</td></tr>"; }).join("") : '<tr><td colspan="2" class="empty">Нет данных</td></tr>') +
      "</tbody></table></div></div></div>" +

      '<div class="card" style="margin-top:14px"><div class="card-head"><h3>5. Номенклатура за период</h3><div class="spacer"></div><span class="chip gray">топ-15</span></div><div class="card-body tight">' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>Типоразмер</th><th class="num">Кол-во, шт</th><th class="num">Масса, т</th></tr></thead><tbody>' +
      (sizes.length ? sizes.map(function (s) {
        var c = catBySize(s), m = c ? bySize[s] * c.mass / 1000 : 0;
        return "<tr><td>" + esc(s) + '</td><td class="num">' + fmtInt(bySize[s]) + '</td><td class="num">' + fmtNum(m) + "</td></tr>";
      }).join("") : '<tr><td colspan="3" class="empty">Нет данных</td></tr>') +
      "</tbody></table></div></div></div>";
  };
  bind.reports = function (host) {
    host.querySelector('[data-action="print"]').addEventListener("click", function () { window.print(); });
    ["pFrom", "pTo"].forEach(function (id) {
      host.querySelector("#" + id).addEventListener("change", function () {
        var f = host.querySelector("#pFrom").value, t = host.querySelector("#pTo").value;
        if (f && t && f > t) { toast("Дата начала позже даты окончания", true); return; }
        state.period.from = f; state.period.to = t; render();
      });
    });
  };

  /* ---------- поиск ---------- */
  views.search = function () {
    var q = state.search.trim().toLowerCase();
    var res = !q ? [] : store.ops.filter(function (o) {
      var hay = [o.date, fmtDate(o.date), o.type, o.size, o.plant, o.emp, o.crane, o.note,
        addrKey(o.ft, o.fr, o.fc), addrKey(o.tt, o.tr, o.tc), String(o.qty)].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    }).sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 100);

    return '<div class="page-head"><div><h2>Поиск по реестру</h2><p>Одно поле для всего: фамилия, завод, типоразмер, адрес, тип операции или примечание.</p></div></div>' +
      '<div class="card"><div class="card-body"><div class="filters">' +
      '<div class="field grow"><label for="sQ">Что искать</label><input class="input" id="sQ" placeholder="например: Т1/С1 или НКТ" value="' + esc(state.search) + '"></div>' +
      "</div></div></div>" +
      '<div class="card" style="margin-top:14px"><div class="card-head"><h3>Результаты</h3><div class="spacer"></div><span class="chip">' + (q ? fmtInt(res.length) + " найдено" : "ожидание запроса") + "</span></div>" +
      '<div class="card-body tight"><div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Операция</th><th>Типоразмер</th><th class="num">Кол-во</th><th>Откуда</th><th>Куда</th><th>Сотрудник</th><th>Примечание</th></tr></thead><tbody>' +
      (!q ? '<tr><td colspan="8" class="empty">Введите запрос — поиск идёт по всем полям сразу.</td></tr>' :
        res.length ? res.map(function (o) {
          return "<tr><td>" + fmtDate(o.date) + "</td><td>" + tagType(o.type) + "</td><td>" + esc(o.size) + '</td><td class="num">' + fmtInt(o.qty) +
            "</td><td>" + esc(addrKey(o.ft, o.fr, o.fc) || "—") + "</td><td>" + esc(addrKey(o.tt, o.tr, o.tc) || "—") +
            "</td><td>" + esc(o.emp || "—") + "</td><td>" + esc(o.note || "") + "</td></tr>";
        }).join("") : '<tr><td colspan="8" class="empty">Ничего не найдено</td></tr>') +
      "</tbody></table></div></div></div>";
  };
  bind.search = function (host) {
    var input = host.querySelector("#sQ"), tmr = null;
    input.addEventListener("input", function () {
      clearTimeout(tmr);
      tmr = setTimeout(function () {
        state.search = input.value; render();
        var el = document.getElementById("sQ");
        el.focus(); el.setSelectionRange(el.value.length, el.value.length);
      }, 200);
    });
    input.focus();
  };

  /* ---------- проверки ---------- */
  views.checks = function () {
    var b = balances();
    var errDate = store.ops.filter(function (o) { return !o.date; }).length;
    var errQty = store.ops.filter(function (o) { return !(o.qty > 0); }).length;
    var errSrc = store.ops.filter(function (o) { return o.type !== "Приход" && !addrKey(o.ft, o.fr, o.fc); }).length;
    var errDst = store.ops.filter(function (o) { return o.type !== "Расход" && !addrKey(o.tt, o.tr, o.tc); }).length;
    var seen = {}, dup = 0;
    store.ops.forEach(function (o) {
      var k = [o.date, o.type, o.size, o.qty].join("|");
      if (seen[k]) dup++; else seen[k] = 1;
    });
    var neg = Object.keys(b).filter(function (k) { return b[k].qty < 0; });
    var inQty = store.ops.filter(function (o) { return o.type === "Приход"; }).reduce(function (s, o) { return s + o.qty; }, 0);
    var outQty = store.ops.filter(function (o) { return o.type === "Расход"; }).reduce(function (s, o) { return s + o.qty; }, 0);
    var tot = stockTotals();
    var diff = Math.round((inQty - outQty - tot.qty) * 1000) / 1000;

    function row(name, value, norm, ok) {
      return '<div class="check-row"><div>' + name + '</div><div class="mono">' + value + '</div><div class="muted">' + norm +
        '</div><div><span class="status ' + (ok ? "ok" : "bad") + '">' + (ok ? "ОК" : "Проверить") + "</span></div></div>";
    }

    return '<div class="page-head"><div><h2>Контроль данных</h2><p>Автоматическая проверка реестра и остатков. Красный статус означает, что данные нужно исправить.</p></div></div>' +
      '<div class="card"><div class="card-head"><h3>Показатели</h3><div class="spacer"></div><span class="chip">' + fmtInt(store.ops.length) + ' операций</span></div><div class="card-body">' +
      row("Операций в реестре", fmtInt(store.ops.length), "справочно", true) +
      row("Строк без даты", fmtInt(errDate), "0", errDate === 0) +
      row("Строк с количеством ≤ 0", fmtInt(errQty), "0", errQty === 0) +
      row("Строк без адреса источника", fmtInt(errSrc), "0", errSrc === 0) +
      row("Строк без адреса приёмки", fmtInt(errDst), "0", errDst === 0) +
      row("Повторных операций", fmtInt(dup), "0", dup === 0) +
      row("Адресов с отрицательным остатком", fmtInt(neg.length), "0", neg.length === 0) +
      row("Приход всего, шт", fmtInt(inQty), "справочно", true) +
      row("Расход всего, шт", fmtInt(outQty), "справочно", true) +
      row("Остаток по складу, шт", fmtInt(tot.qty), "справочно", true) +
      row("Расхождение (приход − расход − остаток)", String(diff), "0", Math.abs(diff) < 0.01) +
      "</div></div>" +
      (neg.length ? '<div class="card" style="margin-top:14px"><div class="card-head"><h3>Отрицательные остатки</h3></div><div class="card-body tight"><table class="table"><thead><tr><th>Адрес</th><th class="num">Остаток</th></tr></thead><tbody>' +
        neg.map(function (k) { return "<tr><td>" + esc(k) + '</td><td class="num">' + fmtInt(b[k].qty) + "</td></tr>"; }).join("") + "</tbody></table></div></div>" : "");
  };

  /* ---------- справочники ---------- */
  views.refs = function () {
    var tabs = [["catalog", "Номенклатура"], ["plants", "Заводы"], ["cranes", "Краны"], ["territories", "Территории"], ["racks", "Стеллажи"], ["cells", "Ячейки"]];
    var body = "";
    if (state.refTab === "catalog") {
      body = '<div class="card-body tight"><div class="table-wrap" style="max-height:520px"><table class="table"><thead><tr><th>Типоразмер</th><th>Тип</th><th class="num">Ø</th><th class="num">Стенка</th><th class="num">Масса 1 м</th><th>ГОСТ</th><th></th></tr></thead><tbody>' +
        store.catalog.map(function (c) {
          return "<tr><td>" + esc(c.size) + "</td><td>" + esc(c.type) + '</td><td class="num">' + c.d + '</td><td class="num">' + c.w + '</td><td class="num">' + fmtNum(c.mass) + "</td><td>" + esc(c.gost) +
            '</td><td class="table-actions"><button class="btn btn-danger btn-sm" type="button" data-delcat="' + esc(c.id) + '">Удалить</button></td></tr>';
        }).join("") + "</tbody></table></div></div>";
    } else {
      var list = store.refs[state.refTab] || [];
      body = '<div class="card-body"><div class="filters" style="margin-bottom:12px"><div class="field grow"><label for="refNew">Добавить значение</label><input class="input" id="refNew" placeholder="Новое значение"></div>' +
        '<button class="btn btn-primary btn-sm" type="button" data-action="add-ref">Добавить</button></div>' +
        '<div class="table-wrap"><table class="table"><thead><tr><th>Значение</th><th></th></tr></thead><tbody>' +
        (list.length ? list.map(function (v, i) {
          return "<tr><td>" + esc(v) + '</td><td class="table-actions"><button class="btn btn-danger btn-sm" type="button" data-refdel="' + i + '">Удалить</button></td></tr>';
        }).join("") : '<tr><td colspan="2" class="empty">Список пуст</td></tr>') +
        "</tbody></table></div></div>";
    }
    return '<div class="page-head"><div><h2>Справочники (НСИ)</h2><p>Номенклатура и списки, на которые опираются выпадающие поля. Правка доступна только руководителю.</p></div></div>' +
      '<div class="card"><div class="card-head"><div class="tabs" style="margin:0">' +
      tabs.map(function (t) { return '<button class="tab' + (state.refTab === t[0] ? " active" : "") + '" type="button" data-reftab="' + t[0] + '">' + t[1] + "</button>"; }).join("") +
      "</div></div>" + body + "</div>";
  };
  bind.refs = function (host) {
    host.querySelectorAll("[data-reftab]").forEach(function (b) {
      b.addEventListener("click", function () { state.refTab = b.getAttribute("data-reftab"); render(); });
    });
    host.querySelectorAll("[data-delcat]").forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-delcat");
        if (!confirm("Удалить типоразмер из справочника? Уже введённые операции сохранятся.")) return;
        store.catalog = store.catalog.filter(function (c) { return c.id !== id; });
        persist(); toast("Типоразмер удалён"); render();
      });
    });
    host.querySelectorAll("[data-refdel]").forEach(function (b) {
      b.addEventListener("click", function () {
        var i = +b.getAttribute("data-refdel");
        if (!confirm("Удалить значение из списка?")) return;
        store.refs[state.refTab].splice(i, 1); persist(); toast("Удалено"); render();
      });
    });
    var add = host.querySelector('[data-action="add-ref"]');
    add && add.addEventListener("click", function () {
      var v = host.querySelector("#refNew").value.trim();
      if (!v) { toast("Введите значение", true); return; }
      if (store.refs[state.refTab].indexOf(v) !== -1) { toast("Такое значение уже есть", true); return; }
      store.refs[state.refTab].push(v); persist(); toast("Добавлено"); render();
    });
  };

  /* ---------- сотрудники ---------- */
  views.staff = function () {
    return '<div class="page-head"><div><h2>Сотрудники и доступ</h2><p>Табельный номер — это пароль для входа. Роль «Руководитель» даёт доступ к НСИ, проверкам и удалению операций.</p></div><div class="spacer"></div>' +
      '<button class="btn btn-primary" type="button" data-action="add-emp">+ Сотрудник</button></div>' +
      '<div class="card"><div class="card-body tight"><div class="table-wrap"><table class="table"><thead><tr><th>ФИО</th><th>Табельный</th><th>Должность</th><th>Роль</th><th>Статус</th><th></th></tr></thead><tbody>' +
      store.employees.map(function (e) {
        return "<tr><td>" + esc(e.fio) + '</td><td class="mono">' + esc(e.tab) + "</td><td>" + esc(e.pos) + "</td><td>" + esc(e.role) +
          '</td><td><span class="tag ' + (e.active === false ? "tag-gray" : "tag-in") + '">' + (e.active === false ? "Отключён" : "Активен") + "</span></td>" +
          '<td class="table-actions"><button class="btn btn-ghost btn-sm" type="button" data-emp="' + e.id + '">Изменить</button>' +
          (e.id === session.id ? "" : '<button class="btn btn-danger btn-sm" type="button" data-empdel="' + e.id + '">Удалить</button>') + "</td></tr>";
      }).join("") + "</tbody></table></div></div></div>";
  };
  bind.staff = function (host) {
    host.querySelector('[data-action="add-emp"]').addEventListener("click", function () { openEmpModal(null); });
    host.querySelectorAll("[data-emp]").forEach(function (b) {
      b.addEventListener("click", function () { openEmpModal(store.employees.filter(function (e) { return e.id === b.getAttribute("data-emp"); })[0]); });
    });
    host.querySelectorAll("[data-empdel]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!confirm("Удалить сотрудника?")) return;
        store.employees = store.employees.filter(function (e) { return e.id !== b.getAttribute("data-empdel"); });
        persist(); toast("Сотрудник удалён"); render();
      });
    });
  };

  /* ---------- инструкция ---------- */
  views.help = function () {
    return '<div class="page-head"><div><h2>Инструкция</h2><p>Короткий регламент работы с системой.</p></div></div>' +
      '<div class="card"><div class="card-body"><dl class="kv">' +
      '<dt>Вход</dt><dd>Выберите своё ФИО и введите табельный номер — он же пароль. Все операции подписываются вами.</dd>' +
      '<dt>Новая операция</dt><dd>Кнопка «+ Операция». Тип операции определяет, какие адреса нужны: приход — только «куда», расход — только «откуда», перемещение — оба.</dd>' +
      '<dt>Труба</dt><dd>Типоразмер выбирается из справочника; диаметр, стенка и масса подставляются автоматически. Масса операции считается по массе 1 метра.</dd>' +
      '<dt>Остатки</dt><dd>Пересчитываются из реестра автоматически. Перемещение внутри склада остаток не меняет.</dd>' +
      '<dt>Схема</dt><dd>Карта ячеек: 10 территорий × 5 стеллажей × 10 ячеек плюс цех. Цвет показывает заполненность.</dd>' +
      '<dt>Проверки</dt><dd>Раздел для руководителя: дубли, пустые адреса, отрицательные остатки и сходимость «приход − расход = остаток».</dd>' +
      '<dt>Резервная копия</dt><dd>Кнопка «Экспорт» сохраняет все данные в JSON. Восстановление — «Импорт». Делайте копию перед сменой.</dd>' +
      '<dt>Печать</dt><dd>Кнопка «Печать» в отчётах; реестр и отчёты подготовлены к альбомной ориентации.</dd>' +
      '<dt>Безопасность</dt><dd>Данные хранятся в браузере на этом компьютере. Для общей работы нескольких кладовщиков нужен сервер — см. README.</dd>' +
      '</dl></div></div>';
  };

  /* ================= модальные окна ================= */
  var modal = document.getElementById("modal");
  function openModal(title, body, foot) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalBody").innerHTML = body;
    document.getElementById("modalFoot").innerHTML = foot;
    modal.classList.remove("hidden");
    var first = modal.querySelector("input,select,textarea");
    first && first.focus();
  }
  function closeModal() { modal.classList.add("hidden"); }
  modal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]") || e.target.classList.contains("modal-backdrop")) closeModal();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  function options(list, val, emptyLabel) {
    return (emptyLabel ? '<option value="">' + emptyLabel + "</option>" : "") + list.map(function (v) {
      return '<option value="' + esc(v) + '"' + (v === val ? " selected" : "") + ">" + esc(v) + "</option>";
    }).join("");
  }

  function openOpModal(op) {
    var isEdit = !!op;
    op = op || { id: "", date: todayISO(), type: "Приход", size: "", plant: "", qty: "", ft: "", fr: "", fc: "", tt: "", tr: "", tc: "", crane: "", emp: session.fio, note: "" };
    var sizeOpts = '<option value="">— выберите типоразмер —</option>' + store.catalog.map(function (c) {
      return '<option value="' + esc(c.size) + '"' + (c.size === op.size ? " selected" : "") + ">" + esc(c.size) + "</option>";
    }).join("");
    var body = '<form id="opForm" class="form-grid" autocomplete="off">' +
      '<div class="field"><label for="fDate">Дата</label><input class="input" type="date" id="fDate" value="' + esc(op.date) + '" required></div>' +
      '<div class="field"><label for="fType">Тип операции</label><select class="input" id="fType">' + options(store.refs.types, op.type) + "</select></div>" +
      '<div class="form-section">Труба</div>' +
      '<div class="field full"><label for="fSize">Типоразмер</label><select class="input" id="fSize" required>' + sizeOpts + "</select></div>" +
      '<div class="field"><label for="fPlant">Завод-изготовитель</label><select class="input" id="fPlant">' + options(store.refs.plants, op.plant, "—") + "</select></div>" +
      '<div class="field"><label for="fQty">Количество, шт</label><input class="input" type="number" id="fQty" min="1" step="1" value="' + esc(op.qty) + '" required></div>' +
      '<div class="field"><label for="fSpec">Параметры (авто)</label><input class="input" id="fSpec" value="" readonly></div>' +
      '<div class="field"><label for="fMass">Масса операции, т</label><input class="input" id="fMass" value="" readonly></div>' +
      '<div class="form-section">Откуда</div>' +
      '<div class="field"><label for="fFT">Территория</label><select class="input" id="fFT">' + options(store.refs.territories, op.ft, "—") + "</select></div>" +
      '<div class="field"><label for="fFR">Стеллаж</label><select class="input" id="fFR">' + options(store.refs.racks, op.fr, "—") + "</select></div>" +
      '<div class="field"><label for="fFC">Ячейка</label><select class="input" id="fFC">' + options(store.refs.cells, op.fc, "—") + "</select></div>" +
      '<div class="form-section">Куда</div>' +
      '<div class="field"><label for="fTT">Территория</label><select class="input" id="fTT">' + options(store.refs.territories, op.tt, "—") + "</select></div>" +
      '<div class="field"><label for="fTR">Стеллаж</label><select class="input" id="fTR">' + options(store.refs.racks, op.tr, "—") + "</select></div>" +
      '<div class="field"><label for="fTC">Ячейка</label><select class="input" id="fTC">' + options(store.refs.cells, op.tc, "—") + "</select></div>" +
      '<div class="field"><label for="fCrane">Кран</label><select class="input" id="fCrane">' + options(store.refs.cranes, op.crane, "—") + "</select></div>" +
      '<div class="field full"><label for="fNote">Примечание</label><input class="input" id="fNote" maxlength="200" value="' + esc(op.note) + '"></div>' +
      '<div id="opError" class="modal-error full hidden" role="alert"></div>' +
      "</form>";
    var foot = '<button class="btn btn-ghost" type="button" data-close="1">Отмена</button>' +
      '<button class="btn btn-primary" type="button" id="saveOp">' + (isEdit ? "Сохранить" : "Добавить операцию") + "</button>";
    openModal(isEdit ? "Изменить операцию" : "Новая операция", body, foot);

    var f = {
      date: document.getElementById("fDate"), type: document.getElementById("fType"), size: document.getElementById("fSize"),
      plant: document.getElementById("fPlant"), qty: document.getElementById("fQty"), spec: document.getElementById("fSpec"),
      mass: document.getElementById("fMass"), ft: document.getElementById("fFT"), fr: document.getElementById("fFR"), fc: document.getElementById("fFC"),
      tt: document.getElementById("fTT"), tr: document.getElementById("fTR"), tc: document.getElementById("fTC"),
      crane: document.getElementById("fCrane"), note: document.getElementById("fNote")
    };
    function syncSpec() {
      var c = catBySize(f.size.value), q = parseInt(f.qty.value, 10) || 0;
      f.spec.value = c ? "Ø" + c.d + " × " + c.w + " мм · " + fmtNum(c.mass) + " кг/м" : "—";
      f.mass.value = c && q ? fmtNum(q * c.mass / 1000) : "—";
    }
    function syncAddr() {
      var t = f.type.value;
      var src = t !== "Приход", dst = t !== "Расход";
      [f.ft, f.fr, f.fc].forEach(function (el) { el.disabled = !src; });
      [f.tt, f.tr, f.tc].forEach(function (el) { el.disabled = !dst; });
      if (!src) { f.ft.value = ""; f.fr.value = ""; f.fc.value = ""; }
      if (!dst) { f.tt.value = ""; f.tr.value = ""; f.tc.value = ""; }
      [f.fr, f.fc].forEach(function (el) { el.disabled = !src || f.ft.value === "Цех"; });
      [f.tr, f.tc].forEach(function (el) { el.disabled = !dst || f.tt.value === "Цех"; });
      if (f.ft.value === "Цех") { f.fr.value = ""; f.fc.value = ""; }
      if (f.tt.value === "Цех") { f.tr.value = ""; f.tc.value = ""; }
    }
    f.size.addEventListener("change", syncSpec);
    f.qty.addEventListener("input", syncSpec);
    f.type.addEventListener("change", syncAddr);
    f.ft.addEventListener("change", syncAddr);
    f.tt.addEventListener("change", syncAddr);
    syncSpec(); syncAddr();

    document.getElementById("saveOp").addEventListener("click", function () {
      var err = document.getElementById("opError");
      var data = {
        id: op.id || uid(), date: f.date.value, type: f.type.value, size: f.size.value,
        plant: f.plant.value, qty: parseInt(f.qty.value, 10) || 0,
        ft: f.ft.value, fr: f.fr.value, fc: f.fc.value,
        tt: f.tt.value, tr: f.tr.value, tc: f.tc.value,
        crane: f.crane.value, emp: op.emp || session.fio, note: f.note.value.trim()
      };
      var errs = validateOp(data);
      if (errs.length) { err.textContent = errs[0]; err.classList.remove("hidden"); return; }
      if (isEdit) {
        store.ops = store.ops.map(function (o) { return o.id === op.id ? data : o; });
      } else {
        data.emp = session.fio;
        store.ops.push(data);
      }
      persist(); closeModal(); toast(isEdit ? "Операция обновлена" : "Операция добавлена");
      state.route = "registry";
      render();
    });
  }

  function validateOp(o) {
    var e = [];
    if (!o.date) e.push("Укажите дату операции.");
    if (store.refs.types.indexOf(o.type) === -1) e.push("Выберите тип операции.");
    if (!o.size) e.push("Выберите типоразмер трубы.");
    if (!(o.qty > 0)) e.push("Количество должно быть целым числом больше нуля.");
    if (o.type !== "Приход" && !addrKey(o.ft, o.fr, o.fc)) e.push("Укажите адрес источника (территория, стеллаж, ячейка).");
    if (o.type !== "Расход" && !addrKey(o.tt, o.tr, o.tc)) e.push("Укажите адрес приёмки (территория, стеллаж, ячейка).");
    if (o.type !== "Приход" && o.type !== "Расход" && addrKey(o.ft, o.fr, o.fc) === addrKey(o.tt, o.tr, o.tc)) e.push("Источник и приёмник совпадают.");
    return e;
  }

  function openEmpModal(emp) {
    var isEdit = !!emp;
    emp = emp || { id: "", fio: "", tab: "", pos: "Кладовщик", role: "Кладовщик", active: true };
    var body = '<form class="form-grid" id="empForm" autocomplete="off">' +
      '<div class="field full"><label for="eFio">ФИО</label><input class="input" id="eFio" value="' + esc(emp.fio) + '" required></div>' +
      '<div class="field"><label for="eTab">Табельный номер</label><input class="input" id="eTab" inputmode="numeric" value="' + esc(emp.tab) + '" required></div>' +
      '<div class="field"><label for="ePos">Должность</label><input class="input" id="ePos" value="' + esc(emp.pos) + '"></div>' +
      '<div class="field"><label for="eRole">Роль</label><select class="input" id="eRole"><option>Кладовщик</option><option' + (emp.role === "Руководитель" ? " selected" : "") + '>Руководитель</option></select></div>' +
      '<div class="field"><label for="eActive">Статус</label><select class="input" id="eActive"><option value="1"' + (emp.active !== false ? " selected" : "") + '>Активен</option><option value="0"' + (emp.active === false ? " selected" : "") + ">Отключён</option></select></div>" +
      '<div id="empError" class="modal-error full hidden"></div></form>';
    var foot = '<button class="btn btn-ghost" type="button" data-close="1">Отмена</button><button class="btn btn-primary" type="button" id="saveEmp">Сохранить</button>';
    openModal(isEdit ? "Изменить сотрудника" : "Новый сотрудник", body, foot);
    document.getElementById("saveEmp").addEventListener("click", function () {
      var fio = document.getElementById("eFio").value.trim();
      var tab = document.getElementById("eTab").value.trim();
      var err = document.getElementById("empError");
      if (!fio || !tab) { err.textContent = "Заполните ФИО и табельный номер."; err.classList.remove("hidden"); return; }
      var clash = store.employees.filter(function (e) { return e.tab === tab && e.id !== emp.id; })[0];
      if (clash) { err.textContent = "Такой табельный номер уже есть у " + clash.fio + "."; err.classList.remove("hidden"); return; }
      var data = {
        id: emp.id || uid(), fio: fio, tab: tab,
        pos: document.getElementById("ePos").value.trim() || "Кладовщик",
        role: document.getElementById("eRole").value,
        active: document.getElementById("eActive").value === "1"
      };
      if (isEdit) store.employees = store.employees.map(function (e) { return e.id === emp.id ? data : e; });
      else store.employees.push(data);
      persist(); closeModal(); toast("Сохранено"); fillLogin(); render();
    });
  }

  /* ================= экспорт / импорт ================= */
  function download(name, text, type) {
    var blob = new Blob([text], { type: type || "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  document.getElementById("exportBtn").addEventListener("click", function () {
    download("uchet-trub-" + todayISO() + ".json", JSON.stringify(store, null, 2));
    toast("Файл выгружен");
  });
  document.getElementById("importBtn").addEventListener("click", function () {
    document.getElementById("importFile").click();
  });
  document.getElementById("importFile").addEventListener("change", function (ev) {
    var file = ev.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var d = JSON.parse(reader.result);
        if (!d || !Array.isArray(d.ops) || !Array.isArray(d.employees) || !Array.isArray(d.catalog)) throw new Error("bad");
        if (!confirm("Заменить текущие данные данными из файла? Это действие необратимо.")) return;
        store = d; persist(); toast("Данные загружены"); enterApp();
      } catch (e) {
        toast("Не удалось прочитать файл: ожидается JSON этой системы", true);
      }
    };
    reader.readAsText(file);
    ev.target.value = "";
  });

  /* ================= события оболочки ================= */
  document.getElementById("quickAdd").addEventListener("click", function () { openOpModal(null); });

  document.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-nav]");
    if (nav) { navigate(nav.getAttribute("data-nav")); return; }
    var edit = e.target.closest("[data-op]");
    if (edit) {
      var op = store.ops.filter(function (o) { return o.id === edit.getAttribute("data-op"); })[0];
      if (op) openOpModal(op);
      return;
    }
    var del = e.target.closest("[data-del]");
    if (del) {
      if (!isAdmin()) { toast("Удалять операции может только руководитель", true); return; }
      if (!confirm("Удалить операцию без возможности отмены?")) return;
      store.ops = store.ops.filter(function (o) { return o.id !== del.getAttribute("data-del"); });
      persist(); toast("Операция удалена"); render();
    }
  });

  /* ================= старт ================= */
  fillLogin();
  if (session) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    enterApp();
  }
})();
