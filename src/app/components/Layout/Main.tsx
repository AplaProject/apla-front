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
import media from 'components/Theme/media';

interface Props {
    className?: string;
    header?: React.ReactNode;
    legal?: React.ReactNode;
}

const Main: React.SFC<Props> = props => (
    <div className={props.className}>
        <div className="main__nav">{props.header}</div>
        <div className="main__content">{props.children}</div>
        <div className="main__legal">{props.legal}</div>
    </div>
);

export default themed(Main)`
    background: #f6f6f6;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
        'nav'
        'content'
        'legal';
    align-items: center;
    padding: 20px;
    min-height: ${media.standalone ? '100vh' : 'calc(var(--vh, 1vh) * 100)'};
    overflow-y: hidden;

    & .main__nav {
        grid-area: nav;
        z-index: 2;
    }

    & .main__content {
        align-self: flex-start;
        grid-area: content;
        z-index: 1;
        padding: 0 20px;
    }

    & .main__legal {
        grid-area: legal;
        z-index: 2;
    }

    .hidden-lg.hidden-lg.hidden-lg.hidden-lg.hidden-lg.hidden-lg.hidden-lg.hidden-lg.hidden-lg {
        display: block !important;
    }
`;
