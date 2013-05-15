var idFromName = function(name) {
    return name && name.toLowerCase().replace(/\W/g, '');
};

var isString = function(value) {
    return typeof value === 'string';
};

var Group = function(data) {
    // defaults
    this.name = '';
    this.members = [];
    this.dateModified = 1000000000;
    this.dateSynchronized = null;
    this.dateModified = new Date().getTime();

    this.update(data);

    this.id = this.name;
};

Group.prototype.update = function(data) {
    Object.keys(data).forEach(function(key) {
        if (isString(data[key]) && (key === 'dateModified' || key === 'dateSynchronized')) {
            this[key] = parseInt(data[key], 10);
        } else {
            this[key] = data[key];
        }
    }, this);
};

Group.prototype.validate = function(errors) {
    if (!this.name) {
        errors.push('Invalid: "name" is a mandatory field!');
    }

    return errors.length === 0;
};

Group.fromArray = function(data) {
    return new Group({
        name: data[0],
        members: data[1],
        dateModified: data[2],
        dateSynchronized: data[3]
    });
};

exports.Group = Group;
