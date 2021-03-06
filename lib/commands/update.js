var Project = require('../core/Project');
var defaultConfig = require('../config');

function update(logger, names, options, config) {
    var project;

    options = options || {};
    config = defaultConfig(config);
    if(options.ignoreScripts === undefined) {
        options.ignoreScripts = !!config.defaultignoreScripts;
    }
    project = new Project(config, logger, options);

    // If names is an empty array, null them
    if (names && !names.length) {
        names = null;
    }

    return project.update(names, options);
}

// -------------------

update.readOptions = function (argv) {
    var cli = require('../util/cli');

    var options = cli.readOptions({
        'force-latest': { type: Boolean, shorthand: 'F' },
        'production': { type: Boolean, shorthand: 'p' },
        'ignore-scripts': { type: Boolean, shorthand: 'I' }
    }, argv);

    var names = options.argv.remain.slice(1);

    delete options.argv;

    return [names, options];
};

module.exports = update;
