const image = document.querySelector('.tilt-image');

image.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    
    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

image.addEventListener('mouseleave', () => {
    image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

document.querySelectorAll('.working-main-card').forEach(card => {
    card.addEventListener('click', function() {
        const icon = this.querySelector('img');
        const content = this.nextElementSibling;
        this.classList.toggle('expanded');
        content.classList.toggle('expanded');

        icon.src = this.classList.contains('expanded') 
            ? "/images/minus-icon.svg" 
            : "/images/plus-icon.svg";
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        elements: {
            track: document.querySelector('.carousel-track'),
            contents: document.querySelectorAll('.testimony-main-content'),
            indicators: document.querySelectorAll('.testimony-main-indicator'),
            prevBtn: document.querySelector('.testimony-main-arrow-prev'),
            nextBtn: document.querySelector('.testimony-main-arrow-next'),
            window: document.querySelector('.carousel-window')
        },
        state: {
            currentIndex: 0,
            totalSlides: 0,
            isAnimating: false,
            slideWidth: 0,
            slideMargin: 0,
            trackWidth: 0,
            windowWidth: 0
        },
        
        init() {
            this.calculateDimensions();
            this.setupEventListeners();
            this.updateCarousel();
            window.addEventListener('resize', () => {
                this.calculateDimensions();
                this.updateCarousel();
            });
        },
        
        calculateDimensions() {
            this.state.totalSlides = this.elements.contents.length;
            if (this.elements.contents[0]) {
                const rect = this.elements.contents[0].getBoundingClientRect();
                const computedStyle = window.getComputedStyle(this.elements.contents[0]);
                
                this.state.slideWidth = rect.width;
                this.state.slideMargin = parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight);
            }
            
            this.state.windowWidth = this.elements.window.getBoundingClientRect().width;
            const centerOffset = (this.state.windowWidth - this.state.slideWidth) / 2;
            this.state.initialOffset = centerOffset - this.state.slideMargin / 2;
        },
        
        setupEventListeners() {
            this.elements.prevBtn.addEventListener('click', () => this.prev());
            this.elements.nextBtn.addEventListener('click', () => this.next());
            
            this.elements.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goTo(index));
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        },
        
        updateCarousel() {
            if (this.state.isAnimating) return;
            this.state.isAnimating = true;

            const totalShift = this.state.slideWidth + this.state.slideMargin;
            const offset = -(this.state.currentIndex * totalShift) + this.state.initialOffset;

            this.elements.track.style.transform = `translateX(${offset}px)`;

            this.elements.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.state.currentIndex);
            });

            this.updateArrows();

            setTimeout(() => {
                this.state.isAnimating = false;
            }, 500);
        },

        next() {
            if (this.state.isAnimating) return;
            if (this.state.currentIndex >= this.state.totalSlides - 1) return;

            this.state.currentIndex++;
            this.updateCarousel();
        },

        prev() {
            if (this.state.isAnimating) return;
            if (this.state.currentIndex <= 0) return;

            this.state.currentIndex--;
            this.updateCarousel();
        },
        
        goTo(index) {
            if (this.state.isAnimating || index === this.state.currentIndex) return;
            this.state.currentIndex = index;
            this.updateCarousel();
        },

        updateArrows() {
            const { prevBtn, nextBtn } = this.elements;

            prevBtn.classList.toggle('disabled', this.state.currentIndex === 0);
            nextBtn.classList.toggle(
                'disabled',
                this.state.currentIndex === this.state.totalSlides - 1
            );
        }

    };
    
    carousel.init();
});

document.addEventListener('DOMContentLoaded', function() {
    const radioOptions = document.querySelectorAll('.radio-option');
    
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            radioOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const value = this.getAttribute('data-value');
            console.log('Выбрано:', value);
            const hiddenInput = document.getElementById('contact-type-value');
            if (hiddenInput) {
                hiddenInput.value = value;
            }
        });
    });
    if (radioOptions.length > 0) {
        radioOptions[0].classList.add('active');
    }
});