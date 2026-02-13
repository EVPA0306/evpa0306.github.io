# Deployment Guide for epavlenko.dev

## Quick Start Deployment

### Step 1: Build the Application

```bash
cd sport-app
npm install
npm run build:prod
```

This creates optimized production files in `dist/sport-app/`

### Step 2: Upload to Your Web Server

Upload the entire contents of `dist/sport-app/` to your web server's public directory (typically `public_html/`, `www/`, or `htdocs/`).

**Files to upload:**
- index.html
- All files in the root directory
- All subdirectories (assets/, etc.)
- .htaccess (if using Apache)

### Step 3: Configure Server

Ensure your server is configured to:
1. Serve index.html for all routes (required for Angular routing)
2. Enable gzip compression
3. Set proper cache headers

## Server-Specific Instructions

### Apache Hosting

1. Upload `.htaccess` file from the project root
2. Ensure `mod_rewrite` is enabled on your server
3. The `.htaccess` file handles routing, compression, and caching

### Nginx Hosting

Add this configuration to your nginx server block:

```nginx
server {
    listen 80;
    server_name epavlenko.dev www.epavlenko.dev;
    root /var/www/epavlenko.dev;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Angular routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### cPanel Hosting

1. Log into cPanel
2. Use File Manager to navigate to `public_html/`
3. Upload all files from `dist/sport-app/`
4. Ensure `.htaccess` is uploaded and visible
5. Set file permissions: 644 for files, 755 for directories

### FTP Deployment

```bash
# Using FTP client (FileZilla, Cyberduck, etc.)
1. Connect to your server
2. Navigate to public directory
3. Upload contents of dist/sport-app/
4. Preserve file structure
5. Upload .htaccess file
```

## DNS Configuration

Ensure your domain is properly configured:

```
A Record:  epavlenko.dev  →  Your Server IP
CNAME:     www            →  epavlenko.dev
```

## SSL/HTTPS Setup

For secure connections (recommended):

### Using Let's Encrypt (Free)

```bash
# For cPanel: Use "SSL/TLS Status" tool
# For command line:
certbot --nginx -d epavlenko.dev -d www.epavlenko.dev
```

### Force HTTPS (Add to .htaccess)

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works (all menu links)
- [ ] Forms submit properly
- [ ] Images and assets load
- [ ] Mobile responsive design works
- [ ] All routes work (refresh on any page)
- [ ] HTTPS is working (if configured)
- [ ] Favicon appears
- [ ] No console errors

## Testing Your Deployment

Test these URLs:
- https://epavlenko.dev/
- https://epavlenko.dev/registration
- https://epavlenko.dev/schedule
- https://epavlenko.dev/coaches
- https://epavlenko.dev/media
- https://epavlenko.dev/terms

Refresh each page to ensure routing works correctly.

## Troubleshooting

### Issue: 404 errors on page refresh

**Solution**: Ensure `.htaccess` is uploaded and mod_rewrite is enabled

### Issue: Styles not loading

**Solution**: Check file paths, ensure all CSS files were uploaded

### Issue: Blank page

**Solution**: Check browser console for errors, verify all JavaScript files uploaded

### Issue: Mixed content warnings (HTTP/HTTPS)

**Solution**: Ensure all resources load via HTTPS, update any hardcoded HTTP URLs

## Updates and Maintenance

To update the site:

1. Make changes locally
2. Run `npm run build:prod`
3. Upload new files from `dist/sport-app/`
4. Clear browser cache to see changes

## Performance Optimization

The app is pre-optimized with:
- Minified JavaScript and CSS
- Code splitting
- Lazy loading (where applicable)
- Image optimization ready
- Gzip compression enabled

## Support

For deployment issues:
- Check server error logs
- Verify file permissions
- Ensure all dependencies are met
- Contact your hosting provider for server-specific issues

---

**Deployment completed successfully!**

Your Angular app is now live at https://epavlenko.dev/
