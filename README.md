# Complete Gradle Tutorial Blog Post

A Next.js blog post showcasing the comprehensive Gradle tutorial for Android development, styled to resemble the Rust documentation with a custom ocean and coral color palette.

## 🎨 Design Features

- **Rust Documentation-Inspired Design**: Clean, minimal layout similar to https://doc.rust-lang.org/rust-by-example/generics.html
- **Custom Color Scheme**: 
  - Ocean colors: `#a7f3d0`, `#6ee7b7`, `#34d399`, `#10b981`, `#059669`
  - Coral accents: `#a78bfa`, `#fb7185`, `#fbbf24`, `#f97316`
- **Responsive Sidebar Navigation**: Collapsible sections with smooth navigation
- **Syntax Highlighting**: Code blocks with language-specific styling
- **Professional Typography**: Optimized for readability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the blog post.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css          # Custom styling with color variables
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page
│   └── components/
│       ├── BlogPost.tsx         # Main blog post component
│       ├── Sidebar.tsx          # Navigation sidebar
│       ├── ContentSection.tsx   # Section wrapper
│       └── CodeBlock.tsx        # Code highlighting component
├── content.md                   # Original tutorial content
└── package.json
```

## 🎯 Features

- **Interactive Navigation**: Click sections in sidebar to jump to content
- **Smooth Scrolling**: Automatic section highlighting while scrolling
- **Code Syntax Highlighting**: Gradle, Bash, XML, and other languages
- **Responsive Design**: Works on desktop and mobile devices
- **Clean Typography**: Optimized for technical documentation

## 🔧 Customization

### Color Scheme
The color variables are defined in `src/app/globals.css`:

```css
:root {
  --ocean-200: #a7f3d0;
  --ocean-300: #6ee7b7;
  --ocean-400: #34d399;
  --ocean-500: #10b981;
  --ocean-600: #059669;
  --coral-purple: #a78bfa;
  --coral-rose: #fb7185;
  --coral-amber: #fbbf24;
  --coral-orange: #f97316;
}
```

### Content
The blog content is located in `src/components/BlogPost.tsx`. You can modify the sections array and content to customize the tutorial.

## 📱 Screenshots

![Gradle Tutorial Blog Post](https://github.com/user-attachments/assets/95bcb166-1de3-43aa-90ca-95350c18c452)

The blog post features a clean, documentation-style layout with:
- Left sidebar navigation with hierarchical sections
- Main content area with proper typography and code highlighting
- Custom color scheme throughout the interface

## 🛠️ Built With

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Rust-documentation inspired styling

## 📝 Content

The blog post contains a comprehensive Gradle tutorial covering:

1. **Introduction & Fundamentals**
   - What is Gradle?
   - Gradle vs Other Build Systems
   - Installation and Setup
   - Essential Terminology

2. **Basic Gradle Concepts**
   - Build Scripts and DSL
   - Projects and Tasks
   - Dependencies and Repositories

3. **Android-Specific Configuration**
   - Android Gradle Plugin
   - Build Types and Product Flavors

4. **Intermediate Topics**
   - Multi-Module Projects
   - Custom Tasks and Plugins

5. **Advanced Topics**
   - Custom Plugin Development
   - Advanced Scripting Techniques

## 🎨 Design Inspiration

The design is inspired by the Rust documentation style, featuring:
- Clean, minimal interface
- Hierarchical navigation
- Excellent typography
- Professional color scheme
- Code-focused presentation

---

*A modern, responsive blog post showcasing technical documentation with style.*
