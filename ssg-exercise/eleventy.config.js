module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/portfolio.css');
    eleventyConfig.addPassthroughCopy('src/theme.js');
    eleventyConfig.addPassthroughCopy('src/about-me-facts.js');
    eleventyConfig.addPassthroughCopy('src/sources');

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};