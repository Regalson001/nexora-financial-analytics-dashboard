
"use strict";

/* NEXORA FINANCE
   Front-end financial analytics dashboard.
   All displayed transactions and figures are illustrative demo data.
*/

const transactions = [
  { id: 1, name: "Monthly salary", detail: "Employer payment", category: "income", date: "2026-11-10", amount: 185000, status: "Completed", icon: "↓", reference: "NX-104829" },
  { id: 2, name: "Apartment rent", detail: "Monthly housing", category: "housing", date: "2026-11-09", amount: -35000, status: "Completed", icon: "⌂", reference: "NX-104828" },
  { id: 3, name: "Java House", detail: "Food & dining", category: "food", date: "2026-11-08", amount: -2450, status: "Completed", icon: "☕", reference: "NX-104827" },
  { id: 4, name: "Fuel station", detail: "Transport", category: "transport", date: "2026-11-07", amount: -6500, status: "Completed", icon: "↗", reference: "NX-104826" },
  { id: 5, name: "Freelance project", detail: "Client payment", category: "income", date: "2026-11-06", amount: 42000, status: "Completed", icon: "✦", reference: "NX-104825" },
  { id: 6, name: "Electricity bill", detail: "Utilities", category: "utilities", date: "2026-11-05", amount: -3800, status: "Completed", icon: "ϟ", reference: "NX-104824" },
  { id: 7, name: "Online shopping", detail: "Shopping", category: "shopping", date: "2026-11-04", amount: -8900, status: "Completed", icon: "◇", reference: "NX-104823" },
  { id: 8, name: "Internet subscription", detail: "Utilities", category: "utilities", date: "2026-11-03", amount: -4500, status: "Completed", icon: "⌁", reference: "NX-104822" },
  { id: 9, name: "Consulting payment", detail: "Professional services", category: "income", date: "2026-11-02", amount: 59500, status: "Completed", icon: "↓", reference: "NX-104821" },
  { id: 10, name: "Grocery market", detail: "Food & dining", category: "food", date: "2026-11-01", amount: -7200, status: "Completed", icon: "♨", reference: "NX-104820" }
];

const periodData = {
  month: {
    balance: 842450, income: 286500, expenses: 124850, savings: 161650,
    labels: ["01 Nov", "05 Nov", "10 Nov", "15 Nov", "20 Nov", "25 Nov", "30 Nov"],
    income: [80, 145, 110, 205, 160, 245, 215],
    expenses: [40, 70, 62, 105, 82, 130, 112]
  },
  week: {
    balance: 842450, income: 72400, expenses: 31800, savings: 40600,
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    income: [35, 75, 48, 110, 80, 125, 95],
    expenses: [20, 35, 30, 52, 44, 68, 51]
  },
  year: {
    balance: 842450, income: 2450000, expenses: 1180000, savings: 1270000,
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Oct", "Nov"],
    income: [110, 145, 130, 190, 175, 225, 245],
    expenses: [65, 85, 80, 115, 105, 125, 118]
  }
};

const currency = amount =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(amount);

const compactCurrency = amount =>
  new Intl.NumberFormat("en-KE", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(amount);

const elements = {
  balance: document.getElementById("balanceValue"),
  income: document.getElementById("incomeValue"),
  expenses: document.getElementById("expenseValue"),
  savings: document.getElementById("savingsValue"),
  period: document.getElementById("periodSelect"),
  incomeLine: document.getElementById("incomeLine"),
  expenseLine: document.getElementById("expenseLine"),
  incomeArea: document.getElementById("incomeArea"),
  expenseArea: document.getElementById("expenseArea"),
  chartLabels: document.getElementById("chartLabels"),
  chartPoints: document.getElementById("chartPoints"),
  chartTooltip: document.getElementById("chartTooltip"),
  rows: document.getElementById("transactionRows"),
  search: document.getElementById("transactionSearch"),
  category: document.getElementById("categoryFilter"),
  count: document.getElementById("transactionCount"),
  showMore: document.getElementById("showMore"),
  themeToggle: document.getElementById("themeToggle"),
  sidebar: document.getElementById("sidebar"),
  menuToggle: document.getElementById("menuToggle"),
  modal: document.getElementById("transactionModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalAmount: document.getElementById("modalAmount"),
  modalSymbol: document.getElementById("modalSymbol"),
  modalDetails: document.getElementById("modalDetails"),
  toast: document.getElementById("toast")
};

let visibleTransactionCount = 6;
let toastTimer;

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function updateMetrics(period = "month") {
  const data = periodData[period] || periodData.month;

  elements.balance.textContent = currency(data.balance);
  elements.income.textContent = currency(data.income);
  elements.expenses.textContent = currency(data.expenses);
  elements.savings.textContent = currency(data.savings);
}

function buildLinePath(values) {
  const width = 700;
  const height = 220;
  const max = 300;
  const step = width / (values.length - 1);

  return values.map((value, index) => {
    const x = index * step;
    const y = height - (value / max) * height;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
}

function buildAreaPath(values) {
  const line = buildLinePath(values);
  return `${line} L 700 220 L 0 220 Z`;
}

function drawChart(period = "month") {
  const data = periodData[period] || periodData.month;

  elements.incomeLine.setAttribute("d", buildLinePath(data.income));
  elements.expenseLine.setAttribute("d", buildLinePath(data.expenses));
  elements.incomeArea.setAttribute("d", buildAreaPath(data.income));
  elements.expenseArea.setAttribute("d", buildAreaPath(data.expenses));

  elements.chartLabels.innerHTML = data.labels
    .map(label => `<span>${label}</span>`)
    .join("");

  elements.chartPoints.innerHTML = "";

  data.income.forEach((value, index) => {
    const x = index * (700 / (data.income.length - 1));
    const y = 220 - (value / 300) * 220;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "#20b98b");
    circle.setAttribute("class", "chart-point");
    circle.setAttribute("tabindex", "0");
    circle.setAttribute("aria-label", `${data.labels[index]} income: KSh ${value} thousand`);

    circle.addEventListener("mouseenter", event => {
      showChartTooltip(event, data.labels[index], value, data.expenses[index]);
    });

    circle.addEventListener("focus", () => {
      elements.chartTooltip.innerHTML =
        `<strong>${data.labels[index]}</strong><br>Income: KSh ${value}k<br>Expenses: KSh ${data.expenses[index]}k`;
      elements.chartTooltip.style.display = "block";
      elements.chartTooltip.style.left = `${Math.min(70, (x / 700) * 75)}%`;
      elements.chartTooltip.style.top = `${Math.max(0, (y / 220) * 75)}%`;
    });

    circle.addEventListener("mouseleave", hideChartTooltip);
    circle.addEventListener("blur", hideChartTooltip);
    elements.chartPoints.appendChild(circle);
  });

  data.expenses.forEach((value, index) => {
    const x = index * (700 / (data.expenses.length - 1));
    const y = 220 - (value / 300) * 220;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "4");
    circle.setAttribute("fill", "#8c7cf4");
    circle.setAttribute("class", "chart-point");
    elements.chartPoints.appendChild(circle);
  });
}

function showChartTooltip(event, label, income, expenses) {
  const bounds = document.querySelector(".chart-main").getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;

  elements.chartTooltip.innerHTML =
    `<strong>${label}</strong><br>Income: KSh ${income}k<br>Expenses: KSh ${expenses}k`;
  elements.chartTooltip.style.display = "block";
  elements.chartTooltip.style.left = `${Math.min(x + 10, bounds.width - 125)}px`;
  elements.chartTooltip.style.top = `${Math.max(0, y - 55)}px`;
}

function hideChartTooltip() {
  elements.chartTooltip.style.display = "none";
}

function renderTransactions() {
  const query = elements.search.value.trim().toLowerCase();
  const category = elements.category.value;

  const filtered = transactions.filter(transaction => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(query) ||
      transaction.detail.toLowerCase().includes(query) ||
      transaction.reference.toLowerCase().includes(query);

    const matchesCategory = category === "all" || transaction.category === category;
    return matchesSearch && matchesCategory;
  });

  const visible = filtered.slice(0, visibleTransactionCount);

  elements.rows.innerHTML = "";

  if (visible.length === 0) {
    elements.rows.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;padding:28px;color:var(--muted)">
          No transactions match your search.
        </td>
      </tr>`;
  } else {
    visible.forEach(transaction => {
      const row = document.createElement("tr");
      const date = new Date(`${transaction.date}T12:00:00`);
      const formattedDate = new Intl.DateTimeFormat("en-KE", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(date);

      const isIncome = transaction.amount > 0;
      const formattedAmount = `${isIncome ? "+" : "−"}${currency(Math.abs(transaction.amount))}`;

      row.innerHTML = `
        <td>
          <div class="transaction-name">
            <span class="transaction-symbol">${transaction.icon}</span>
            <span><strong>${transaction.name}</strong><small>${transaction.detail}</small></span>
          </div>
        </td>
        <td><span class="category-pill">${capitalize(transaction.category)}</span></td>
        <td>${formattedDate}</td>
        <td class="${isIncome ? "amount-positive" : "amount-negative"}">${formattedAmount}</td>
        <td><span class="status-pill">${transaction.status}</span></td>`;

      row.addEventListener("click", () => openTransactionDetails(transaction));
      row.setAttribute("tabindex", "0");
      row.setAttribute("aria-label", `View ${transaction.name} transaction details`);
      row.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTransactionDetails(transaction);
        }
      });
      elements.rows.appendChild(row);
    });
  }

  elements.count.textContent = `Showing ${visible.length} of ${filtered.length} transactions`;
  elements.showMore.style.display = filtered.length > visibleTransactionCount ? "inline" : "none";
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function openTransactionDetails(transaction) {
  const isIncome = transaction.amount > 0;
  elements.modalTitle.textContent = transaction.name;
  elements.modalAmount.textContent =
    `${isIncome ? "+" : "−"}${currency(Math.abs(transaction.amount))}`;
  elements.modalAmount.style.color = isIncome ? "var(--green)" : "var(--text)";
  elements.modalSymbol.textContent = transaction.icon;

  const date = new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${transaction.date}T12:00:00`));

  const details = [
    ["Description", transaction.detail],
    ["Category", capitalize(transaction.category)],
    ["Date", date],
    ["Status", transaction.status],
    ["Reference", transaction.reference]
  ];

  elements.modalDetails.innerHTML = details.map(([label, value]) => `
    <div class="modal-detail-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");

  elements.modal.classList.add("open");
  elements.modal.setAttribute("aria-hidden", "false");
  document.getElementById("modalClose").focus();
}

function closeModal() {
  elements.modal.classList.remove("open");
  elements.modal.setAttribute("aria-hidden", "true");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("nexora-theme", theme);
  elements.themeToggle.textContent = theme === "dark" ? "☾" : "☼";
  elements.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("nexora-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  setTheme(savedTheme || preferredTheme);
}

function initializeNavigation() {
  elements.menuToggle.addEventListener("click", () => {
    elements.sidebar.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
      link.classList.add("active");
      elements.sidebar.classList.remove("open");
    });
  });

  document.addEventListener("click", event => {
    const clickedInsideSidebar = elements.sidebar.contains(event.target);
    const clickedMenu = elements.menuToggle.contains(event.target);

    if (
      window.innerWidth <= 850 &&
      !clickedInsideSidebar &&
      !clickedMenu
    ) {
      elements.sidebar.classList.remove("open");
    }
  });
}

function initializeControls() {
  elements.period.addEventListener("change", event => {
    updateMetrics(event.target.value);
    drawChart(event.target.value);
    showToast(`Showing ${event.target.value} analytics.`);
  });

  elements.search.addEventListener("input", () => {
    visibleTransactionCount = 6;
    renderTransactions();
  });

  elements.category.addEventListener("change", () => {
    visibleTransactionCount = 6;
    renderTransactions();
  });

  elements.showMore.addEventListener("click", () => {
    visibleTransactionCount += 4;
    renderTransactions();
  });

  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    showToast(`${capitalize(nextTheme)} mode enabled.`);
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalDone").addEventListener("click", closeModal);

  elements.modal.addEventListener("click", event => {
    if (event.target === elements.modal) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
      elements.sidebar.classList.remove("open");
    }
  });

  document.getElementById("viewCategories").addEventListener("click", () => {
    showToast("The spending breakdown shows your demo category allocation.");
  });

  document.getElementById("manageBudgets").addEventListener("click", () => {
    showToast("Budget management is a visual demo feature.");
  });

  document.getElementById("addAccount").addEventListener("click", () => {
    showToast("Account connection is not enabled in this demo.");
  });

  document.getElementById("notificationButton").addEventListener("click", () => {
    showToast("You're all caught up. No new notifications.");
  });

  document.getElementById("budgetOptions").addEventListener("click", () => {
    showToast("Your monthly budget overview is up to date.");
  });
}

function initializeDashboard() {
  initializeTheme();
  updateMetrics("month");
  drawChart("month");
  renderTransactions();
  initializeNavigation();
  initializeControls();
}

document.addEventListener("DOMContentLoaded", initializeDashboard);
