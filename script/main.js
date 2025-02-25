document.addEventListener('DOMContentLoaded', () => {
    const introSection = document.querySelector('.intro-section');
    const profileCard = introSection?.querySelector('.profile-img');
    const workItems = document.querySelectorAll('.work-item');
    
    // 조기 반환으로 불필요한 코드 실행 방지
    if (!profileCard) return;

    // Map 대신 Set 사용 (단순 이미지 경로 저장용도)
    const preloadImages = () => {
        const preloadedImages = new Set();
        workItems.forEach(item => {
            const thumbnail = item.getAttribute('data-thumbnail');
            if (thumbnail) {
                const img = new Image();
                img.src = thumbnail;
                preloadedImages.add(thumbnail);
            }
        });
        return preloadedImages;
    };
    
    const preloadedImages = preloadImages();
    const defaultImage = profileCard.src;
    let isTransitioning = false;
    
    // 이미지 전환 로직 개선
    const handleImageTransition = (newSrc) => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        profileCard.style.opacity = '0';
        
        // requestAnimationFrame 사용하여 성능 최적화
        requestAnimationFrame(() => {
            profileCard.src = newSrc;
            profileCard.style.opacity = '1';
            isTransitioning = false;
        });
    };

    // 불필요한 이벤트 리스너 제거
    workItems.forEach(item => {
        const thumbnail = item.getAttribute('data-thumbnail');
        const link = item.querySelector('a');
        
        if (!thumbnail) return;

        link.addEventListener('mouseenter', () => handleImageTransition(thumbnail));
        link.addEventListener('mouseleave', () => handleImageTransition(defaultImage));
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