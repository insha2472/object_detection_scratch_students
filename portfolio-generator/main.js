document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const generatorSection = document.getElementById('generator-ui');
    const form = document.getElementById('portfolioForm');

    // Smooth scroll to generator
    generateBtn.addEventListener('click', () => {
        generatorSection.classList.remove('hidden');
        generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Generating...';
        btn.disabled = true;

        // Simulate generation
        setTimeout(() => {
            btn.innerText = 'Done!';
            alert('Pseudo-generation complete! Structure established.');
            btn.disabled = false;
            btn.innerText = originalText;
        }, 1500);
    });

    // 3D Tilt Effect for Hero Card
    const card = document.querySelector('.glass-card');
    const container = document.querySelector('.hero-image-container');

    container.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
});
