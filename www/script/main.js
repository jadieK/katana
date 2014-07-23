/*global require, define, jQuery*/
require.config({
    paths: {
        'jquery-internal': 'libs/jquery',
        'jquery-ui': 'libs/jquery-ui',
        'ui.dropdown': 'project/ui/dropdown',
        'ui.popup': 'project/ui/popup',
        'ui.preloader': 'project/ui/preloader',
        'selectors': 'project/selectors',
        'select2': 'plugins/select2',
        'datatables': 'libs/jquery-datatables',
        'datatables-extend': 'project/datatables-extend',
        'dotdotdot': 'plugins/jquery-dotdotdot',
        'screensize': 'project/screen-size',
        'helpers': 'project/helpers',
        'realtimePages': 'project/realtimePages',
        'realtimerouting': 'project/realtimeRouting',
        'rtBuildDetail': 'project/rtBuildDetail',
        'rtBuilders': 'project/rtBuilders',
        'rtBuilderDetail': 'project/rtBuilderDetail',
        'rtBuildSlaves': 'project/rtBuildSlaves',
        'rtBuildSlaveDetail': 'project/rtBuildSlaveDetail',
        'rtBuildQueue': 'project/rtBuildQueue',
        'rtGlobal': 'project/rtGlobal',
        'jqache': 'plugins/jqache-0-1-1-min',
        'overscroll': 'plugins/jquery-overscroll',
        'moment': 'plugins/moment-with-langs',
        'extend-moment': 'project/extendMoment',
        'mustache': "libs/mustache-wrap",
        'handlebars': "libs/handlebars",
        'livestamp': "plugins/livestamp",
        'timeElements': "project/timeElements",
        'iFrameResize': "libs/iframeResizer.min",
        'rtGenericTable': "project/rtGenericTable",
        'hbCells': 'templates/rtCells.handlebars',
        'userSettings': 'project/userSettings',
        'URIjs': 'libs/uri',
        'toastr': 'plugins/toastr'
    },
    shim: {
        'overscroll': {
            deps: ['jquery']
        },
        'ui.preloader': {
            deps: ['jquery-ui']
        }
    }
});

define('jquery', ['jquery-internal'], function () {
    "use strict";
    return jQuery;
});

define(['jquery', 'helpers', 'datatables-extend', 'ui.popup', 'ui.dropdown', 'extend-moment', 'mustache', 'timeElements',
        'URIjs/URI', 'rtGlobal', 'toastr', 'realtimerouting', 'realtimePages', 'rtBuilders', 'overscroll', 'ui.preloader', 'screensize'],
    function ($, helpers, dataTables, popup, dropdown, extendMoment, Mustache, timeElements, URI, rtGlobal, toastr) {

        'use strict';

        // reveal the page when all scripts are loaded
        $(document).ready(function () {
            var $body = $("body");
            $body.show();

            var $preloader = $("<div/>").preloader({
                "autoShow": false
            }).attr("id", "preloader");
            $body.append($preloader);

            if ($body.attr("id") === "usersettings_page") {
                require(["userSettings"], function (userSettings) {
                    userSettings.init();
                });
            }

            // swipe or scroll in the codebases overview
            if ($('#builders_page').length || $('#builder_page').length) {
                require(['overscroll'],
                    function (overscroll) {

                        $("#overScrollJS").overscroll({
                            showThumbs: false,
                            direction: 'horizontal'
                        });
                    });
            }

            // tooltip for long txtstrings
            if ($('.ellipsis-js').length) {
                require(['dotdotdot'],
                    function () {
                        $(".ellipsis-js").dotdotdot();
                    });
            }

            // codebases combobox selector
            if ($('#commonBranch_select').length || $('.select-tools-js').length) {
                require(['selectors'],
                    function (selectors) {
                        selectors.init();
                    });
            }

            if (helpers.hasfinished() === false) {
                require(['realtimerouting'],
                    function (realtimeRouting) {
                        realtimeRouting.init();
                    });
            }

            if (helpers.isRealTimePage() === true) {
                $preloader.preloader("showPreloader");
            }

            if ($('#home_page').length > 0) {
                helpers.randomImage($('#image').find('img'));
            }

            // setup toastr
            toastr.options = {
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                hideDuration: 300
            };

            // get scripts for general popups
            popup.init();
            // get scripts for the projects dropdown
            dropdown.init();

            // get all common scripts
            helpers.init();
            dataTables.init();
            extendMoment.init();
            timeElements.init();
        });
    });