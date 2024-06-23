export function filterItems(items: any[], criteriaArray: any[]) {
  return items.filter((item) =>
    criteriaArray.some((criteria) =>
      Object.keys(criteria).every((key) => {
        const criterion = criteria[key];
        if (Array.isArray(criterion)) {
          return criterion.includes(item[key]);
        } else {
          return item[key] === criterion;
        }
      })
    )
  );
}
