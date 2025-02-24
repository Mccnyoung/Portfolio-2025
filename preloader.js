document.addEventListener('DOMContentLoaded', function() {
    // 이미 preloader를 봤는지 확인
    if (sessionStorage.getItem('preloaderShown')) {
        return; // preloader를 이미 봤다면 실행하지 않음
    }

    const emojis = [
        '/assets/emoji/soccer.png',
        '/assets/emoji/korea.png',
        '/assets/emoji/earth.png',
        '/assets/emoji/sparkle.png',
        '/assets/emoji/canada.png',
        '/assets/emoji/soccer.png',
        '/assets/emoji/korea.png',
        '/assets/emoji/earth.png',
        '/assets/emoji/sparkle.png',
        '/assets/emoji/canada.png'
    ];
    const preloader = document.createElement('div');
    preloader.style.position = 'fixed';
    preloader.style.top = '0';
    preloader.style.left = '0';
    preloader.style.width = '100%';
    preloader.style.height = '100%';
    preloader.style.backgroundColor = '#000';
    preloader.style.display = 'flex';
    preloader.style.justifyContent = 'center';
    preloader.style.alignItems = 'center';
    preloader.style.zIndex = '10000';
    preloader.style.fontSize = '2rem';
    preloader.style.color = '#fff';
    document.body.appendChild(preloader);

    let index = 0;
    function showEmoji() {
        if (index < emojis.length) {
            // 이미지 엘리먼트 생성 및 스타일링
            const img = document.createElement('img');
            img.src = emojis[index];
            img.style.width = '2rem';  // 이미지 크기 조절
            img.style.height = '2rem';
            
            // preloader의 내용을 이미지로 교체
            preloader.innerHTML = '';
            preloader.appendChild(img);
            
            index++;
            setTimeout(showEmoji, 250);
        } else {
            // preloader를 봤다고 표시
            sessionStorage.setItem('preloaderShown', 'true');
            
            preloader.style.transition = 'transform 1s ease-in-out';
            preloader.style.transform = 'translateY(-100%)';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    }

    showEmoji();
});