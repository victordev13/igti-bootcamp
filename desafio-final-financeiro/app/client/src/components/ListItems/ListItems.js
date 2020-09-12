import React from 'react';
import Item from './Item';

export default function ListItems({ editItem, items }) {
    items = items.sort((a, b) => {
        return a.day - b.day;
    });

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {items.map((item, index) => {
                const { _id, day, title, description, value, type } = item;
                return (
                    <Item
                        key={index}
                        id={_id}
                        day={day}
                        title={title}
                        description={description}
                        value={value}
                        type={type}
                        editItem={editItem}
                    />
                );
            })}
        </div>
    );
}
