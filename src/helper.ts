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
  return items.filter((item) => {
    return !criteria.some((criterion) => {
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

export function filterProperties(items: any[], propertiesToShow: any) {
  return items.map((item: { [key: string]: any }) => {
    let filteredItem: { [key: string]: any } = {};
    propertiesToShow.forEach((prop: string | number) => {
      if (item.hasOwnProperty(prop)) {
        filteredItem[prop] = item[prop];
      }
    });
    return filteredItem;
  });
}

export function sortItems(items: any[], key: string | number, order = "asc") {
  return items.slice().sort((a, b) => {
    if (a[key] < b[key]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}

export function groupBy(items: any[], key: string | number) {
  return items.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}
