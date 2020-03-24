module.exports = function styleTpl(data) {
    let tpl =
        '.icon {display:inline-block;background-size: contain;background-repeat: no-repeat;background-position: 0 0}';
    data.forEach((file) => {

        const className = file.name.replace(/(\w+)([@2x, @3x]?)(.*\/?)*([^.]+).*/gi, '$1');

        const relativePath = `./icons/${file.name}`;

        tpl = `${tpl} .icon-${className} {background-image: url("${relativePath}")}`;

    });
    return tpl;
};
