import { ColorPicker } from '../theme/ColorPicker';
import themeStore from '../theme/ThemeStore';
import ThemeUpdater from '../theme/ThemeUpdater';

/**
 * AdminPage - Comprehensive admin interface for content and settings management
 */
export class AdminPage {
  constructor(container) {
    console.log('AdminPage constructor called with container:', container);
    
    if (!container) {
      console.error('AdminPage: Container element is missing');
      return;
    }
    
    // Add admin-active class to body
    document.body.classList.add('admin-active');
    
    this.container = container;
    this.contentData = this.loadContentData();
    
    try {
      this.currentTheme = themeStore.getCurrentTheme();
      this.availableThemes = themeStore.getAvailableThemes();
      
      this.colorPickers = {
        ui: {},
        '3d': {}
      };
      
      this.render();
      this.bindEvents();
      
      console.log('AdminPage initialized successfully');
    } catch (error) {
      console.error('Error initializing AdminPage:', error);
      this.renderError(error);
    }
  }
  
  /**
   * Load content data from various sources
   */
  loadContentData() {
    // Load from localStorage if available, otherwise use defaults
    const savedData = localStorage.getItem('admin-content-data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved content data:', error);
      }
    }
    
    return {
      navigation: {
        menuItems: [
          { text: "Home", anchor: 0 },
          { text: "Crafted", anchor: 1 },
          { text: "Power", anchor: 2 },
          { text: "Connect", anchor: 3 },
          { text: "Specs", anchor: 4 }
        ]
      },
      sections: {
        hero: {
          title: "Translink 3D Earbuds",
          subtitle: "Premium Audio Experience",
          description: "Discover the future of wireless audio with cutting-edge 3D visualization"
        },
        crafted: {
          title: "Crafted",
          description: "Precision engineering meets elegant design in every detail"
        },
        power: {
          title: "Power",
          description: "Unmatched battery life and performance for all-day listening"
        },
        connect: {
          title: "Connect",
          description: "Seamless connectivity across all your devices"
        },
        specs: {
          title: "Specifications",
          description: "Technical excellence in every detail"
        }
      },
      ui: {
        loader: {
          indicatorText: "[ discover specs ]",
          mobileIndicatorText: "[ specs ]"
        },
        audio: {
          muteLabel: "Play audio",
          unmuteLabel: "Mute audio"
        },
        ai: {
          initialLabel: "Ask Translink",
          expandedLabel: "How can I guide you?",
          thinkingLabel: "Thinking...",
          responseLabel: "Another question?"
        }
      },
      performance: {
        targetFPS: 60,
        mobileFPS: 30,
        particleCount: 25000,
        waveResolution: 0.075
      },
      assets: {
        currentModel: "scene-258.glb",
        textureCount: 12,
        audioCount: 7
      }
    };
  }
  
  /**
   * Save content data
   */
  saveContentData() {
    try {
      localStorage.setItem('admin-content-data', JSON.stringify(this.contentData));
      this.showNotification('Content saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving content data:', error);
      this.showNotification('Error saving content data', 'error');
    }
  }
  
  /**
   * Render the admin page
   */
  render() {
    console.log('Rendering admin page...');
    this.container.innerHTML = '';
    
    // Create page structure
    this.element = document.createElement('div');
    this.element.className = 'admin-page';
    
    // Create navigation
    this.createNavigation();
    
    // Create header
    this.createHeader();
    
    // Create main content area
    this.createMainContent();
    
    // Add to container
    this.container.appendChild(this.element);
    
    // Add styles
    this.addStyles();
    
    console.log('Admin page rendered');
  }
  
  /**
   * Create navigation sidebar
   */
  createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'admin-nav';
    
    const navItems = [
      { id: 'content', label: 'Content Management', icon: '📝' },
      { id: 'themes', label: 'Theme Settings', icon: '🎨' },
      { id: 'performance', label: 'Performance', icon: '⚡' },
      { id: 'assets', label: '3D Assets', icon: '🎮' },
      { id: 'export', label: 'Export/Import', icon: '💾' }
    ];
    
    navItems.forEach(item => {
      const navItem = document.createElement('button');
      navItem.className = 'admin-nav__item';
      navItem.dataset.section = item.id;
      navItem.innerHTML = `
        <span class="admin-nav__icon">${item.icon}</span>
        <span class="admin-nav__label">${item.label}</span>
      `;
      nav.appendChild(navItem);
    });
    
    this.element.appendChild(nav);
  }
  
  /**
   * Create header with back button and title
   */
  createHeader() {
    const header = document.createElement('div');
    header.className = 'admin-header';
    
    const backButton = document.createElement('button');
    backButton.className = 'admin-back-button';
    backButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      Back to Site
    `;
    
    backButton.addEventListener('click', () => {
      this.closeAdmin();
    });
    
    const title = document.createElement('h1');
    title.className = 'admin-header__title';
    title.textContent = 'Admin Dashboard';
    
    const saveButton = document.createElement('button');
    saveButton.className = 'admin-save-button';
    saveButton.textContent = 'Save All Changes';
    saveButton.addEventListener('click', () => {
      this.saveAllChanges();
    });
    
    header.appendChild(backButton);
    header.appendChild(title);
    header.appendChild(saveButton);
    
    this.element.appendChild(header);
  }
  
  /**
   * Create main content area
   */
  createMainContent() {
    this.mainContent = document.createElement('div');
    this.mainContent.className = 'admin-main';
    
    // Show content management by default
    this.showSection('content');
    
    this.element.appendChild(this.mainContent);
  }
  
  /**
   * Show specific admin section
   */
  showSection(sectionId) {
    // Update navigation active state
    this.element.querySelectorAll('.admin-nav__item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionId);
    });
    
    // Clear main content
    this.mainContent.innerHTML = '';
    
    // Show appropriate section
    switch (sectionId) {
      case 'content':
        this.renderContentManagement();
        break;
      case 'themes':
        this.renderThemeSettings();
        break;
      case 'performance':
        this.renderPerformanceSettings();
        break;
      case 'assets':
        this.renderAssetManagement();
        break;
      case 'export':
        this.renderExportImport();
        break;
    }
  }
  
  /**
   * Render content management section
   */
  renderContentManagement() {
    const section = document.createElement('div');
    section.className = 'admin-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Content Management';
    section.appendChild(title);
    
    // Navigation content
    this.createContentGroup(section, 'Navigation', this.contentData.navigation);
    
    // Section content
    this.createContentGroup(section, 'Sections', this.contentData.sections);
    
    // UI content
    this.createContentGroup(section, 'UI Elements', this.contentData.ui);
    
    this.mainContent.appendChild(section);
  }
  
  /**
   * Create content group for editing
   */
  createContentGroup(parent, groupTitle, data) {
    const group = document.createElement('div');
    group.className = 'admin-content-group';
    
    const groupHeader = document.createElement('h3');
    groupHeader.textContent = groupTitle;
    group.appendChild(groupHeader);
    
    const groupContent = document.createElement('div');
    groupContent.className = 'admin-content-fields';
    
    this.createContentFields(groupContent, data, '');
    
    group.appendChild(groupContent);
    parent.appendChild(group);
  }
  
  /**
   * Create content fields recursively
   */
  createContentFields(parent, data, path) {
    Object.entries(data).forEach(([key, value]) => {
      const fieldPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Create nested group
        const nestedGroup = document.createElement('div');
        nestedGroup.className = 'admin-nested-group';
        
        const nestedTitle = document.createElement('h4');
        nestedTitle.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        nestedGroup.appendChild(nestedTitle);
        
        this.createContentFields(nestedGroup, value, fieldPath);
        parent.appendChild(nestedGroup);
      } else if (Array.isArray(value)) {
        // Handle arrays (like menu items)
        this.createArrayField(parent, key, value, fieldPath);
      } else {
        // Create input field
        this.createInputField(parent, key, value, fieldPath);
      }
    });
  }
  
  /**
   * Create input field for content editing
   */
  createInputField(parent, key, value, path) {
    const field = document.createElement('div');
    field.className = 'admin-field';
    
    const label = document.createElement('label');
    label.className = 'admin-field__label';
    label.textContent = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    
    const input = document.createElement(typeof value === 'string' && value.length > 50 ? 'textarea' : 'input');
    input.className = 'admin-field__input';
    
    if (input.tagName === 'INPUT') {
      input.type = typeof value === 'number' ? 'number' : 'text';
    }
    
    input.value = value;
    input.dataset.path = path;
    
    input.addEventListener('input', (e) => {
      this.updateContentValue(path, e.target.value);
    });
    
    field.appendChild(label);
    field.appendChild(input);
    parent.appendChild(field);
  }
  
  /**
   * Create array field for content editing
   */
  createArrayField(parent, key, array, path) {
    const field = document.createElement('div');
    field.className = 'admin-array-field';
    
    const label = document.createElement('h4');
    label.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    field.appendChild(label);
    
    const arrayContainer = document.createElement('div');
    arrayContainer.className = 'admin-array-container';
    
    array.forEach((item, index) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'admin-array-item';
      
      if (typeof item === 'object') {
        Object.entries(item).forEach(([itemKey, itemValue]) => {
          this.createInputField(itemContainer, itemKey, itemValue, `${path}[${index}].${itemKey}`);
        });
      } else {
        this.createInputField(itemContainer, `Item ${index + 1}`, item, `${path}[${index}]`);
      }
      
      // Add remove button
      const removeButton = document.createElement('button');
      removeButton.className = 'admin-remove-button';
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeArrayItem(path, index);
        this.renderContentManagement(); // Re-render to update indices
      });
      
      itemContainer.appendChild(removeButton);
      arrayContainer.appendChild(itemContainer);
    });
    
    // Add button to add new item
    const addButton = document.createElement('button');
    addButton.className = 'admin-add-button';
    addButton.textContent = `Add ${key.slice(0, -1)}`;
    addButton.addEventListener('click', () => {
      this.addArrayItem(path, array[0] || {});
      this.renderContentManagement(); // Re-render to show new item
    });
    
    field.appendChild(arrayContainer);
    field.appendChild(addButton);
    parent.appendChild(field);
  }
  
  /**
   * Update content value at path
   */
  updateContentValue(path, value) {
    const keys = path.split('.');
    let current = this.contentData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key.includes('[') && key.includes(']')) {
        const [arrayKey, indexStr] = key.split('[');
        const index = parseInt(indexStr.replace(']', ''));
        current = current[arrayKey][index];
      } else {
        current = current[key];
      }
    }
    
    const finalKey = keys[keys.length - 1];
    if (finalKey.includes('[') && finalKey.includes(']')) {
      const [arrayKey, indexStr] = finalKey.split('[');
      const index = parseInt(indexStr.replace(']', ''));
      current[arrayKey][index] = value;
    } else {
      current[finalKey] = typeof current[finalKey] === 'number' ? parseFloat(value) || 0 : value;
    }
  }
  
  /**
   * Add item to array
   */
  addArrayItem(path, template) {
    const keys = path.split('.');
    let current = this.contentData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const arrayKey = keys[keys.length - 1];
    current[arrayKey].push(typeof template === 'object' ? { ...template } : template);
  }
  
  /**
   * Remove item from array
   */
  removeArrayItem(path, index) {
    const keys = path.split('.');
    let current = this.contentData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    const arrayKey = keys[keys.length - 1];
    current[arrayKey].splice(index, 1);
  }
  
  /**
   * Render theme settings section
   */
  renderThemeSettings() {
    const section = document.createElement('div');
    section.className = 'admin-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Theme Settings';
    section.appendChild(title);
    
    // Preset themes
    this.createPresetSection(section);
    
    // UI colors
    this.createColorSection(section, 'UI Colors', 'ui');
    
    // 3D colors
    this.createColorSection(section, '3D Scene Colors', '3d');
    
    // Theme actions
    this.createThemeActionsSection(section);
    
    this.mainContent.appendChild(section);
  }
  
  /**
   * Create preset themes section
   */
  createPresetSection(parent) {
    const group = document.createElement('div');
    group.className = 'admin-content-group';
    
    const title = document.createElement('h3');
    title.textContent = 'Preset Themes';
    group.appendChild(title);
    
    const presetContainer = document.createElement('div');
    presetContainer.className = 'preset-themes';
    
    this.availableThemes.forEach(theme => {
      const presetButton = document.createElement('button');
      presetButton.className = 'preset-theme-button';
      presetButton.dataset.themeName = theme.name;
      presetButton.textContent = theme.name;
      
      const colorPreview = document.createElement('div');
      colorPreview.className = 'preset-theme-preview';
      colorPreview.style.backgroundColor = theme['3d'].sceneBackground;
      colorPreview.style.border = `2px solid ${theme.ui.accent}`;
      
      presetButton.appendChild(colorPreview);
      presetContainer.appendChild(presetButton);
    });
    
    group.appendChild(presetContainer);
    parent.appendChild(group);
  }
  
  /**
   * Create color section
   */
  createColorSection(parent, title, type) {
    const group = document.createElement('div');
    group.className = 'admin-content-group';
    
    const groupTitle = document.createElement('h3');
    groupTitle.textContent = title;
    group.appendChild(groupTitle);
    
    const colorContainer = document.createElement('div');
    colorContainer.className = 'color-pickers';
    
    Object.entries(this.currentTheme[type]).forEach(([colorKey, colorValue]) => {
      const pickerContainer = document.createElement('div');
      pickerContainer.className = 'color-picker-container';
      
      const label = colorKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      try {
        const colorPicker = new ColorPicker({
          container: pickerContainer,
          initialColor: colorValue,
          label,
          onChange: (newColor) => {
            this.handleColorChange(type, colorKey, newColor);
          }
        });
        
        this.colorPickers[type][colorKey] = colorPicker;
        colorContainer.appendChild(pickerContainer);
      } catch (error) {
        console.error(`Error creating color picker for ${colorKey}:`, error);
      }
    });
    
    group.appendChild(colorContainer);
    parent.appendChild(group);
  }
  
  /**
   * Create theme actions section
   */
  createThemeActionsSection(parent) {
    const group = document.createElement('div');
    group.className = 'admin-content-group';
    
    const title = document.createElement('h3');
    title.textContent = 'Theme Actions';
    group.appendChild(title);
    
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'admin-actions';
    
    // Export theme button
    const exportButton = document.createElement('button');
    exportButton.className = 'admin-action-button';
    exportButton.textContent = 'Export Theme';
    exportButton.addEventListener('click', () => {
      themeStore.exportTheme();
    });
    
    // Import theme button
    const importButton = document.createElement('button');
    importButton.className = 'admin-action-button';
    importButton.textContent = 'Import Theme';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    
    importButton.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const success = themeStore.importTheme(event.target.result);
          if (success) {
            this.currentTheme = themeStore.getCurrentTheme();
            this.updateColorPickers();
            this.showNotification('Theme imported successfully!', 'success');
          } else {
            this.showNotification('Invalid theme file', 'error');
          }
        } catch (error) {
          this.showNotification(`Error importing theme: ${error.message}`, 'error');
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });
    
    // Reset theme button
    const resetButton = document.createElement('button');
    resetButton.className = 'admin-action-button admin-action-button--warning';
    resetButton.textContent = 'Reset to Default';
    resetButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset to the default theme?')) {
        themeStore.resetToDefault();
        this.currentTheme = themeStore.getCurrentTheme();
        this.updateColorPickers();
        this.showNotification('Theme reset to default', 'success');
      }
    });
    
    actionsContainer.appendChild(exportButton);
    actionsContainer.appendChild(importButton);
    actionsContainer.appendChild(fileInput);
    actionsContainer.appendChild(resetButton);
    
    group.appendChild(actionsContainer);
    parent.appendChild(group);
  }
  
  /**
   * Render performance settings section
   */
  renderPerformanceSettings() {
    const section = document.createElement('div');
    section.className = 'admin-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Performance Settings';
    section.appendChild(title);
    
    this.createContentGroup(section, 'Performance Configuration', this.contentData.performance);
    
    // Add performance monitoring
    const monitoringGroup = document.createElement('div');
    monitoringGroup.className = 'admin-content-group';
    
    const monitoringTitle = document.createElement('h3');
    monitoringTitle.textContent = 'Performance Monitoring';
    monitoringGroup.appendChild(monitoringTitle);
    
    const statsContainer = document.createElement('div');
    statsContainer.className = 'performance-stats';
    statsContainer.innerHTML = `
      <div class="stat-item">
        <label>Current FPS:</label>
        <span id="current-fps">--</span>
      </div>
      <div class="stat-item">
        <label>Memory Usage:</label>
        <span id="memory-usage">--</span>
      </div>
      <div class="stat-item">
        <label>WebGL Context:</label>
        <span id="webgl-status">--</span>
      </div>
    `;
    
    monitoringGroup.appendChild(statsContainer);
    section.appendChild(monitoringGroup);
    
    // Start performance monitoring
    this.startPerformanceMonitoring();
    
    this.mainContent.appendChild(section);
  }
  
  /**
   * Render asset management section
   */
  renderAssetManagement() {
    const section = document.createElement('div');
    section.className = 'admin-section';
    
    const title = document.createElement('h2');
    title.textContent = '3D Asset Management';
    section.appendChild(title);
    
    // Model replacement guide
    const guideGroup = document.createElement('div');
    guideGroup.className = 'admin-content-group';
    
    const guideTitle = document.createElement('h3');
    guideTitle.textContent = 'Model Replacement Guide';
    guideGroup.appendChild(guideTitle);
    
    const guideContent = document.createElement('div');
    guideContent.className = 'asset-guide';
    guideContent.innerHTML = `
      <p>To replace the current earbuds model with a new 3D model:</p>
      <ol>
        <li>Export your model as .glb format (recommended) or .gltf</li>
        <li>Ensure polygon count is under 50k triangles for optimal performance</li>
        <li>Use power-of-2 texture dimensions (512x512, 1024x1024, 2048x2048)</li>
        <li>Apply PBR materials (Metallic/Roughness workflow)</li>
        <li>Place the new model in <code>/public/assets/models/</code></li>
        <li>Update the asset loading code in <code>src/js/gl/Assets/Assets.js</code></li>
        <li>Modify scene files to reference the new model</li>
      </ol>
      <p>For detailed instructions, see the <strong>3D Model Replacement Guide</strong> documentation.</p>
    `;
    
    guideGroup.appendChild(guideContent);
    section.appendChild(guideGroup);
    
    // Current assets info
    const assetsGroup = document.createElement('div');
    assetsGroup.className = 'admin-content-group';
    
    const assetsTitle = document.createElement('h3');
    assetsTitle.textContent = 'Current Assets';
    assetsGroup.appendChild(assetsTitle);
    
    const assetsList = document.createElement('div');
    assetsList.className = 'assets-list';
    assetsList.innerHTML = `
      <div class="asset-item">
        <strong>Main Model:</strong> ${this.contentData.assets.currentModel}
        <span class="asset-status">✅ Loaded</span>
      </div>
      <div class="asset-item">
        <strong>Textures:</strong> ${this.contentData.assets.textureCount} texture files
        <span class="asset-status">✅ Loaded</span>
      </div>
      <div class="asset-item">
        <strong>Audio:</strong> ${this.contentData.assets.audioCount} audio files
        <span class="asset-status">✅ Loaded</span>
      </div>
    `;
    
    assetsGroup.appendChild(assetsList);
    section.appendChild(assetsGroup);
    
    this.mainContent.appendChild(section);
  }
  
  /**
   * Render export/import section
   */
  renderExportImport() {
    const section = document.createElement('div');
    section.className = 'admin-section';
    
    const title = document.createElement('h2');
    title.textContent = 'Export & Import';
    section.appendChild(title);
    
    // Export section
    const exportGroup = document.createElement('div');
    exportGroup.className = 'admin-content-group';
    
    const exportTitle = document.createElement('h3');
    exportTitle.textContent = 'Export Configuration';
    exportGroup.appendChild(exportTitle);
    
    const exportActions = document.createElement('div');
    exportActions.className = 'admin-actions';
    
    const exportContentButton = document.createElement('button');
    exportContentButton.className = 'admin-action-button';
    exportContentButton.textContent = 'Export Content Data';
    exportContentButton.addEventListener('click', () => {
      this.exportContentData();
    });
    
    const exportThemeButton = document.createElement('button');
    exportThemeButton.className = 'admin-action-button';
    exportThemeButton.textContent = 'Export Current Theme';
    exportThemeButton.addEventListener('click', () => {
      themeStore.exportTheme();
    });
    
    const exportAllButton = document.createElement('button');
    exportAllButton.className = 'admin-action-button admin-action-button--primary';
    exportAllButton.textContent = 'Export All Settings';
    exportAllButton.addEventListener('click', () => {
      this.exportAllSettings();
    });
    
    exportActions.appendChild(exportContentButton);
    exportActions.appendChild(exportThemeButton);
    exportActions.appendChild(exportAllButton);
    exportGroup.appendChild(exportActions);
    
    // Import section
    const importGroup = document.createElement('div');
    importGroup.className = 'admin-content-group';
    
    const importTitle = document.createElement('h3');
    importTitle.textContent = 'Import Configuration';
    importGroup.appendChild(importTitle);
    
    const importActions = document.createElement('div');
    importActions.className = 'admin-actions';
    
    const importContentButton = document.createElement('button');
    importContentButton.className = 'admin-action-button';
    importContentButton.textContent = 'Import Content Data';
    
    const importThemeButton = document.createElement('button');
    importThemeButton.className = 'admin-action-button';
    importThemeButton.textContent = 'Import Theme';
    
    const importAllButton = document.createElement('button');
    importAllButton.className = 'admin-action-button admin-action-button--primary';
    importAllButton.textContent = 'Import All Settings';
    
    // File inputs
    const contentFileInput = document.createElement('input');
    contentFileInput.type = 'file';
    contentFileInput.accept = '.json';
    contentFileInput.style.display = 'none';
    
    const themeFileInput = document.createElement('input');
    themeFileInput.type = 'file';
    themeFileInput.accept = '.json';
    themeFileInput.style.display = 'none';
    
    const allFileInput = document.createElement('input');
    allFileInput.type = 'file';
    allFileInput.accept = '.json';
    allFileInput.style.display = 'none';
    
    // Event listeners
    importContentButton.addEventListener('click', () => contentFileInput.click());
    importThemeButton.addEventListener('click', () => themeFileInput.click());
    importAllButton.addEventListener('click', () => allFileInput.click());
    
    contentFileInput.addEventListener('change', (e) => this.handleContentImport(e));
    themeFileInput.addEventListener('change', (e) => this.handleThemeImport(e));
    allFileInput.addEventListener('change', (e) => this.handleAllImport(e));
    
    importActions.appendChild(importContentButton);
    importActions.appendChild(importThemeButton);
    importActions.appendChild(importAllButton);
    importActions.appendChild(contentFileInput);
    importActions.appendChild(themeFileInput);
    importActions.appendChild(allFileInput);
    importGroup.appendChild(importActions);
    
    section.appendChild(exportGroup);
    section.appendChild(importGroup);
    this.mainContent.appendChild(section);
  }
  
  /**
   * Handle color change
   */
  handleColorChange(type, colorKey, newColor) {
    console.log(`Color changed: ${type}.${colorKey} = ${newColor}`);
    themeStore.updateColor(type, colorKey, newColor);
    this.currentTheme = themeStore.getCurrentTheme();
  }
  
  /**
   * Update color pickers
   */
  updateColorPickers() {
    Object.entries(this.colorPickers.ui).forEach(([colorKey, picker]) => {
      picker.setColor(this.currentTheme.ui[colorKey]);
    });
    
    Object.entries(this.colorPickers['3d']).forEach(([colorKey, picker]) => {
      picker.setColor(this.currentTheme['3d'][colorKey]);
    });
  }
  
  /**
   * Export content data
   */
  exportContentData() {
    const dataString = JSON.stringify(this.contentData, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    this.showNotification('Content data exported successfully!', 'success');
  }
  
  /**
   * Export all settings
   */
  exportAllSettings() {
    const allSettings = {
      content: this.contentData,
      theme: this.currentTheme,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    const dataString = JSON.stringify(allSettings, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin-settings-export.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    this.showNotification('All settings exported successfully!', 'success');
  }
  
  /**
   * Handle content import
   */
  handleContentImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        this.contentData = importedData;
        this.saveContentData();
        this.renderContentManagement();
        this.showNotification('Content data imported successfully!', 'success');
      } catch (error) {
        this.showNotification(`Error importing content: ${error.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
  
  /**
   * Handle theme import
   */
  handleThemeImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = themeStore.importTheme(event.target.result);
        if (success) {
          this.currentTheme = themeStore.getCurrentTheme();
          this.updateColorPickers();
          this.showNotification('Theme imported successfully!', 'success');
        } else {
          this.showNotification('Invalid theme file', 'error');
        }
      } catch (error) {
        this.showNotification(`Error importing theme: ${error.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
  
  /**
   * Handle all settings import
   */
  handleAllImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedSettings = JSON.parse(event.target.result);
        
        if (importedSettings.content) {
          this.contentData = importedSettings.content;
          this.saveContentData();
        }
        
        if (importedSettings.theme) {
          themeStore.setTheme(importedSettings.theme);
          this.currentTheme = themeStore.getCurrentTheme();
          this.updateColorPickers();
        }
        
        // Re-render current section
        const activeSection = this.element.querySelector('.admin-nav__item.active');
        if (activeSection) {
          this.showSection(activeSection.dataset.section);
        }
        
        this.showNotification('All settings imported successfully!', 'success');
      } catch (error) {
        this.showNotification(`Error importing settings: ${error.message}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
  
  /**
   * Save all changes
   */
  saveAllChanges() {
    this.saveContentData();
    this.showNotification('All changes saved successfully!', 'success');
  }
  
  /**
   * Start performance monitoring
   */
  startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const updateStats = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        const fpsElement = document.getElementById('current-fps');
        if (fpsElement) {
          fpsElement.textContent = `${fps} FPS`;
          fpsElement.className = fps >= 50 ? 'stat-good' : fps >= 30 ? 'stat-warning' : 'stat-poor';
        }
        
        // Memory usage
        if (performance.memory) {
          const memoryElement = document.getElementById('memory-usage');
          if (memoryElement) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            memoryElement.textContent = `${used} MB`;
          }
        }
        
        // WebGL status
        const webglElement = document.getElementById('webgl-status');
        if (webglElement) {
          const canvas = document.querySelector('[data-gl-canvas]');
          const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
          webglElement.textContent = gl ? 'Active' : 'Inactive';
          webglElement.className = gl ? 'stat-good' : 'stat-poor';
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateStats);
    };
    
    updateStats();
  }
  
  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  /**
   * Bind event listeners
   */
  bindEvents() {
    // Navigation
    this.element.querySelectorAll('.admin-nav__item').forEach(item => {
      item.addEventListener('click', () => {
        this.showSection(item.dataset.section);
      });
    });
    
    // Preset theme buttons
    this.element.addEventListener('click', (e) => {
      if (e.target.classList.contains('preset-theme-button')) {
        const themeName = e.target.dataset.themeName;
        const theme = this.availableThemes.find(t => t.name === themeName);
        if (theme) {
          themeStore.setTheme(theme);
          this.currentTheme = themeStore.getCurrentTheme();
          this.updateColorPickers();
          this.showNotification(`Applied ${themeName} theme`, 'success');
        }
      }
    });
  }
  
  /**
   * Close admin and return to main site
   */
  closeAdmin() {
    document.body.classList.remove('admin-active');
    
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      mainWrapper.style.display = '';
    }
    
    const canvas = document.querySelector('.canvas-w');
    if (canvas) {
      canvas.style.display = '';
    }
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    
    if (window.location.pathname.includes('/admin')) {
      history.pushState({}, '', '/');
    }
  }
  
  /**
   * Add styles for admin page
   */
  addStyles() {
    if (document.getElementById('admin-page-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'admin-page-styles';
    style.textContent = `
      .admin-page {
        display: flex;
        min-height: 100vh;
        background: var(--color-background, #050D15);
        color: var(--color-text, #ffffff);
        font-family: 'Manrope', sans-serif;
      }
      
      .admin-nav {
        width: 250px;
        background: rgba(255, 255, 255, 0.05);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        padding: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .admin-nav__item {
        background: none;
        border: none;
        color: var(--color-text, #ffffff);
        padding: 1rem 2rem;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .admin-nav__item:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .admin-nav__item.active {
        background: var(--color-accent, #41a5ff);
      }
      
      .admin-nav__icon {
        font-size: 1.2rem;
      }
      
      .admin-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.02);
      }
      
      .admin-header__title {
        font-size: 2rem;
        margin: 0;
      }
      
      .admin-back-button,
      .admin-save-button {
        background: var(--color-accent, #41a5ff);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.3s;
      }
      
      .admin-back-button:hover,
      .admin-save-button:hover {
        background: var(--color-accentLight, #abd7ff);
      }
      
      .admin-main {
        flex: 1;
        overflow-y: auto;
        padding: 2rem;
      }
      
      .admin-section {
        max-width: 1200px;
      }
      
      .admin-content-group {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 0.5rem;
        padding: 2rem;
        margin-bottom: 2rem;
      }
      
      .admin-content-group h3 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
      }
      
      .admin-content-fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      
      .admin-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .admin-field__label {
        font-size: 0.9rem;
        opacity: 0.8;
        font-weight: 500;
      }
      
      .admin-field__input {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.25rem;
        padding: 0.75rem;
        color: var(--color-text, #ffffff);
        font-family: inherit;
        transition: border-color 0.3s;
      }
      
      .admin-field__input:focus {
        outline: none;
        border-color: var(--color-accent, #41a5ff);
      }
      
      .admin-field__input[type="textarea"] {
        min-height: 100px;
        resize: vertical;
      }
      
      .admin-nested-group {
        border-left: 3px solid var(--color-accent, #41a5ff);
        padding-left: 1rem;
        margin-left: 1rem;
      }
      
      .admin-nested-group h4 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        opacity: 0.9;
      }
      
      .admin-array-field {
        grid-column: 1 / -1;
      }
      
      .admin-array-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      
      .admin-array-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem;
        padding: 1rem;
        position: relative;
      }
      
      .admin-add-button,
      .admin-remove-button {
        background: var(--color-accent, #41a5ff);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.9rem;
      }
      
      .admin-remove-button {
        background: #dc2626;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
      
      .admin-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      .admin-action-button {
        background: var(--color-accent, #41a5ff);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .admin-action-button:hover {
        background: var(--color-accentLight, #abd7ff);
      }
      
      .admin-action-button--primary {
        background: #059669;
      }
      
      .admin-action-button--primary:hover {
        background: #047857;
      }
      
      .admin-action-button--warning {
        background: #dc2626;
      }
      
      .admin-action-button--warning:hover {
        background: #b91c1c;
      }
      
      .color-pickers {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
      }
      
      .preset-themes {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      
      .preset-theme-button {
        background: rgba(255, 255, 255, 0.1);
        color: var(--color-text, #ffffff);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: background-color 0.3s;
      }
      
      .preset-theme-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .preset-theme-preview {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      
      .performance-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }
      
      .stat-item {
        background: rgba(255, 255, 255, 0.05);
        padding: 1rem;
        border-radius: 0.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .stat-good { color: #10b981; }
      .stat-warning { color: #f59e0b; }
      .stat-poor { color: #ef4444; }
      
      .asset-guide {
        background: rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
        border-radius: 0.5rem;
        line-height: 1.6;
      }
      
      .asset-guide code {
        background: rgba(0, 0, 0, 0.3);
        padding: 0.2rem 0.4rem;
        border-radius: 0.2rem;
        font-family: 'Courier New', monospace;
      }
      
      .assets-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .asset-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 0.25rem;
      }
      
      .asset-status {
        font-size: 0.9rem;
      }
      
      .admin-notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
      }
      
      .admin-notification.show {
        transform: translateX(0);
      }
      
      .admin-notification--success {
        background: #059669;
      }
      
      .admin-notification--error {
        background: #dc2626;
      }
      
      .admin-notification--info {
        background: var(--color-accent, #41a5ff);
      }
      
      @media (max-width: 768px) {
        .admin-page {
          flex-direction: column;
        }
        
        .admin-nav {
          width: 100%;
          flex-direction: row;
          overflow-x: auto;
          padding: 1rem;
        }
        
        .admin-nav__item {
          white-space: nowrap;
          padding: 0.75rem 1rem;
        }
        
        .admin-header {
          flex-direction: column;
          gap: 1rem;
          align-items: stretch;
        }
        
        .admin-content-fields {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Render error message
   */
  renderError(error) {
    this.container.innerHTML = `
      <div class="admin-page admin-error">
        <div class="admin-header">
          <h1>Error Loading Admin Panel</h1>
        </div>
        <div class="admin-error-message">
          <p>An error occurred while loading the admin panel:</p>
          <pre>${error.message}</pre>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    `;
  }
}

export default AdminPage;