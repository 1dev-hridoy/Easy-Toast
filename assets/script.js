
document.querySelectorAll('.toast-demo-btn').forEach(button => {
    button.addEventListener('click', () => {
        showToast({
            type: button.dataset.type,
            title: button.dataset.title,
            message: button.dataset.message,
            duration: button.dataset.duration === 'false' ? false : parseInt(button.dataset.duration),
            action: button.dataset.actionText ? {
                text: button.dataset.actionText,
                callback: () => alert('Custom action clicked!')
            } : undefined
        });
    });
});