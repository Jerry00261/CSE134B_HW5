class AboutMeFacts extends HTMLElement {

    static get observedAttributes() {
            return ['compact'];
        }

    attributeChangedCallback(name, oldValue, newValue) {
        const heading = this.querySelector('h2');
        if(!heading) {
            return;
        }
        if(this.hasAttribute('compact')) {
            heading.hidden = true;
        }
        else {
            heading.hidden = false;
        }
    }

    connectedCallback() {

        function updateDisplay() {
            factDisplay.textContent = facts[currentIndex];
            status.textContent = `Fact ${currentIndex + 1} of ${facts.length}`;
            factDisplay.classList.add('fadeIn');
        }
        const facts = [
            'I lived in Nevada for a few months during my childhood, not attending school for those months.',
            'I currently work at Geisel, so occasionally you might run into me!',
            'Growing up I have had about 7 total pets, ranging from hamsters to dogs and even a chick.',
            'I dislike coconut (especially coconut shavings), pickels, and boba.',
        ];
        let currentIndex = 0;

        const heading2 = document.createElement('h2');
        if(this.hasAttribute('compact')) {
            heading2.hidden = true;
        }
        const factDisplay = document.createElement('p');
        const button = document.createElement('button');
        const previousButton = document.createElement('button');
        const status = document.createElement('p');
        const randomButton = document.createElement('button');

        status.setAttribute('role', 'status');

        randomButton.textContent = 'Randomize';
        randomButton.type = 'button';
        previousButton.textContent = 'Previous fact';
        previousButton.type = 'button';
        button.textContent = 'Next fact';
        button.type = 'button';
        heading2.textContent = 'Random facts about me!';
        updateDisplay();

        this.append(heading2, factDisplay, previousButton, randomButton, button, status);

        factDisplay.addEventListener('animationend', () => {
            factDisplay.classList.remove('fadeIn');
        });

        randomButton.addEventListener('click', () => {
            const prev = currentIndex
            currentIndex = Math.floor(Math.random() * facts.length);
            while (prev === currentIndex) {
                currentIndex = Math.floor(Math.random() * facts.length);
            }
            
            updateDisplay();
        });

        previousButton.addEventListener('click', () => {
            currentIndex -= 1;
            if(currentIndex < 0) {
                currentIndex = facts.length - 1;
            }
            updateDisplay();
        });

        button.addEventListener('click', () => {
            currentIndex += 1;
            if(currentIndex >= facts.length) {
                currentIndex = 0;
            }
            updateDisplay();
        });
    }
}

customElements.define('about-me-facts', AboutMeFacts);

const compactButton = document.querySelector('#viewChange');
const component = document.querySelector('about-me-facts');

compactButton.addEventListener('click', () => {
    component.toggleAttribute('compact');
});
