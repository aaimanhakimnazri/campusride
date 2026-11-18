# CampusRide: Student Ride Booking System

**IMS566 Advanced Web Design Development and Content Management: Individual Project**

CampusRide is a front-end prototype where UiTM Kelantan (Kampus Machang) students book seats on carpools, motorbike rides and the campus shuttle between the five Kolej Kediaman (TAR, TR, THO, DO, TDM), Machang town, Kota Bharu (bus terminal, KB Mall, Kelantan Trade Centre) and Sultan Ismail Petra Airport. It runs entirely in the browser (no database or server) and uses sample data.

## Live demo and repository

- Live site (GitHub Pages): `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
- Repository: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`

## Features

- **Login and register:** simulated authentication with error messages for wrong or missing details.
- **Responsive navigation bar:** the same menu on every page, collapses to a menu button on mobile.
- **Dashboard:** summary cards, a bar chart (seats booked by destination), a doughnut chart (booking status), next ride and recent bookings.
- **Find Rides (dataset 1):** table of available rides with search, type filter, sorting and a booking pop-up.
- **My Bookings (dataset 2):** table of bookings with status filter and cancel option.
- **Drivers (dataset 3):** card grid with vehicle, rating and trip count.
- **Footer and metadata:** every page has a footer, page title, description and author meta tags, and uses semantic sections.
- Bookings are saved in the browser's `localStorage`, so the charts update when you book or cancel.

## Admin access

An admin-only page is available. Log in with:

| Username | Password |
|----------|----------|
| `admin` | `admin123` |

## How to test the login

| Username | Password |
|----------|----------|
| `student` | `ride123` |

- Wrong details show a red error message.
- You can also use the **Register** tab to create an account. It is stored only in your browser.

## Frameworks and libraries

- [Bootstrap 5.3](https://getbootstrap.com/) for layout, components and responsiveness
- [Chart.js 4](https://www.chartjs.org/) for charts
- Google Fonts: Bricolage Grotesque and Source Sans 3
- Vanilla JavaScript (no build step)

## Project structure

```
index.html       Login / register
dashboard.html   Dashboard with charts
rides.html       Available rides + booking
bookings.html    My bookings
drivers.html     Drivers
css/style.css    Custom styles
js/app.js        Shared data, auth, navbar and footer
```

Regular student accounts (created via Register) cannot open the Admin page. They are redirected to the dashboard.

## Run locally

Open `index.html` in Google Chrome. No installation is needed.

## Deploy to GitHub Pages

1. Create a new public repository on GitHub and upload all the files above (keep the folder structure).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute, your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

## Notes

All data is for demonstration only. No real bookings or payments are made.