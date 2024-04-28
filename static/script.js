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
let count_used_letters = 0; 


 // кнопки с буквами
const letter_buttons = document.querySelectorAll('input.letter'); 
// контейнер с отображением ПРАВИЛЬНЫХ букв
const letter_display = document.getElementById('display');  
letter_buttons.forEach(button => {  // обходит каждую кнопку с буквой
    button.addEventListener('click', () => {
        // была ли использована эта кнопка?
        if (used_letters.includes(button.value)){ 
            // строчка для дебага
            alert("Эта буква уже в списке");
        } else {
            if (randomWord.includes(button.value.toLowerCase())) { // если буква есть в загаданном слове
                for (let i = 0; i < randomWord.length; i++) {  // проходимся по каждой букве загаданного слова 
                    if (randomWord[i] === button.value.toLowerCase()) {
                        letter_display.textContent = letter_display.textContent.substring(0, i * 2) + button.value + letter_display.textContent.substring(i * 2 + 1); 
                    }
                }
                // console.log(letter_display.textContent);
            } else {
                console.log("Такое буквы НЕТ в слове");
            }
            // увеличение количества используемых букв
            ++count_used_letters;
            // добавление буквы в список используемых
            used_letters.push(button.value);
            // отображение количества используемых попыток
            attempts_display.textContent = count_used_letters; 
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
    alert(randomWord)
    letter_display.textContent = '_ '.repeat(randomWord.length).slice(0, -1);
    // очищаем список с используемыми буквами
    used_letters = [];  
    count_used_letters = 0;
    attempts_display.textContent = count_used_letters;
}   

const start_button = document.getElementById('start_button');  // получение кнопки start
start_button.addEventListener('click', FuncStartButton);  // обработка нажатия кнопки start


const attempts_display = document.getElementById('attempts');  // получение количества попыток
