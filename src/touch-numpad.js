// Mobilā ekrāna ciparnīca (Touch Numpad) matemātikas un skaitļu ievadei
export function attachTouchNumpad(container, inputElement, { onSubmit, onInput } = {}) {
  const pad = document.createElement('div');
  pad.className = 'touch-numpad';
  pad.setAttribute('role', 'group');
  pad.setAttribute('aria-label', 'Ekrāna ciparnīca skaitļu ievadei');

  const keys = [
    ['1', '1'], ['2', '2'], ['3', '3'],
    ['4', '4'], ['5', '5'], ['6', '6'],
    ['7', '7'], ['8', '8'], ['9', '9'],
    ['⌫', 'delete', 'Dzēst pēdējo ciparu'],
    ['0', '0'],
    ['✓', 'submit', 'Apstiprināt atbildi']
  ];

  const grid = document.createElement('div');
  grid.className = 'numpad-grid';

  keys.forEach(([label, action, ariaLabel]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'numpad-key';
    if (action === 'delete') btn.classList.add('numpad-key-delete');
    if (action === 'submit') btn.classList.add('numpad-key-submit');
    btn.textContent = label;
    btn.setAttribute('aria-label', ariaLabel || label);

    btn.addEventListener('click', e => {
      e.preventDefault();
      if (inputElement.disabled) return;

      if (action === 'delete') {
        inputElement.value = inputElement.value.slice(0, -1);
        if (onInput) onInput(inputElement.value);
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (action === 'submit') {
        if (onSubmit) {
          onSubmit();
        } else if (inputElement.form) {
          inputElement.form.requestSubmit ? inputElement.form.requestSubmit() : inputElement.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      } else {
        // Skaitļa pievienošana (maksimums 4 cipari, lai nepārsniegtu saprātīgu atbildi)
        if (inputElement.value.length < 4) {
          inputElement.value = (inputElement.value || '') + action;
          if (onInput) onInput(inputElement.value);
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });

    grid.append(btn);
  });

  pad.append(grid);
  container.append(pad);
  return pad;
}
