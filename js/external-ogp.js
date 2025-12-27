// Fetch and display OGP images for external posts
document.addEventListener('DOMContentLoaded', function() {
    const externalCovers = document.querySelectorAll('.external-cover');

    externalCovers.forEach(function(cover) {
        const url = cover.dataset.externalUrl;
        if (!url) return;

        // Use microlink.io API to get OGP data
        fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data.image) {
                    const img = document.createElement('img');
                    img.src = data.data.image.url;
                    img.alt = data.data.title || 'External post thumbnail';
                    img.loading = 'lazy';
                    cover.innerHTML = '';
                    cover.appendChild(img);
                    cover.classList.remove('loading');
                } else {
                    cover.classList.add('no-image');
                    cover.classList.remove('loading');
                }
            })
            .catch(error => {
                console.error('Failed to fetch OGP:', error);
                cover.classList.add('no-image');
                cover.classList.remove('loading');
            });
    });
});
