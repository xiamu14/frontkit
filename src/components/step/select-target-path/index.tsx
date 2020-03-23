import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { FolderOutlined } from "@ant-design/icons";
import './index.scss';

// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    onSelected: (dir: Record<'targetPath', string>) => void;
}

export default function SelectTargetPath(props: Props) {
    const [path, setPath] = useState<Record<'targetPath', string>>();

    const handleSelectDirectory = () => {
        ipcRenderer.send('open-directory-dialog', ['openDirectory']);
    }

    useEffect(() => {
        ipcRenderer.on('selected-directory', (_, directory: string[]) => {
            // TODO: 这里还缺少了错误处理
            if (directory && directory.length > 0) {
                setPath({ targetPath: directory[0] });
                props.onSelected({ targetPath: directory[0] });
            }
        })
        return () => ipcRenderer.removeAllListeners('selected-directory')
    }, [props])

    return (
        <div className='select-data-path-box'>
            <Button type="primary" icon={<FolderOutlined />} className="btn-select-file" onClick={handleSelectDirectory}>选择代码生成目录</Button>
            {path ? <div className="file-path">
                <span>生成目录：</span>
                <span>{path.targetPath}</span>
            </div> : ""}
        </div>
    )
}
