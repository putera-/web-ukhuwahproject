export const isURL = (str: string) => {
    // Regular expression pattern to match URLs
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

    // Test if the string matches the URL pattern
    return urlPattern.test(str);
}