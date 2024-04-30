// список слов для игры
const words_for_game = [
    "стол",
    "книга",
    "дом",
    "солнце",
    "кошка",
    "планета",
    "окно",
    "корабль",
    "цветок",
    "медведь",
    "дерево",
    "собака",
    "звезда",
    "мышь",
    "птица",
    "банан",
    "море",
    "гора",
    "снег",
    "река",
    "автомобиль",
    "яблоко",
    "картина",
    "человек",
    "телефон",
    "парк",
    "паровоз",
    "кресло",
    "кот",
    "поле",
    "красота",
    "замок",
    "трава",
    "портрет",
    "мост",
    "музей",
    "берег",
    "печь",
    "фотоаппарат",
    "дорога",
    "танк",
    "куст",
    "молоко",
    "сок",
    "котенок",
    "шарик",
    "корова",
    "лист",
    "король",
    "королева",
    "сказка",
    "автобус",
    "телевизор",
    "стекло",
    "порт",
    "свет",
    "деньги",
    "дождь",
    "фильм",
    "корзина",
    "карта",
    "нос",
    "парень",
    "девушка",
    "сосед",
    "забор",
    "конь",
    "компьютер",
    "заметка",
    "дверь",
    "ключ",
    "улица",
    "холодильник",
    "картинка",
    "мечта",
    "костюм",
    "облако",
    "мышка",
    "поезд",
    "стакан",
    "воздух",
    "футбол",
    "флаг",
    "судно",
    "лес",
    "мозг",
    "рот",
    "ноутбук",
    "принцесса",
    "дракон",
    "собиратель",
    "крыша",
    "шапка",
    "палец",
    "сон",
    "птичка",
    "воробей",
    "часы",
    "бревно",
    "палка",
    "звук",
    "блокнот",
    "автомат",
    "принтер",
    "муравей",
    "парик",
    "сапог",
    "фонтан",
    "танец",
    "пират",
    "корабль",
    "паром",
    "видео",
    "тетрадь",
    "сотрудник",
    "музыка",
    "диван",
    "стена",
    "выход",
    "столб",
    "нога",
    "тень",
    "платье",
    "подушка",
    "минута",
    "футболка",
    "дым",
    "костер",
    "джинсы",
    "пиджак",
    "сумка",
    "волна",
    "кольцо",
    "цепь",
    "подарок",
    "тропинка",
    "крыло",
    "чайник",
    "молния",
    "билет",
    "лифт",
    "подоконник",
    "звездочка",
    "солдат",
    "пистолет",
    "космос",
    "космонавт",
    "приз",
    "диплом",
    "календарь",
    "символ",
    "магазин",
    "механизм",
    "весна",
    "лето",
    "осень",
    "зима",
    "птицы",
    "рыба",
    "заяц",
    "медведи",
    "бобер",
    "волк",
    "лиса",
    "олень",
    "муха",
    "пчела",
    "комар",
    "паук",
    "слон",
    "жираф",
    "лев",
    "тигр",
    "зебра",
    "жираф",
    "крокодил",
    "хомяк",
    "свинья",
    "корова",
    "лошадь",
    "овца",
    "курица",
    "утка",
    "гусь",
    "павлин",
    "фазан",
    "голубь",
    "воробей",
    "ястреб",
    "сокол",
    "орел",
    "аллигатор",
    "кролик",
    "баран",
    "петух",
    "жаворонок",
    "ворона",
    "сова",
    "лебедь",
    "чайка",
    "аист",
    "фламинго",
    "кондор",
    "коршун",
    "пеликан",
    "каракара",
    "качалка",
    "автобус",
    "троллейбус",
    "трамвай",
    "метро",
    "такси",
    "трактор",
    "кран",
    "бульдозер",
    "погрузчик",
    "экскаватор",
    "грузовик",
    "поезд",
    "поезд",
    "электричка",
    "самолет",
    "вертолет",
    "планер",
    "корабль",
    "лодка",
    "пароход",
    "катер",
    "яхта",
    "парусник",
    "байдарка"
]
// уже использованные буквы пользователем
let used_letters = [];
// прошлое слово пользователя
let past_word = words_for_game[Math.floor(Math.random() * (words_for_game.length - 1))];
// количество использованных букв пользователем

// let count_guessed_words = 0;
let count_used_attempts = 0;
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
            // attempts_display.textContent = count_used_attempts;
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
                // ++count_guessed_words;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/main-page", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({value: 1}));
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
    // attempts_display.textContent = count_used_attempts;
    used_letters_display.textContent = used_letters.join(' ')
    start_button.textContent = 'Начать заново'
    isPlaying = true;
    isGuess = true;
    gallows_man_display.src = `/static/images/gallows_man_${(count_used_attempts + 2).toString()}.png`
}

const start_button = document.getElementById('start_button');  // получение кнопки start
start_button.addEventListener('click', FuncStartButton);  // обработка нажатия кнопки start


// const attempts_display = document.getElementById('attempts');  // получение количества попыток

const used_letters_display = document.getElementById('used_letters'); // получение используемых букв

const gallows_man_display = document.getElementById('gallows_man'); // получение картинки висельницы
