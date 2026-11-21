# CampusRide: Student Ride Booking System

**IMS566 Advanced Web Design Development and Content Management: Individual Project**

CampusRide is a front-end prototype where UiTM Kelantan (Kampus Machang) students book seats on carpools, motorbike rides and the campus shuttle between the five Kolej Kediaman (TAR, TR, THO, DO, TDM), Machang town, Kota Bharu (bus terminal, KB Mall, Kelantan Trade Centre) and Sultan Ismail Petra Airport. It runs entirely in the browser (no database or server) and uses sample data.

## Live demo and repository

- Live site (GitHub Pages): `https://aaimanhakimnazri.github.io/campusride/`
- Repository: `https://github.com/aaimanhakimnazri/campusride`

## Features

- **Login and register:** simulated authentication with error messages for wrong or missing details.
- **Responsive navigation bar:** the same menu on every page, collapses to a menu button on mobile.
- **Dashboard:** summary cards, a bar chart (seats booked by destination), a doughnut chart (booking status), next ride and recent bookings.
- **Find Rides (dataset 1):** table of available rides with search, type filter, sorting and a booking pop-up.
- **My Bookings (dataset 2):** table of bookings with status filter and cancel option.
- **Drivers (dataset 3):** card grid with vehicle, rating and trip count.
- **Admin page (admin only):** registered students, active bookings, booking value and ride occupancy. Regular users cannot open it.
- **Footer and metadata:** every page has a footer, page title, description and author meta tags, and uses semantic sections.
- Bookings are saved in the browser's `localStorage`, so the charts update when you book or cancel.

## How to test the login

### Student account (create your own)

There is no preset student account. Create one first:

1. Open the live site and click the **Register** tab.
2. Enter your name, a username (4+ letters or numbers) and a password (6+ characters).
3. Click **Create account**, then log in with the same username and password.

Accounts are saved in the browser's localStorage only (no database), so an account made in one browser will not exist in another.

### Admin account

| Username | Password |
|----------|----------|
| `admin` | `admin123` |

After logging in as admin, an **Admin** link appears in the navigation bar. Student accounts cannot open the Admin page. They are redirected to the dashboard.

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
admin.html       Admin panel (admin only)
css/style.css    Custom styles
js/app.js        Shared data, auth, navbar and footer
```

## Run locally

Open `index.html` in Google Chrome. No installation is needed.

## Deploy to GitHub Pages

1. Create a new public repository on GitHub and upload all the files above (keep the folder structure).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute, your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

## Notes

- All data is for demonstration only. No real bookings or payments are made.
- Access control is simulated on the front-end. A real system would check roles on the server and store passwords securely (hashed).
