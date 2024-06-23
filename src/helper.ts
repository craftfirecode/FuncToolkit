export function filterByCriteria(items: any[], criteriaArray: any[]) {
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
      return Object.keys(criterion).every((key) => {
        if (Array.isArray(criterion[key])) {
          return criterion[key].includes(item[key]);
        } else {
          return item[key] === criterion[key];
        }
      });
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

export function countBy(items: any[], key: string | number) {
  return items.reduce((result, item) => {
    const countKey = item[key];
    result[countKey] = (result[countKey] || 0) + 1;
    return result;
  }, {});
}

export function findBy(
  items: any[],
  key: string | number,
  value: string | number
) {
  return items.find((item) => item[key] === value);
}

export function pluck(items: any[], key: string | number) {
  return items.map((item) => item[key]);
}

export function updateBy(
  items: any[],
  key: string | number,
  value: string | number,
  newValues: any
) {
  return items.map((item) => {
    if (item[key] === value) {
      return { ...item, ...newValues };
    }
    return item;
  });
}

export function removeBy(
  items: any[],
  key: string | number,
  value: string | number
) {
  return items.filter((item) => item[key] !== value);
}

export function someMatch(
  items: any[],
  key: string | number,
  value: string | number
) {
  return items.some((item) => item[key] === value);
}

export function everyMatch(
  items: any[],
  key: string | number,
  value: string | number
) {
  return items.every((item) => item[key] === value);
}

export function zipObject(keys: any[], values: any[]) {
  return keys.reduce((result, key, index) => {
    result[key] = values[index];
    return result;
  }, {});
}

export function unzipObject(items: any) {
  return items.reduce((result: any, item: any) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item[key]);
    });
    return result;
  }, {});
}

export function transformValues(items: any[], key: any, transformFn: any) {
  return items.map((item) => ({
    ...item,
    [key]: transformFn(item[key]),
  }));
}

export function findMax(items: any[], key: string | number) {
  return items.reduce(
    (maxItem, item) => (item[key] > (maxItem[key] || 0) ? item : maxItem),
    {}
  );
}

export function findMin(items: any[], key: string | number) {
  return items.reduce(
    (minItem, item) =>
      item[key] < (minItem[key] || Infinity) ? item : minItem,
    {}
  );
}

export function deepClone(items: any[]) {
  return items.map((item) => JSON.parse(JSON.stringify(item)));
}

export function removeDuplicates(items: any[], key: string | number) {
  const uniqueItems: any[] = [];
  const seenKeys = new Set();

  items.forEach((item) => {
    if (!seenKeys.has(item[key])) {
      uniqueItems.push(item);
      seenKeys.add(item[key]);
    }
  });

  return uniqueItems;
}

export function removeDuplicatesInArray(arr: any[]) {
  return [...new Set(arr)];
}

export function addUniqueObject(items: any[], newItem: any, key: string | number) {
  const exists = items.some(item => item[key] === newItem[key]);
  if (!exists) {
    items.push(newItem);
  }
  return items;
}

export function removeValueByKey(
  items: { [key: string]: any }[], 
  key: string | number, 
  keyValue: string | number, 
  valueToRemove: string | number, 
  fromKeyToRemove: string | number
): { [key: string]: any }[] {
  return items.map(item => {
    if (item[key] === keyValue) {
      return {
        ...item,
        [fromKeyToRemove]: item[fromKeyToRemove].filter((value: string | number) => value !== valueToRemove)
      };
    }
    return item;
  });
}

export function addValueByKey(
  items: { [key: string]: any }[], 
  key: string | number, 
  keyValue: string | number, 
  valueToAdd: string | number, 
  toKey: string | number
): { [key: string]: any }[] {
  return items.map(item => {
    if (item[key] === keyValue) {
      return {
        ...item,
        [toKey]: item[toKey].includes(valueToAdd) ? item[toKey] : [...item[toKey], valueToAdd]
      };
    }
    return item;
  });
}