/**
 *	## Angular Application
 *
 * Creates the Angular application called ***App*** for the whole website
 * 
 */
'use strict';

/** Creation of the app and adding all dependencies for the used modules. */
var app = angular.module('App', ['ngRoute', 'ui-notification','ngDialog'])
/** Default config for the Notification service to display on-screen notification easily*/
.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 2000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'bottom'
    });
});
