// src/main/resources/static/navbar-auth.js
// This script dynamically updates the navbar authentication area based on the user's login status.
async function getMe() {
    const res = await fetch("/api/me", { credentials: "include", cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  }
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
  
  function renderAnonymous() {
    const el = document.getElementById("auth-area");
    if (!el) return;
  
    // keep class as before
    el.innerHTML = `
      <a href="/login" class="btn btn-outline-light text-decoration-none">Login</a>
      <a href="/signup" class="btn btn-outline-light text-decoration-none">Signup</a>
    `;
  }
  
  function renderAuthed(username) {
    const el = document.getElementById("auth-area");
    if (!el) return;
  
    // similar to <form> for navbar
    el.innerHTML = `
      <span class="text-white fw-semibold me-2">${escapeHtml(username)}</span>
  
      <button
        type="submit"
        class="btn btn-outline-light text-decoration-none"
        formaction="/logout"
        formmethod="post"
      >Logout</button>
  
      <button
        type="submit"
        class="btn btn-danger text-decoration-none"
        formaction="/account/delete"
        formmethod="post"
        onclick="return confirm('Are you sure you want to delete your account? This cannot be undone.');"
      >Delete</button>
    `;
  }
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const me = await getMe();
      if (me && me.username) renderAuthed(me.username);
      else renderAnonymous();
    } catch (e) {
      renderAnonymous();
    }
  });