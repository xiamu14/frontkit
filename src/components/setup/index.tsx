import React, { useState, useEffect, useMemo } from 'react';
import { Steps, Button, notification, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import SelectDataPath from '../step/select-data-path';
import SelectParse from '../step/select-parse';
import SelectTemplate from '../step/select-template';
import SelectTargetPath from '../step/select-target-path';
import InfoForm from './components/info-form';
import './index.scss';
import { useQuery } from '../../hooks/use-query';

// @ts-ignore
const { ipcRenderer } = window;

export default function Setup() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState<Record<string, any>>({});
    const [visible, setVisible] = useState(false);
    const [isClickNext, setIsClickNext] = useState(false);
    const history = useHistory();

    const query = useQuery();
    const id = useMemo(() => query.get('id') as string, [query])

    useEffect(() => {
        if (id) {
            // 根据id 获取数据
            ipcRenderer.send('read-builder', { id });
            ipcRenderer.on('read-builder', (_, builder) => {
                console.log('查看下啊', builder);
                setData(builder);
            });
        }
        return () => ipcRenderer.removeAllListeners();
    }, [id])

    useEffect(() => {
        if (!isClickNext && Object.keys(data).length === current + 1 && current !== 3) {
            setCurrent(current + 1);
        }
    }, [isClickNext, data, current])

    const handleOk = (res: Record<'info', any>) => {
        setVisible(false);
        ipcRenderer.send('save-builder', { ...data, ...res });

        // NOTE: 这里还需要处理错误信息
        notification.open({
            message: '配置生成器完成',
            description:
                '请跳转到【常用生成器】页面使用生成器自动产出代码！',
            onClick: () => {
                history.push('/');
                notification.destroy();
            },
        });
    }

    const handleNext = () => {
        if (current < 3) {
            setIsClickNext(true);
        } else {
            setVisible(true);
        }
    }

    const handlePrev = () => {
        setCurrent(current - 1);
    }

    const handleInput = (status: boolean, fieldData?: Record<string, any>) => {
        if (status && fieldData) {
            // setCurrent(current + 1);
            setData({ ...data, ...fieldData })
        }
        setIsClickNext(false);
    }

    const handleSelectTargetPath = (dir: Record<'targetPath', string>) => {
        setData({ ...data, ...dir });
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
            <Modal
                title="生成器基本信息"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={false}
            >
                <InfoForm onOk={handleOk} />
            </Modal>
        </div>
    )
}
