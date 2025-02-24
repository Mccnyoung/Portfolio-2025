document.addEventListener('DOMContentLoaded', () => {
    const introSection = document.querySelector('.intro-section');
    const profileCard = introSection.querySelector('.profile-img');
    const workItems = document.querySelectorAll('.work-item');
    
    // 이미지 프리로딩
    const preloadImages = () => {
        const preloadedImages = new Map();
        workItems.forEach(item => {
            const thumbnail = item.getAttribute('data-thumbnail');
            if (thumbnail) {
                const img = new Image();
                img.src = thumbnail;
                preloadedImages.set(thumbnail, img);
            }
        });
        return preloadedImages;
    };
    
    const preloadedImages = preloadImages();
    const defaultImage = profileCard.src;
    let isTransitioning = false;
    
    workItems.forEach(item => {
        const thumbnail = item.getAttribute('data-thumbnail');
        const link = item.querySelector('a');
        
        // 이벤트를 work-item에서 a 태그로 이동
        link.addEventListener('mouseenter', () => {
            if (thumbnail && !isTransitioning) {
                isTransitioning = true;
                profileCard.style.opacity = '0';
                
                setTimeout(() => {
                    profileCard.src = thumbnail;
                    requestAnimationFrame(() => {
                        profileCard.style.opacity = '1';
                        isTransitioning = false;
                    });
                }, 100); // 전환 시간 더 단축
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!isTransitioning) {
                isTransitioning = true;
                profileCard.style.opacity = '0';
                
                setTimeout(() => {
                    profileCard.src = defaultImage;
                    requestAnimationFrame(() => {
                        profileCard.style.opacity = '1';
                        isTransitioning = false;
                    });
                }, 100);
            }
        });
    });

    // Project image hover effects
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            image.classList.toggle('expanded');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Responsive navigation
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('.nav');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}); 