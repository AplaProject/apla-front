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
import { ISection } from 'apla/content';

import Section from './Section';
import themed from 'components/Theme/themed';
import Breadcrumbs from './Breadcrumbs';

interface Props {
    className?: string;
    section: string;
    page: string;
    folded: boolean;
    menuActive: boolean;
    values: {
        [key: string]: ISection;
    };
}

const Sections: React.SFC<Props> = props => (
    <div className={props.className}>
        <Breadcrumbs values={props.values[props.section].breadcrumbs} />
        <Section
            name={props.section}
            folded={props.folded}
            menuActive={props.menuActive}
            page={props.values[props.section].page}
            breadcrumbs={props.values[props.section].breadcrumbs}
        />
    </div>
);

export default themed(Sections)`
    height: 100%;
    position: relative;
`;
