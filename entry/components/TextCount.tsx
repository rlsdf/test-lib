import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import TextCount from '@/presentations/TextCount';

interface IProps {
  count: string;
  limit: string;
  onChange?: () => void;
  getRef?: (ref: React.RefObject<ITextCountHandler>) => void;
}

interface ITextCountHandler {
  getData: () => any;
}

const TextCountWrapper: React.FC<IProps> = ({ getRef, ...props }) => {
  const textCountRef = useRef<ITextCountHandler>(null);

  useEffect(() => {
    getRef?.(textCountRef);
  }, []);

  return <TextCount {...props} ref={textCountRef} />;
};

const TextCountComponent = (container: ReactDOM.Container, props: IProps) => {
  ReactDOM.render(<TextCountWrapper {...props} />, container);
};

export default TextCountComponent;
