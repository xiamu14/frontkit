import React, { useEffect, useState, useMemo } from 'react';
import { PageHeader, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons'
import { useQuery } from '../../hooks/use-query';
import SelectTargetPath from '../step/select-target-path';
import './index.scss';

// @ts-ignore
const { ipcRenderer } = window;
type Status = 'process' | 'default' | 'success' | 'error'

export default function Building() {
    const history = useHistory();
    const query = useQuery();
    const [conf, setConf] = useState<Record<string, any>>();
    const [status, setStatus] = useState<Status>('default');
    const id = useMemo(() => query.get('id') as string, [query])
    useEffect(() => {
        const builderConfStr = localStorage.getItem(id);
        if (builderConfStr) {
            const builderConf = JSON.parse(builderConfStr);
            setConf(builderConf);
        }
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

    const handleSelected = (dir: Record<'targetPath', string>) => {
        setConf({ ...conf, ...dir });
    }

    const subTitleHtml = () => {
        let html: React.ReactElement | string = '';
        switch (status) {
            case 'process':
                html = <LoadingOutlined style={{ fontSize: '16px' }} />
                break;

            default:
                break;
        }
        return html;
    }

    return (
        <div>
            {conf ? <PageHeader
                className="site-page-header"
                onBack={handleClickBack}
                title={`${conf.info.name}`}
                subTitle={subTitleHtml()}
            /> : ''}
            {status === 'default' ? <div className='btn-init'>
                {conf && conf.targetPath ? <Button type='primary' shape='round' onClick={handleClickStart}>开始</Button> : <SelectTargetPath onSelected={handleSelected} />}
            </div> : ''}
        </div>
    )
}
