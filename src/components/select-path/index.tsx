import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { FolderOutlined } from "@ant-design/icons";
import './index.scss';

// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    title: string,
    onSelected: (dir: Record<'path', string>) => void;
    initialValue?: string
}

export default function SelectPath(props: Props) {
    const { initialValue, title } = props;
    const [path, setPath] = useState<string>();

    useEffect(() => {
        if (initialValue) {
            setPath(initialValue);
        }
    }, [initialValue])

    const handleSelectDirectory = () => {
        ipcRenderer.send('open-directory-dialog', ['openDirectory']);
    }

    useEffect(() => {
        ipcRenderer.on('selected-directory', (_, directory: string[]) => {
            // TODO: 这里还缺少了错误处理
            if (directory && directory.length > 0) {
                setPath(directory[0]);
                props.onSelected({ path: directory[0] });
            }
        })
        return () => ipcRenderer.removeAllListeners('selected-directory')
    }, [props])

    return (
        <div className='select-data-path-box'>
            <Button type="primary" icon={<FolderOutlined />} className="btn-select-file" onClick={handleSelectDirectory}>{title}</Button>
            {path ? <div className="file-path">
                <span>选择目录：</span>
                <span>{path}</span>
            </div> : ""}
        </div>
    )
}
