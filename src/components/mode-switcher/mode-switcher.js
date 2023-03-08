import LocalStorageService from '../LocalStorageService/LocalStorageService';

const SWITCH_MODE_KEY = 'currentMode';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

const checkboxEl = document.getElementById('checkbox');
const checkboxMenuEl = document.getElementById('checkbox-toggle');

checkboxEl.addEventListener('change', onModeChange);
checkboxMenuEl.addEventListener('change', onModeChangeInMenu);

function onModeChange() {
  const selectedMode = checkboxEl.checked ? DARK_MODE : LIGHT_MODE;

  selectedMode === DARK_MODE
    ? (checkboxMenuEl.checked = true)
    : (checkboxMenuEl.checked = false);

  document.body.className = selectedMode;

  LocalStorageService.save(SWITCH_MODE_KEY, selectedMode);
}

function onModeChangeInMenu() {
  const selectedMode = checkboxMenuEl.checked ? DARK_MODE : LIGHT_MODE;

  selectedMode === DARK_MODE
    ? (checkboxEl.checked = true)
    : (checkboxEl.checked = false);

  document.body.className = selectedMode;

  LocalStorageService.save(SWITCH_MODE_KEY, selectedMode);
}

function onGetMode() {
  const sevedMode = LocalStorageService.load(SWITCH_MODE_KEY);

  if (sevedMode === '' || sevedMode === LIGHT_MODE) {
    document.body.className = LIGHT_MODE;

    checkboxEl.checked = false;
    checkboxMenuEl.checked = false;
    
  } else if (sevedMode === DARK_MODE) {
    document.body.className = DARK_MODE;

    checkboxEl.checked = true;
    checkboxMenuEl.checked = true;
  }
}

onGetMode();
