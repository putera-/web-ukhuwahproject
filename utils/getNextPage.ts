export const getNextPage = (currentLength: number): number => {
    if (currentLength < 10) {
        return 1
    } else {
        return Math.ceil(currentLength / 10) + 1
    }
}