// 생성일시: 2026-04-07 14:10

// ── 탭 ────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'saved') renderSaved();
  });
});

// ── 프로필 ────────────────────────────────────────────────
function loadProfile() {
  return JSON.parse(localStorage.getItem('fridgeProfile') || '{"diet":"일반","style":"","allergies":""}');
}

function applyProfileToUI() {
  const p = loadProfile();
  const dietEl = document.querySelector(`input[name="diet"][value="${CSS.escape(p.diet)}"]`);
  if (dietEl) dietEl.checked = true;
  const styleEl = document.querySelector(`input[name="style"][value="${CSS.escape(p.style || '')}"]`);
  if (styleEl) styleEl.checked = true;
  document.getElementById('allergiesInput').value = p.allergies || '';
}

document.getElementById('saveProfileBtn').addEventListener('click', () => {
  const profile = {
    diet: document.querySelector('input[name="diet"]:checked').value,
    style: document.querySelector('input[name="style"]:checked').value,
    allergies: document.getElementById('allergiesInput').value,
  };
  localStorage.setItem('fridgeProfile', JSON.stringify(profile));
  const msg = document.getElementById('profileSaved');
  msg.hidden = false;
  setTimeout(() => { msg.hidden = true; }, 2000);
});

applyProfileToUI();

// ── 이미지 업로드 ──────────────────────────────────────────
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const placeholder = document.getElementById('placeholder');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');

let selectedFile = null;
let ingredients = [];

uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('dragover'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadFile(file);
});
fileInput.addEventListener('change', () => { if (fileInput.files[0]) loadFile(fileInput.files[0]); });

function loadFile(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.hidden = false;
    placeholder.hidden = true;
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
  hideError();
}

analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;
  setLoading(analyzeBtn, '인식 중...');
  hideError();

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    const res = await fetch('/analyze', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.ingredients && data.ingredients.length > 0) {
      ingredients = data.ingredients;
      renderTags();
    } else {
      showError(data.error || '재료를 인식하지 못했습니다. 직접 입력해주세요.');
    }
  } catch (e) {
    showError('서버 연결에 실패했습니다.');
  } finally {
    resetLoading(analyzeBtn, '사진으로 재료 인식');
  }
});

// ── 태그 ──────────────────────────────────────────────────
const tagArea = document.getElementById('tagArea');
const tagInput = document.getElementById('tagInput');

function renderTags() {
  tagArea.innerHTML = '';
  ingredients.forEach((item, idx) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    const text = document.createTextNode(item + ' ');
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove';
    removeBtn.dataset.idx = idx;
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => {
      ingredients.splice(idx, 1);
      renderTags();
    });
    tag.appendChild(text);
    tag.appendChild(removeBtn);
    tagArea.appendChild(tag);
  });
}

document.getElementById('addTagBtn').addEventListener('click', addTag);
tagInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTag(); });

function addTag() {
  const val = tagInput.value.trim();
  if (!val) return;
  ingredients.push(val);
  tagInput.value = '';
  renderTags();
}

// ── 레시피 추천 ───────────────────────────────────────────
const recipeSection = document.getElementById('recipeSection');
const recipeGrid = document.getElementById('recipeGrid');

document.getElementById('recipeBtn').addEventListener('click', async () => {
  if (ingredients.length === 0) { showError('재료를 최소 1개 이상 입력해주세요.'); return; }

  const recipeBtn = document.getElementById('recipeBtn');
  setLoading(recipeBtn, '레시피 생성 중...');
  recipeSection.hidden = true;
  hideError();

  const profile = loadProfile();

  try {
    const res = await fetch('/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients, profile }),
    });
    const data = await res.json();
    if (data.recipes) {
      renderRecipes(data.recipes);
      recipeSection.hidden = false;
    } else {
      showError(data.error || '레시피 생성에 실패했습니다.');
    }
  } catch (e) {
    showError('서버 연결에 실패했습니다.');
  } finally {
    resetLoading(recipeBtn, '레시피 추천받기');
  }
});

function renderRecipes(recipes) {
  recipeGrid.innerHTML = '';
  recipes.forEach(r => {
    recipeGrid.appendChild(makeRecipeCard(r, true));
  });
}

function makeRecipeCard(r, showSave) {
  const saved = getSaved();
  const isSaved = saved.some(s => s.name === r.name);

  const card = document.createElement('div');
  card.className = 'recipe-card';

  // 헤더
  const header = document.createElement('div');
  header.className = 'recipe-card-header';

  const title = document.createElement('h3');
  title.textContent = '🍽 ' + r.name;
  header.appendChild(title);

  if (showSave) {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn' + (isSaved ? ' saved' : '');
    saveBtn.textContent = isSaved ? '★ 저장됨' : '☆ 저장';
    saveBtn.addEventListener('click', function () {
      toggleSave(r);
      const nowSaved = getSaved().some(s => s.name === r.name);
      this.classList.toggle('saved', nowSaved);
      this.textContent = nowSaved ? '★ 저장됨' : '☆ 저장';
    });
    header.appendChild(saveBtn);
  } else {
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', function () {
      deleteRecipe(r.name);
      card.remove();
      checkSavedEmpty();
    });
    header.appendChild(delBtn);
  }
  card.appendChild(header);

  // 재료
  const ingTitle = document.createElement('div');
  ingTitle.className = 'section-title';
  ingTitle.textContent = '재료';
  card.appendChild(ingTitle);

  const ingList = document.createElement('div');
  ingList.className = 'ing-list';
  r.ingredients.forEach(i => {
    const span = document.createElement('span');
    span.textContent = i;
    ingList.appendChild(span);
  });
  card.appendChild(ingList);

  // 조리 순서
  const stepsTitle = document.createElement('div');
  stepsTitle.className = 'section-title';
  stepsTitle.textContent = '조리 순서';
  card.appendChild(stepsTitle);

  const ol = document.createElement('ol');
  r.steps.forEach(s => {
    const li = document.createElement('li');
    li.textContent = s;
    ol.appendChild(li);
  });
  card.appendChild(ol);

  return card;
}

// ── 즐겨찾기 ──────────────────────────────────────────────
function getSaved() {
  return JSON.parse(localStorage.getItem('savedRecipes') || '[]');
}

function toggleSave(recipe) {
  const saved = getSaved();
  const idx = saved.findIndex(s => s.name === recipe.name);
  if (idx === -1) saved.push(recipe);
  else saved.splice(idx, 1);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
}

function deleteRecipe(name) {
  const saved = getSaved().filter(s => s.name !== name);
  localStorage.setItem('savedRecipes', JSON.stringify(saved));
}

function renderSaved() {
  const grid = document.getElementById('savedGrid');
  const saved = getSaved();
  grid.innerHTML = '';
  saved.forEach(r => grid.appendChild(makeRecipeCard(r, false)));
  document.getElementById('savedEmpty').hidden = saved.length > 0;
}

function checkSavedEmpty() {
  const empty = document.getElementById('savedEmpty');
  empty.hidden = getSaved().length > 0;
}

// ── 유틸 ──────────────────────────────────────────────────
function setLoading(btn, text) {
  btn.innerHTML = `<span class="spinner"></span>${text}`;
  btn.classList.add('loading');
  btn.disabled = true;
}
function resetLoading(btn, text) {
  btn.textContent = text;
  btn.classList.remove('loading');
  btn.disabled = false;
}
function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.hidden = false;
}
function hideError() { document.getElementById('errorMsg').hidden = true; }
