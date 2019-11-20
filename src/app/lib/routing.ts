// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

import React from 'react';
import MainHeader from 'containers/Main/Header';
import Navigator from 'containers/Main/Navigator';
import Editor from 'containers/Main/Editor';

interface RouteDict {
    [name: string]: {
        Header: React.ComponentType;
        Content: React.ComponentType;
        mapHeaderParams?: (params: any) => any;
        mapContentParams?: (params: any) => any;
    };
}
export const mainRoute = '/:app?/:page?/:action?';

export const routes: RouteDict = {
    browse: {
        Header: MainHeader,
        Content: Navigator,
        mapHeaderParams: params => ({
            app: params.app,
            section: params.page,
            page: params.action
        }),
        mapContentParams: params => ({
            app: params.app,
            section: params.page,
            page: params.action
        })
    },
    editor: {
        Header: MainHeader,
        Content: Editor
    }
};
