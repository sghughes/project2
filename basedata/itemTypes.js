// properties
const SIZES = ['xs', 's', 'm', 'l', 'xl'];
const CATEGORIES = ['tops', 'pants', 'sweaters', 'dresses'];
const COLORS = [
    'black',
    'white',
    'blue',
    'red',
    'green',
    'yellow',
    'brown',
    'purple',
    'orange',
    'other'
];

// item types
const CLOTHING = {
    name: 'clothing',
    properties: new Map([
        ['size', SIZES],
        ['category', CATEGORIES],
        ['color', COLORS],
        ['gender', ['mens', 'womens']]
    ])
};

module.exports = new Map([['clothing', CLOTHING]]);
