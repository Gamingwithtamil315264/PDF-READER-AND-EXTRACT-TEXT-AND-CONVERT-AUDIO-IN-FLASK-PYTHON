from flask import Flask, render_template, request,send_file
import fitz
import gtts
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        text = ""
        file = request.files['f1']
        if file.filename != '':
            file.filename="sample.pdf"
            file.save('uploads/' + file.filename)
            doc = fitz.open('uploads/sample.pdf')
            for page in doc:
                text+=page.get_text()# Use the file's filename
            #t1 = gtts.gTTS(text)
            #t1.save("uploads/audio.mp3")
            return render_template('index.html',state=text,audio="audio.mp3")
        return render_template('index.html',state='No file selected')
    
    return render_template('index.html')
@app.route("/audio")
def send_audio():
    return send_file('uploads/audio.mp3',as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
