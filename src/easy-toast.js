function showToast(message, type = "default", duration = 3000) {
    const toastContainer = document.getElementById("toastContainer")
    const toast = document.createElement("div")
    toast.className = `toast ${type !== "default" ? "toast-" + type : ""}`
    toast.textContent = message
  
    toastContainer.appendChild(toast)
  
    // Trigger reflow to enable the transition
    toast.offsetHeight
  
    toast.classList.add("show")
  
    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        toastContainer.removeChild(toast)
      }, 300)
    }, duration)
  }
  
  document.getElementById("showToast").addEventListener("click", () => {
    showToast("This is a default toast message!")
  })
  
  // Example usage:
  // showToast('Success message', 'success');
  // showToast('Error message', 'error');
  // showToast('Info message', 'info');
  // showToast('Warning message', 'warning');
  
  