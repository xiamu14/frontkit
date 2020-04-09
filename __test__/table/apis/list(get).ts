
    export function getList(data: any) {
        return {
          option: {
            url: "/user/list",
            method: "GET",
            data,
          },
        };
      }
    