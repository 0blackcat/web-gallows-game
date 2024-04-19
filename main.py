from flask import Flask, redirect, url_for, render_template, request
from data.db_session import global_init, create_session
from scripts import SignUpForm, SignInForm, check_password
from flask_login import LoginManager, login_user, logout_user, login_required
from data.users import User
import os

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "sign_in"
app.config['SECRET_KEY'] = 'secret_key'
if not os.path.isdir("db"):
    os.mkdir("db")
global_init("db/data_db.db")


@login_manager.user_loader
def load_user(user_id):
    db_session = create_session()
    return db_session.query(User).get(user_id)


@app.route("/main-page/logout")
@login_required
def logout():  # Функция выхода из профиля.
    logout_user()
    return redirect(url_for("main_pasge"))


@app.route("/")
def redirect_page():  # Функция перенаправления на основной домен сайта
    return redirect(url_for("main_page"))


@app.route("/main-page")
def main_page():  # Функция отображения основной страницы
    return render_template("main_page.html")


@app.route("/main-page/sign-up", methods=['POST', 'GET'])
def sign_up():  # Функция регистрации
    form = SignUpForm()
    if form.validate_on_submit():
        if (len(form.username.data) < 4 and
                [letter for letter in '''!@#$%^*()+?><:"' ''' if letter in form.username.data and letter != ' '] and
                form.username.data.lower() not in ['admin', 'help', 'support']):
            return render_template('sign_up.html', form=form, message="Некорректное имя пользователя",
                                   title='Регистрация')
        if request.form['password'] != form.password_again:
            return render_template('sign_up.html', form=form, message="Пароли не совпадают", title='Регистрация')
        if check_password(form.password_again):
            return render_template('sign_up.html', form=form, message="Слабый пароль", title='Регистрация')
        if form.age < 14:
            return render_template('sign_up.html', form=form, message="Вы ещё юны", title='Регистрация')
        db_session = create_session()
        if db_session.query(User).filter(User.username == form.username.data).first():
            return render_template("sign_up.html", form=form, message='Такой пользователь уже зарегестрирован',
                                   title='Регистрация')
        if db_session.query(User).filter(User.email == form.email.data).first():
            return render_template("sign_up.html", form=form, message="Эта почта уже используется", title="Регистрация")
        user = User()
        user.username = form.username.data
        user.email = form.email.data
        user.age = form.age.data
        user.set_password(request.form['password'])
        db_session.add(user)
        db_session.commit()
        return redirect(url_for("main_page"))
    return render_template("sign_up.html", title='Регистрация', form=form)


@app.route("/main-page/sign-in")
def sign_in():  # Функция авторизации
    form = SignInForm()
    if form.validate_on_submit():
        db_session = create_session()
        user = db_session.query(User).filter(User.username == form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            return redirect(url_for("main_page"))
        if user and not user.check_password(form.password.data):
            return render_template("sign_in.html", message="Неправильный пароль или имя пользователя", form=form)
    return render_template("sign_in.html", title="Авторизация", form=form)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
