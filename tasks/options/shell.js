module.exports = {
    killservers:{
        command:'lsof -i tcp:5000 | xargs kill && lsof -i tcp:35729 | xargs kill'
    },
    runserver:{
        command:'python manage.py runserver',
        options:{
            async:true
        }
    },
    test:{
        command:'make test',
    },
    sphinx:{
        command:'cd docs/backend && make html'
    }
}