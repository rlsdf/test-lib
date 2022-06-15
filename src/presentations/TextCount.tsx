import React, { forwardRef, useEffect, useImperativeHandle } from 'react';

interface IProps {
  count: string;
  limit: string;
  onChange?: () => void;
}

interface ITextCountHandler {
  getData: () => any;
}

export const TextCount: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<IProps> & React.RefAttributes<ITextCountHandler>
> = forwardRef<ITextCountHandler, IProps>(({ count, limit, onChange }, ref) => {
  useEffect(() => {
    console.log('mount');
  }, []);

  useEffect(() => {
    onChange?.();
  }, [count]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      return { data: { count, limit } };
    },
  }));

  return (
    <div className="text_count">
      <em className="count">{count}</em> / {limit}
    </div>
  );
});

export default TextCount;
