// список слов для игры
const words_for_game = [
"яблоко",
"стол",
"дом",
"книга",
"кот",
"окно",
"дерево",
"солнце",
"молоко",
"собака",
"компьютер",
"машина",
"планета",
"коробка",
"парк",
"банан",
"колесо",
"птица",
"гора",
"море",
"луна",
"цветок",
"песок",
"птица",
"корабль",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия",
"космический",
"космонавтика",
"космический",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия",
"космический",
"космонавтика",
"космический",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия",
"космический",
"космонавтика",
"космический",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия",
"космический",
"космонавтика",
"космический",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия",
"космический",
"космонавтика",
"космический",
"космос",
"космонавт",
"планета",
"космический",
"комета",
"астроном",
"галактика",
"солнце",
"луна",
"марс",
"сатурн",
"небо",
"звезда",
"вселенная",
"планетарий",
"астрономия"];
// уже использованные буквы пользователем
let used_letters = [];
// прошлое слово пользователя
let past_word = words_for_game[Math.floor(Math.random() * (words_for_game.length - 1))];
// количество использованных букв пользователем
let count_used_attempts = 0;
let count_guessed_words = 0;
let isPlaying = true;
let isGuess = true;


 // кнопки с буквами
const letter_buttons = document.querySelectorAll('input.letter');
// контейнер с отображением ПРАВИЛЬНЫХ букв
const word_display = document.getElementById('display');
letter_buttons.forEach(button => {  // обходит каждую кнопку с буквой
    button.addEventListener('click', () => {
        // если есть еще попытки И игра продолжается
        if (isPlaying && count_used_attempts < 11) {
        // была ли использована эта кнопка?
        if (used_letters.includes(button.value)){
            // строчка для дебага
            // alert("Эта буква уже в списке");
        } else {
            if (randomWord.includes(button.value.toLowerCase())) { // если буква есть в загаданном слове
                for (let i = 0; i < randomWord.length; i++) {  // проходимся по каждой букве загаданного слова
                    if (randomWord[i] === button.value.toLowerCase()) {
                        word_display.textContent = word_display.textContent.substring(0, i * 2) + button.value + word_display.textContent.substring(i * 2 + 1);
                    }
                }
            } else {
                // увеличение количества попыток
                ++count_used_attempts;
                console.log("Такое буквы НЕТ в слове");
            }
            // добавление буквы в список используемых
            used_letters.push(button.value);
            // отображение количества используемых попыток
            attempts_display.textContent = count_used_attempts;
            // отображение используемых букв
            used_letters_display.textContent = used_letters.join(' ');

            if (count_used_attempts == 11) {
                word_display.textContent = randomWord.toUpperCase();
                start_button.textContent = "Хотите начать еще раз?";
                isGuess = false; // не угадал
                isPlaying = false;
            }

            // если все буквы отгаданы
            if (isGuess && !word_display.textContent.includes('_')) {
                // console.log('Вы отгадали слово!')
                start_button.textContent = "Отлично! Хотите сыграть еще раз?"
                isPlaying = false;

                // отправка данных в Python
                ++count_guessed_words;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/main-page", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({value: count_guessed_words}));
            }
            }
        gallows_man_display.src = `/static/images/gallows_man_${(count_used_attempts + 2).toString()}.png`
        }
    });
});


// получение случайного слова из списка для игры
const chooseRandomWord = () => {
    let randomWord;
    do {
    randomWord = words_for_game[Math.floor(Math.random() * words_for_game.length)];
    } while (randomWord === past_word);
    past_word = randomWord;
    return randomWord;
}


// обработка нажатия кнопки start
const FuncStartButton = () => {
    randomWord = chooseRandomWord();
    // alert(randomWord)
    word_display.textContent = '_ '.repeat(randomWord.length).slice(0, -1);
    // очищаем список с используемыми буквами
    used_letters = [];
    count_used_attempts = 0;
    attempts_display.textContent = count_used_attempts;
    used_letters_display.textContent = used_letters.join(' ')
    start_button.textContent = 'Начать заново'
    isPlaying = true;
    isGuess = true;
    gallows_man_display.src = `/static/images/gallows_man_${(count_used_attempts + 2).toString()}.png`
}

const start_button = document.getElementById('start_button');  // получение кнопки start
start_button.addEventListener('click', FuncStartButton);  // обработка нажатия кнопки start


const attempts_display = document.getElementById('attempts');  // получение количества попыток

const used_letters_display = document.getElementById('used_letters'); // получение используемых букв

const gallows_man_display = document.getElementById('gallows_man'); // получение картинки висельницы
