from flask import Flask, request, render_template

from controller import *



initialize_database()
#add_test_data()



UPLOAD_FOLDER = '/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")



@app.route("/store", methods=["GET"])
def store():
    all_products = get_all_products()
    return render_template("store.html", products=all_products)



@app.route("/admin", methods=["GET", "POST"])
def admin():

    if request.method == "POST":

        action = request.form.get('action')

        if action == 'remove':
            
            remove_product(request.form.get('id'))

        if action == 'edit':

            new_data = {
                'name': request.form.get("name", ""),
                'description': request.form.get("description", ""),
                'availability': request.form.get("availability", '0'),
                'price': request.form.get('price', '0')
            }

            update_product(request.form.get('id'), new_data)


        if action == 'create':

            file = request.files['image']
            if file.filename != '':
                file.save("static/" + file.filename)

            new_data = {
                'name': request.form.get("name"),
                'image': file.filename,
                'description': request.form.get("description"),
                'availability': request.form.get("availability"),
                'price': request.form.get('price')
            }

            add_product(new_data)


    all_products = get_all_products()
    return render_template("adminPortal.html", products=all_products)
    
