/**
 * ЭСКАЛЕРА - LANDING PAGE JAVASCRIPT
 * Все интерактивные функции для лендинга
 */

// ============================================
// 1. ПЛАВНЫЙ СКРОЛЛ К ЭЛЕМЕНТАМ
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Обработка всех кнопок с data-scroll-to атрибутом
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 2. INTERSECTION OBSERVER ДЛЯ АНИМАЦИЙ ПРИ СКРОЛЛЕ
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Отключаем наблюдение после первого появления
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми элементами с классом animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // 3. БЛОК 3: ВЫБОР БОЛИ (мем-генератор)
    // ============================================

    const painButtons = document.querySelectorAll('.pain-btn');
    const memeDisplay = document.getElementById('meme-display');

    // TODO: Замените пути на реальные изображения ваших мемов
    const memeData = {
        guests: {
            image: 'images/meme-guests.jpg',
            text: '"Когда ты 2 года строишь дом, а лестница превращает его в музей строительных ошибок"'
        },
        child: {
            image: 'images/meme-child.jpg',
            text: '"Когда каждое утро просыпаешься от страха, что ребёнок упадёт с лестницы"'
        },
        tired: {
            image: 'images/meme-tired.jpg',
            text: '"Когда ремонт 2 года, а впереди ещё выбор лестницы... и хочется всё бросить"'
        }
    };

    painButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем active класс у всех кнопок
            painButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем active класс к текущей кнопке
            this.classList.add('active');

            const painType = this.getAttribute('data-pain');
            const meme = memeData[painType];

            if (meme && memeDisplay) {
                const memeImage = memeDisplay.querySelector('.meme-image');
                const memeText = memeDisplay.querySelector('.meme-text');

                if (memeImage && memeText) {
                    memeImage.src = meme.image;
                    memeText.textContent = meme.text;

                    // Анимация появления
                    memeDisplay.style.opacity = '0';
                    setTimeout(() => {
                        memeDisplay.style.opacity = '1';
                    }, 100);
                }
            }
        });
    });

    // ============================================
    // 4. БЛОК 11: МАТРИЦА РЕШЕНИЙ (интерактивная)
    // ============================================

    const matrixRows = document.querySelectorAll('.matrix-row');

    matrixRows.forEach(row => {
        const fear = row.querySelector('.matrix-fear');
        const solution = row.querySelector('.matrix-solution');
        const expandBtn = row.querySelector('.matrix-expand');

        fear.addEventListener('click', function() {
            const isVisible = solution.style.display === 'block';

            if (isVisible) {
                solution.style.display = 'none';
                expandBtn.textContent = '▼ Показать решение';
            } else {
                solution.style.display = 'block';
                expandBtn.textContent = '▲ Скрыть решение';

                // Плавный скролл к открытому элементу
                setTimeout(() => {
                    solution.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    });

    // ============================================
    // 5. БЛОК 13: MICRO-COMMITMENT (шаг 1 - checkbox)
    // ============================================

    const safetyCheck = document.getElementById('safety-check');
    const safetyResult = document.getElementById('safety-result');

    if (safetyCheck && safetyResult) {
        safetyCheck.addEventListener('change', function() {
            if (this.checked) {
                safetyResult.style.display = 'block';
                setTimeout(() => {
                    safetyResult.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            } else {
                safetyResult.style.display = 'none';
            }
        });
    }

    // ============================================
    // 6. БЛОК 13: КАЛЬКУЛЯТОР ЦЕНЫ
    // ============================================

    const floorHeight = document.getElementById('floor-height');
    const calcResult = document.getElementById('calc-result');
    const priceValue = document.getElementById('price-value');

    // Цены в зависимости от высоты (примерные значения)
    const priceTable = {
        '2.5': 520000,
        '2.7': 580000,
        '3.0': 650000,
        '3.5': 720000
    };

    if (floorHeight && calcResult && priceValue) {
        floorHeight.addEventListener('change', function() {
            const height = this.value;

            if (height && priceTable[height]) {
                const price = priceTable[height];
                priceValue.textContent = price.toLocaleString('ru-RU');
                calcResult.style.display = 'block';

                setTimeout(() => {
                    calcResult.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    }

    // ============================================
    // 7. БЛОК 13: ЗАГРУЗКА ФОТО ДЛЯ 3D
    // ============================================

    const interiorPhoto = document.getElementById('interior-photo');
    const request3DBtn = document.getElementById('request-3d');

    if (interiorPhoto && request3DBtn) {
        // Показываем имя выбранного файла
        interiorPhoto.addEventListener('change', function() {
            const uploadLabel = document.querySelector('.upload-label');
            if (this.files.length > 0) {
                uploadLabel.textContent = `✅ ${this.files[0].name}`;
            }
        });

        // Обработка кнопки запроса 3D
        request3DBtn.addEventListener('click', function() {
            if (interiorPhoto.files.length === 0) {
                alert('Пожалуйста, сначала загрузите фото интерьера');
                return;
            }

            // TODO: Здесь должна быть интеграция с вашим backend для обработки фото
            alert('Спасибо! Мы получили ваше фото и вышлем 3D-визуализацию в течение 24 часов на ваш email.');

            // Скроллим к форме для заполнения email
            const formSection = document.getElementById('form-section');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ============================================
    // 8. ОТПРАВКА ФОРМЫ (Formspree.io)
    // ============================================

    const leadForm = document.getElementById('lead-form');
    const formSuccess = document.getElementById('form-success');

    if (leadForm && formSuccess) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = leadForm.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(leadForm);

                // TODO: Замените YOUR_FORM_ID на ваш реальный ID из Formspree.io
                const response = await fetch(leadForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Скрываем форму, показываем сообщение
                    leadForm.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // Редирект на страницу благодарности через 2 секунды
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 2000);
                } else {
                    throw new Error('Ошибка отправки формы');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы. Попробуйте ещё раз.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================
    // 9. СОЦИАЛЬНЫЙ ВИДЖЕТ (закрытие)
    // ============================================

    const socialProofWidget = document.getElementById('social-proof-widget');
    const widgetClose = document.querySelector('.widget-close');

    if (socialProofWidget && widgetClose) {
        // Показываем виджет через 5 секунд после загрузки страницы
        setTimeout(() => {
            socialProofWidget.style.display = 'block';
        }, 5000);

        // Закрытие виджета
        widgetClose.addEventListener('click', function() {
            socialProofWidget.style.display = 'none';
        });

        // Автоматически скрываем через 10 секунд
        setTimeout(() => {
            socialProofWidget.style.display = 'none';
        }, 15000);
    }

    // ============================================
    // 10. EXIT-INTENT POPUP
    // ============================================

    const exitPopup = document.getElementById('exit-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupOverlay = document.querySelector('.popup-overlay');
    const requestAddressBtn = document.getElementById('request-address');

    let exitIntentShown = false;

    // Определяем намерение покинуть страницу
    document.addEventListener('mouseleave', function(e) {
        // Только если курсор покидает через верх страницы
        if (e.clientY < 0 && !exitIntentShown) {
            showExitPopup();
        }
    });

    // Альтернативно: показываем popup через 30 секунд, если пользователь не активен
    let inactivityTimer;
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (!exitIntentShown) {
                showExitPopup();
            }
        }, 30000); // 30 секунд
    }

    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    resetInactivityTimer();

    function showExitPopup() {
        if (exitPopup) {
            exitPopup.style.display = 'block';
            exitIntentShown = true;
            document.body.style.overflow = 'hidden'; // Блокируем скролл
        }
    }

    function hideExitPopup() {
        if (exitPopup) {
            exitPopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Восстанавливаем скролл
        }
    }

    if (popupClose) {
        popupClose.addEventListener('click', hideExitPopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', hideExitPopup);
    }

    if (requestAddressBtn) {
        requestAddressBtn.addEventListener('click', function() {
            // TODO: Здесь должна быть логика отправки запроса адреса
            alert('Отлично! Мы отправим вам адрес на email. Пожалуйста, заполните форму ниже.');
            hideExitPopup();

            // Скроллим к форме
            const formSection = document.getElementById('form-section');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Закрытие popup по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideExitPopup();
        }
    });

    // ============================================
    // 11. FAQ АККОРДЕОН (опционально)
    // ============================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display === 'block';

            // Закрываем все открытые ответы (опционально)
            // document.querySelectorAll('.faq-answer').forEach(ans => {
            //     ans.style.display = 'none';
            // });

            if (isVisible) {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // ============================================
    // 12. АНИМАЦИЯ ЧИСЕЛ (опционально)
    // ============================================

    function animateNumber(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Анимируем числа в карточках при появлении
    const numberCards = document.querySelectorAll('.card[data-metric]');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cardNumber = entry.target.querySelector('.card-number');
                const metric = entry.target.getAttribute('data-metric');

                // Извлекаем число из метрики (например, "85%" -> 85)
                const number = parseInt(metric);

                if (cardNumber && !isNaN(number)) {
                    // Анимируем число
                    animateNumber(cardNumber, number, 1500);
                }

                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    numberCards.forEach(card => {
        numberObserver.observe(card);
    });

    // ============================================
    // 13. LAZY LOADING ДЛЯ ИЗОБРАЖЕНИЙ
    // ============================================

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback для старых браузеров
        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    // ============================================
    // 14. ОТСЛЕЖИВАНИЕ СОБЫТИЙ (опционально)
    // ============================================

    // TODO: Интегрируйте с вашей системой аналитики (Google Analytics, Plausible, и т.д.)
    function trackEvent(eventName, eventData) {
        console.log('Event:', eventName, eventData);

        // Пример для Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, eventData);
        // }

        // Пример для Plausible
        // if (typeof plausible !== 'undefined') {
        //     plausible(eventName, { props: eventData });
        // }
    }

    // Отслеживаем клики по CTA кнопкам
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('CTA Click', {
                button_text: this.textContent,
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // ============================================
    // 15. МАСКА ДЛЯ ТЕЛЕФОНА (опционально)
    // ============================================

    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 0) {
                if (value[0] !== '7' && value[0] !== '8') {
                    value = '7' + value;
                }

                let formattedValue = '+7';

                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formattedValue += '-' + value.substring(9, 11);
                }

                e.target.value = formattedValue;
            }
        });
    }

    // ============================================
    // 16. ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА
    // ============================================

    console.log('✅ Эскалера: все скрипты загружены и инициализированы');
});

// ============================================
// 17. УТИЛИТЫ
// ============================================

// Функция для определения устройства
function isMobile() {
    return window.innerWidth <= 768;
}

// Функция для debounce (оптимизация событий)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Обработка изменения размера окна
window.addEventListener('resize', debounce(function() {
    console.log('Window resized:', window.innerWidth);
    // Здесь можно добавить логику для адаптивности
}, 250));

// ============================================
// 18. SERVICE WORKER (PWA) - опционально
// ============================================

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             console.log('ServiceWorker registration successful');
//         }, function(err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }
