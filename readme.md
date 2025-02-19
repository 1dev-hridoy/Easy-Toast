# Easy Toast 🍞

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![npm](https://img.shields.io/npm/v/easy-toast-notifications)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/easy-toast-notifications)

A lightweight, modern, and highly customizable toast notification library for web applications. Easy Toast provides a simple yet powerful way to display notifications with features like drag-and-drop, progress bars, and custom actions.

![Easy Toast Demo](https://via.placeholder.com/600x300)

## ✨ Features

- 🎨 **Fully Customizable**: Easily modify colors, animations, and styles to match your application's theme
- 🚀 **Lightweight**: Minimal footprint with zero dependencies
- 📱 **Responsive**: Works seamlessly across all device sizes
- 🖱️ **Interactive**: Drag-and-drop support for repositioning notifications
- ⏱️ **Progress Tracking**: Built-in progress bar for timed notifications
- 🎯 **Custom Actions**: Add buttons and callbacks to your notifications
- 🌗 **Dark Mode Support**: Automatic theme detection and switching
- 🔧 **Easy Configuration**: Simple API with sensible defaults

## 📦 Installation

```bash
npm install easy-toast-notifications
```

Or include via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easy-toast-notifications/dist/easy-toast.min.css">
<script src="https://cdn.jsdelivr.net/npm/easy-toast-notifications/dist/easy-toast.min.js"></script>
```

## 🚀 Quick Start

### Basic Usage

```javascript
// Show a simple success toast
showToast({
    type: 'success',
    title: 'Success!',
    message: 'Your action was successful!'
});

// Show a persistent error toast with custom action
showToast({
    type: 'error',
    title: 'Error',
    message: 'Failed to save changes',
    duration: false,
    action: {
        text: 'Retry',
        callback: () => retryOperation()
    }
});
```

### HTML Data Attributes

You can also trigger toasts using HTML data attributes:

```html
<button 
    data-toast-type="success"
    data-toast-title="Success!"
    data-toast-message="Operation completed successfully"
    data-toast-duration="5000">
    Show Toast
</button>
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | 'default' | Toast type ('success', 'error', 'info', 'warning', 'default') |
| `title` | string | '' | Toast header text |
| `message` | string | '' | Main toast message |
| `duration` | number/boolean | 3000 | Duration in ms (false for persistent) |
| `position` | string | 'bottom-right' | Toast position on screen |
| `closable` | boolean | true | Show close button |
| `progress` | boolean | true | Show progress bar |
| `action` | object | null | Custom action button configuration |

### Position Options

```javascript
// Available position values
'top-left'     'top-center'     'top-right'
'middle-left'  'middle-center'  'middle-right'
'bottom-left'  'bottom-center'  'bottom-right'
```

## 🎨 Styling

Easy Toast comes with a default theme that you can easily customize using CSS variables:

```css
:root {
    --easy-toast-success: #4caf50;
    --easy-toast-error: #f44336;
    --easy-toast-info: #2196f3;
    --easy-toast-warning: #ff9800;
    --easy-toast-bg: #ffffff;
    --easy-toast-text: #333333;
}
```

## 📚 Examples

### Custom Action Button

```javascript
showToast({
    type: 'info',
    title: 'Update Available',
    message: 'A new version is available',
    duration: false,
    action: {
        text: 'Update Now',
        callback: () => performUpdate(),
        style: 'background: #2196f3; color: white;'
    }
});
```

### Progress Bar with Custom Duration

```javascript
showToast({
    type: 'warning',
    title: 'Autosaving...',
    message: 'Your changes will be saved automatically',
    duration: 10000,
    progress: true
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Feather Icons](https://feathericons.com/)
- Inspired by various toast notification libraries in the open-source community

## 📞 Support

- Create an [Issue](https://github.com/1dev-hridoy/easy-toast/issues) for bug reports and feature requests
- Star ⭐ the project if you find it useful

---

Made with ❤️ by [Hridoy](https://hridoy.top)