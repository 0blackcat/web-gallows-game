from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'very_beautiful_secret_key_in_the_world'


def main():
    app.run()


@app.route('/')
def base():
    return render_template('base.html')

if __name__ == "__main__":
    main()