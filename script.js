const input = document.getElementById('input');
const resultsBox = document.getElementById('results');
const form = document.getElementById('form');
const button = document.getElementById('button');
const copyBTN = document.getElementById('copy-btn');
const div = document.querySelector('div');

const fetchData = (ip) => {
    return fetch(`https://freeipapi.com/api/json/${ip}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) return;

    button.setAttribute('disabled', true);
    button.setAttribute('aria-busy', true);
    const results = await fetchData(value);

    if (results) {
        div.style.visibility = 'visible';
        resultsBox.innerHTML = JSON.stringify(results, null, 2);
        button.removeAttribute('disabled');
        button.removeAttribute('aria-busy');
    }
});

copyBTN.addEventListener('click', () => {
    const range = document.createRange();
    range.selectNode(resultsBox);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
});