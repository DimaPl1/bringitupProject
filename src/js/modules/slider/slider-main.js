import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
        this.prevModule = document.querySelectorAll('.prevmodule');
        this.nextModule = document.querySelectorAll('.nextmodule');
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        // Блок трай отвечающий за появление элемента на 3й странице с помощью таймаута
        // 8й пункт ТЗ
        try {
            this.hanson.style.opacity = "0";

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = "1";
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}


        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.add('animated', 'fadeIn');
        });
        this.slides[this.slideIndex - 1].style.display = "block";
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers(btnsModul, n) {
        btnsModul.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();

                this.plusSlides(n);
            });
        });
    }

    render() {
        if(this.container) {
            // блок трай для получения элемента с 3й страницы сайта для использования выше таймаута и показа его на странице
            // 8й пункт ТЗ
            try {
                this.hanson = document.querySelector('.hanson');
            }catch(e){}

            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.plusSlides(1);
                });

                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 1;
                    this.showSlides(this.slideIndex);
                });
            });
            this.showSlides(this.slideIndex);
            this.bindTriggers(this.prevModule, -1);
            this.bindTriggers(this.nextModule, 1);
        } 
    }
}