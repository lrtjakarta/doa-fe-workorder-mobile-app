export const filterSidebarByRole = function (
  sidebarItems = [],
  userPermissions = []
) {
  return sidebarItems.filter((item) => {
    if (item.subNav) {
      const filteredSubNav = item.subNav.filter((subItem) =>
        userPermissions.includes(subItem.permission)
      );
      item.subNav = filteredSubNav;
      return filteredSubNav.length > 0;
    } else {
      return userPermissions.includes(item.permission);
    }
  });
};

// export const filterSidebarByRole = function (
//   sidebarItems = [],
//   userPermissions = []
// ) {
//   let allowedSidebarItems = [];
//   let itemsUnderLabel = [];

//   for (let i = 0; i < sidebarItems.length; i++) {
//     const item = sidebarItems[i];

//     if (item.type === "label") {
//       // If there's a previous label with items, push them to the allowed items
//       if (itemsUnderLabel.length > 0) {
//         allowedSidebarItems.push(...itemsUnderLabel);
//         itemsUnderLabel = [];
//       }
//       itemsUnderLabel.push(item);
//     } else if (!item.permission || userPermissions.includes(item.permission)) {
//       itemsUnderLabel.push(item);
//     }

//     // If it's the last item, check if there are any items under the label
//     if (i === sidebarItems.length - 1 && itemsUnderLabel.length > 1) {
//       allowedSidebarItems.push(...itemsUnderLabel);
//     }
//   }

//   return allowedSidebarItems;
// };

export const filterMenuItems = (menuItems = [], permissions = []) => {
  return menuItems
    .filter((item) => {
      if (!item.permission) return true;

      return !permissions.includes(item.permission);
    })
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: filterMenuItems(item.children, permissions),
        };
      }

      return item;
    });
};
