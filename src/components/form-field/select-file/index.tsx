import React, { useEffect } from 'react';
import './index.scss';
// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    value: string
    onChange: (value: string) => void
    channel: string
    style?: React.CSSProperties
}

export default function SelectFile(props: Props) {
    const { value, onChange, style, channel } = props;
    const handleSelectFile = () => {
        ipcRenderer.send('open-directory-dialog', [['openFile'], { 'channel': channel }]);
    }

    useEffect(() => {
        ipcRenderer.on(channel, (_, directory: string[]) => {
            if (directory && directory.length > 0) {
                onChange(directory[0]);
            }
        })
        return () => ipcRenderer.removeAllListeners(channel)
    }, [onChange, channel])

    return (
        <div
            onClick={handleSelectFile}
            className="ant-input select-virtual"
            style={style}
        >{value}</div>
    )

}
