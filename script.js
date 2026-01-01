// Enhanced Particle System for Futuristic Tech Effect
document.addEventListener('DOMContentLoaded', function () {
    const particleContainer = document.getElementById('particles');
    const particleCount = 120; // Increased particles

    // Create floating particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }

    // Create connecting lines canvas
    createConnectionCanvas();

    // Add subtle mouse interaction
    document.addEventListener('mousemove', function (e) {
        const particles = document.querySelectorAll('.particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        particles.forEach((particle, index) => {
            const speed = (index % 5 + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 15;
            const y = (mouseY - 0.5) * speed * 15;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Varied sizes for depth effect
    const sizeType = Math.random();
    let size;
    if (sizeType < 0.6) {
        size = Math.random() * 2 + 1; // Small
    } else if (sizeType < 0.9) {
        size = Math.random() * 3 + 2; // Medium
    } else {
        size = Math.random() * 4 + 3; // Large
    }

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration
    particle.style.animationDuration = (Math.random() * 25 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 8) + 's';

    // Varied opacity
    particle.style.opacity = Math.random() * 0.5 + 0.2;

    container.appendChild(particle);
}

// Create canvas for connecting lines
function createConnectionCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'connectionCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let points = [];
    const maxPoints = 40;
    const connectionDistance = 150;

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Initialize points
    for (let i = 0; i < maxPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw points
        points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;

            // Bounce off edges
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
        ctx.lineWidth = 1;

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw points
        ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Smooth hover effects for interactive elements
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .particle {
        animation-name: floatParticle;
    }
    
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-40px) translateX(20px);
        }
        50% {
            transform: translateY(-15px) translateX(-15px);
        }
        75% {
            transform: translateY(-35px) translateX(25px);
        }
    }
`;
document.head.appendChild(style);
