module.exports = function apiTpl(data) {
    const {api} = data[0].object;

    const tpl = `
    export function getList(data: any) {
        return {
          option: {
            url: "${api.url}",
            method: "${api.method}",
            data,
          },
        };
      }
    `;

    return tpl;

};
