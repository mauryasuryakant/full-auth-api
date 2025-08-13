# 🔐 Your Auth API

<!-- Copy Button HTML -->
<div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
  <button onclick="copyReadme()" style="padding:8px 12px; background:#2d89ef; color:white; border:none; border-radius:4px; cursor:pointer;">
    📋 Copy README
  </button>
</div>

<script>
function copyReadme() {
  const text = document.getElementById('readme-content').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('README copied to clipboard!');
  });
}
</script>

<pre id="readme-content">

# 🔐 Your Auth API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)]()
[![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey)]()
[![JWT](https://img.shields.io/badge/JWT-Authentication-blue)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()

A **Node.js & Express.js Authentication API** with **JWT security**, **role-based access control**, and **Google OAuth** support.  
Built with a clean, modular architecture for scalability and ease of integration.

---

## 📂 Project Structure

(your project tree...)

... (rest of README content) ...

</pre>
