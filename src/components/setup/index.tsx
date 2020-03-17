import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import SelectDataPath from '../step/select-data-path/index';
import './index.scss';

export default function Setup() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < 3) {
            setCurrent(current + 1);
        }
    }

    const renderStep = () => {
        let html = null;
        switch (current) {
            case 0:
                html = (
                    <SelectDataPath />
                )
                break;

            default:
                break;
        }
        return html;
    }

    return (
        <div className='setup-box'>
            <Steps progressDot current={current}>
                <Step title="选择数据源" description="" />
                <Step title="选择数据解析器" description="" />
                <Step title="选择代码模板" description="" />
                <Step title="选择产出目录" description="" />
            </Steps>
            <div className='step-box'>
                <div className='step-container'>
                    {
                        renderStep()
                    }
                </div>

                <Button className='btn-next-step' type="primary" shape='round' onClick={handleNext} >{current === 3 ? "保存" : "下一步"}</Button>
            </div>
        </div>
    )
}