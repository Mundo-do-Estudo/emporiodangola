      // JavaScript para funcionalidades do site
        document.addEventListener('DOMContentLoaded', function() {
            // Toggle do menu hamburger
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }));
            
            // Toggle do tema claro/escuro
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
            
            // Controle das categorias do cardápio
            const categoryBtns = document.querySelectorAll('.category-btn');
            const menuCategories = document.querySelectorAll('.menu-category');
            
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class de todos os botões
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Adiciona active class ao botão clicado
                    btn.classList.add('active');
                    
                    // Esconde todas as categorias
                    menuCategories.forEach(category => {
                        category.classList.remove('active');
                    });
                    
                    // Mostra a categoria correspondente
                    const categoryId = btn.getAttribute('data-category');
                    document.getElementById(categoryId).classList.add('active');
                });
            });
            
            // Atualizar status do horário de funcionamento
            function updateHoursStatus() {
                const hoursStatus = document.getElementById('hoursStatus');
                const now = new Date();
                const day = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
                const hour = now.getHours();
                const minutes = now.getMinutes();
                const currentTime = hour + (minutes / 100);
                
                let isOpen = false;
                let closingTime = "18:30";
                let countdownText = "";
                
                // Horários de funcionamento
                if (day >= 1 && day <= 5) { // Segunda a Sexta
                    if (currentTime >= 7 && currentTime < 18.5) {
                        isOpen = true;
                        closingTime = "18:30";
                    }
                } else if (day === 6) { // Sábado
                    if (currentTime >= 7 && currentTime < 16) {
                        isOpen = true;
                        closingTime = "16:00";
                    }
                } else if (day === 0) { // Domingo
                    if (currentTime >= 8 && currentTime < 14) {
                        isOpen = true;
                        closingTime = "14:00";
                    }
                }
                
                // Calcular tempo restante
                if (isOpen) {
                    const closeHour = parseInt(closingTime.split(':')[0]);
                    const closeMinute = parseInt(closingTime.split(':')[1]);
                    const closeTime = closeHour + (closeMinute / 100);
                    
                    let hoursLeft = closeHour - hour;
                    let minutesLeft = closeMinute - minutes;
                    
                    if (minutesLeft < 0) {
                        hoursLeft--;
                        minutesLeft = 60 + minutesLeft;
                    }
                    
                    if (hoursLeft > 0) {
                        countdownText = `Fecha em ${hoursLeft}h${minutesLeft > 0 ? ` e ${minutesLeft}min` : ''}`;
                    } else if (minutesLeft > 0) {
                        countdownText = `Fecha em ${minutesLeft} minutos`;
                    } else {
                        countdownText = `Fecha em breve`;
                    }
                    
                    hoursStatus.innerHTML = `
                        <div class="hours-status open">
                            <i class="fas fa-door-open"></i>
                            <span>Aberto agora</span>
                        </div>
                        <div class="hours-countdown">${countdownText}</div>
                    `;
                } else {
                    let nextOpenTime = "07:00";
                    let nextOpenDay = "amanhã";
                    
                    if (day === 0) { // Domingo
                        if (currentTime >= 14) {
                            nextOpenTime = "07:00";
                            nextOpenDay = "amanhã (segunda)";
                        }
                    } else if (day === 6) { // Sábado
                        if (currentTime >= 16) {
                            nextOpenTime = "08:00";
                            nextOpenDay = "amanhã (domingo)";
                        }
                    } else if (day >= 1 && day <= 5) { // Segunda a Sexta
                        if (currentTime >= 18.5) {
                            if (day === 5) { // Sexta
                                nextOpenTime = "08:00";
                                nextOpenDay = "depois de amanhã (domingo)";
                            } else {
                                nextOpenTime = "07:00";
                                nextOpenDay = "amanhã";
                            }
                        }
                    }
                    
                    hoursStatus.innerHTML = `
                        <div class="hours-status closed">
                            <i class="fas fa-door-closed"></i>
                            <span>Fechado agora</span>
                        </div>
                        <div class="hours-countdown">Abre ${nextOpenDay} às ${nextOpenTime}</div>
                    `;
                }
            }
            
            // Inicializar status do horário
            updateHoursStatus();
            // Atualizar a cada minuto
            setInterval(updateHoursStatus, 60000);
            
            // Funções para os botões
            document.getElementById('routesBtn').addEventListener('click', () => {
                window.open('https://www.google.com/maps/dir//R.+Bom+Retiro,+90+-+Vila+Sao+Paulo,+Mogi+das+Cruzes+-+SP,+08840-120', '_blank');
            });
            
            document.getElementById('saveBtn').addEventListener('click', () => {
                alert('Empório D\'angola salvo nos seus favoritos!');
                // Em um caso real, isso poderia salvar no localStorage
            });
            
            document.getElementById('shareBtn').addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Empório D\'angola Restaurante e Café',
                        text: 'Conheça o Empório D\'angola, restaurante com comida caseira em Mogi das Cruzes!',
                        url: window.location.href,
                    });
                } else {
                    // Fallback para copiar para a área de transferência
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copiado para a área de transferência! Compartilhe com seus amigos.');
                }
            });
            
            // Animação de entrada por scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, observerOptions);
            
            // Observar elementos com classe 'hidden'
            document.querySelectorAll('.hidden').forEach(el => {
                observer.observe(el);
            });
        });