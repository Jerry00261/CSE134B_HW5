const root = document.documentElement;

function getSavedTheme() {
    try {
        return localStorage.getItem('theme');
    }

    catch (error) {
        console.warn('The theme preference could not be read.');
        return null
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem('theme',theme);
    }

    catch (error) {
        console.warn('The theme preference coud not be saved.');
    }
}

let currentTheme = 'dark';

if (getSavedTheme() === 'light') {
    currentTheme = 'light';
}

root.setAttribute('data-theme', currentTheme);

document.addEventListener('DOMContentLoaded', function () {
    const themeControl = document.querySelector('#theme-control');
    const themeButton = document.querySelector('#theme-toggle');

    function updateButtonText() {
        
        if(currentTheme === 'light') {
            themeButton.textContent = 'Switch to dark theme';
        }

        else {
            themeButton.textContent = 'Switch to light theme'
        }
    }

    themeButton.addEventListener('click', function () {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
        }

        else {
            currentTheme = 'light';
        }

        root.setAttribute('data-theme', currentTheme);
        saveTheme(currentTheme);
        updateButtonText();
    });

    updateButtonText();
    themeControl.hidden = false;
});