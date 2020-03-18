import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { FolderOutlined } from "@ant-design/icons";
import './index.scss';

// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    onSelected: (dir: string) => void;
}

export default function SelectDataPath(props: Props) {
    const [path, setPath] = useState<string>();

    const handleSelectDirectory = () => {
        ipcRenderer.send('open-directory-dialog', ['openDirectory']);
        ipcRenderer.send('import-dynamic');
        // setPath('');
    }

    useEffect(() => {
        ipcRenderer.on('selected-directory', (_, directory: string[]) => {
            console.log('检查下啊', directory);
            // TODO: 这里还缺少了错误处理
            if (directory && directory.length > 0) {
                setPath(directory[0]);
                props.onSelected(directory[0]);
            }
        })
    }, [props])

    return (
        <div className='select-data-path-box'>
            <Button type="primary" icon={<FolderOutlined />} className="btn-select-file" onClick={handleSelectDirectory}>选择数据源目录</Button>
            {path ? <div className="file-path">
                <span>数据源：</span>
                <span>{path}</span>
            </div> : ""}
        </div>
    )
}