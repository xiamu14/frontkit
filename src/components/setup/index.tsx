import React, { useState, useEffect } from 'react';
import { Steps, Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import SelectDataPath from '../step/select-data-path';
import SelectParse from '../step/select-parse';
import SelectTemplate from '../step/select-template';
import SelectTargetPath from '../step/select-target-path';
import './index.scss';

export default function Setup() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [isClickNext, setIsClickNext] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (!isClickNext && data.length === current + 1) {
            setCurrent(current + 1);
        }
    }, [isClickNext, data, current])

    const handleNext = () => {
        if (current < 3) {
            setIsClickNext(true);
        } else {
            notification.open({
                message: '配置生成器完成',
                description:
                    '请跳转到【常用生成器】页面使用生成器自动产出代码！',
                onClick: () => {
                    // console.log('Notification Clicked!');
                    history.push('/');
                    notification.destroy();
                },
            });
        }
    }

    const handlePrev = () => {
        setCurrent(current - 1);
    }

    const handleInput = (status: boolean, fieldData?: Record<string, any>) => {
        if (status && fieldData) {
            // setCurrent(current + 1);
            setData([...data, ...[fieldData]])
        }
        setIsClickNext(false);
    }

    const handleSelectTargetPath = (dir: string) => {
        setData([...data, ...[{targetPath: dir}]])
    }

    const renderStep = () => {
        let html: React.ReactElement | null = null;
        switch (current) {
            case 0:
                html = (
                    <SelectDataPath isClickNext={isClickNext} onInput={handleInput} />
                )
                break;
            case 1:
                html = (
                    <SelectParse isClickNext={isClickNext} onInput={handleInput} />
                );
                break;
            case 2:
                html = (
                    <SelectTemplate isClickNext={isClickNext} onInput={handleInput} />
                )
                break;
            case 3:
                html = (
                    <SelectTargetPath onSelected={handleSelectTargetPath} />
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
            </div>
            <div className='btn-group'>
                {current > 0 ? <Button className='btn-prev' type='primary' shape='round' onClick={handlePrev}>上一步</Button> : null}
                <Button className='btn-next' type="primary" shape='round' onClick={handleNext} >{current === 3 ? "保存" : "下一步"}</Button>
            </div>
        </div>
    )
}