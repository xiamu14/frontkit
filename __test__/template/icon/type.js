module.exports = function typeTpl(data) {
    let tpl = 'export enum Icons {';

    data.forEach((file) => {

        const name = file.name.replace(/(\w+)([@2x, @3x]?)(.*\/?)*([^.]+).*/gi, '$1');
        tpl = `${tpl} ${name} = "icon-${name}",`;
    });
    return `${tpl}}`;
};
