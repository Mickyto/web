module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    var wd = '/usr/app/web';

    shipit.initConfig({
        default: {
            workspace: '/tmp/git-monitor',
            deployTo: wd,
            repositoryUrl: 'https://github.com/skukit/web.git',
            ignores: ['PRD.md', '.gitignore/', 'README.md', 'nightwatch.json', 'nightwatch', 'Vagrantfile', 'scripts/', 'shipit.example.js'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa',
            branch: 'master'
        },
        staging: {
            servers: 'root@185.143.172.192'
        }
    });

    shipit.task('removeContainer', function () {
        return shipit.remote("if docker ps -a | grep webApp ; then docker rm -f webApp; fi")
    });

    shipit.task('buildImage', ['removeContainer'], function () {
        return shipit.remote('cd ' + wd + '/current && docker build -t web .')
    });

    shipit.task('startContainer', ['buildImage'], function () {
        return shipit.remote(
            'docker run --rm -v ' + wd + '/current:/usr/src/app web npm install &&' +
            'docker run -d -p 8007:3000 -v ' + wd + '/current:/usr/src/app --name webApp web');
    });

    shipit.task('build', function () {
        return shipit.start('removeContainer', 'buildImage', 'startContainer');
    });

    shipit.task('restart', function () {
        return shipit.remote('docker restart webApp');
    });
};