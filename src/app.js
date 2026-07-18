const styles = ['Cinematic', 'Watercolor', 'Pixel art', 'Ink sketch', 'Oil paint', 'Cyberpunk'];
const palettes = [
  ['#f97316', '#facc15', '#fde68a', '#1f2937'],
  ['#38bdf8', '#6366f1', '#a78bfa', '#111827'],
  ['#22c55e', '#84cc16', '#f0fdf4', '#14532d'],
  ['#f43f5e', '#fb7185', '#fecdd3', '#450a0a'],
];

const state = {
  prompt: 'A luminous fox spirit walking through a rainy neon forest',
  style: styles[0],
  activePalette: 0,
  brushColor: palettes[0][0],
  brushSize: 18,
  isDrawing: false,
};

const elements = {
  prompt: document.querySelector('#prompt'),
  style: document.querySelector('#style'),
  palettes: document.querySelector('#palettes'),
  swatches: document.querySelector('#swatches'),
  brushSize: document.querySelector('#brush-size'),
  sizeLabel: document.querySelector('#size-label'),
  output: document.querySelector('#enhanced-prompt'),
  canvas: document.querySelector('#paint-canvas'),
  clear: document.querySelector('#clear-canvas'),
  download: document.querySelector('#download-sketch'),
  upload: document.querySelector('#image-upload'),
  dropZone: document.querySelector('#drop-zone'),
};

const ctx = elements.canvas.getContext('2d');

function setupCanvas() {
  const ratio = window.devicePixelRatio || 1;
  elements.canvas.width = 900 * ratio;
  elements.canvas.height = 560 * ratio;
  elements.canvas.style.width = '900px';
  elements.canvas.style.height = '560px';
  ctx.scale(ratio, ratio);
  resetCanvas();
}

function resetCanvas() {
  ctx.fillStyle = '#101827';
  ctx.fillRect(0, 0, 900, 560);
  ctx.globalAlpha = 0.88;
  ctx.fillStyle = '#172554';
  ctx.beginPath();
  ctx.arc(720, 120, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawUploadedImage(file) {
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const image = new Image();
    image.addEventListener('load', () => {
      resetCanvas();
      const scale = Math.min(820 / image.width, 500 / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (900 - width) / 2;
      const y = (560 - height) / 2;

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 28;
      ctx.drawImage(image, x, y, width, height);
      ctx.restore();
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function renderStyleOptions() {
  elements.style.innerHTML = styles.map((style) => `<option>${style}</option>`).join('');
  elements.style.value = state.style;
}

function renderPalettes() {
  elements.palettes.innerHTML = palettes.map((palette, index) => `
    <button class="palette ${index === state.activePalette ? 'active' : ''}" data-palette="${index}" aria-label="Use palette ${index + 1}">
      ${palette.map((color) => `<span style="background:${color}"></span>`).join('')}
    </button>
  `).join('');

  elements.swatches.innerHTML = palettes[state.activePalette].map((color) => `
    <button class="swatch ${color === state.brushColor ? 'active' : ''}" data-color="${color}" style="background:${color}" aria-label="Use ${color} brush"></button>
  `).join('');
}

function updatePrompt() {
  const tones = palettes[state.activePalette].join(', ');
  elements.output.textContent = `${state.prompt.trim()} — ${state.style.toLowerCase()} style, cohesive color palette (${tones}), high detail, balanced composition`;
}

function getPoint(event) {
  const rect = elements.canvas.getBoundingClientRect();
  const pointer = event.touches?.[0] ?? event;
  return { x: pointer.clientX - rect.left, y: pointer.clientY - rect.top };
}

function startDrawing(event) {
  const point = getPoint(event);
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  state.isDrawing = true;
}

function draw(event) {
  if (!state.isDrawing) return;
  event.preventDefault();
  const point = getPoint(event);
  ctx.lineTo(point.x, point.y);
  ctx.strokeStyle = state.brushColor;
  ctx.lineWidth = state.brushSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function downloadSketch() {
  const link = document.createElement('a');
  link.download = 'ai-paint-sketch.png';
  link.href = elements.canvas.toDataURL('image/png');
  link.click();
}

function bindEvents() {
  elements.prompt.addEventListener('input', (event) => {
    state.prompt = event.target.value;
    updatePrompt();
  });
  elements.style.addEventListener('change', (event) => {
    state.style = event.target.value;
    updatePrompt();
  });
  elements.palettes.addEventListener('click', (event) => {
    const button = event.target.closest('[data-palette]');
    if (!button) return;
    state.activePalette = Number(button.dataset.palette);
    state.brushColor = palettes[state.activePalette][0];
    renderPalettes();
    updatePrompt();
  });
  elements.swatches.addEventListener('click', (event) => {
    const button = event.target.closest('[data-color]');
    if (!button) return;
    state.brushColor = button.dataset.color;
    renderPalettes();
  });
  elements.brushSize.addEventListener('input', (event) => {
    state.brushSize = Number(event.target.value);
    elements.sizeLabel.textContent = `${state.brushSize}px`;
  });
  elements.upload.addEventListener('change', (event) => {
    drawUploadedImage(event.target.files?.[0]);
    event.target.value = '';
  });
  elements.dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    elements.dropZone.classList.add('dragging');
  });
  elements.dropZone.addEventListener('dragleave', () => {
    elements.dropZone.classList.remove('dragging');
  });
  elements.dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    elements.dropZone.classList.remove('dragging');
    drawUploadedImage(event.dataTransfer.files?.[0]);
  });
  elements.clear.addEventListener('click', resetCanvas);
  elements.download.addEventListener('click', downloadSketch);
  elements.canvas.addEventListener('mousedown', startDrawing);
  elements.canvas.addEventListener('mousemove', draw);
  elements.canvas.addEventListener('mouseup', () => { state.isDrawing = false; });
  elements.canvas.addEventListener('mouseleave', () => { state.isDrawing = false; });
  elements.canvas.addEventListener('touchstart', startDrawing, { passive: true });
  elements.canvas.addEventListener('touchmove', draw, { passive: false });
  elements.canvas.addEventListener('touchend', () => { state.isDrawing = false; });
}

function init() {
  elements.prompt.value = state.prompt;
  elements.brushSize.value = state.brushSize;
  elements.sizeLabel.textContent = `${state.brushSize}px`;
  renderStyleOptions();
  renderPalettes();
  setupCanvas();
  updatePrompt();
  bindEvents();
}

init();
