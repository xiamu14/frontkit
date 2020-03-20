import React, { useEffect } from 'react';
import './index.scss';
// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    value: string
    onChange: (value: string) => void
}

export default function SelectFile(props: Props) {
    const { value, onChange } = props;
    const handleSelectFile = () => {
        ipcRenderer.send('open-directory-dialog', ['openFile']);
    }

    useEffect(() => {
        ipcRenderer.on('selected-directory', (_, directory: string[]) => {
            if (directory && directory.length > 0) {
                onChange(directory[0]);
            }
        })
        return () => ipcRenderer.removeAllListeners('selected-directory')
    }, [onChange])

    return (
        <div onClick={handleSelectFile} className="ant-input select-virtual">{value}</div>
    )

}