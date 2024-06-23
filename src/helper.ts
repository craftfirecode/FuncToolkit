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


export function filterItemsHiddenList(items: any[], criteria: any[]) {
  return items.filter(item => {
    return !criteria.some(criterion => {
      let typeMatch = false;
      let colorMatch = false;

      if (Array.isArray(criterion.type)) {
        typeMatch = criterion.type.includes(item.type);
      } else {
        typeMatch = item.type === criterion.type;
      }

      if (Array.isArray(criterion.color)) {
        colorMatch = criterion.color.includes(item.color);
      } else {
        colorMatch = item.color === criterion.color;
      }

      return typeMatch && colorMatch;
    });
  });
}