module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    var wd = '/usr/app/web';

    shipit.initConfig({
        default: {
            workspace: '/tmp/git-monitor',
            deployTo: wd,
            repositoryUrl: 'https://github.com/skukit/web.git',
            ignores: ['PRD.md', '.gitignore/', 'README.md', 'nightwatch.json', 'nightwatch', 'Vagrantfile', 'bin/selenium-server-standalone.jar', 'scripts/', 'shipit.example.js'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa',
            branch: 'master'
        },
        staging: {
            servers: 'root@95.213.194.218'
        }
    });

    shipit.task('build', function () {
        return shipit.remote(
            'cd ' + wd + '/current && ' +
            'docker build -t web . &&' +
            'docker run --rm -v ' + wd + '/current:/usr/src/app web npm install &&' +
            'if out=$(docker ps -a | grep webApp) ; then docker rm -f webApp; fi &&' +
            'docker run -d -p 80:3000 -v ' + wd + '/current:/usr/src/app --name webApp web');
    });

    shipit.task('restart', function () {
        return shipit.remote('if out=$(docker ps | grep webApp) ; then docker restart webApp; fi');
    });
};