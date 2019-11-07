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

import themed from 'components/Theme/themed';
import Sections from 'containers/Main/Navigator/Sections';
import NotFound from './Page/NotFound';

const StyledWrapper = themed.div`
    position: relative;
    height: 100%;
`;

interface Props {
    section: string;
    sections: { [key: string]: ISection };
    page: string;
    stylesheet: string;
    onRefresh?: () => void;
}

const Navigator: React.SFC<Props> = props => {
    const section = props.sections[props.section];

    return (
        <StyledWrapper>
            <style type="text/css">{props.stylesheet}</style>
            {section ? (
                <Sections
                    section={props.section}
                    values={props.sections}
                    page={props.page}
                />
            ) : (
                <NotFound />
            )}
        </StyledWrapper>
    );
};

export default Navigator;
