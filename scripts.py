from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField, BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class SignUpForm(FlaskForm):
    username = StringField("Имя пользователя", validators=[DataRequired()])
    email = EmailField("Почта", validators=[DataRequired()])
    age = IntegerField("Возраст", validators=[DataRequired()])
    password_again = PasswordField(
        "Повторите пароль", validators=[DataRequired()])
    submit = SubmitField("Подтвердить")


class SignInForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    remember_me = BooleanField("Запомнить меня")
    submit = SubmitField('Подтвердить')


def check_password(password):
    return (len(password) < 8 or len([letter for letter in password if letter.isupper()]) == 0 or
            len([letter for letter in password if letter.islower()]) == 0 or
            len([letter for letter in password if letter in '_@$!%*?&.']) == 0)
