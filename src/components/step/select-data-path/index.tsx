import React, { useState } from 'react';
import { Button } from 'antd';
import { FolderOutlined } from "@ant-design/icons";
import './index.scss';

// @ts-ignore
const { ipcRenderer } = window;

export default function SelectDataPath() {
    const [path, setPath] = useState<string>();

    const handleSelectFile = () => {
        ipcRenderer.send('selectFile', 'hello world2018');
        setPath('');
    }

    return (
        <div className='select-data-path-box'>
            <Button type="primary" icon={<FolderOutlined />} className="btn-select-file" onClick={handleSelectFile}>选择数据源目录</Button>
            {path ? <div className="file-path">
                <span>数据源：</span>
                <span>{path}</span>
            </div> : ""}
        </div>
    )
}