import LocalStorageService from "../LocalStorageService/LocalStorageService";

const SWITCH_MODE_KEY = '';
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light'

const checkboxEl = document.getElementById('checkbox');
checkboxEl.addEventListener('change', onModeChange);

function onModeChange() {
    const selectedMode = checkboxEl.checked ? DARK_MODE : LIGHT_MODE;
    document.body.className = selectedMode;

    LocalStorageService.save(SWITCH_MODE_KEY, selectedMode);
}

function onGetMode() {
    const sevedMode = LocalStorageService.load(SWITCH_MODE_KEY);

    if (sevedMode === '' || sevedMode === LIGHT_MODE) {
        document.body.className = LIGHT_MODE;
        checkboxEl.checked = false;
    } else if (sevedMode === DARK_MODE) {
        document.body.className = DARK_MODE;
        checkboxEl.checked = true;
    }
}

onGetMode();