// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * A javascript module to popup activity overviews
 *
 * @module     block_course_overview
 * @class      block
 * @package    block_course_overview
 * @copyright  2017 Howard Miller <howardsmiller@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'jqueryui', 'core/config'], function($, UI, mdlconfig) {

    return {
        init: function() {

            // Dialogues on activity icons.
            $(".dialogue").dialog({
                autoOpen: false,
                minWidth: 500,
                classes: {
                    'ui-dialog': 'course-overview-dialog'
                },
                closeText: '',
                modal: true,
                show: {
                  effect: 'fade',
                  duration: 250,
                },
                hide: {
                  effect: 'fade',
                  duration: 250
                }
            });

            // Opens the appropriate dialog.
            $(".overview-icon").click(function () {

                // Takes the ID of appropriate dialogue.
                var id = $(this).data('id');
                
                // Open dialogue.
                $(id).dialog("open");
                
                // On click overlay close dialog
                jQuery('.ui-widget-overlay').on('click', function() {
                    $(id).dialog('close');
                });
            });

            // When checkbox is clicked, change state of notification.
            $(".notificationcheckbox").change(function (ev) {

                var userid = ev.target.getAttribute("userid");
                var courseid = ev.target.getAttribute("courseid");
                var checkboxid = ev.target.getAttribute("id");
                var checked = ev.target.checked;
                
                var params = 'userid=' + userid + '&courseid=' + courseid + '&checked=' + checked;
                
                $.get('../local/custom_notification/api/setcoursenotification.php?' + params);

            });

            // When tab change, save it to profile information.
            $(".courseoverview-tab").click(function (ev) {

                var tab_selected = ev.target.getAttribute('href');
                tab_selected = tab_selected.substring(1, tab_selected.length);
                
                var params = 'tab_selected=' + tab_selected;
                $.get('../blocks/course_overview/api/setdefaulttab.php?' + params);

            });

        }
    };
});
