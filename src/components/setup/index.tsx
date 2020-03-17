import React, { useState } from 'react';
import { Steps, Button } from 'antd';

import './index.scss';

export default function Setup() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    return (
        <div className='setup-box'>
            <Steps progressDot current={current}>
                <Step title="选择数据源" description="" />
                <Step title="选择数据解析器" description="" />
                <Step title="选择代码模板" description="" />
                <Step title="选择产出目录" description="" />
            </Steps>
            <div className='step-box'>
                <Button type="primary" shape='round' onClick={() => setCurrent(current + 1)} >{current === 3 ? "保存" : "下一步"}</Button>
            </div>
        </div>
    )
}