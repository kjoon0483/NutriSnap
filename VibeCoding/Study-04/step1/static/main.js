// 생성일시: 2026-04-07 14:10

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const placeholder = document.getElementById('placeholder');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultArea = document.getElementById('resultArea');
const ingredientList = document.getElementById('ingredientList');
const errorMsg = document.getElementById('errorMsg');

let selectedFile = null;

// 클릭으로 파일 선택
uploadArea.addEventListener('click', () => fileInput.click());

// 드래그 앤 드롭
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadFile(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadFile(fileInput.files[0]);
});

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
  resultArea.hidden = true;
  errorMsg.hidden = true;
}

analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  analyzeBtn.textContent = '분석 중...';
  analyzeBtn.classList.add('loading');
  analyzeBtn.disabled = true;
  resultArea.hidden = true;
  errorMsg.hidden = true;

  const formData = new FormData();
  formData.append('image', selectedFile);

  try {
    const res = await fetch('/analyze', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.ingredients) {
      ingredientList.innerHTML = data.ingredients
        .map(item => `<li>${item}</li>`)
        .join('');
      resultArea.hidden = false;
    } else {
      showError(data.error || '알 수 없는 오류가 발생했습니다.');
    }
  } catch (e) {
    showError('서버 연결에 실패했습니다.');
  } finally {
    analyzeBtn.textContent = '분석하기';
    analyzeBtn.classList.remove('loading');
    analyzeBtn.disabled = false;
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.hidden = false;
}
