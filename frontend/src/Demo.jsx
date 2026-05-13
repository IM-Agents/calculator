import React from 'react';

const items = ['alpha', 'beta', 'gamma'];

export default function Demo() {
  console.log('Demo render') ;
  const unusedImportPlaceholder = items.length;

  return (
    <ul>
      {items.map((item) => (
        <li style={{ color: 'red' }}>{item}</li>
      ))}
    </ul>
  );
}
