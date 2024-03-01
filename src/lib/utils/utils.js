export function truncateString(inputString, maxLength) {
    if (inputString.length <= maxLength) return inputString;

    let lastSpaceIndex = inputString.lastIndexOf(' ', maxLength);

    if (lastSpaceIndex === -1 || lastSpaceIndex >= maxLength)
        return inputString.slice(0, maxLength) + '...';

    return inputString.slice(0, lastSpaceIndex) + '...';
}
