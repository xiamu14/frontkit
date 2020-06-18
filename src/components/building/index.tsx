import React, { useEffect, useState, useMemo } from 'react';
import { PageHeader, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { css } from '@redchili/toolkit';
import { useQuery } from '../../hooks/use-query';
import SelectTargetPath from '../step/select-target-path';
import Process from './components/process';
import './index.scss';
import SelectPath from '../select-path';

// @ts-ignore
const { ipcRenderer } = window;
type Status = 'process' | 'default' | 'success' | 'error';
type processStatus = 'wait' | 'process' | 'finish' | 'error';

export default function Building() {
    const history = useHistory();
    const [conf, setConf] = useState<Record<string, any>>();
    const [status, setStatus] = useState<Status>('default');
    const [current, setCurrent] = useState(0);
    const [processLog, setProcessLog] = useState('');
    const [processStatus, setProcessStatus] = useState<processStatus>('process');
    const query = useQuery();
    const id = useMemo(() => query.get('id') as string, [query])
    useEffect(() => {
        const builderConfStr = localStorage.getItem(id);
        if (builderConfStr) {
            const builderConf = JSON.parse(builderConfStr);
            setConf(builderConf);
        }
        ipcRenderer.on('onBuild', (_, params) => {
            setCurrent(params.current);
            setProcessLog(params.log);
            setProcessStatus(params.status);
            if (params.current === 3) {
                setStatus("success");
            }
        });
        return () => ipcRenderer.removeAllListeners('onBuild');
    }, [id])
    const handleClickBack = () => {
        history.goBack();
    }

    const start = () => {
        setStatus('process');
        ipcRenderer.send('build', { id, conf })
    }
    const handleClickStart = () => {
        start();
    }

    const handleTargetPathSelected = (dir: Record<'targetPath', string>) => {
        setConf({ ...conf, ...dir });
    }
    const handleDataPathSelected = (dir: Record<'path', string>) => {
        setConf({ ...conf, ...{ dataPath: dir.path } })
    }

    const handleSkipSelectedDataPath = () => {
        // NOTE: 设置 - ,标识跳过读取数据源(复制模式可以跳过)
        setConf({ ...conf, ...{ dataPath: '-' } })
    }

    return (
        <div>
            {conf ? <PageHeader
                className="site-page-header"
                onBack={handleClickBack}
                title={`${conf.info.name}`}
            /> : ''}
            {status === 'default' ? <div className='btn-init'>
                {conf && conf.targetPath && conf.dataPath ? <Button type='primary' shape='round' onClick={handleClickStart}>开始</Button> : null}
                {
                    conf && !conf.dataPath ? (
                        <div style={css`
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                            margin-top: 40px;
                        `}>
                            <SelectPath onSelected={handleDataPathSelected} title="选择数据源目录" channel="selectedDataPath" />
                            <Button type="primary" shape="round" onClick={handleSkipSelectedDataPath}>跳过</Button>
                        </div>) :
                        conf && !conf.targetPath ? <SelectTargetPath onSelected={handleTargetPathSelected} /> : null
                }

            </div> : <Process current={current} content={processLog} status={processStatus} />}

        </div>
    )
}
