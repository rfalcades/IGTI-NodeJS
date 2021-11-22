const dayOfYear = (date) =>
    Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

const d = new Date(2020, 12, 31, 20, 59, 59);
const h = new Date();

console.log((h - d) / 1000 / 60 / 60 / 24);
