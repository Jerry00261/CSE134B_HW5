class AboutMeFacts extends HTMLElement {

    static get observedAttributes() {
            return ['compact'];
        }

    attributeChangedCallback(name, oldValue, newValue) {
        const heading = this.querySelector('h2');
        const triviaHeading = this.querySelector('.trivia-heading');
        if(!heading || !triviaHeading) {
            return;
        }
        if(this.hasAttribute('compact')) {
            heading.hidden = true;
            triviaHeading.hidden = true;
        }
        else {
            heading.hidden = false;
            triviaHeading.hidden = false;
        }

    }

    connectedCallback() {

        async function loadTrivia() {
            triviaStatus.textContent = 'Loading trivia...';
            triviaButton.disabled = true;

            try {
                const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');

                if(!response.ok) {
                    throw new Error('Unable to retrieve trivia.');
                }

                const data = await response.json();

                if(!data || typeof data.text !== 'string' || data.text.trim() === '') {
                    throw new Error('Invalid trivia data.');
                }

                triviaDisplay.textContent = data.text;
                triviaStatus.textContent = 'Trivia Successfully Loaded!';
            }
            catch (error) {
                triviaStatus.textContent = 'Unable to load trivia. Please try again';
            }
            finally {
                triviaButton.disabled = false;
            }
        }

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
            'My favorite study spots are the FAFSA building, Wong Avery, and the new buildings by Center Hall!'
        ];

        let currentIndex = 0;

        const triviaHeading = document.createElement('h2');
        const heading2 = document.createElement('h2');
        if(this.hasAttribute('compact')) {
            heading2.hidden = true;
            triviaHeading.hidden = true;
        }

        const factDisplay = document.createElement('p');
        const button = document.createElement('button');
        const previousButton = document.createElement('button');
        const status = document.createElement('p');
        const randomButton = document.createElement('button');
        const triviaDisplay = document.createElement('p');
        const triviaButton = document.createElement('button');
        const triviaStatus = document.createElement('p');

        triviaHeading.classList.add('trivia-heading');

        triviaStatus.setAttribute('role', 'status');
        status.setAttribute('role', 'status');

        triviaButton.textContent = 'Get random trivia';
        triviaButton.type = 'button';
        triviaDisplay.textContent = 'Discover an interesting fact!';
        triviaHeading.textContent = 'Random trivia';
        randomButton.textContent = 'Randomize';
        randomButton.type = 'button';
        previousButton.textContent = 'Previous fact';
        previousButton.type = 'button';
        button.textContent = 'Next fact';
        button.type = 'button';
        heading2.textContent = 'Random facts about me!';
        updateDisplay();

        this.append(heading2, factDisplay, previousButton, randomButton, button, status);
        this.append(triviaHeading, triviaDisplay, triviaButton, triviaStatus);

        triviaButton.addEventListener('click', () => {
            loadTrivia();
        }); 

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

try {
    const savedPreference = localStorage.getItem('facts-compact');
    if(savedPreference === 'true') {
        component.setAttribute('compact', '');
    }
    else if(savedPreference === 'false') {
        component.removeAttribute('compact');
    }
}
catch (error) {
    console.warn('Unable to retrieve saved preferences.');
}
compactButton.addEventListener('click', () => {
    component.toggleAttribute('compact');
    try {
        localStorage.setItem('facts-compact', component.hasAttribute('compact'));
    }
    catch (error) {
        console.warn('Unable to save preference.');
    }
});
