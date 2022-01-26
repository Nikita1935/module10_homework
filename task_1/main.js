
/*
Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео).
При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
*/

const btn = document.querySelector('.j-btn');
const btnDiv = document.querySelectorAll('.btn__icon')

btn.addEventListener ('click', () => {
    btnDiv.forEach(icon => icon.classList.toggle('js-icon'));
})