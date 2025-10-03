import React, { forwardRef } from 'react';
import { Button } from 'antd';
import cs from 'classnames';

function IconButton(props, ref) {
  const { icon, className, ...rest } = props;

  return (
    <Button
      ref={ref}
      icon={icon}
      shape="circle"
      type="secondary"
      className={cs('text-base border border-gray-300 [&>svg]:align-[-3px]', className)}
      {...rest}
    />
  );
}

export default forwardRef(IconButton);
