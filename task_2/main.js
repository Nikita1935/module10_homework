



/*
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
*/

let btn = document.querySelector('.j-btn');

btn.addEventListener ('click', () => {
    alert ('Pазмер экрана по ширине ' + window.innerWidth + ' px.' + ' Размер экрана по высоте ' + window.innerHeight + ' px.')
})