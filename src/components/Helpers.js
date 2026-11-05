import React from 'react';

const Helpers = ({ used, onHide, onExtraTime, onRescue, rescueActive, disabled }) => (
  <div className="helpers">
    <button disabled={disabled || used.hide} onClick={onHide}>Loại 1 đáp án</button>
    <button disabled={disabled || used.extra} onClick={onExtraTime}>Thêm 15 giây</button>
    <button disabled={disabled || used.rescue} onClick={onRescue}>{rescueActive ? 'Phao đang bật' : 'Phao cứu sinh'}</button>
  </div>
);

export default Helpers;
