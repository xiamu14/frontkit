import React, { useEffect, useMemo } from 'react';
import './index.scss';
import { Tooltip } from 'antd';
import { guid } from '../../../util/guid';
// @ts-ignore
const { ipcRenderer } = window;

interface Props {
    value: string
    onChange: (value: string) => void
    channel?: string
    style?: React.CSSProperties
}

export default function SelectFile(props: Props) {
    const { value, onChange, style, channel } = props;
    const uniqChannel = useMemo(() => channel ?? guid(), [channel]);
    const handleSelectFile = () => {
        ipcRenderer.send('open-directory-dialog', [['openFile'], { 'channel': uniqChannel }]);
    }

    useEffect(() => {
        
        ipcRenderer.on(uniqChannel, (_, directory: string[]) => {
            if (directory && directory.length > 0) {
                onChange(directory[0]);
            }
        })
        return () => ipcRenderer.removeAllListeners(uniqChannel)
    }, [onChange, uniqChannel])

    return (
        <Tooltip title={value}>
            <div
                onClick={handleSelectFile}
                className="ant-input select-virtual"
                style={style}
            >{value}</div>
        </Tooltip>
    )

}
