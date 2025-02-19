/*!
 * Easy Toast Library
 * Copyright (c) 2025 Hridoy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * 1. This copyright notice and permission notice shall be included in all copies
 *    or substantial portions of the Software.
 * 2. The Software is provided "as is", without warranty of any kind, express or implied,
 *    including but not limited to the warranties of merchantability, fitness for a
 *    particular purpose, and non-infringement.
 * 3. The author(s) shall not be liable for any claims, damages, or liabilities arising
 *    from the use of the Software.
 *
 * Developed by Hridoy
 * Website: https://hridoy.top
 */
class Toast {
    constructor(options = {}) {
      this.options = {
        type: "default",
        title: "",
        message: "",
        duration: 3000,
        position: "bottom-right",
        closable: true,
        progress: true,
        action: null,
        ...options,
      }
      this.toast = null
      this.progressBar = null
      this.progressInterval = null
      this.remainingTime = this.options.duration
      this.isDragging = false
      this.dragStartX = 0
      this.dragStartY = 0
    }

    show() {
      this.createToastElement()
      this.setPosition()
      this.animateIn()
      this.bindEvents()
      if (this.options.progress && this.options.duration !== false) this.startProgressBar()
      if (this.options.duration !== false) this.autoClose()
    }

    createToastElement() {
      this.toast = document.createElement("div")
      this.toast.className = `toast toast-${this.options.type}`

      const icon = this.getIcon()
      const content = `
              <div class="toast-content">
                  ${this.options.title ? `<div class="toast-title">${this.options.title}</div>` : ""}
                  <div class="toast-message">${this.options.message}</div>
                  ${
                    this.options.action
                      ? `
                      <div class="toast-action">
                          <button>${this.options.action.text}</button>
                      </div>
                  `
                      : ""
                  }
              </div>
          `
      const closeButton = this.options.closable ? '<span class="toast-close">&times;</span>' : ""
      const progressBar =
        this.options.progress && this.options.duration !== false
          ? '<div class="toast-progress"><div class="toast-progress-bar"></div></div>'
          : ""

      this.toast.innerHTML = `${icon}${content}${closeButton}${progressBar}`
      document.getElementById("toastContainer").appendChild(this.toast)

      if (this.options.progress && this.options.duration !== false) {
        this.progressBar = this.toast.querySelector(".toast-progress-bar")
      }
    }

    getIcon() {
      const iconClass =
        {
          default: "fa-bell",
          success: "fa-check-circle",
          error: "fa-times-circle",
          info: "fa-info-circle",
          warning: "fa-exclamation-triangle",
        }[this.options.type] || "fa-bell"

      return `<div class="toast-icon"><i class="fas ${iconClass}"></i></div>`
    }

    setPosition() {
      const container = document.getElementById("toastContainer")
      container.style.setProperty(this.options.position.split("-")[0], "20px")
      container.style.setProperty(this.options.position.split("-")[1], "20px")
    }

    animateIn() {
      setTimeout(() => this.toast.classList.add("show"), 10)
    }

    bindEvents() {
      if (this.options.closable) {
        this.toast.querySelector(".toast-close").addEventListener("click", () => this.close())
      }

      if (this.options.action) {
        this.toast.querySelector(".toast-action button").addEventListener("click", this.options.action.callback)
      }

      this.toast.addEventListener("mousedown", this.startDragging.bind(this))
      document.addEventListener("mousemove", this.drag.bind(this))
      document.addEventListener("mouseup", this.stopDragging.bind(this))
    }

    startProgressBar() {
      const duration = this.options.duration
      const fps = 60
      const frameDuration = 1000 / fps
      const totalFrames = duration / frameDuration
      let currentFrame = 0

      this.progressInterval = setInterval(() => {
        currentFrame++
        const progress = (currentFrame / totalFrames) * 100
        this.progressBar.style.width = `${100 - progress}%`

        if (currentFrame >= totalFrames) {
          clearInterval(this.progressInterval)
        }
      }, frameDuration)
    }

    autoClose() {
      setTimeout(() => this.close(), this.options.duration)
    }

    close() {
      this.toast.classList.remove("show")
      setTimeout(() => {
        this.toast.remove()
        clearInterval(this.progressInterval)
      }, 500)
    }

    startDragging(e) {
      this.isDragging = true
      this.dragStartX = e.clientX - this.toast.offsetLeft
      this.dragStartY = e.clientY - this.toast.offsetTop
      this.toast.style.transition = "none"
    }

    drag(e) {
      if (!this.isDragging) return
      e.preventDefault()
      this.toast.style.left = `${e.clientX - this.dragStartX}px`
      this.toast.style.top = `${e.clientY - this.dragStartY}px`
    }

    stopDragging() {
      this.isDragging = false
      this.toast.style.transition = ""
    }

    shake() {
      this.toast.classList.add("shake")
      setTimeout(() => this.toast.classList.remove("shake"), 500)
    }
  }

  function showToast(options) {
    const toast = new Toast(options)
    toast.show()
    return toast
  }

  function getOptionsFromDataAttributes(element) {
    const options = {}
    for (const key in element.dataset) {
      if (key === "duration") {
        options[key] = element.dataset[key] === "false" ? false : Number.parseInt(element.dataset[key])
      } else if (key === "actionText") {
        options.action = {
          text: element.dataset[key],
          callback: () => alert("Action clicked!"),
        }
      } else {
        options[key] = element.dataset[key]
      }
    }
    return options
  }

  document.querySelectorAll('button[id^="show"]').forEach((button) => {
    button.addEventListener("click", () => {
      let options = getOptionsFromDataAttributes(button)

      if (button.id === "showCustomToast") {
        options = {
          ...options,
          duration: false,
          action: {
            text: options.actionText || "Click me!",
            callback: () => {
              alert("Custom action clicked!")

            },
          },
        }
      }

      if (button.id === "showDefaultToast" && !options.message) {
        options.message = "This is a default toast message!"
      }

      showToast(options)
    })
  })

  window.showToast = showToast