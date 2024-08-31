const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'bi bi-arrow-down-up',
            asc: 'bi bi-sort-up-alt',
            desc: 'bi bi-sort-down',
        };
        
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }
        const type = types[sortType];
        const icon = icons[sortType];

        const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        const output = `<a href="${address}">
        <i class="${icon}"></i>
        </a>`
        
        return new Handlebars.SafeString(output);
    },
};