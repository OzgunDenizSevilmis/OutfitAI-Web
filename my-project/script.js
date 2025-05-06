document.addEventListener('DOMContentLoaded', () => {
  // 🔒 Giriş Formu
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        showFormError('Lütfen tüm alanları doldurun');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          window.location.href = 'home.html';
        } else {
          showFormError(result.message || 'Giriş başarısız.');
        }
      } catch (err) {
        showFormError('Sunucuya bağlanılamadı.');
      }
    });
  }

  // 📝 Kayıt Formu
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const surname = document.getElementById('surname').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!name || !surname || !email || !password) {
        alert('Tüm alanları doldurun.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, surname, email, password })
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.message);
          window.location.href = 'index.html';
        } else {
          alert(result.message || 'Kayıt başarısız.');
        }
      } catch (err) {
        alert('Sunucuya bağlanılamadı.');
      }
    });
  }

  // 🚪 Çıkış Yap Butonu
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }

  // 👤 Profilim Butonu
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'profile.html';
    });
  }
});

// ❗Hata mesajı gösterici
function showFormError(message) {
  const existingError = document.querySelector('.form-error');
  if (existingError) existingError.remove();

  const form = document.querySelector('form');
  if (!form) return;

  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.marginTop = '15px';
  errorDiv.style.fontSize = '14px';
  errorDiv.style.textAlign = 'center';
  errorDiv.style.backgroundColor = '#fbeaea';
  errorDiv.style.padding = '10px';
  errorDiv.style.borderRadius = '6px';

  form.appendChild(errorDiv);

  setTimeout(() => errorDiv.remove(), 4000);
}