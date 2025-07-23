# 🛠️ Admin Panel - Complete Management Guide

## 📋 Overview

The **Admin Panel** provides comprehensive management capabilities for the Translink 3D Earbuds project, allowing you to edit content, customize themes, monitor performance, manage 3D assets, and export/import configurations.

---

## 🚀 Quick Access

### Accessing the Admin Panel

1. **Direct URL**: Navigate to `/admin` in your browser
2. **Quick Access Button**: Click the blue star icon in the bottom-right corner
3. **Navigation Menu**: Select "Admin Panel" from the main navigation

### Admin Panel Sections

- **📝 Content Management** - Edit all text content and UI elements
- **🎨 Theme Settings** - Customize colors and visual themes
- **⚡ Performance** - Monitor and configure performance settings
- **🎮 3D Assets** - Manage 3D models and asset replacement
- **💾 Export/Import** - Backup and restore configurations

---

## 📝 Content Management

### Navigation Content
Edit menu items and navigation elements:
- **Menu Items**: Add, remove, or modify navigation links
- **Anchor Points**: Configure scroll positions for each section
- **Labels**: Update text for navigation elements

### Section Content
Manage content for each page section:
- **Hero Section**: Main title, subtitle, and description
- **Crafted Section**: Title and description text
- **Power Section**: Title and description text
- **Connect Section**: Title and description text
- **Specs Section**: Title and description text

### UI Elements
Configure interface text:
- **Loader Text**: Indicator messages and loading text
- **Audio Controls**: Mute/unmute button labels
- **AI Assistant**: Button labels and interaction text

### Editing Content
1. Navigate to **Content Management** section
2. Find the content group you want to edit
3. Modify text in the input fields
4. Changes are saved automatically
5. Click **Save All Changes** to persist modifications

---

## 🎨 Theme Settings

### Preset Themes
Choose from pre-configured themes:
- **Default**: Original blue theme
- **Dark**: Dark mode with purple accents
- **Light**: Light mode with blue accents
- **Neon**: Vibrant purple/pink theme

### UI Colors
Customize interface colors:
- **Background**: Main background color
- **Text**: Primary text color
- **Accent**: Highlight and button colors
- **Menu**: Navigation background and borders
- **Buttons**: Button backgrounds and hover states
- **Forms**: Input field styling

### 3D Scene Colors
Adjust 3D visualization colors:
- **Scene Background**: 3D scene background color
- **Fresnel Color**: Material highlight color
- **Environment Color**: Ambient lighting color
- **Core Color**: Earphone core material
- **Tube Color**: Wireframe tube color
- **Touchpad Colors**: Interactive element colors

### Theme Actions
- **Export Theme**: Download current theme as JSON
- **Import Theme**: Upload and apply a theme file
- **Reset to Default**: Restore original theme settings

---

## ⚡ Performance Settings

### Configuration Options
Adjust performance parameters:
- **Target FPS**: Desired frame rate (default: 60)
- **Mobile FPS**: Frame rate for mobile devices (default: 30)
- **Particle Count**: Number of particles in effects (default: 25000)
- **Wave Resolution**: Quality of wave animations (default: 0.075)

### Performance Monitoring
Real-time performance metrics:
- **Current FPS**: Live frame rate display
- **Memory Usage**: JavaScript heap usage
- **WebGL Status**: Graphics context status

### Optimization Tips
- Lower particle count for better performance on slower devices
- Reduce wave resolution for smoother animations
- Monitor memory usage to prevent crashes
- Adjust target FPS based on device capabilities

---

## 🎮 3D Asset Management

### Current Assets
View information about loaded assets:
- **Main Model**: scene-258.glb (earbuds model)
- **Textures**: 12 texture files for materials
- **Audio**: 7 audio files for interactions

### Model Replacement Guide
To replace the earbuds with a new 3D model:

1. **Prepare Your Model**:
   - Export as .glb format (recommended)
   - Keep polygon count under 50k triangles
   - Use power-of-2 texture dimensions
   - Apply PBR materials (Metallic/Roughness)

2. **File Placement**:
   - Place new model in `/public/assets/models/`
   - Name it descriptively (e.g., `vehicle.glb`)

3. **Code Updates**:
   - Update `src/js/gl/Assets/Assets.js` to load new model
   - Modify scene files to reference new model
   - Update materials and animations as needed

4. **Testing**:
   - Test in all scenes (Main, Specs, FWA)
   - Verify materials apply correctly
   - Check animations work smoothly

### Asset Optimization
- Use Draco compression for smaller file sizes
- Optimize textures with WebP format
- Implement LOD (Level of Detail) for performance
- Test on various devices and browsers

---

## 💾 Export & Import

### Export Options

#### Export Content Data
- Downloads all text content and UI settings
- File format: JSON
- Filename: `content-data.json`

#### Export Current Theme
- Downloads active theme configuration
- Includes all UI and 3D colors
- File format: JSON

#### Export All Settings
- Complete backup of all configurations
- Includes content data and theme settings
- Timestamp and version information
- Filename: `admin-settings-export.json`

### Import Options

#### Import Content Data
- Upload and apply content configuration
- Replaces all text and UI settings
- Requires valid JSON format

#### Import Theme
- Upload and apply theme configuration
- Updates all color settings
- Validates theme structure

#### Import All Settings
- Complete restoration from backup
- Applies both content and theme data
- Overwrites current configuration

### Backup Best Practices
1. **Regular Backups**: Export settings before major changes
2. **Version Control**: Include timestamps in backup filenames
3. **Testing**: Test imported settings in development first
4. **Documentation**: Keep notes about custom configurations

---

## 🔧 Advanced Configuration

### Content Data Structure
```json
{
  "navigation": {
    "menuItems": [
      { "text": "Home", "anchor": 0 },
      { "text": "Crafted", "anchor": 1 }
    ]
  },
  "sections": {
    "hero": {
      "title": "Translink 3D Earbuds",
      "subtitle": "Premium Audio Experience"
    }
  },
  "ui": {
    "loader": {
      "indicatorText": "[ discover specs ]"
    }
  }
}
```

### Theme Data Structure
```json
{
  "name": "Custom Theme",
  "version": "1.0",
  "ui": {
    "background": "#050D15",
    "text": "#ffffff",
    "accent": "#41a5ff"
  },
  "3d": {
    "sceneBackground": "#133153",
    "fresnelColor": "#60b2ff"
  }
}
```

### Custom CSS Variables
The admin panel automatically applies theme colors as CSS variables:
- `--color-background`
- `--color-text`
- `--color-accent`
- `--color-3d-sceneBackground`
- And many more...

---

## 🛡️ Security & Access

### Access Control
- Admin panel is client-side only
- No server authentication required
- All changes stored in localStorage
- Export/import for sharing configurations

### Data Persistence
- **localStorage**: Automatic saving of changes
- **Export Files**: Manual backup and sharing
- **Browser Storage**: Settings persist across sessions
- **Reset Options**: Restore defaults if needed

### Best Practices
1. **Backup Before Changes**: Always export before major modifications
2. **Test Thoroughly**: Verify changes in all browsers and devices
3. **Document Changes**: Keep notes about custom configurations
4. **Version Control**: Use meaningful names for exported files

---

## 🔍 Troubleshooting

### Common Issues

#### Admin Panel Won't Load
- Check browser console for JavaScript errors
- Ensure all dependencies are loaded
- Try refreshing the page
- Clear browser cache if needed

#### Changes Not Saving
- Check localStorage availability
- Verify browser permissions
- Try exporting/importing as backup
- Check for JavaScript errors

#### Theme Not Applying
- Verify theme structure is valid
- Check CSS variable names
- Ensure 3D scene is loaded
- Try resetting to default theme

#### Performance Issues
- Lower particle count in performance settings
- Reduce wave resolution
- Check memory usage in monitoring
- Test on different devices

### Getting Help
1. **Documentation**: Review the 3D Scene Files Guide
2. **Console Logs**: Check browser developer tools
3. **Export Settings**: Backup current configuration
4. **Reset Options**: Use default settings as fallback

---

## 📚 Related Documentation

- **[3D Scene Files Guide](./3D_SCENE_FILES_GUIDE.md)** - Detailed 3D editing instructions
- **[3D Model Replacement Guide](./3D_MODEL_REPLACEMENT_GUIDE.md)** - Complete model replacement workflow
- **[Project Documentation](./PROJECT_DOCUMENTATION.md)** - Overall project architecture

---

## ✅ Quick Reference

### Essential Admin Tasks
- **Edit Content**: Content Management → Modify text fields
- **Change Colors**: Theme Settings → Adjust color pickers
- **Monitor Performance**: Performance → Check real-time stats
- **Backup Settings**: Export/Import → Export All Settings
- **Replace Model**: 3D Assets → Follow replacement guide

### Keyboard Shortcuts
- **Save Changes**: Click "Save All Changes" button
- **Navigate Sections**: Click navigation items on left
- **Close Admin**: Click "Back to Site" button

### File Locations
- **Content Data**: localStorage `admin-content-data`
- **Theme Data**: localStorage `aether-theme`
- **3D Models**: `/public/assets/models/`
- **Textures**: `/public/assets/textures/`
- **Audio**: `/public/assets/audio/`

---

*This admin panel provides complete control over the Translink 3D Earbuds experience. Use it to customize content, themes, and performance settings to match your specific requirements.*