function showToast(message, type = "default", duration = 3000) {
    const toastContainer = document.getElementById("toastContainer")
    const toast = document.createElement("div")
    toast.className = `toast ${type !== "default" ? "toast-" + type : ""}`
  
    const icon = document.createElement("i")
    icon.className = "toast-icon"
    switch (type) {
      case "success":
        icon.className += " fas fa-check-circle"
        break
      case "error":
        icon.className += " fas fa-times-circle"
        break
      case "info":
        icon.className += " fas fa-info-circle"
        break
      case "warning":
        icon.className += " fas fa-exclamation-triangle"
        break
      default:
        icon.className += " fas fa-bell"
    }
  
    const content = document.createElement("div")
    content.className = "toast-content"
    content.textContent = message
  
    const progress = document.createElement("div")
    progress.className = "toast-progress"
    const progressBar = document.createElement("div")
    progressBar.className = "toast-progress-bar"
    progress.appendChild(progressBar)
  
    toast.appendChild(icon)
    toast.appendChild(content)
    toast.appendChild(progress)
  
    toastContainer.appendChild(toast)
  
    // Trigger reflow to enable the transition
    toast.offsetHeight
  
    toast.classList.add("show")
  
    // Animate progress bar
    progressBar.style.width = "100%"
    progressBar.style.transitionDuration = `${duration}ms`
  
    setTimeout(() => {
      progressBar.style.width = "0%"
    }, 10)
  
    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        toastContainer.removeChild(toast)
      }, 300)
    }, duration)
  }
  
  document.getElementById("showDefaultToast").addEventListener("click", () => {
    showToast("This is a default toast message!")
  })
  
  document.getElementById("showSuccessToast").addEventListener("click", () => {
    showToast("Success message", "success")
  })
  
  document.getElementById("showErrorToast").addEventListener("click", () => {
    showToast("Error message", "error")
  })
  
  document.getElementById("showInfoToast").addEventListener("click", () => {
    showToast("Info message", "info")
  })
  
  document.getElementById("showWarningToast").addEventListener("click", () => {
    showToast("Warning message", "warning")
  })
  
  