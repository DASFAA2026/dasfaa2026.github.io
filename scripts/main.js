// 랜덤 배경 이미지 설정
const backgroundImages = [
    '../assets/slide/jeju-2748095_1280.jpg',
    '../assets/slide/spring-6008564_1280.jpg',
    '../assets/slide/forest-4775044_1280.jpg',
    '../assets/slide/jeju-1529845_1280.jpg',
    '../assets/slide/daffodil-4092755_1280.jpg',
    '../assets/slide/jeju-1529843_1280.jpg',
    '../assets/slide/cheonjeyeon-falls-1594586_1280.jpg',
    '../assets/slide/cheonjeyeon-falls-1594588_1280.jpg',
    '../assets/slide/cheonjeyeon-falls-1594585_1280.jpg',
    '../assets/slide/jeju-4482313_1280.jpg',
    '../assets/slide/seongsan-sunrise-peak-4266254_1280.jpg',
    '../assets/slide/jeju-934479_1280.jpg',
    '../assets/slide/lux-park-GAn-xxg7Gcc-unsplash.jpg',
    '../assets/slide/jungjin-moon-72WWQ9iNVmA-unsplash.jpg',
    '../assets/slide/ethan-brooke-0f9hZM8y6Ag-unsplash.jpg',
    '../assets/slide/finn-C6wcYQlXD0U-unsplash.jpg',
    '../assets/slide/lightscape-JjnCtpzFXo4-unsplash.jpg'
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const randomImage = backgroundImages[randomIndex];
    document.documentElement.style.setProperty('--random-bg', `url('${randomImage}')`);
}

// 페이지 로드 시 랜덤 배경 이미지 설정
document.addEventListener('DOMContentLoaded', setRandomBackground);

// 페이지 전환 시에도 새로운 랜덤 배경 이미지 설정
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        setRandomBackground();
    }
});

// Swiper 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Get all slide images
    const slideImages = [
        '../assets/slide/spring-6008564_1280.jpg',
        '../assets/slide/jeju-4482313_1280.jpg',
        '../assets/slide/jeju-1529843_1280.jpg',
        '../assets/slide/cheonjeyeon-falls-1594588_1280.jpg',
        '../assets/slide/jeju-1529845_1280.jpg',
        '../assets/slide/jeju-934479_1280.jpg',
        '../assets/slide/seongsan-sunrise-peak-4266254_1280.jpg',
        '../assets/slide/cheonjeyeon-falls-1594585_1280.jpg',
        '../assets/slide/cheonjeyeon-falls-1594586_1280.jpg',
        '../assets/slide/daffodil-4092755_1280.jpg',
        '../assets/slide/jeju-2748095_1280.jpg',
        '../assets/slide/forest-4775044_1280.jpg',
        '../assets/slide/ethan-brooke-0f9hZM8y6Ag-unsplash.jpg',
        '../assets/slide/lux-park-GAn-xxg7Gcc-unsplash.jpg',
        '../assets/slide/jungjin-moon-72WWQ9iNVmA-unsplash.jpg',
        '../assets/slide/finn-C6wcYQlXD0U-unsplash.jpg',
        '../assets/slide/lightscape-JjnCtpzFXo4-unsplash.jpg'
    ];

    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Get random 4 images
    const randomImages = shuffleArray([...slideImages]).slice(0, 4);

    // Create swiper slides for page-title
    const pageTitleSwiper = document.querySelector('.page-title .swiper');
    if (pageTitleSwiper) {
        const swiperWrapper = pageTitleSwiper.querySelector('.swiper-wrapper');
        if (swiperWrapper) {
            // Clear existing content
            swiperWrapper.innerHTML = '';
            
            // Preload images
            const preloadImages = randomImages.map(src => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
                    img.src = src;
                });
            });

            // Wait for all images to load
            Promise.all(preloadImages)
                .then(images => {
                    // Add slides with loaded images
                    images.forEach(img => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide';
                        slide.appendChild(img);
                        swiperWrapper.appendChild(slide);
                    });

                    // Initialize Swiper after images are loaded
                    new Swiper(pageTitleSwiper, {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: true,
                        effect: 'fade',
                        fadeEffect: {
                            crossFade: true
                        },
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false,
                        },
                        speed: 1000
                    });
                })
                .catch(error => {
                    console.error('Error loading images:', error);
                });
        }
    }

    // Initialize hero slider if it exists
    const heroSwiper = document.querySelector('.hero-slider .swiper');
    if (heroSwiper) {
        new Swiper('.hero-slider .swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }
});

// Countdown Timer Function
function initCountdown() {
    // Conference date: April 27, 2026, 9:00 AM Seoul time
    const conferenceDate = new Date('2026-04-27T09:00:00+09:00');
    
    function updateCountdown() {
        // Get current time in Seoul timezone
        const now = new Date();
        const seoulTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
        
        // Calculate the difference
        const timeDifference = conferenceDate.getTime() - seoulTime.getTime();
        
        if (timeDifference > 0) {
            // Calculate days, hours, minutes, seconds
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            // Update the display with leading zeros
            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Conference has started or ended
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Update the text to show conference has started
            const countdownText = document.querySelector('.countdown-text');
            if (countdownText) {
                countdownText.textContent = 'DASFAA 2026 Conference is now in progress!';
            }
        }
    }
    
    // Initial call
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if countdown elements exist (only on index page)
    if (document.getElementById('days')) {
        initCountdown();
    }
}); 