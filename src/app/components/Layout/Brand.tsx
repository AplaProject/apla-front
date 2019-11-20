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
import Logo from 'components/Logo';
import media from 'components/Theme/media';

interface Props {
    className?: string;
}

const Brand: React.SFC<Props> = props => (
    <div className={props.className}>
        <div className="brand__logo">
            <Logo />
        </div>
        <div className="brand__content">{props.children}</div>
    </div>
);

export default themed(Brand)`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: .5fr .5fr;
    grid-template-areas: 'logo content';
    grid-column-gap: 50px;
    align-items: center;
    padding: 50px;
    height: ${media.standalone ? '100vh' : 'calc(var(--vh, 1vh) * 100)'};

    & .brand__logo {
        grid-area: logo;
        z-index: 1;
    }

    & .brand__content {
        grid-area: content;
        z-index: 2;
    }

    @media (${media.lg}) {
        grid-template-columns: 1fr;
        grid-template-rows: 5% 1fr;
        grid-template-areas:
            'logo'
            'content';
        padding: 70px 50px 50px 50px;
        
        & .brand__logo {
            margin-top: 25px;
        }
    }

    @media (${media.md}) {
        grid-template-columns: 0 1fr;
        grid-template-rows: auto;
        grid-template-areas: 'logo content';
        grid-column-gap: 0;
        padding: 15px;

        & .brand__logo {
            display: none;
        }
    }
`;
