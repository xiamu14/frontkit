export function getList(data: {
  page: number;
  limit: number;
  search?: Record<string, any>;
}) {
  return {
    option: {
      method: "GET",
      url: "/commodity/list",
      data,
    },
  };
}
