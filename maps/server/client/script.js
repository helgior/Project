const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Удаляем класс "active" у всех элементов
        navLinks.forEach(l => l.classList.remove('active'));

        // Добавляем класс "active" к текущей ссылке
        this.classList.add('active');
    });
});

