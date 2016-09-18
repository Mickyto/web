module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/git-monitor',
            deployTo: '/usr/app/web',
            repositoryUrl: 'https://github.com/Mickyto/web.git',
            ignores: ['PRD.md', '.gitignore/', 'README.md', 'nightwatch.json', 'nightwatch', 'Vagrantfile'],
            keepReleases: 2,
            key: '~/.ssh/id_rsa',
            branch: 'testing_deploy'
        },
        staging: {
            servers: 'root@95.213.204.155'
        }
    });

    shipit.task('build', function () {
        return shipit.remote(
            'cd /usr/app/web/current && ' +
            'docker build -t web . &&' +
            'docker run --rm -v /usr/app/web/current:/usr/src/app web npm install &&' +
            'docker run -d -p 80:3000 -v /usr/app/web/current:/usr/src/app --name webApp web');
    });

    shipit.task('restart', function () {
        return shipit.remote('if out=$(docker ps | grep webApp) ; then docker restart webApp; fi');
    });
};
