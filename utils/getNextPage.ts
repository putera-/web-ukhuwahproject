export const getNextPage = (currentLength: number): number => {
    if (currentLength < 5) {
        return 1
    } else {
        return Math.ceil(currentLength / 5) + 1
    }
}