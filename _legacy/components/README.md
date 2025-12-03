# Components Directory

This directory can be used for reusable HTML component partials if you choose to implement a templating system or server-side includes.

For this static implementation, components are defined directly in the HTML files and styled in the CSS files.

## Reusable Components

The following components are used across multiple pages:

1. **Navigation Header** - Defined in each HTML file, styled in `css/navigation.css`
2. **Footer** - Defined in each HTML file, styled in `css/footer.css`
3. **Course Card** - Reusable card component, styled in `css/course-card.css`
4. **Form Elements** - Styled in `css/components.css`

## Future Enhancement

If you want to use component includes, you could:
- Use a static site generator (11ty, Jekyll, Hugo)
- Implement server-side includes (SSI)
- Use JavaScript to load components dynamically
- Use a build tool to compile components
