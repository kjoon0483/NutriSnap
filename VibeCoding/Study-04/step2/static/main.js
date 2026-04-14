// 생성일시: 2026-04-07 14:10

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const placeholder = document.getElementById('placeholder');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const tagArea = document.getElementById('tagArea');
const tagInput = document.getElementById('tagInput');
const addTagBtn = document.getElementById('addTagBtn');
const recipeBtn = document.getElementById('recipeBtn');
const recipeSection = document.getElementById('recipeSection');
const recipeGrid = document.getElementById('recipeGrid');
const errorMsg = document.getElementById('errorMsg');

let selectedFile = null;
let ingredients = [];

// ── 이미지 업로드 ──────────────────────────────────────────
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadFile(file);
});

fileInput.addEventListener('change', () => { if (fileInput.files[0]) loadFile(fileInput.files[0]); });

function loadFile(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.hidden = false;
    placeholder.hidden = true;
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
  hideError();
}

// ── 이미지 분석 ──────────────────────────────────────────
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

// ── 태그 관리 ──────────────────────────────────────────
function renderTags() {
  tagArea.innerHTML = '';
  ingredients.forEach((item, idx) => {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `${item} <span class="remove" data-idx="${idx}">✕</span>`;
    tagArea.appendChild(tag);
  });
  tagArea.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      ingredients.splice(Number(btn.dataset.idx), 1);
      renderTags();
    });
  });
}

addTagBtn.addEventListener('click', addTag);
tagInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTag(); });

function addTag() {
  const val = tagInput.value.trim();
  if (!val) return;
  ingredients.push(val);
  tagInput.value = '';
  renderTags();
}

// ── 레시피 추천 ──────────────────────────────────────────
recipeBtn.addEventListener('click', async () => {
  if (ingredients.length === 0) { showError('재료를 최소 1개 이상 입력해주세요.'); return; }
  setLoading(recipeBtn, '레시피 생성 중...');
  recipeSection.hidden = true;
  hideError();

  try {
    const res = await fetch('/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
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
  recipes.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3>🍽 ${r.name}</h3>
      <div class="section-title">재료</div>
      <div class="ing-list">${r.ingredients.map(i => `<span>${i}</span>`).join('')}</div>
      <div class="section-title">조리 순서</div>
      <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    `;
    recipeGrid.appendChild(card);
  });
}

// ── 유틸 ──────────────────────────────────────────
function setLoading(btn, text) { btn.textContent = text; btn.classList.add('loading'); btn.disabled = true; }
function resetLoading(btn, text) { btn.textContent = text; btn.classList.remove('loading'); btn.disabled = false; }
function showError(msg) { errorMsg.textContent = msg; errorMsg.hidden = false; }
function hideError() { errorMsg.hidden = true; }
