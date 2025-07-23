# 🎧 Three.js Model Replacement & Scene Management Guide

## 📋 Overview

This comprehensive guide covers everything needed to replace the current earbuds 3D model with a new model (e.g., vehicle, product, etc.) and update all related aspects including colors, animations, materials, and UI elements.

---

## 🚀 Quick Start Checklist

- [ ] **Prepare New 3D Model** - Export as .glb format
- [ ] **Update Asset Loading** - Modify asset paths and loading
- [ ] **Replace Scene Objects** - Update model references in scenes
- [ ] **Update Materials** - Adjust colors and shader properties
- [ ] **Modify Animations** - Update GSAP timelines and rotations
- [ ] **Update UI Elements** - Change SVG paths and interface elements
- [ ] **Test All Scenes** - Verify main, specs, and FWA scenes
- [ ] **Update Theme Colors** - Adjust theme system colors

---

## 📂 Project Structure for Model Management

```
src/js/gl/
├── 📄 Gl.js                    # Main WebGL controller
├── 📄 Renderer.js              # Rendering pipeline
├── 📁 Assets/
│   └── 📄 Assets.js            # 🎯 MODEL LOADING HERE
├── 📁 World/
│   ├── 📄 World.js             # Scene management
│   └── 📁 Scenes/
│       ├── 📄 SceneMain.js     # 🎯 MAIN MODEL SCENE
│       ├── 📄 SceneSpecs.js    # 🎯 SPECS MODEL SCENE
│       └── 📄 SceneFWA.js      # 🎯 FWA MODEL SCENE
├── 📁 Utils/
│   └── 📄 Materials.js         # 🎯 MATERIAL DEFINITIONS
└── 📁 Shaders/                 # Custom shader effects

src/js/theme/
├── 📄 ThemeStore.js            # 🎯 COLOR DEFINITIONS
└── 📄 ThemeUpdater.js          # 🎯 3D SCENE COLOR UPDATES

public/assets/
├── 📁 models/
│   └── 📄 scene-258.glb        # 🎯 CURRENT MODEL FILE
└── 📁 textures/                # Material textures
```

---

## 🎯 Step 1: Prepare Your New 3D Model

### Model Requirements
- **Format**: `.glb` (preferred) or `.gltf`
- **Polygon Count**: < 50k triangles for optimal performance
- **Textures**: Power-of-2 dimensions (512x512, 1024x1024, 2048x2048)
- **Materials**: PBR materials (Metallic/Roughness workflow)

### Model Preparation Checklist
```bash
# Recommended model specifications:
✅ Format: .glb (binary GLTF)
✅ Size: < 10MB
✅ Textures: Embedded or separate files
✅ Animations: Baked into model (optional)
✅ Naming: Descriptive object names
✅ Scale: Real-world units (meters)
✅ Origin: Centered at (0,0,0)
```

### Blender Export Settings
```
File > Export > glTF 2.0 (.glb/.gltf)
✅ Format: glTF Binary (.glb)
✅ Include: Selected Objects
✅ Transform: +Y Up
✅ Geometry: Apply Modifiers
✅ Materials: Export Materials
✅ Compression: Draco (optional)
```

---

## 🎯 Step 2: Update Asset Loading

### 2.1 Replace Model File

**File**: `public/assets/models/`

```bash
# Remove old model
rm public/assets/models/scene-258.glb

# Add new model (example: vehicle)
cp your-new-model.glb public/assets/models/vehicle.glb
```

### 2.2 Update Asset Loading Code

**File**: `src/js/gl/Assets/Assets.js`

```javascript
// FIND THIS SECTION (around line 180):
this.promises.push(
    this.customModelLoader(`${this.path}/models/scene-258.glb`, (_result) => {
        this.models.scene = _result
    })
)

// REPLACE WITH:
this.promises.push(
    this.customModelLoader(`${this.path}/models/vehicle.glb`, (_result) => {
        this.models.vehicle = _result  // Changed property name
    })
)
```

### 2.3 Update Model References

**File**: `src/js/gl/World/Scenes/SceneMain.js`

```javascript
// FIND (around line 200):
this.caseModel = this.gl.assets.models.scene.scene.getObjectByName('case').clone()

// REPLACE WITH:
this.vehicleModel = this.gl.assets.models.vehicle.scene.getObjectByName('body').clone()
// OR for the entire model:
this.vehicleModel = this.gl.assets.models.vehicle.scene.clone()
```

---

## 🎯 Step 3: Update Scene Objects and Positioning

### 3.1 Main Scene Updates

**File**: `src/js/gl/World/Scenes/SceneMain.js`

#### Replace Model Loading Section:
```javascript
// FIND setModels() method (around line 150):
setModels() {
    // OLD EARBUDS CODE:
    this.caseModel = this.gl.assets.models.scene.scene.getObjectByName('case').clone()
    this.tube = this.gl.assets.models.scene.scene.getObjectByName('tube').clone()
    
    // REPLACE WITH NEW VEHICLE CODE:
    this.vehicleBody = this.gl.assets.models.vehicle.scene.getObjectByName('body').clone()
    this.vehicleWheels = this.gl.assets.models.vehicle.scene.getObjectByName('wheels').clone()
    
    // Update positioning:
    this.vehicleBody.position.set(0, 0, 0)
    this.vehicleBody.rotation.set(0, Math.PI * 0.25, 0)  // 45-degree rotation
    this.vehicleBody.scale.set(1, 1, 1)
    
    // Add to scene:
    this.scene.add(this.vehicleBody)
    this.scene.add(this.vehicleWheels)
}
```

#### Update Camera Positioning:
```javascript
// FIND setCamera() method:
setCamera() {
    this.camera = new THREE.PerspectiveCamera(33, this.gl.sizes.width / this.gl.sizes.height, 0.1, 100)
    
    // OLD EARBUDS POSITION:
    // this.camera.position.set(0, 0, 3.5)
    
    // NEW VEHICLE POSITION (adjust as needed):
    this.camera.position.set(5, 3, 8)  // Further back for larger vehicle
    
    this.cameraTarget = new THREE.Vector3(0, 1, 0)  // Look at vehicle center
}
```

### 3.2 Specs Scene Updates

**File**: `src/js/gl/World/Scenes/SceneSpecs.js`

```javascript
// FIND setModels() method:
setModels() {
    this.parent = new THREE.Object3D()
    this.scene.add(this.parent)

    // OLD EARBUDS CODE:
    // this.idle = this.gl.assets.models.scene.scene.getObjectByName('earphone-l-idle').clone()
    
    // NEW VEHICLE CODE:
    this.vehicle = this.gl.assets.models.vehicle.scene.clone()
    this.vehicle.position.set(0, 0, 0)
    this.vehicle.rotation.set(0, 0, 0)
    this.vehicle.scale.set(0.8, 0.8, 0.8)  // Scale down for specs view
    
    this.parent.add(this.vehicle)
    
    // Update individual parts (if your model has named parts):
    this.vehicleBody = this.vehicle.getObjectByName('body')
    this.vehicleEngine = this.vehicle.getObjectByName('engine')
    this.vehicleWheels = this.vehicle.getObjectByName('wheels')
}
```

### 3.3 FWA Scene Updates

**File**: `src/js/gl/World/Scenes/SceneFWA.js`

```javascript
// FIND setModels() method:
setModels() {
    this.parent = new THREE.Object3D()
    this.scene.add(this.parent)

    // OLD EARBUDS CODE:
    // this.fwa = this.gl.assets.models.scene.scene.getObjectByName('fwa').clone()
    
    // NEW VEHICLE CODE:
    this.showcase = this.gl.assets.models.vehicle.scene.clone()
    this.showcase.rotation.set(Math.PI / 6, Math.PI / 4, 0)  // Dramatic angle
    this.showcase.scale.set(1.2, 1.2, 1.2)  // Slightly larger
    
    this.parent.add(this.showcase)
}
```

---

## 🎯 Step 4: Update Materials and Colors

### 4.1 Create New Materials

**File**: `src/js/gl/Utils/Materials.js`

Add new material functions for your vehicle:

```javascript
// ADD NEW VEHICLE MATERIALS:

export function VehicleBodyMaterial(_params, _uniforms) {
    const gl = new Gl()

    const material = new THREE.MeshStandardMaterial({
        ..._params,
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1.5,
    })

    // Custom uniforms for vehicle
    const uniforms = {
        uBodyColor: new THREE.Uniform(new THREE.Color(0xff4444)),  // Red vehicle
        uMetallic: new THREE.Uniform(0.8),
        uRoughness: new THREE.Uniform(0.2),
    }

    material.uniforms = uniforms
    return material
}

export function VehicleGlassMaterial(_params, _uniforms) {
    const material = new THREE.MeshPhysicalMaterial({
        ..._params,
        transparent: true,
        opacity: 0.3,
        transmission: 0.9,
        thickness: 0.5,
        roughness: 0.1,
        clearcoat: 1.0,
    })

    return material
}

export function VehicleWheelMaterial(_params, _uniforms) {
    const material = new THREE.MeshStandardMaterial({
        ..._params,
        color: 0x222222,  // Dark wheels
        metalness: 0.1,
        roughness: 0.8,
    })

    return material
}
```

### 4.2 Apply Materials to Model

**File**: `src/js/gl/World/Scenes/SceneMain.js`

```javascript
// FIND setMaterials() method:
setMaterials() {
    // Import new materials at top of file:
    // import { VehicleBodyMaterial, VehicleGlassMaterial, VehicleWheelMaterial } from '../../Utils/Materials'
    
    this.bodyMaterial = VehicleBodyMaterial({
        color: 0xff4444,  // Red body
    }, {})

    this.glassMaterial = VehicleGlassMaterial({
        color: 0x88ccff,  // Light blue glass
    }, {})

    this.wheelMaterial = VehicleWheelMaterial({
        color: 0x222222,  // Dark wheels
    }, {})
}

// UPDATE setModels() to apply materials:
setModels() {
    // ... model loading code ...
    
    // Apply materials to vehicle parts:
    if (this.vehicleBody) {
        this.vehicleBody.material = this.bodyMaterial
    }
    
    if (this.vehicleWheels) {
        this.vehicleWheels.material = this.wheelMaterial
    }
    
    // Apply glass material to windows (if they exist):
    const windows = this.vehicleModel.getObjectByName('windows')
    if (windows) {
        windows.material = this.glassMaterial
    }
}
```

---

## 🎯 Step 5: Update Animations

### 5.1 Update Rotation Animations

**File**: `src/js/gl/World/Scenes/SceneMain.js`

```javascript
// FIND setRotationAnimation() method:
setRotationAnimation() {
    this.rotationTimeline = gsap.timeline({
        paused: true,
    })

    // OLD EARBUDS ANIMATION:
    // this.rotationTimeline.fromTo(this.parent.rotation, { y: -Math.PI / 8 }, { y: Math.PI * 3.3 })
    
    // NEW VEHICLE ANIMATION:
    this.rotationTimeline.fromTo(
        this.parent.rotation,
        {
            y: 0,
            x: 0,
            z: 0,
        },
        {
            y: Math.PI * 2,      // Full 360° rotation
            x: Math.PI * 0.1,    // Slight tilt
            z: Math.PI * 0.05,   // Slight roll
            ease: 'none',
            duration: 1,
        }
    )
    
    // Add wheel rotation animation:
    if (this.vehicleWheels) {
        this.rotationTimeline.fromTo(
            this.vehicleWheels.rotation,
            { x: 0 },
            { x: Math.PI * 4, ease: 'none', duration: 1 },
            '<'  // Start at same time
        )
    }
}
```

### 5.2 Update Scroll-Based Animations

**File**: `src/js/gl/World/Scenes/SceneMain.js`

```javascript
// FIND updateScroll() method:
updateScroll(_progress) {
    // Apply rotation based on scroll
    this.rotationTimeline.progress(_progress)
    
    // Add custom vehicle animations:
    
    // Bounce effect for vehicle
    if (this.vehicleBody) {
        this.vehicleBody.position.y = Math.sin(_progress * Math.PI * 2) * 0.1
    }
    
    // Headlight intensity based on scroll
    if (this.headlights) {
        this.headlights.intensity = _progress * 2
    }
    
    // Engine glow effect
    if (this.engineMaterial && this.engineMaterial.uniforms) {
        this.engineMaterial.uniforms.uGlowIntensity.value = _progress
    }
}
```

### 5.3 Add Custom Vehicle Animations

**File**: `src/js/gl/World/Scenes/SceneMain.js`

```javascript
// ADD NEW METHOD for vehicle-specific animations:
setVehicleAnimations() {
    // Engine idle animation
    this.engineIdleTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    
    if (this.vehicleBody) {
        this.engineIdleTimeline.to(this.vehicleBody.position, {
            y: 0.02,
            duration: 2,
            ease: 'sine.inOut'
        })
    }
    
    // Wheel spinning animation
    this.wheelSpinTimeline = gsap.timeline({ repeat: -1 })
    
    if (this.vehicleWheels) {
        this.wheelSpinTimeline.to(this.vehicleWheels.rotation, {
            x: Math.PI * 2,
            duration: 3,
            ease: 'none'
        })
    }
    
    // Headlight blinking
    this.headlightTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 })
    
    if (this.headlightMaterial) {
        this.headlightTimeline
            .to(this.headlightMaterial.uniforms.uIntensity, { value: 2, duration: 0.1 })
            .to(this.headlightMaterial.uniforms.uIntensity, { value: 1, duration: 0.1 })
    }
}

// CALL this method in constructor:
constructor(_params) {
    // ... existing code ...
    this.setVehicleAnimations()
}
```

---

## 🎯 Step 6: Update Theme Colors

### 6.1 Update Theme Definitions

**File**: `src/js/theme/ThemeStore.js`

```javascript
// FIND defaultTheme object:
export const defaultTheme = {
  name: "Default Vehicle Theme",
  version: "1.0",
  ui: {
    // Keep existing UI colors or update:
    background: "#050D15",
    text: "#ffffff",
    brand: "#050D15",
    lightBlue: "#EEF6FF",
    accent: "#ff4444",  // Red accent for vehicle theme
    // ... other UI colors
  },
  "3d": {
    // UPDATE 3D COLORS FOR VEHICLE:
    sceneBackground: "#1a1a2e",     // Darker background
    fresnelColor: "#ff6666",        // Red fresnel for vehicle
    envColor: "#2d2d4a",            // Purple environment
    
    // NEW VEHICLE-SPECIFIC COLORS:
    vehicleBodyColor: "#ff4444",    // Red body
    vehicleGlassColor: "#88ccff",   // Blue glass
    vehicleWheelColor: "#222222",   // Dark wheels
    vehicleHeadlightColor: "#ffff88", // Yellow headlights
    vehicleEngineColor: "#ff8844",  // Orange engine glow
  }
}

// ADD NEW VEHICLE THEME PRESETS:
export const sportCarTheme = {
  name: "Sport Car",
  version: "1.0",
  ui: {
    background: "#000000",
    text: "#ffffff",
    accent: "#ff0000",
    // ... other colors
  },
  "3d": {
    sceneBackground: "#000000",
    vehicleBodyColor: "#ff0000",    // Bright red
    vehicleGlassColor: "#000033",   // Dark blue glass
    vehicleWheelColor: "#333333",   // Dark gray wheels
    vehicleHeadlightColor: "#ffffff", // White headlights
    vehicleEngineColor: "#ff4400",  // Orange engine
  }
}

export const luxuryTheme = {
  name: "Luxury",
  version: "1.0",
  ui: {
    background: "#1a1a1a",
    text: "#f0f0f0",
    accent: "#gold",
    // ... other colors
  },
  "3d": {
    sceneBackground: "#2a2a2a",
    vehicleBodyColor: "#1a1a1a",    // Black body
    vehicleGlassColor: "#444444",   // Dark glass
    vehicleWheelColor: "#ffd700",   // Gold wheels
    vehicleHeadlightColor: "#ffff99", // Warm white
    vehicleEngineColor: "#ff6600",  // Orange engine
  }
}
```

### 6.2 Update Theme Updater

**File**: `src/js/theme/ThemeUpdater.js`

```javascript
// FIND updateMainSceneMaterials() method:
updateMainSceneMaterials() {
    const scene = this.gl.world.scenes.main;
    if (!scene) return;
    
    try {
        console.log('ThemeUpdater: Updating vehicle scene materials');
        
        // UPDATE VEHICLE BODY MATERIAL:
        if (scene.bodyMaterial && scene.bodyMaterial.uniforms) {
            scene.bodyMaterial.uniforms.uBodyColor.value.set(this.colors.vehicleBodyColor);
        }
        
        // UPDATE VEHICLE GLASS MATERIAL:
        if (scene.glassMaterial) {
            scene.glassMaterial.color.set(this.colors.vehicleGlassColor);
        }
        
        // UPDATE VEHICLE WHEEL MATERIAL:
        if (scene.wheelMaterial) {
            scene.wheelMaterial.color.set(this.colors.vehicleWheelColor);
        }
        
        // UPDATE HEADLIGHT MATERIAL:
        if (scene.headlightMaterial && scene.headlightMaterial.uniforms) {
            scene.headlightMaterial.uniforms.uColor.value.set(this.colors.vehicleHeadlightColor);
        }
        
        // UPDATE ENGINE GLOW MATERIAL:
        if (scene.engineMaterial && scene.engineMaterial.uniforms) {
            scene.engineMaterial.uniforms.uGlowColor.value.set(this.colors.vehicleEngineColor);
        }
        
    } catch (error) {
        console.error('ThemeUpdater: Error updating vehicle materials', error);
    }
}
```

---

## 🎯 Step 7: Update UI Elements and SVG Paths

### 7.1 Update Navigation Menu

**File**: `src/js/modules/menu.js`

```javascript
// FIND menu items and update text content:
// Look for navigation links and update them for vehicle context

// Example: Update menu labels
const menuItems = [
    { text: "Home", anchor: 0 },
    { text: "Features", anchor: 1 },      // Instead of "Crafted"
    { text: "Performance", anchor: 2 },   // Instead of "Power"
    { text: "Technology", anchor: 3 },    // Instead of "Connect"
    { text: "Specifications", anchor: 4 }, // Keep specs
]
```

### 7.2 Update SVG Icons and Paths

**File**: Look for SVG elements in HTML or JavaScript

```javascript
// FIND SVG paths in shapes.js or other files:
// Example: Update icon paths for vehicle-related icons

// OLD EARBUDS ICON:
// <path d="earbuds-specific-path"/>

// NEW VEHICLE ICON:
// <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
```

### 7.3 Update Progress Indicators

**File**: `src/js/modules/progress.js`

```javascript
// FIND section titles and update them:
// Look for text content updates in progress indicators

// Example section updates:
const sections = [
    { title: "Introducing the Vehicle", description: "Premium automotive experience" },
    { title: "Advanced Features", description: "Cutting-edge technology" },
    { title: "Performance", description: "Unmatched power and efficiency" },
    { title: "Smart Technology", description: "Connected driving experience" },
    { title: "Specifications", description: "Technical details" },
]
```

---

## 🎯 Step 8: Update Audio and Interactions

### 8.1 Update Audio Context

**File**: `src/js/gl/Audio/Audio.js`

```javascript
// UPDATE audio file references if needed:
// Replace earbuds-specific audio with vehicle sounds

// Example: Engine sound instead of earbuds audio
this.promises.push(
    this.customAudioLoader(`${this.path}/audio/Vehicle_Engine_Loop.mp3`, (_result) => {
        this.audio.engineLoop = _result
    })
)

this.promises.push(
    this.customAudioLoader(`${this.path}/audio/Vehicle_Horn.mp3`, (_result) => {
        this.audio.vehicleHorn = _result
    })
)
```

### 8.2 Update Interaction Sounds

```javascript
// UPDATE UI sound mappings:
playVehicleSound(_sound, _volume) {
    switch(_sound) {
        case 'engineStart':
            this.gl.assets.audio.engineLoop.play()
            break
        case 'horn':
            this.gl.assets.audio.vehicleHorn.play()
            break
        // ... other vehicle sounds
    }
}
```

---

## 🎯 Step 9: Update Particle Effects and Geometry

### 9.1 Update Particle Systems

**File**: `src/js/gl/World/Geometry/Particles.js`

```javascript
// UPDATE particle behavior for vehicle context:
// Example: Exhaust particles instead of earbuds particles

// FIND particle geometry creation:
this.baseGeometry.instance = new THREE.TorusGeometry(5, this.settings.scale, 48, 48)

// REPLACE WITH vehicle-appropriate geometry:
this.baseGeometry.instance = new THREE.SphereGeometry(2, 32, 32)  // Exhaust particles

// UPDATE particle colors:
COLOR_HIGHLIGHT: new THREE.Uniform(new THREE.Color(0x888888)),  // Gray exhaust
```

### 9.2 Update Wave Effects

**File**: `src/js/gl/World/Geometry/Waves.js`

```javascript
// UPDATE wave colors for vehicle theme:
COLOR_BASE: new THREE.Uniform(new THREE.Color(0x1a1a2e)),      // Dark base
COLOR_HIGHLIGHT: new THREE.Uniform(new THREE.Color(0x444466)), // Purple highlight
COLOR_LIGHT: new THREE.Uniform(new THREE.Color(0xff4444)),     // Red accent
```

---

## 🎯 Step 10: Testing and Validation

### 10.1 Test All Scenes

```bash
# Start development server
npm run dev

# Test each scene:
# 1. Main scene (/) - Vehicle showcase
# 2. Specs scene (/specs) - Vehicle specifications
# 3. FWA scene (/fwa) - Vehicle awards/showcase
```

### 10.2 Validation Checklist

```bash
✅ Model loads correctly in all scenes
✅ Materials apply properly
✅ Animations work smoothly
✅ Theme colors update correctly
✅ Audio plays appropriate sounds
✅ UI elements reflect vehicle context
✅ Performance remains optimal (60fps)
✅ Mobile compatibility maintained
✅ All interactions work properly
✅ No console errors
```

---

## 🎯 Step 11: Performance Optimization

### 11.1 Model Optimization

```javascript
// ADD LOD (Level of Detail) for performance:
import { LOD } from 'three'

setLOD() {
    this.lod = new LOD()
    
    // High detail for close view
    this.lod.addLevel(this.vehicleHighDetail, 0)
    
    // Medium detail for medium distance
    this.lod.addLevel(this.vehicleMediumDetail, 50)
    
    // Low detail for far distance
    this.lod.addLevel(this.vehicleLowDetail, 100)
    
    this.scene.add(this.lod)
}
```

### 11.2 Texture Optimization

```javascript
// OPTIMIZE textures for vehicle:
// In Assets.js, add texture compression:

this.promises.push(
    this.customTextureLoader(`${this.path}/textures/vehicle-diffuse.webp`, (_result) => {
        this.textures.vehicle.diffuse = _result
        this.textures.vehicle.diffuse.generateMipmaps = true
        this.textures.vehicle.diffuse.minFilter = THREE.LinearMipmapLinearFilter
    })
)
```

---

## 🔧 Development Workflow

### 1. Model Preparation
```bash
# 1. Export model from 3D software
# 2. Optimize with gltf-pipeline (optional)
npx gltf-pipeline -i input.glb -o output.glb --draco.compressionLevel 7

# 3. Place in assets folder
cp vehicle.glb public/assets/models/
```

### 2. Code Updates
```bash
# 1. Update asset loading
# 2. Update scene files
# 3. Update materials
# 4. Update animations
# 5. Update theme colors
# 6. Test thoroughly
```

### 3. Testing
```bash
# Start dev server
npm run dev

# Test all scenes and interactions
# Check console for errors
# Verify performance with DevTools
```

---

## 🎨 Advanced Customization

### Custom Shaders for Vehicle

**File**: `src/js/gl/Utils/Materials.js`

```javascript
// ADD custom vehicle shader:
export function VehiclePaintMaterial(_params) {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: new THREE.Uniform(0.0),
            uBaseColor: new THREE.Uniform(new THREE.Color(0xff4444)),
            uMetallic: new THREE.Uniform(0.9),
            uRoughness: new THREE.Uniform(0.1),
            tEnvMap: new THREE.Uniform(null),
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            varying vec3 vNormal;
            
            void main() {
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec3 uBaseColor;
            uniform float uMetallic;
            uniform float uRoughness;
            
            varying vec3 vWorldPosition;
            varying vec3 vNormal;
            
            void main() {
                // Car paint with metallic flakes
                vec3 color = uBaseColor;
                
                // Add metallic sparkle effect
                float sparkle = sin(vWorldPosition.x * 100.0) * sin(vWorldPosition.y * 100.0);
                sparkle = smoothstep(0.8, 1.0, sparkle);
                
                color += sparkle * 0.3;
                
                gl_FragColor = vec4(color, 1.0);
            }
        `
    })
    
    return material
}
```

---

## 🚀 Deployment Considerations

### Build Optimization
```bash
# Build for production
npm run build

# Verify asset sizes
ls -la dist/assets/

# Test production build
npm run preview
```

### Asset Optimization
```bash
# Compress textures
# Use WebP format for textures
# Optimize model polygon count
# Use Draco compression for models
```

---

## 🔍 Troubleshooting

### Common Issues

1. **Model Not Loading**
   ```javascript
   // Check browser console for errors
   // Verify file path is correct
   // Ensure model format is supported
   ```

2. **Materials Not Applying**
   ```javascript
   // Check object names in model
   // Verify material references
   // Test with basic materials first
   ```

3. **Performance Issues**
   ```javascript
   // Reduce polygon count
   // Optimize textures
   // Use LOD system
   // Check for memory leaks
   ```

4. **Animation Problems**
   ```javascript
   // Verify object references
   // Check GSAP timeline setup
   // Test with simple animations first
   ```

---

## 📚 Additional Resources

### 3D Model Resources
- [Sketchfab](https://sketchfab.com/) - 3D model marketplace
- [Three.js Examples](https://threejs.org/examples/) - Reference implementations
- [glTF Validator](https://github.khronos.org/glTF-Validator/) - Validate models

### Tools
- **Blender** - Free 3D modeling software
- **gltf-pipeline** - Model optimization
- **Three.js Editor** - Scene testing
- **Chrome DevTools** - Performance profiling

### Documentation
- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

---

## ✅ Final Checklist

Before deploying your updated vehicle model:

- [ ] **Model loads in all scenes** (Main, Specs, FWA)
- [ ] **Materials render correctly** with proper colors
- [ ] **Animations play smoothly** without stuttering
- [ ] **Theme system updates** 3D colors properly
- [ ] **Audio plays** appropriate vehicle sounds
- [ ] **UI elements** reflect vehicle context
- [ ] **Performance is optimal** (60fps on desktop)
- [ ] **Mobile compatibility** maintained
- [ ] **No console errors** in browser
- [ ] **All interactions work** (mouse, touch, scroll)

---

*This guide provides complete coverage for replacing the earbuds model with any new 3D model while maintaining all functionality and visual quality of the application.*