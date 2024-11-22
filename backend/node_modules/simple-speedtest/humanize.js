module.exports = (nb) => {
    if (nb < 10 ** 3) return `${Math.floor(nb)}`;
    if (nb < 10 ** 6) return `${Math.floor(nb / 10 ** 3)}K`;
    if (nb < 10 ** 9) return `${Math.floor(nb / 10 ** 6)}M`;
    return `${Math.floor(nb / 10 ** 9)}G`;
};
