# 📒 PennyTrack — Product Requirements Document (PRD)

> **Version:** 1.0  
> **Status:** Active  
> **Stack:** HTML · CSS · JavaScript (Vanilla)  
> **Last Updated:** June 2026

---

## 1. Project Overview

**PennyTrack** is a simple, modern expense tracking web application built with plain HTML, CSS, and JavaScript. It helps users track their spending, understand where their money goes, and maintain day-to-day spending awareness — with zero complexity.

---

## 2. Problem Statement

Users often leave home with a planned amount of money and later struggle to remember how it was spent. PennyTrack provides a quick and simple way to record, view, and review expenses in real time.

---

## 3. Target User

- Individuals who want a **lightweight expense tracker** without the overhead of accounts, syncing, or complex features.
- Primary user: the project owner and anyone with similar spending-awareness needs.

---

## 4. Goals

| # | Goal |
|---|------|
| 1 | Add expenses quickly |
| 2 | Delete individual expenses |
| 3 | View full expense history |
| 4 | See a live running total |
| 5 | Responsive experience across mobile, tablet, and desktop |

---

## 5. Brand Identity

| Property | Value |
|----------|-------|
| **Name** | PennyTrack |
| **Tagline** | *Know where your money goes.* |
| **Primary Logo** | PennyTrack logo with P and tracking line |
| **Logo (default)** | `assets/images/PennyTrack-logo.svg` |
| **Stucture** | `assets/images/PennyTrack-structure.svg` |

---

## 6. Technology Stack

```
HTML5       — Structure & markup
CSS3        — Styling & layout
JavaScript  — Logic & interactivity (Vanilla, no frameworks)
```

> ❌ No React, no backend, no database, no authentication, no analytics.

---

## 7. Information Architecture

```
App Layout
├── Header
│   ├── Logo
│   ├── App Name (PennyTrack)
│   └── Tagline
├── Total Spending Card
├── Add Expense Card
└── Expense History Card
```

---

## 8. Functional Requirements

| # | Feature | Description |
|---|---------|-------------|
| F1 | **Add Expense** | User can input an expense name and amount |
| F2 | **Delete Expense** | User can remove any individual expense |
| F3 | **Auto Total Calculation** | Running total updates automatically on add/delete |
| F4 | **Currency Formatting** | All amounts displayed in proper currency format |
| F5 | **Date Added** | Each expense records the date it was added |
| F6 | **Input Validation** | Prevents empty or invalid entries |
| F7 | **Empty State Message** | Friendly message shown when no expenses exist |

---

## 9. Design Requirements

| Property | Value |
|----------|-------|
| **Layout** | Dashboard-style card layout |
| **Border Radius** | 12–16px (rounded corners) |
| **Shadows** | Subtle card shadows |
| **Font** | Poppins |
| **Primary Color** | `#16A34A` (Green) |
| **Dark Text** | `#0F172A` |
| **Background** | `#F8FAFC` (Light) |

---

## 10. Project File Structure

```
pennytrack/
├── index.html
├── style.css
├── script.js
└── assets/
    └── images/
        ├── pennytrack-logo.svg
        └── pennytrack-structure.svg
```    

---

## 11. Success Criteria

- [ ] Application works correctly end-to-end
- [ ] Fully responsive across mobile, tablet, and desktop
- [ ] Visually polished and on-brand
- [ ] Code is beginner-friendly and well-organized
- [ ] Satisfies all assessment requirements

---

## 12. Out of Scope

The following are **explicitly excluded** from v1.0:

- User authentication / login
- Backend or database integration
- Data persistence (localStorage optional stretch goal)
- Analytics or reporting
- React or any JS framework

---

*PennyTrack PRD — maintained as the single source of truth for this project.*
