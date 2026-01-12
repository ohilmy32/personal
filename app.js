// App state
let draggedElement = null;
let offsetX = 0;
let offsetY = 0;
let clickStartTime = 0;
let hasMoved = false;

// Load content from JSON files
async function loadContent() {
    try {
        // Load musings
        const musingsData = await fetch('content/musings.json').then(r => r.json());
        renderMusings(musingsData);

        // Load inspiration
        const inspirationData = await fetch('content/inspiration.json').then(r => r.json());
        renderInspiration(inspirationData);

        // Load photos
        const photosData = await fetch('content/photos.json').then(r => r.json());
        renderPhotos(photosData);

        // Load projects
        const projectsData = await fetch('content/projects.json').then(r => r.json());
        renderProjects(projectsData);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Render musings
function renderMusings(posts) {
    const container = document.getElementById('musings-content');
    container.innerHTML = posts.map(post => `
        <article class="post">
            <h2><a href="#">${post.title}</a></h2>
            <time>${post.date}</time>
            <p>${post.excerpt}</p>
            ${post.tags ? `
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            ` : ''}
        </article>
    `).join('');
}

// Render inspiration
function renderInspiration(data) {
    const container = document.getElementById('inspiration-content');
    let html = '';

    if (data.books && data.books.length > 0) {
        html += '<div style="margin-bottom: 48px;">';
        html += '<h2 style="font-size: 20px; font-weight: 400; margin-bottom: 24px;">Books</h2>';
        data.books.forEach(book => {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>${book.title}</strong> 
                    <span style="color: #666;">by ${book.author}</span>
                    ${book.status ? `<span style="font-size: 12px; color: #666; margin-left: 8px;">${book.status}</span>` : ''}
                    ${book.notes ? `<p style="font-size: 14px; color: #666; margin-top: 4px;">${book.notes}</p>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    if (data.movies && data.movies.length > 0) {
        html += '<div style="margin-bottom: 48px;">';
        html += '<h2 style="font-size: 20px; font-weight: 400; margin-bottom: 24px;">Movies</h2>';
        data.movies.forEach(movie => {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>${movie.title}</strong> 
                    <span style="color: #666;">directed by ${movie.director}</span>
                    ${movie.year ? `<span style="color: #666;"> (${movie.year})</span>` : ''}
                    ${movie.notes ? `<p style="font-size: 14px; color: #666; margin-top: 4px;">${movie.notes}</p>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    if (data.music && data.music.length > 0) {
        html += '<div style="margin-bottom: 48px;">';
        html += '<h2 style="font-size: 20px; font-weight: 400; margin-bottom: 24px;">Music</h2>';
        data.music.forEach(item => {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>${item.title}</strong> 
                    <span style="color: #666;">by ${item.artist}</span>
                    ${item.notes ? `<p style="font-size: 14px; color: #666; margin-top: 4px;">${item.notes}</p>` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

// Render photos
function renderPhotos(photos) {
    const container = document.getElementById('wild-content');
    container.innerHTML = photos.map(photo => `
        <a href="${photo.fullImage || '#'}" class="photo-item">
            <div class="photo-cover">
                ${photo.thumbnail ? `<img src="${photo.thumbnail}" alt="${photo.title}">` : '[image]'}
            </div>
            <h2>${photo.title}</h2>
            <time>${photo.date}</time>
            ${photo.location ? `<span class="location">${photo.location}</span>` : ''}
        </a>
    `).join('');
}

// Render projects
function renderProjects(projects) {
    const container = document.getElementById('projects-content');
    container.innerHTML = projects.map(project => `
        <article class="post">
            <h2><a href="${project.link || '#'}">${project.title}</a></h2>
            <time>${project.date}</time>
            <p>${project.description}</p>
            ${project.tags ? `
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
            ` : ''}
        </article>
    `).join('');
}

// Page navigation
function showPage(pageName) {
    document.getElementById('home-page').style.display = 'none';
    document.querySelectorAll('.inner-page').forEach(page => {
        page.classList.remove('active');
    });

    if (pageName === 'home') {
        document.getElementById('home-page').style.display = 'block';
    } else {
        document.getElementById(pageName + '-page').classList.add('active');
    }

    window.scrollTo(0, 0);
}

// Drag functionality
document.querySelectorAll('.folder').forEach(folder => {
    folder.addEventListener('mousedown', (e) => {
        clickStartTime = Date.now();
        hasMoved = false;
        draggedElement = folder;
        const rect = folder.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        folder.classList.add('dragging');
        e.preventDefault();
    });

    folder.addEventListener('touchstart', (e) => {
        clickStartTime = Date.now();
        hasMoved = false;
        draggedElement = folder;
        const rect = folder.getBoundingClientRect();
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        folder.classList.add('dragging');
        e.preventDefault();
    });
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        hasMoved = true;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        draggedElement.style.left = Math.max(0, Math.min(x, window.innerWidth - 120)) + 'px';
        draggedElement.style.top = Math.max(0, Math.min(y, window.innerHeight - 120)) + 'px';
    }
});

document.addEventListener('touchmove', (e) => {
    if (draggedElement) {
        hasMoved = true;
        const touch = e.touches[0];
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;
        draggedElement.style.left = Math.max(0, Math.min(x, window.innerWidth - 120)) + 'px';
        draggedElement.style.top = Math.max(0, Math.min(y, window.innerHeight - 120)) + 'px';
    }
});

document.addEventListener('mouseup', (e) => {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        
        const clickDuration = Date.now() - clickStartTime;
        if (!hasMoved && clickDuration < 300) {
            const page = draggedElement.getAttribute('data-page');
            showPage(page);
        }
        
        draggedElement = null;
    }
});

document.addEventListener('touchend', (e) => {
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        
        const clickDuration = Date.now() - clickStartTime;
        if (!hasMoved && clickDuration < 300) {
            const page = draggedElement.getAttribute('data-page');
            showPage(page);
        }
        
        draggedElement = null;
    }
});

// Initialize
showPage('home');
loadContent();
