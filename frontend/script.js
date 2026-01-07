const API_BASE = "https://recipe-management-application-268d.onrender.com";

const dom = {};

document.addEventListener("DOMContentLoaded", () => {
  dom.addForm = document.getElementById("addRecipeForm");
  dom.searchForm = document.getElementById("searchForm");
  dom.filterForm = document.getElementById("filterForm");
  dom.aiImproveForm = document.getElementById("aiImproveForm");
  dom.aiGenerateForm = document.getElementById("aiGenerateForm");

  dom.recipes = document.getElementById("recipes");
  dom.resultsCount = document.getElementById("results-count");
  dom.toast = document.getElementById("toast");

  dom.addStatus = document.getElementById("add-status");
  dom.searchStatus = document.getElementById("search-status");
  dom.filterStatus = document.getElementById("filter-status");
  dom.improveStatus = document.getElementById("improve-status");
  dom.generateStatus = document.getElementById("generate-status");

  dom.aiOutput = document.getElementById("aiOutput");
  dom.generated = document.getElementById("generated");

  dom.addForm.addEventListener("submit", onAddRecipe);
  dom.searchForm.addEventListener("submit", onSearch);
  dom.filterForm.addEventListener("submit", onFilter);
  dom.aiImproveForm.addEventListener("submit", onImprove);
  dom.aiGenerateForm.addEventListener("submit", onGenerate);
});

async function request(url, options = {}, statusEl) {
  try {
    if (statusEl) statusEl.textContent = "Working...";
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }
    const data = await res.json();
    if (statusEl) statusEl.textContent = "Done.";
    return data;
  } catch (err) {
    if (statusEl) statusEl.textContent = err.message;
    showToast(err.message || "Something went wrong");
    throw err;
  }
}

function showToast(message) {
  if (!dom.toast) return;
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  setTimeout(() => dom.toast.classList.remove("show"), 2600);
}

function renderRecipes(data) {
  if (!dom.recipes) return;
  if (!Array.isArray(data) || data.length === 0) {
    dom.recipes.innerHTML = '<div class="empty">No recipes found. Try another query.</div>';
    dom.resultsCount.textContent = "0 results";
    return;
  }

  dom.resultsCount.textContent = `${data.length} result${data.length > 1 ? "s" : ""}`;
  dom.recipes.innerHTML = data
    .map((item) => {
      const ingredients = Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients;
      const cuisine = item.cuisine || "Unknown";
      const difficulty = item.difficulty || "–";
      return `
            <article class="recipe-card">
                <h3>${item.name || "Untitled"}</h3>
                <div class="recipe-meta">
                    <span>${cuisine}</span>
                    <span>${difficulty}</span>
                </div>
                <p class="recipe-ingredients">${ingredients || "No ingredients listed."}</p>
            </article>
        `;
    })
    .join("");
}

async function onAddRecipe(event) {
  event.preventDefault();
  const payload = {
    name: document.getElementById("name").value,
    ingredients: document.getElementById("ingredients").value,
    cuisine: document.getElementById("cuisine").value,
    difficulty: document.getElementById("difficulty").value,
    instructions: document.getElementById("instructions").value,
  };

  await request(
    `${API_BASE}/recipes/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    dom.addStatus
  );

  showToast("Recipe added");
  event.target.reset();
}

async function onSearch(event) {
  event.preventDefault();
  const ingredient = document.getElementById("searchInput").value.trim();
  if (!ingredient) return;
  const data = await request(
    `${API_BASE}/recipes/search?ingredient=${encodeURIComponent(ingredient)}`,
    {},
    dom.searchStatus
  );
  renderRecipes(data);
}

async function onFilter(event) {
  event.preventDefault();
  const cuisine = document.getElementById("filterCuisine").value.trim();
  const difficulty = document.getElementById("filterDifficulty").value.trim();
  const params = new URLSearchParams();
  if (cuisine) params.append("cuisine", cuisine);
  if (difficulty) params.append("difficulty", difficulty);
  const data = await request(`${API_BASE}/recipes/filter?${params.toString()}`, {}, dom.filterStatus);
  renderRecipes(data);
}

async function onImprove(event) {
  event.preventDefault();
  const recipe = document.getElementById("aiInput").value.trim();
  if (!recipe) return;
  const data = await request(
    `${API_BASE}/ai/improve`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe }),
    },
    dom.improveStatus
  );
  dom.aiOutput.textContent = data.ai_suggestion || "No suggestion returned.";
}

async function onGenerate(event) {
  event.preventDefault();
  const ingredient = document.getElementById("ingredient").value.trim();
  if (!ingredient) return;
  const data = await request(
    `${API_BASE}/ai/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredient }),
    },
    dom.generateStatus
  );
  dom.generated.textContent = data.recipe || "No recipe returned.";
}
