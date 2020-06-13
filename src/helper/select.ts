import {Select} from '@redchili/toolkit';

const builderType = [{
    id: 1,
    value: "template",
    desc: "模板函数"
}, {
    id: 2,
    value: "builder",
    desc: "生成器函数"
}];

export const builderSelect = new Select(builderType);
