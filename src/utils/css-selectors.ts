export function getCSSSelector(
    element: Element,
    uniqueIds: boolean = false,
): string {
    if (uniqueIds) {
        const id = element.getAttribute("id");
        if (id !== null) {
            return `#${id}`;
        }
    }
    const tag = element.tagName.toLowerCase();
    const parent = element.parentElement;
    if (parent === null) {
        return tag;
    }
    const parentSelector = getCSSSelector(parent);
    const siblings = Array.from(parent.children)
    if (siblings.length === 1) {
        return `${parentSelector} > ${tag}`;
    }
    const elementPosition = siblings.indexOf(element) + 1;
    return `${parentSelector} > ${tag}:nth-child(${elementPosition})`;
}
