
# NEXORA Finance — Financial Analytics Dashboard

A modern, responsive financial analytics dashboard built with HTML5, CSS3, and vanilla JavaScript. NEXORA Finance transforms financial information into an organized visual experience through interactive charts, transaction activity, spending breakdowns, budget indicators, and account summaries.

![NEXORA Finance Dashboard](https://placehold.co/1200x650/191e2b/ffffff?text=NEXORA+Finance+Dashboard)

## Overview

NEXORA Finance is a front-end dashboard project designed to demonstrate advanced layout engineering, responsive interface design, data visualization, and interactive JavaScript functionality.

The interface uses a modular dashboard layout to present multiple financial information panels while maintaining usability across desktop, tablet, and mobile screens.

**Note:** All financial information is illustrative sample data. This project does not connect to banking services or process real financial transactions.

## Features

### Financial overview
- Total balance summary.
- Income and expense metrics.
- Net savings overview.
- Percentage-based performance indicators.

### Data visualization
- SVG-based income and expense line chart.
- Interactive chart points and tooltips.
- Spending breakdown with a CSS conic-gradient donut chart.
- Visual budget progress indicators.

### Transaction management
- Recent transaction activity.
- Search transactions by name, description, or reference.
- Filter transactions by category.
- Expand the visible transaction list.
- Open a transaction details modal.
- Display transaction dates, categories, amounts, and statuses.

### Dashboard experience
- Responsive multi-panel CSS Grid layout.
- Sidebar navigation.
- Account summary cards.
- Reporting period selector.
- Mobile navigation menu.
- Interactive notifications and action feedback.

### Theme system
- Dark and light mode.
- CSS custom properties for theme colors.
- Theme preference saved with LocalStorage.
- Automatic initial theme based on system preference.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, themes, responsive layouts |
| CSS Grid | Dashboard panel arrangement |
| Flexbox | Component alignment |
| JavaScript ES6+ | Application logic and interactions |
| SVG | Dynamic financial line chart |
| LocalStorage | Persistent theme preference |
| CSS Gradients | Spending visualization |

## Project Structure

```text
nexora-financial-analytics-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Regalson001/nexora-financial-analytics-dashboard.git
```

### 2. Open the project folder

```bash
cd nexora-financial-analytics-dashboard
```

### 3. Open in Visual Studio Code

```bash
code .
```

### 4. Run the application

Open `index.html` in your browser.

For a better development experience, use the VS Code Live Server extension.

## How to Use

1. Open the dashboard in your browser.
2. Review the financial summary cards.
3. Change the reporting period to update the metrics and chart.
4. Hover over chart points to inspect the sample values.
5. Search the transaction list.
6. Filter transactions by category.
7. Select a transaction to view its details.
8. Use the theme control to switch between dark and light mode.
9. Resize the browser to explore the responsive layout.

## Engineering Highlights

### Responsive dashboard architecture

The application uses CSS Grid template areas to organize its panels into a structured dashboard. The layout changes at defined breakpoints to prioritize readability and usability on smaller screens.

### Theme architecture

CSS custom properties define the interface's colors, borders, surfaces, and visual states. Switching the root theme updates the interface without duplicating component styles.

### Data-driven rendering

JavaScript arrays and objects provide the sample financial data. Rendering functions update the transaction table and chart based on the selected reporting period and active filters.

### SVG chart rendering

The cash-flow visualization uses SVG paths generated from JavaScript data arrays. This keeps the chart scalable and avoids requiring a third-party charting library.

### Persistent preferences

LocalStorage saves the selected theme so the interface can restore the user's preference on their next visit.

## Responsive Design

The dashboard is designed to support:

- Large desktop displays.
- Standard laptop screens.
- Tablets.
- Mobile devices.

The sidebar transforms into a collapsible mobile navigation, while dashboard panels stack vertically on smaller screens.

## Future Improvements

Potential enhancements include:

- Connect a secure financial data API.
- Add CSV transaction import and export.
- Introduce date-range filtering.
- Add custom budget creation and editing.
- Implement transaction pagination.
- Add user authentication and account management.
- Integrate a backend and database.
- Add automated financial reports.
- Introduce more detailed chart interactions.

## Limitations

This is a client-side demonstration project. It does not include:

- Real bank account connections.
- Authentication or authorization.
- Live financial market data.
- Payment processing.
- Server-side storage.
- Real transaction creation or editing.

Never enter real banking credentials or sensitive financial information into this demonstration.

## Author

**Stephen Oyugi**

Front-End Developer | AI Automation Engineer | Machine Learning Practitioner

- GitHub: [Regalson001](https://github.com/Regalson001)
- LinkedIn: [Stephen Oyugi](https://linkedin.com/in/stephenoyugi001)
- Email: stephennyarangi03@gmail.com

## License

This project is available under the MIT License. You may use, modify, and distribute it with appropriate attribution.

---

**NEXORA Finance — Designed for clarity. Built for insight.**
