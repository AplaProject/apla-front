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
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import Tabs from 'components/Tabs';

const tabs = [
    {
        title: 'Meetings',
        icon: 'fa fa-users',
        page: 'default_page',
        url: '/browse/home/default_page'
    },
    {
        title: 'Notifications',
        badge: 9,
        icon: 'fa fa-bell',
        page: 'notifications',
        url: '/browse/home/notifications'
    },
    // {
    //     title: 'Search',
    //     icon: 'fa fa-search',
    //     page: '',
    //     url: ''
    // },
    {
        title: 'Profile',
        icon: 'fa fa-user',
        page: 'shareholder_profile',
        url: '/browse/home/shareholder_profile'
    }
];

interface Props {
    page: string;
}

const MainTabs: React.SFC<Props> = props => (
    <Tabs
        activeIndex={Math.max(
            tabs.findIndex(l => l.page === props.page),
            0
        )}
        items={tabs}
    />
);

export default MainTabs;
