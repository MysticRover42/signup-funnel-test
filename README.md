# Sign-Up Funnel Dashboard

An interactive dashboard to track sign-up funnel metrics with filters and visualizations.

## Setup Instructions for CodeSandbox

### Option 1: Import from GitHub (Recommended)
1. Go to [CodeSandbox](https://codesandbox.io)
2. Click "Import from GitHub"
3. Upload these files to a GitHub repo and import

### Option 2: Manual Setup
1. Go to [CodeSandbox](https://codesandbox.io)
2. Create a new React sandbox (not React + Vite, use the regular React template)
3. Upload or copy these files:
   - `package.json` - Dependencies
   - `index.html` - HTML template (in `public` folder)
   - `index.js` - Entry point (in `src` folder)
   - `index.css` - Styles (in `src` folder)
   - `SignUpFunnelDashboard.jsx` - Dashboard component (in `src` folder)

### Option 3: Use Vite Template
If using a Vite template:

1. Create a new Vite React sandbox
2. Install dependencies:
   ```bash
   npm install recharts lucide-react
   ```
3. Add Tailwind CSS via CDN in `index.html`:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```
4. Copy the `SignUpFunnelDashboard.jsx` file
5. Import and use in `App.jsx`

## Files Structure

```
/
├── package.json                    # Dependencies
├── public/
│   └── index.html                 # HTML template
└── src/
    ├── index.js                   # Entry point
    ├── index.css                  # Styles
    └── SignUpFunnelDashboard.jsx  # Main component
```

## Key Dependencies

- **React 18**: UI framework
- **Recharts**: Chart library for visualizations
- **Lucide React**: Icon library
- **Tailwind CSS**: Styling (via CDN)

## Customization

Replace the `rawMetrics` object in `SignUpFunnelDashboard.jsx` with your actual API data to see real metrics.

## Features

- Date range filtering
- Marketplace filtering (US, UK, UAE, Saudi Arabia, Egypt)
- Detailed funnel breakdown table
- Social media verification tracking
- Responsive design
