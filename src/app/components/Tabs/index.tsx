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
import themed from 'components/Theme/themed';
import TabsButton from 'containers/Tabs/TabsButton';

interface Props {
    className?: string;
    activeIndex: number;
    items: {
        title: React.ReactNode;
        icon: string;
        url: string;
        badge?: number;
    }[];
}

const Tabs: React.SFC<Props> = props => (
    <ul className={props.className}>
        {props.items.map((item, index) => (
            <TabsButton
                key={index}
                active={props.activeIndex === index}
                icon={item.icon}
                badge={item.badge}
                url={item.url}
            >
                {item.title}
            </TabsButton>
        ))}
    </ul>
);

export default themed(Tabs)`
    background: linear-gradient(#4a4a4a,#151515);
    height: 60px;
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    list-style-type: none;
`;
