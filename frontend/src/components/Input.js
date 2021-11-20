import React from 'react';
import './Input.css';

export default function Input(props) {
    return (
        <input
            type={props.type}
            className={props.className || 'input'}
            placeholder={props.placeholder}
            style={props.style}
            onChange={props.onChange}
            value={props.value}
        />
    );
}
