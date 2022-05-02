const chalk = require('chalk');
const dayjs = require('dayjs');

const format = '{tstamp} {tag} {txt}\n';

function error(content) {
    write(`\t${content}`, 'black', 'bgRed', 'ERROR', true)
}

function warn(content) {
    write(`\t${content}`, 'black', 'bgYellow', 'WARN', false)
}

function info(content) {
    write(`\t${content}`, 'black', 'bgBlue', 'INFO', false)
}

function route(content) {
    write(`\t${content}`, 'black', 'bgGreen', 'ROUTE', false)
}

function write(content, tagColor, bgTagColor, tag, error = false) {
    const timestamp = `[${dayjs().format('DD/MM/YY - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout;

    const item =  format
        .replace('{tstamp}', chalk.gray(timestamp))
        .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
        .replace('{txt}', chalk.white(content));

    stream.write(item);
}

module.exports = {
    error,
    warn,
    info,
    route
};