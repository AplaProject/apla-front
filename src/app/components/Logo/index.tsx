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

interface Props {
    className?: string;
}

const Logo: React.SFC<Props> = props => (
    <div className={props.className}>
        <img src="/icons/icon.svg" className="logo__main" />
        <div className="logo__brand" />
    </div>
);

export default themed(Logo)`
    position: relative;

    .logo__main {
        opacity: 0.03;
    }

    .logo__brand {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url(/img/logoText.svg) center no-repeat;
        background-size: 50%;
    }
`;
