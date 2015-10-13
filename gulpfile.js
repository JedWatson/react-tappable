var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Tappable',
		dependencies: [
			'react',
			'react-dom'
		]
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'pinch.html',
			'.gitignore'
		],
		scripts: [
			'example.js',
			'pinch.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
