# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This portfolio features smooth animations, mobile-friendly design, and a clean, professional layout.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean design with smooth animations and transitions
- **Interactive Elements**: Animated statistics, typing effects, and scroll animations
- **Contact Form**: Functional contact form with validation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Seamless navigation between sections
- **Performance Optimized**: Fast loading and smooth animations

## Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Me**: Personal information and statistics
3. **Skills**: Technical skills organized by categories
4. **Projects**: Showcase of featured projects
5. **Experience**: Professional timeline
6. **Contact**: Contact information and form

## Customization Guide

### 1. Personal Information

Edit the following in `index.html`:

- **Name**: Replace "Your Name" with your actual name
- **Title**: Change "Full Stack Developer & Designer" to your title
- **Description**: Update the hero description and about section
- **Contact Info**: Update email, phone, and location in the contact section
- **Social Links**: Add your actual social media links

### 2. Skills Section

Update the skills in `index.html`:

```html
<div class="skill-category">
    <h3>Your Category</h3>
    <div class="skill-items">
        <span class="skill-item">Your Skill</span>
        <!-- Add more skills -->
    </div>
</div>
```

### 3. Projects Section

Replace the placeholder projects with your actual projects:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project image or keep the placeholder -->
    </div>
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="your-demo-link" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="your-github-link" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    </div>
</div>
```

### 4. Experience Section

Update the timeline with your actual experience:

```html
<div class="timeline-item">
    <div class="timeline-date">2022 - Present</div>
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <h4>Company Name</h4>
        <p>Job description</p>
        <ul>
            <li>Achievement 1</li>
            <li>Achievement 2</li>
        </ul>
    </div>
</div>
```

### 5. Colors and Styling

The main color scheme can be changed in `styles.css`:

```css
/* Primary color - used for buttons, links, highlights */
--primary-color: #6366f1;

/* Secondary color - used for accents */
--secondary-color: #fbbf24;

/* Text colors */
--text-primary: #1f2937;
--text-secondary: #6b7280;
```

### 6. Adding Your Photos

Replace the placeholder icons with your actual photos:

1. Add your profile photo to the hero section
2. Add your about section photo
3. Add project screenshots

### 7. Contact Form Setup

The contact form currently shows a success message. To make it functional:

1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form submission handler in `script.js`
3. Or use a service like Formspree, Netlify Forms, or EmailJS

Example with EmailJS:

```javascript
// Add EmailJS script to your HTML
// Then update the form handler:
emailjs.sendForm('your_service_id', 'your_template_id', this)
    .then(() => {
        showNotification('Message sent successfully!', 'success');
    })
    .catch(() => {
        showNotification('Failed to send message.', 'error');
    });
```

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Go to Settings > Pages
4. Select your source branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Create a Netlify account
2. Drag and drop your folder to Netlify
3. Your site will be live instantly

### Vercel
1. Create a Vercel account
2. Import your GitHub repository
3. Deploy with one click

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Tips for Customization

1. **Images**: Use high-quality images and optimize them for web
2. **Content**: Keep descriptions concise and impactful
3. **Links**: Test all links to ensure they work
4. **Mobile**: Always test on mobile devices
5. **Performance**: Optimize images and minimize CSS/JS if needed

## License

This project is free to use and modify for personal and commercial purposes.

## Support

If you need help customizing your portfolio, feel free to:
- Check the code comments for guidance
- Modify the CSS variables for quick color changes
- Use browser developer tools to experiment with styles

---

Happy coding! 🚀