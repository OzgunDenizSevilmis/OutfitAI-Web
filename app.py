from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Veritabanı bağlantısı
def get_connection():
    return psycopg2.connect(
        dbname="outfitapp",
        user="outfituser",
        password="outfitpass",
        host="localhost",
        port="5432"
    )

# Kullanıcı kayıt
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Tüm alanlar zorunludur."}), 400

    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({"message": "Bu email zaten kayıtlı."}), 400

        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                    (name, email, password))
        conn.commit()

        cur.close()
        conn.close()
        return jsonify({"message": "Kayıt başarılı!"}), 201

    except Exception as e:
        return jsonify({"message": "Kayıt sırasında hata oluştu.", "error": str(e)}), 500

# Kullanıcı giriş
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            return jsonify({"message": "Giriş başarılı"}), 200
        else:
            return jsonify({"message": "Geçersiz e-posta veya şifre"}), 401

    except Exception as e:
        return jsonify({"message": "Giriş sırasında hata oluştu", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)