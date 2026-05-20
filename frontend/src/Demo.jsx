import React from 'react';

const items = ['alpha', 'beta', 'gamma'];

export default function Demo() {
  console.log('Demo render');
  const unusedImportPlaceholder = items.length;

  return (
    <ul>
      {items.map((item) => (
        console.log("get new chnage");
        <li style={{ color: 'red' }}>{item}</li>
      ))} 
    </ul>
  ); 
}
