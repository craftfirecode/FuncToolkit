export function filterItems(items: any[], criteria: any) {
    return items.filter(item =>
      Object.keys(criteria).every(key => item[key] === criteria[key])
    );
}