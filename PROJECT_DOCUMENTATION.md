# 🎧 Translink 3D Earbuds - Project Documentation

## 📋 Project Overview

**Translink 3D Earbuds** is a sophisticated web application showcasing premium earbuds through an immersive 3D experience. Built by **OFF+BRAND**, this project combines cutting-edge WebGL technology with elegant UI design to create a premium product showcase.

### 🎯 Key Features

- **Interactive 3D Product Showcase** - Real-time 3D earbuds visualization with WebGL
- **AI-Powered Assistant** - Intelligent product guidance system
- **Fluid Cursor Effects** - Advanced shader-based mouse interactions
- **Dynamic Theme System** - Customizable UI and 3D scene themes
- **Responsive Design** - Optimized for desktop and mobile devices
- **Audio Integration** - Spatial audio effects and UI sounds
- **Smooth Animations** - GSAP-powered transitions and micro-interactions

---

## 🛠 Tech Stack

### Core Technologies
- **Vite** - Fast build tool and development server
- **Vanilla JavaScript** - No frameworks, lightweight and flexible
- **Three.js** - WebGL-based 3D graphics and rendering
- **GSAP** - Professional-grade animations and transitions
- **Lenis** - Smooth scrolling library

### 3D & Graphics
- **WebGL 2.0** - Hardware-accelerated 3D rendering
- **Custom Shaders** - GLSL vertex and fragment shaders
- **Post-processing** - Advanced visual effects pipeline
- **Fluid Simulation** - Real-time cursor interaction effects

### Audio & Interaction
- **Web Audio API** - Spatial audio and frequency analysis
- **Custom Cursor System** - Advanced mouse tracking and effects
- **Touch Support** - Mobile-optimized interactions

---

## 📂 Project Structure

```
translink-3d-app/
├── 📁 public/                          # Static assets
│   └── 📁 assets/
│       ├── 📁 audio/                   # Sound effects and music
│       ├── 📁 fonts/                   # Web fonts (Azeretmono, Manrope)
│       ├── 📁 images/                  # Static images and textures
│       ├── 📁 models/                  # 3D models (.glb files)
│       └── 📁 textures/                # Material textures and maps
│
├── 📁 src/
│   └── 📁 js/                          # Main JavaScript source
│       ├── 📄 app.js                   # Application entry point
│       ├── 📄 dom.ts                   # DOM module management
│       ├── 📄 pages.ts                 # Page routing with Taxi.js
│       ├── 📄 scroll.ts                # Smooth scrolling with Lenis
│       ├── 📄 gsap.ts                  # GSAP configuration and easing
│       │
│       ├── 📁 gl/                      # WebGL & Three.js core
│       │   ├── 📄 Gl.js                # Main WebGL controller
│       │   ├── 📄 Renderer.js          # Rendering pipeline
│       │   │
│       │   ├── 📁 Assets/              # 3D asset management
│       │   │   └── 📄 Assets.js        # Model, texture, audio loading
│       │   │
│       │   ├── 📁 Audio/               # Audio system
│       │   │   └── 📄 Audio.js         # 3D audio and frequency analysis
│       │   │
│       │   ├── 📁 Shaders/             # Custom shader effects
│       │   │   └── 📁 FluidCursor/     # Fluid cursor interaction
│       │   │
│       │   ├── 📁 Utils/               # WebGL utilities
│       │   │   ├── 📄 Materials.js     # Custom material definitions
│       │   │   ├── 📄 Mouse.js         # Mouse interaction tracking
│       │   │   ├── 📄 Debug.js         # Development tools
│       │   │   └── 📄 ShaderChunks.js  # Reusable shader code
│       │   │
│       │   └── 📁 World/               # 3D scene management
│       │       ├── 📄 World.js         # Scene controller
│       │       ├── 📁 Scenes/          # Individual 3D scenes
│       │       │   ├── 📄 SceneMain.js # Main product showcase
│       │       │   ├── 📄 SceneSpecs.js# Specifications view
│       │       │   └── 📄 SceneFWA.js  # Special showcase scene
│       │       └── 📁 Geometry/        # Procedural geometry
│       │           ├── 📄 Waves.js     # Wave animations
│       │           ├── 📄 Particles.js # Particle systems
│       │           └── 📄 Circles.js   # Circular effects
│       │
│       ├── 📁 modules/                 # UI modules and components
│       │   ├── 📄 menu.js              # Navigation menu
│       │   ├── 📄 Cursor.js            # Custom cursor system
│       │   ├── 📄 loader.js            # Loading animations
│       │   ├── 📄 AudioToggler.js      # Audio controls
│       │   ├── 📄 Translink.js         # AI assistant interface
│       │   ├── 📄 Modal.js             # Modal dialogs
│       │   ├── 📄 ScrollController.js  # Scroll behavior
│       │   ├── 📄 progress.js          # Progress indicators
│       │   ├── 📄 shapes.js            # SVG animations
│       │   ├── 📄 text.js              # Text animations
│       │   └── 📁 _/                   # Module utilities
│       │       ├── 📄 observe.ts       # Intersection Observer
│       │       ├── 📄 track.ts         # Scroll tracking
│       │       └── 📄 create.ts        # Module factory
│       │
│       ├── 📁 theme/                   # Theme system
│       │   ├── 📄 index.js             # Theme system exports
│       │   ├── 📄 ThemeStore.js        # Theme state management
│       │   ├── 📄 ThemeUpdater.js      # 3D scene theme updates
│       │   ├── 📄 ColorPicker.js       # Color picker component
│       │   ├── 📄 SettingsPage.js      # Theme settings interface
│       │   └── 📄 createThemeStore.js  # Theme store factory
│       │
│       ├── 📁 utils/                   # Utility functions
│       │   ├── 📄 subscribable.ts      # Event subscription system
│       │   ├── 📄 math.ts              # Mathematical utilities
│       │   ├── 📄 media.ts             # Media queries and device detection
│       │   ├── 📄 client-rect.ts       # DOM measurement utilities
│       │   ├── 📄 transform.js         # CSS transform helpers
│       │   ├── 📄 environment.js       # Environment detection
│       │   └── 📄 hey.ts               # State management and events
│       │
│       └── 📁 transitions/             # Page transitions
│           └── 📄 default.js           # Default transition effects
│
├── 📄 package.json                     # Dependencies and scripts
├── 📄 vite.config.js                   # Vite configuration
├── 📄 tsconfig.json                    # TypeScript configuration
├── 📄 postcss.config.js                # PostCSS configuration
└── 📄 3D_SCENE_FILES_GUIDE.md         # 3D scene editing guide
```

---

## 🎮 3D Scene Architecture

### Scene Management
The application uses a sophisticated multi-scene architecture:

- **SceneMain** - Primary earbuds showcase with interactive materials
- **SceneSpecs** - Single earphone focus for specifications
- **SceneFWA** - Special showcase scene for awards/recognition

### Material System
Custom materials with advanced shader effects:
- **EarphoneGlassMaterial** - Transparent glass with fresnel effects
- **EarphoneBaseMaterial** - Metallic base with volume controls
- **CoreMaterial** - Animated core with noise textures
- **TouchPadMaterial** - Interactive touchpad visualization
- **TubeMaterial** - Wireframe tube geometry

### Geometry Effects
- **Waves** - Fluid wave animations with audio reactivity
- **Particles** - GPU-computed particle systems
- **Circles** - Animated circular geometry
- **FluidCursor** - Real-time fluid simulation for cursor effects

---

## 🎨 Theme System

### Architecture
- **ThemeStore** - Centralized theme state management
- **ThemeUpdater** - Applies themes to 3D scenes and materials
- **SettingsPage** - User interface for theme customization
- **ColorPicker** - Reusable color selection component

### Theme Structure
```javascript
{
  name: "Theme Name",
  version: "1.0",
  ui: {
    background: "#050D15",
    text: "#ffffff",
    accent: "#41a5ff",
    // ... more UI colors
  },
  "3d": {
    sceneBackground: "#133153",
    fresnelColor: "#60b2ff",
    envColor: "#182d3d",
    // ... more 3D colors
  }
}
```

---

## 🔧 Module System

### Module Architecture
The project uses a sophisticated module system with automatic instantiation:

```javascript
// Modules are automatically created from DOM elements
<div data-module="Cursor"></div>
<nav data-module="menu"></nav>
<div data-module="AudioToggler"></div>
```

### Core Modules
- **Cursor** - Custom cursor with fluid animations
- **Menu** - Navigation with smooth transitions
- **AudioToggler** - Audio controls with waveform visualization
- **Loader** - Loading animations with progress tracking
- **ScrollController** - Advanced scroll behavior management
- **Translink** - AI assistant interface

---

## 🎵 Audio System

### Features
- **Spatial Audio** - 3D positioned audio sources
- **Frequency Analysis** - Real-time audio visualization
- **UI Sound Effects** - Interactive audio feedback
- **Volume Control** - Global and individual audio management

### Audio Assets
- Background loops (synth, power)
- UI interaction sounds
- Menu open/close effects
- Question send/reply sounds

---

## 📱 Responsive Design

### Breakpoints
- **Desktop** - Full 3D experience with mouse interactions
- **Tablet** - Optimized touch interactions
- **Mobile** - Simplified UI with touch-friendly controls

### Adaptive Features
- Touch-optimized cursor system
- Simplified navigation for mobile
- Responsive 3D scene scaling
- Mobile-specific audio handling

---

## 🚀 Performance Optimizations

### 3D Rendering
- **LOD System** - Level of detail for different distances
- **Frustum Culling** - Only render visible objects
- **Texture Optimization** - Compressed textures and mipmaps
- **Shader Optimization** - Efficient GLSL code

### Loading Strategy
- **Progressive Loading** - Assets loaded in priority order
- **Texture Streaming** - Textures loaded as needed
- **Model Optimization** - Compressed GLTF models with Draco

### Memory Management
- **Object Pooling** - Reuse of 3D objects
- **Garbage Collection** - Proper cleanup of resources
- **Event Cleanup** - Removal of event listeners on destroy

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- pnpm 8+ (preferred package manager)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd translink-3d-app

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Development Scripts
```json
{
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview",
  "type-check": "tsc --noEmit"
}
```

---

## 🎯 Key Features Deep Dive

### 1. Interactive 3D Product Showcase
- Real-time 3D earbuds with physically-based materials
- Mouse-driven camera controls and interactions
- Smooth transitions between different product views
- Audio-reactive particle effects and visualizations

### 2. AI-Powered Assistant (Translink)
- Intelligent product guidance system
- Natural language processing for user queries
- Dynamic response generation with media
- Persistent conversation history with IndexedDB

### 3. Advanced Shader Effects
- Custom GLSL shaders for realistic materials
- Fluid cursor simulation with real-time physics
- Fresnel effects for glass and metallic surfaces
- Noise-based animations and distortions

### 4. Theme Customization
- Real-time theme switching for UI and 3D scenes
- Color picker interface for custom themes
- Theme import/export functionality
- Persistent theme storage in localStorage

### 5. Smooth Animations
- GSAP-powered micro-interactions
- Custom easing functions for premium feel
- Scroll-triggered animations
- Loading sequences with progress tracking

---

## 🔍 Code Architecture Patterns

### 1. Singleton Pattern
Used for core systems that need global access:
```javascript
// GL instance, ScrollController, Menu
class Gl {
  static instance = null;
  constructor() {
    if (instance) return instance;
    instance = this;
  }
}
```

### 2. Observer Pattern
For event-driven interactions:
```javascript
// Intersection Observer for scroll effects
class Observe {
  constructor(element, config) {
    this.element = element;
    this.start();
  }
}
```

### 3. Module Factory Pattern
For automatic module instantiation:
```javascript
// Auto-creates modules from DOM data attributes
export function createModules() {
  return Array.from(document.querySelectorAll('[data-module]'))
    .map(element => new ModuleClass(element));
}
```

### 4. State Management
Centralized state with reactive updates:
```javascript
// Theme store with subscription system
const themeStore = createThemeStore(defaultTheme, presets);
themeStore.subscribe(theme => updateScene(theme));
```

---

## 🎨 Visual Design System

### Typography
- **Azeretmono** - Monospace font for technical elements
- **Manrope** - Sans-serif for body text and UI

### Color Palette
- **Primary** - Deep blue (#050D15)
- **Accent** - Bright blue (#41a5ff)
- **Text** - White (#ffffff)
- **Surfaces** - Various blue tones for depth

### Animation Principles
- **Easing** - Custom cubic-bezier curves for premium feel
- **Duration** - Consistent timing (0.3s, 0.8s, 1.2s)
- **Stagger** - Sequential animations for visual hierarchy
- **Physics** - Realistic motion with proper acceleration

---

## 🔧 Configuration Files

### Vite Configuration
- **Aliases** - Path mapping for clean imports
- **Asset Handling** - Support for 3D models and audio
- **Build Optimization** - Code splitting and compression
- **Development Server** - Hot reload and proxy setup

### TypeScript Configuration
- **Modern Target** - ES2022 for latest features
- **Strict Mode** - Enhanced type checking
- **Path Mapping** - Consistent with Vite aliases
- **Module Resolution** - Bundler-style resolution

---

## 📊 Performance Metrics

### Target Performance
- **First Contentful Paint** - < 1.5s
- **Largest Contentful Paint** - < 2.5s
- **Time to Interactive** - < 3.5s
- **Frame Rate** - 60 FPS on desktop, 30 FPS on mobile

### Optimization Strategies
- **Code Splitting** - Separate chunks for different features
- **Asset Optimization** - Compressed textures and models
- **Lazy Loading** - Load assets as needed
- **Caching** - Aggressive caching for static assets

---

## 🚀 Deployment

### Build Process
1. **Type Checking** - Validate TypeScript code
2. **Asset Processing** - Optimize images, models, audio
3. **Code Bundling** - Create optimized JavaScript bundles
4. **Static Generation** - Generate static HTML files

### Production Optimizations
- **Tree Shaking** - Remove unused code
- **Minification** - Compress JavaScript and CSS
- **Gzip Compression** - Reduce transfer sizes
- **CDN Integration** - Fast global asset delivery

---

## 🔮 Future Enhancements

### Planned Features
- **WebXR Support** - VR/AR product visualization
- **Advanced Physics** - Realistic product interactions
- **Social Sharing** - Share custom configurations
- **Analytics Integration** - User behavior tracking

### Technical Improvements
- **WebAssembly** - Performance-critical computations
- **Service Workers** - Offline functionality
- **Progressive Enhancement** - Graceful degradation
- **Accessibility** - Enhanced screen reader support

---

## 📚 Resources & References

### Documentation
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### Learning Resources
- [3D Scene Files Guide](./3D_SCENE_FILES_GUIDE.md)
- [Shader Programming](https://thebookofshaders.com/)
- [WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)

---

## 👥 Credits

**Built by OFF+BRAND**
- Advanced 3D web development
- Premium user experience design
- Performance optimization
- Cross-platform compatibility

---

*This documentation covers the complete architecture and implementation of the Translink 3D Earbuds web application. For specific implementation details, refer to the individual source files and the 3D Scene Files Guide.*