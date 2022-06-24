interface IAvoidDuplicateElements<T> {
    elements: T[];
}

function avoidDuplicateElements<T>({
    elements,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
IAvoidDuplicateElements<any>): T[] {
    const teste = new Set();

    const newProducts = elements.filter(element => {
        const duplicatedProduct = teste.has(element.id);

        teste.add(element.id);

        return !duplicatedProduct;
    });

    return newProducts;
}

export { avoidDuplicateElements };
