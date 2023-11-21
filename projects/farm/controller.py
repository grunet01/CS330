import os
import sqlite3
import uuid



def initialize_database():
    current_directory = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_directory, "product.db")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS product (
                        id TEXT PRIMARY KEY,
                        name TEXT,
                        image TEXT,
                        description TEXT,
                        availability INTEGER,
                        price REAL
                    )''')

    conn.commit()
    conn.close()



def get_all_products():

    current_directory = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_directory, 'product.db')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM product")
    rows = cursor.fetchall()

    conn.close()
    return rows



def remove_product(product_id):

    current_directory = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_directory, 'product.db')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(f"DELETE FROM product WHERE id=?", (product_id,))
    conn.commit()

    conn.close()



def update_product(product_id, new_data):

    current_directory = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_directory, 'product.db')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    update_query = f'''
        UPDATE product
        SET name = ?,
            description = ?,
            availability = ?,
            price = ?
        WHERE id = ?
    '''

    update_data = (
        new_data.get('name', ''),
        new_data.get('description', ''),
        new_data.get('availability', 0),
        new_data.get('price', 0.0),
        product_id
    )

    cursor.execute(update_query, update_data)
    conn.commit()

    conn.close()


def add_product(new_data):

    current_directory = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(current_directory, "product.db")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO product (id, name, image, description, availability, price) 
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (str(uuid.uuid4()), new_data.get('name', ''), new_data.get('image', ''), new_data.get('description', ''), new_data.get('availability', 0), new_data.get('price', 0.0)))

    conn.commit()
    conn.close()

