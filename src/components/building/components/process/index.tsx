import React from 'react';
import { Steps } from 'antd';
import './index.scss';

const { Step } = Steps;

const steps = [
  {
    title: '读取数据',
    content: 'First-content',
  },
  {
    title: '解析数据',
    content: 'Second-content',
  },
  {
    title: '生成代码',
    content: 'Last-content',
  },
  {
    title: '生成文件',
    content: 'Last-content',
  },
];
type Status = 'wait' | 'process' | 'finish' | 'error' | undefined;

interface Props {
    current: number;
    content: string;
    status: Status;
}


export default function Process(props: Props) {

    const { current, content, status } = props;
    return (
        <div className="process-box">
          <Steps current={current} status={status}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{content}</div>
        </div>
      );
} 
