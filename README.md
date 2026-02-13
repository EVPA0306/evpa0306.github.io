# EPavlenko - Elite Training Web Application

A modern, responsive Angular web application for elite training and coaching services.

## Features

- **Fully Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Bold athletic design with smooth animations and transitions
- **Six Complete Pages**:
  - Home: Hero section, features, stats, and call-to-action
  - Registration: Complete registration form with validation
  - Schedule: Weekly class schedule with filtering
  - Coaches: Team profiles with expertise and certifications
  - Media: Gallery of videos, images, and articles
  - Terms & Conditions: Comprehensive legal documentation

## Technology Stack

- **Framework**: Angular 17 (standalone components)
- **Styling**: SCSS with custom design system
- **Fonts**: Bebas Neue (display) + IBM Plex Sans (body)
- **Icons**: Inline SVG icons
- **Animations**: CSS animations and transitions

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 17+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## Building for Production

### Standard Build

```bash
npm run build:prod
```

This creates production-ready files in the `dist/epavlenko-app` directory.

### Build Configuration

The app is configured to deploy to `https://epavlenko.dev/` with the following settings:

- Base href: `/`
- Output directory: `dist/epavlenko-app`
- Optimized bundles with code splitting
- Minified CSS and JavaScript
- Hash-based cache busting

## Deployment to epavlenko.dev

### Option 1: Standard Web Hosting

1. Build the production version:
   ```bash
   npm run build:prod
   ```

2. Upload contents of `dist/epavlenko-app/` to your web server

3. Configure your web server to:
   - Serve `index.html` for all routes (for Angular routing)
   - Enable gzip compression
   - Set appropriate cache headers

### Option 2: Static Hosting (Netlify, Vercel, etc.)

1. Build the production version:
   ```bash
   npm run build:prod
   ```

2. Deploy the `dist/epavlenko-app` directory

3. Add redirect rules for SPA routing:
   - Netlify: Add `_redirects` file with `/* /index.html 200`
   - Vercel: Add `vercel.json` with rewrites configuration

### Apache .htaccess Configuration

If deploying to Apache, add this `.htaccess` file to your root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Nginx Configuration

For Nginx servers:

```nginx
server {
    listen 80;
    server_name epavlenko.dev www.epavlenko.dev;
    root /var/www/epavlenko.dev;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Angular routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Project Structure

```
epavlenko-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Navigation header
│   │   │   └── footer/          # Site footer
│   │   ├── pages/
│   │   │   ├── home/            # Home page
│   │   │   ├── registration/    # Registration form
│   │   │   ├── schedule/        # Class schedule
│   │   │   ├── coaches/         # Coach profiles
│   │   │   ├── media/           # Media gallery
│   │   │   └── terms/           # Terms & Conditions
│   │   ├── app.component.*      # Root component
│   │   ├── app.config.ts        # App configuration
│   │   └── app.routes.ts        # Route definitions
│   ├── assets/                  # Static assets
│   ├── index.html               # HTML entry point
│   ├── main.ts                  # Application bootstrap
│   └── styles.scss              # Global styles
├── angular.json                 # Angular configuration
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── README.md                    # This file
```

## Design System

### Colors
- Primary: #FF3B3B (red)
- Secondary: #0A0A0A (black)
- Accent: #FFD700 (gold)
- Background: #F8F8F8 / #FFFFFF

### Typography
- Display: Bebas Neue (headings, titles)
- Body: IBM Plex Sans (paragraphs, UI text)

### Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2026 EPavlenko. All rights reserved.

## Contact

For questions or support:
- Email: info@epavlenko.dev
- Website: https://epavlenko.dev
