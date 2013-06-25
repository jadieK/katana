# This file is part of Buildbot.  Buildbot is free software: you can
# This file is part of Buildbot.  Buildbot is free software: you can
# redistribute it and/or modify it under the terms of the GNU General Public
# License as published by the Free Software Foundation, version 2.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
# Copyright Buildbot Team Members


from buildbot.status.web.base import HtmlResource
import buildbot
import twisted
import sys
import jinja2



class ProjectsResource(HtmlResource):
    pageTitle = "Projects overview"

    def content(self, req, cxt):
        status = self.getStatus(req)
        print "\n\n --"
        print status.getProjects()
        print "\n\n --"
        template = req.site.buildbot_service.templates.get_template("projects.html")
        template.autoescape = True
        return template.render(**cxt)
    

class CodeBasesResource(HtmlResource):
    pageTitle = "Codebases overview"

    

    def content(self, req, cxt):

        template = req.site.buildbot_service.templates.get_template("codebases.html")
        template.autoescape = True
        return template.render(**cxt)


